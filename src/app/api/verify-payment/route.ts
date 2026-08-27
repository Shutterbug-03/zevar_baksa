/**
 * POST /api/verify-payment
 *
 * Verifies Razorpay payment signature, marks order as "paid" in Supabase,
 * and sends a confirmation email via Resend.
 *
 * Body: {
 *   razorpay_order_id: string,
 *   razorpay_payment_id: string,
 *   razorpay_signature: string,
 *   customerEmail: string,
 *   customerName: string,
 *   items: OrderItem[],
 *   amount: number (INR)
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM_EMAIL } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerEmail,
      customerName,
      items,
      amount,
    } = body;

    // ── Detect placeholder mode ──────────────────────────────────────────────
    const isPlaceholder =
      !process.env.RAZORPAY_KEY_SECRET ||
      process.env.RAZORPAY_KEY_SECRET.includes("PLACEHOLDER");

    let isValid = false;

    if (isPlaceholder) {
      // Skip signature verification in placeholder / dev mode
      console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🧪 RAZORPAY: Placeholder mode — skipping signature verification");
      console.log(`✅ Payment ID: ${razorpay_payment_id}`);
      console.log(`📦 Order ID:   ${razorpay_order_id}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
      isValid = true;
    } else {
      // ── Real signature verification ────────────────────────────────────────
      const keySecret = process.env.RAZORPAY_KEY_SECRET!;
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(body)
        .digest("hex");
      isValid = expectedSignature === razorpay_signature;
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment verification failed. Invalid signature." },
        { status: 400 }
      );
    }

    // ── Update Supabase ────────────────────────────────────────────────────
    const isSupabasePlaceholder =
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY.includes("PLACEHOLDER");

    if (!isSupabasePlaceholder) {
      const { error } = await supabaseAdmin
        .from("orders")
        .update({
          razorpay_payment_id,
          razorpay_signature,
          status: "paid",
        })
        .eq("razorpay_order_id", razorpay_order_id);

      if (error) {
        console.error("Supabase update error:", error);
      }
    } else {
      console.log("ℹ️  Supabase: Placeholder — order not updated in DB");
    }

    // ── Sync Order to BUSY Accounting Software ─────────────────────────────
    try {
      const isBusyPlaceholder =
        !process.env.BUSY_API_URL || process.env.BUSY_API_URL.includes("PLACEHOLDER");

      const { createSalesOrder } = await import("@/lib/busy");
      const vchNo = await createSalesOrder({
        partnerEmail: customerEmail,
        partnerName: customerName,
        partnerPhone: "",
        lines: (items ?? []).map((i: { product_id?: number | string; id?: string; name: string; quantity: number; price: number }) => ({
          itemCode: String(i.product_id || i.id || "ITEM_CUSTOM"),
          name: i.name,
          quantity: i.quantity,
          priceUnit: i.price,
        })),
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        address: {},
        paymentMethod: "card/upi/netbanking",
      });

      if (!isBusyPlaceholder) {
        console.log(`✅ BUSY Sales Voucher created (${vchNo}) for ${razorpay_order_id}`);
      } else {
        console.log("ℹ️  BUSY: Simulation mode active — mock voucher logged");
      }
    } catch (busyErr) {
      console.error("[verify-payment] BUSY order creation error:", busyErr);
    }

    // ── Send confirmation email ────────────────────────────────────────────
    await sendConfirmationEmail({
      to: customerEmail,
      name: customerName,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      items: items ?? [],
      totalAmount: amount,
    });

    return NextResponse.json({
      success: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("[verify-payment] Error:", err);
    return NextResponse.json(
      { error: "Payment verification failed. Please contact support." },
      { status: 500 }
    );
  }
}

// ─── Email helper ─────────────────────────────────────────────────────────────

type EmailItem = {
  name: string;
  quantity: number;
  price: number;
  image?: string;
  size_preference?: string;
};

async function sendConfirmationEmail({
  to,
  name,
  orderId,
  paymentId,
  items,
  totalAmount,
}: {
  to: string;
  name: string;
  orderId: string;
  paymentId: string;
  items: EmailItem[];
  totalAmount: number;
}) {
  const isResendPlaceholder =
    !process.env.RESEND_API_KEY ||
    process.env.RESEND_API_KEY.includes("PLACEHOLDER");

  const shortOrderId = orderId.replace("order_", "").slice(0, 12).toUpperCase();

  if (isResendPlaceholder) {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 EMAIL: Placeholder mode — no email sent");
    console.log(`📬 To: ${to}`);
    console.log(`🆔 Order: #ZB-${shortOrderId}`);
    console.log(`💰 Total: ₹${totalAmount?.toLocaleString("en-IN")}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    return;
  }

  const itemsHtml = items
    .map(
      (item) => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #1e1e1e;">
      <div>
        <p style="margin:0;font-size:14px;color:#f5f0e8;font-family:Georgia,serif;">${item.name}</p>
        <p style="margin:2px 0 0;font-size:11px;color:#888;font-family:Arial,sans-serif;letter-spacing:0.05em;">
          ${item.size_preference ?? "Standard"} · Qty: ${item.quantity}
        </p>
      </div>
      <p style="margin:0 0 0 auto;font-size:14px;font-weight:600;color:#d4a853;font-family:Arial,sans-serif;">
        ₹${(item.price * item.quantity).toLocaleString("en-IN")}
      </p>
    </div>`
    )
    .join("");

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Order Confirmed — #ZB-${shortOrderId} | Zevar Baksa`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:40px auto;background:#111;border:1px solid #2a1a1a;border-radius:16px;overflow:hidden;">
    <!-- Header -->
    <div style="background:#6B1225;padding:32px;text-align:center;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#d4a85390;font-family:Arial,sans-serif;">
        ✦ Zevar Baksa Atelier ✦
      </p>
      <h1 style="margin:8px 0 0;font-size:26px;color:#fff;font-weight:400;">Order Confirmed</h1>
    </div>

    <!-- Body -->
    <div style="padding:36px 32px;">
      <p style="margin:0 0 6px;font-size:14px;color:#aaa;font-family:Arial,sans-serif;">
        Dear ${name || "Valued Customer"},
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#888;font-family:Arial,sans-serif;line-height:1.6;">
        Thank you for your purchase. Your heirloom piece${items.length > 1 ? "s are" : " is"} confirmed and will be carefully prepared for dispatch.
      </p>

      <!-- Order ID -->
      <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#555;font-family:Arial,sans-serif;">Order Reference</p>
        <p style="margin:4px 0 0;font-size:18px;color:#d4a853;font-family:Georgia,serif;">#ZB-${shortOrderId}</p>
        <p style="margin:4px 0 0;font-size:11px;color:#444;font-family:Arial,sans-serif;">Payment ID: ${paymentId}</p>
      </div>

      <!-- Items -->
      <div style="margin-bottom:24px;">
        <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#555;font-family:Arial,sans-serif;">Your Pieces</p>
        ${itemsHtml}
        <!-- Total -->
        <div style="padding-top:14px;display:flex;justify-content:space-between;">
          <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#888;font-family:Arial,sans-serif;">Total Paid</p>
          <p style="margin:0;font-size:18px;color:#d4a853;font-family:Georgia,serif;">₹${totalAmount?.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <!-- Notice -->
      <div style="background:#1a1a0a;border:1px solid #3a2a0a;border-radius:10px;padding:16px 20px;margin-top:8px;">
        <p style="margin:0;font-size:12px;color:#b8963e;font-family:Arial,sans-serif;line-height:1.6;">
          🚚 Your piece will be dispatched via insured, door-to-door delivery. You will receive a tracking link once dispatched.
        </p>
      </div>
    </div>

    <!-- Footer -->
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
  } catch (emailErr) {
    // Never let email failure break the payment confirmation
    console.error("[verify-payment] Email send failed:", emailErr);
  }
}
