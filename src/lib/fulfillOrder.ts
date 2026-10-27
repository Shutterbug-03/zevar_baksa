/**
 * Marks a Razorpay order as paid and runs post-payment side effects
 * (BUSY ERP voucher, customer confirmation email, admin notification email).
 *
 * Called from BOTH the browser callback (/api/verify-payment) and the
 * Razorpay webhook (/api/webhooks/razorpay). Whichever arrives first wins; the
 * other becomes a no-op, so a customer who pays via UPI and closes the tab
 * still gets their order processed, and nobody gets duplicate emails/vouchers.
 *
 * Order details (address, phone, items, amount) are read from Supabase — the
 * row written by /api/create-order — not trusted from the request.
 * Also exports notifyOrderPlaced() (Busy + emails).
 */

import { supabaseAdmin, type OrderItem } from "@/lib/supabase";
import { resend, FROM_EMAIL, ADMIN_EMAIL, isResendPlaceholder } from "@/lib/resend";
import { escapeHtml } from "@/lib/validation";

export type OrderSnapshot = {
  email: string;
  name: string;
  phone: string;
  address: Record<string, string>;
  items: OrderItem[];
  amountINR: number;
  paymentMethod: string;
};

type FulfillInput = {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature?: string;
  /** Used only when no Supabase row exists (dev / placeholder DB). */
  fallback?: Partial<OrderSnapshot>;
};

const isSupabasePlaceholder = () =>
  !process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY.includes("PLACEHOLDER");

export async function fulfillPaidOrder({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  fallback = {},
}: FulfillInput): Promise<{ alreadyProcessed: boolean }> {
  let snapshot: OrderSnapshot = {
    email: fallback.email ?? "",
    name: fallback.name ?? "",
    phone: fallback.phone ?? "",
    address: fallback.address ?? {},
    items: fallback.items ?? [],
    amountINR: fallback.amountINR ?? 0,
    paymentMethod: fallback.paymentMethod ?? "online",
  };

  if (isSupabasePlaceholder()) {
    console.log("ℹ️  Supabase: Placeholder — order not persisted");
  } else {
    const { data: existing, error: readErr } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("razorpay_order_id", razorpayOrderId)
      .maybeSingle();

    if (readErr) console.error("[fulfill] Supabase read error:", readErr);

    if (existing) {
      if (existing.status === "paid") return { alreadyProcessed: true };

      // Atomic claim: only one caller flips pending → paid.
      const { data: claimed, error: updErr } = await supabaseAdmin
        .from("orders")
        .update({
          razorpay_payment_id: razorpayPaymentId,
          razorpay_signature: razorpaySignature ?? null,
          status: "paid",
        })
        .eq("razorpay_order_id", razorpayOrderId)
        .neq("status", "paid")
        .select("id");

      if (updErr) console.error("[fulfill] Supabase update error:", updErr);
      if (!updErr && (!claimed || claimed.length === 0)) return { alreadyProcessed: true };

      snapshot = {
        email: existing.customer_email,
        name: existing.customer_name,
        phone: existing.customer_phone,
        address: existing.address ?? {},
        items: existing.items ?? [],
        amountINR: Math.round(existing.amount / 100),
        paymentMethod: existing.payment_method,
      };
    } else if (snapshot.email) {
      // create-order's insert failed earlier — record the paid order now.
      const { error: insErr } = await supabaseAdmin.from("orders").insert({
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature ?? null,
        amount: snapshot.amountINR * 100,
        status: "paid",
        customer_email: snapshot.email,
        customer_name: snapshot.name,
        customer_phone: snapshot.phone,
        address: snapshot.address,
        items: snapshot.items,
        payment_method: snapshot.paymentMethod,
      });
      if (insErr) console.error("[fulfill] Supabase insert error:", insErr);
    }
  }

  await notifyOrderPlaced(razorpayOrderId, razorpayPaymentId, snapshot);

  return { alreadyProcessed: false };
}


/**
 * BUSY voucher + customer and admin emails for a newly placed order for a paid order. Each step is isolated — none can fail the order.
 */
export async function notifyOrderPlaced(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  snapshot: OrderSnapshot
) {
  // ── BUSY ERP ──────────────────────────────────────────────────────────
  // null = not written to BUSY (no vendor write endpoint yet, or the call failed);
  // the admin email then tells the team to enter the order manually.
  let busyVoucherNo: string | null = null;
  try {
    const { createSalesOrder } = await import("@/lib/busy");
    busyVoucherNo = await createSalesOrder({
      partnerEmail: snapshot.email,
      partnerName: snapshot.name,
      partnerPhone: snapshot.phone,
      lines: snapshot.items.map((i) => ({
        itemCode: String(i.product_id || "ITEM_CUSTOM"),
        name: i.name,
        quantity: i.quantity,
        priceUnit: i.price,
      })),
      razorpayOrderId,
      razorpayPaymentId,
      address: snapshot.address,
      paymentMethod: snapshot.paymentMethod || "card/upi/netbanking",
    });
    if (busyVoucherNo) console.log(`BUSY voucher ${busyVoucherNo} for ${razorpayOrderId}`);
    else console.warn(`[fulfill] BUSY not synced for ${razorpayOrderId} — admin must enter manually`);
  } catch (busyErr) {
    console.error("[fulfill] BUSY order creation error:", busyErr);
  }

  // ── Emails (never allowed to fail the payment) ────────────────────────
  await Promise.all([
    sendCustomerEmail(razorpayOrderId, razorpayPaymentId, snapshot),
    sendAdminEmail(razorpayOrderId, razorpayPaymentId, snapshot, busyVoucherNo),
  ]);
}

// ─── Emails ───────────────────────────────────────────────────────────────────

const shortId = (orderId: string) => orderId.replace("order_", "").slice(0, 12).toUpperCase();

const formatAddress = (a: Record<string, string>) =>
  [a.address1, a.address2, a.city, a.state, a.pincode, a.country].filter(Boolean).join(", ");

const itemsHtml = (items: OrderItem[]) =>
  items
    .map(
      (item) => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #1e1e1e;">
      <div>
        <p style="margin:0;font-size:14px;color:#f5f0e8;font-family:Georgia,serif;">${escapeHtml(item.name)}</p>
        <p style="margin:2px 0 0;font-size:11px;color:#888;font-family:Arial,sans-serif;letter-spacing:0.05em;">
          ${escapeHtml(item.size_preference ?? "Standard")} · Qty: ${Number(item.quantity)} · SKU: ${escapeHtml(item.product_id)}
        </p>
      </div>
      <p style="margin:0 0 0 auto;font-size:14px;font-weight:600;color:#d4a853;font-family:Arial,sans-serif;">
        ₹${(item.price * item.quantity).toLocaleString("en-IN")}
      </p>
    </div>`
    )
    .join("");

async function sendCustomerEmail(orderId: string, paymentId: string, o: OrderSnapshot) {
  const ref = shortId(orderId);

  if (isResendPlaceholder()) {
    console.log(`📧 EMAIL (placeholder): customer ${o.email} — #ZB-${ref} — ₹${o.amountINR.toLocaleString("en-IN")}`);
    return;
  }
  if (!o.email) return;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: o.email,
      subject: `Order Confirmed — #ZB-${ref} | Zevar Baksa`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:40px auto;background:#111;border:1px solid #2a1a1a;border-radius:16px;overflow:hidden;">
    <div style="background:#6B1225;padding:32px;text-align:center;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#d4a85390;font-family:Arial,sans-serif;">
        ✦ Zevar Baksa Atelier ✦
      </p>
      <h1 style="margin:8px 0 0;font-size:26px;color:#fff;font-weight:400;">Order Confirmed</h1>
    </div>

    <div style="padding:36px 32px;">
      <p style="margin:0 0 6px;font-size:14px;color:#aaa;font-family:Arial,sans-serif;">
        Dear ${escapeHtml(o.name || "Valued Customer")},
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#888;font-family:Arial,sans-serif;line-height:1.6;">
        Thank you for your purchase. Your heirloom piece${o.items.length > 1 ? "s are" : " is"} confirmed and will be carefully prepared for dispatch.
      </p>

      <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#555;font-family:Arial,sans-serif;">Order Reference</p>
        <p style="margin:4px 0 0;font-size:18px;color:#d4a853;font-family:Georgia,serif;">#ZB-${ref}</p>
        <p style="margin:4px 0 0;font-size:11px;color:#444;font-family:Arial,sans-serif;">Payment ID: ${escapeHtml(paymentId)}</p>
      </div>

      <div style="margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#555;font-family:Arial,sans-serif;">Your Pieces</p>
        ${itemsHtml(o.items)}
        <div style="padding-top:14px;display:flex;justify-content:space-between;">
          <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#888;font-family:Arial,sans-serif;">Total Paid (incl. all taxes)</p>
          <p style="margin:0;font-size:18px;color:#d4a853;font-family:Georgia,serif;">₹${o.amountINR.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div style="margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#555;font-family:Arial,sans-serif;">Shipping To</p>
        <p style="margin:0;font-size:13px;color:#aaa;font-family:Arial,sans-serif;line-height:1.6;">${escapeHtml(formatAddress(o.address))}</p>
      </div>

      <div style="background:#1a1a0a;border:1px solid #3a2a0a;border-radius:10px;padding:16px 20px;margin-top:8px;">
        <p style="margin:0;font-size:12px;color:#b8963e;font-family:Arial,sans-serif;line-height:1.6;">
          🚚 Your piece will be dispatched via insured, door-to-door delivery. You will receive a tracking link once dispatched.
        </p>
      </div>
    </div>

    <div style="padding:16px 32px;border-top:1px solid #1e1e1e;text-align:center;">
      <p style="margin:0;font-size:10px;color:#333;font-family:Arial,sans-serif;letter-spacing:0.1em;">
        Questions? Reply to this email or WhatsApp us.<br>
        © Zevar Baksa Atelier
      </p>
    </div>
  </div>
</body>
</html>`,
    });
  } catch (err) {
    console.error("[fulfill] Customer email failed:", err);
  }
}

async function sendAdminEmail(
  orderId: string,
  paymentId: string,
  o: OrderSnapshot,
  busyVoucherNo: string | null
) {
  const ref = shortId(orderId);
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  if (isResendPlaceholder()) {
    console.log(`📧 EMAIL (placeholder): admin ${ADMIN_EMAIL} — #ZB-${ref}`);
    return;
  }

  // Red banner when BUSY has no record of this order (the vendor API is read-only
  // today, so this is the normal case) — everything below is what's needed to key it in.
  const busyBlock = busyVoucherNo
    ? `<p style="margin:0 0 16px;padding:8px 12px;background:#e8f5e9;border:1px solid #2e7d32;color:#1b5e20;"><b>Synced to BUSY</b> — voucher no. ${escapeHtml(busyVoucherNo)}</p>`
    : `<div style="margin:0 0 16px;padding:14px 16px;background:#c62828;color:#fff;border-radius:6px;">
    <p style="margin:0;font-size:16px;font-weight:bold;">&#9888; NOT synced to BUSY &mdash; enter this order manually</p>
    <p style="margin:6px 0 0;font-size:13px;">BUSY stock has NOT been reduced. Create a sale voucher using the details below.</p>
  </div>`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: o.email || undefined,
      subject: `${busyVoucherNo ? "" : "[ENTER IN BUSY] "}New paid order #ZB-${ref} — ${inr(o.amountINR)}`,
      html: `
<div style="font-family:Arial,sans-serif;font-size:14px;color:#222;max-width:600px;">
  ${busyBlock}
  <h2 style="margin:0 0 12px;">New paid order #ZB-${ref}</h2>
  <p style="margin:0 0 4px;"><b>Total:</b> ${inr(o.amountINR)} (${escapeHtml(o.paymentMethod)})</p>
  <p style="margin:0 0 4px;"><b>Order ref:</b> #ZB-${ref}</p>
  <p style="margin:0 0 4px;"><b>Razorpay order:</b> ${escapeHtml(orderId)}</p>
  <p style="margin:0 0 16px;"><b>Payment:</b> Payment ID ${escapeHtml(paymentId)}</p>

  <h3 style="margin:0 0 6px;">Customer (BUSY party)</h3>
  <p style="margin:0 0 4px;"><b>Name:</b> ${escapeHtml(o.name)}</p>
  <p style="margin:0 0 4px;"><b>Phone:</b> ${escapeHtml(o.phone)}</p>
  <p style="margin:0 0 16px;"><b>Email:</b> ${escapeHtml(o.email)}</p>

  <h3 style="margin:0 0 6px;">Ship to</h3>
  <p style="margin:0 0 16px;">${escapeHtml(formatAddress(o.address))}</p>

  <h3 style="margin:0 0 6px;">Items</h3>
  <table style="border-collapse:collapse;width:100%;">
    <tr style="text-align:left;font-size:12px;color:#666;">
      <th style="padding:4px 0;border-bottom:1px solid #ccc;">Item / SKU</th>
      <th style="padding:4px 0;border-bottom:1px solid #ccc;text-align:center;">Qty</th>
      <th style="padding:4px 0;border-bottom:1px solid #ccc;text-align:right;">Rate</th>
      <th style="padding:4px 0;border-bottom:1px solid #ccc;text-align:right;">Amount</th>
    </tr>
    ${o.items
      .map(
        (i) => `<tr>
      <td style="padding:6px 0;border-bottom:1px solid #eee;">${escapeHtml(i.name)}<br><small>SKU: ${escapeHtml(i.product_id)} · ${escapeHtml(i.size_preference ?? "Standard")}</small></td>
      <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:center;">${Number(i.quantity)}</td>
      <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right;">${inr(Number(i.price))}</td>
      <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right;">${inr(i.price * i.quantity)}</td>
    </tr>`
      )
      .join("")}
  </table>
  <p style="margin:8px 0 0;"><b>Order total (incl. all taxes):</b> ${inr(o.amountINR)}</p>
</div>`,
    });
  } catch (err) {
    console.error("[fulfill] Admin email failed:", err);
  }
}
