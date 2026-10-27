/**
 * POST /api/admin/order-update   (ADMIN-ONLY — header `x-admin-secret: $ADMIN_API_SECRET`)
 *
 * Records a fulfilment step on an order and emails the customer (admin is BCC'd).
 *
 *   { "ref": "ZB-ABC123XYZ456", "action": "dispatched",
 *     "courier": "Blue Dart", "trackingNumber": "1234567890",
 *     "trackingUrl": "https://…", "expectedDelivery": "30 Oct" }
 *
 *   { "ref": "ZB-ABC123XYZ456", "action": "refunded",
 *     "amount": 11000, "reason": "Customer cancelled", "refundId": "rfnd_…" }
 *     → sends the email and marks the order refunded. The money itself is returned
 *       from the Razorpay dashboard (Payments → Refund); this does not move money.
 *
 *   { "ref": "ZB-ABC123XYZ456", "action": "invoice", "invoiceNumber": "ZB/26-27/0001" }
 *     → needs BUSINESS_GSTIN. Use the number from your Busy sale voucher.
 *
 * `ref` is the order reference shown in emails (#ZB-…) or the full Razorpay order id.
 */

import { NextRequest, NextResponse } from "next/server";
import { checkAdmin } from "@/lib/adminAuth";
import { supabaseAdmin, type Order } from "@/lib/supabase";
import { sendTransactional } from "@/lib/emails/send";
import { dispatchedEmail, refundEmail, invoiceEmail } from "@/lib/emails/templates";

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function findOrder(ref: string): Promise<{ order?: Order; error?: string; status?: number }> {
  const clean = ref.replace(/^#?ZB-/i, "").trim();
  if (clean.length < 6) return { error: "ref too short", status: 400 };
  const exact = ref.startsWith("order_");
  const q = supabaseAdmin.from("orders").select("*");
  // ilike with wildcards escaped: the short ref is the id's first 12 chars, upper-cased.
  const { data, error } = exact
    ? await q.eq("razorpay_order_id", ref)
    : await q.ilike("razorpay_order_id", `order_${clean.replace(/[\\%_]/g, "\\$&")}%`);
  if (error) {
    console.error("[admin/order-update] lookup failed:", error);
    return { error: "Database lookup failed", status: 502 };
  }
  if (!data || data.length === 0) return { error: "Order not found", status: 404 };
  if (data.length > 1) return { error: "Reference matches more than one order — use the full Razorpay order id", status: 400 };
  return { order: data[0] as Order };
}

export async function POST(req: NextRequest) {
  const denied = checkAdmin(req);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const action = str(body.action);
  if (!["dispatched", "refunded", "invoice"].includes(action)) {
    return NextResponse.json({ error: 'action must be "dispatched", "refunded" or "invoice"' }, { status: 400 });
  }

  const { order, error: findErr, status: findStatus } = await findOrder(str(body.ref));
  if (!order) return NextResponse.json({ error: findErr }, { status: findStatus ?? 400 });

  let rendered: { subject: string; html: string };
  let update: Record<string, unknown>;

  if (action === "dispatched") {
    if (!["paid", "shipped"].includes(order.status)) {
      return NextResponse.json({ error: `Cannot dispatch an order with status "${order.status}"` }, { status: 409 });
    }
    const courier = str(body.courier, 100);
    const trackingNumber = str(body.trackingNumber, 100);
    const trackingUrl = str(body.trackingUrl, 500);
    if (!courier || !trackingNumber) {
      return NextResponse.json({ error: "courier and trackingNumber are required" }, { status: 400 });
    }
    if (trackingUrl && !/^https?:\/\//i.test(trackingUrl)) {
      return NextResponse.json({ error: "trackingUrl must start with http(s)://" }, { status: 400 });
    }
    rendered = dispatchedEmail(order, { courier, trackingNumber, trackingUrl, expectedDelivery: str(body.expectedDelivery, 100) });
    update = { status: "shipped", courier, tracking_number: trackingNumber, tracking_url: trackingUrl || null, shipped_at: new Date().toISOString() };
  } else if (action === "refunded") {
    if (order.status === "pending" || order.status === "failed") {
      return NextResponse.json({ error: `Nothing to refund — order status is "${order.status}"` }, { status: 409 });
    }
    const maxINR = Math.round(order.amount / 100);
    const amountINR = body.amount === undefined ? maxINR : Number(body.amount);
    if (!Number.isFinite(amountINR) || amountINR <= 0 || amountINR > maxINR) {
      return NextResponse.json({ error: `amount must be between 1 and ${maxINR}` }, { status: 400 });
    }
    rendered = refundEmail(order, { amountINR, reason: str(body.reason, 300), refundId: str(body.refundId, 100) });
    update = { status: "refunded", refunded_amount: Math.round(amountINR * 100), refunded_at: new Date().toISOString() };
  } else if (action === "invoice") {
    const gstin = process.env.BUSINESS_GSTIN;
    const invoiceNumber = str(body.invoiceNumber, 50);
    if (!gstin) return NextResponse.json({ error: "Set BUSINESS_GSTIN before sending invoices" }, { status: 503 });
    if (!invoiceNumber) return NextResponse.json({ error: "invoiceNumber is required (use your Busy voucher number)" }, { status: 400 });
    if (["pending", "failed"].includes(order.status)) {
      return NextResponse.json({ error: `Cannot invoice an order with status "${order.status}"` }, { status: 409 });
    }
    rendered = invoiceEmail(order, {
      invoiceNumber,
      invoiceDate: new Date(),
      seller: {
        legalName: process.env.BUSINESS_LEGAL_NAME ?? "ZevarBaksa LLP",
        gstin,
        stateName: process.env.BUSINESS_STATE ?? "Rajasthan",
        hsn: process.env.BUSINESS_HSN ?? "711319",
        address: process.env.BUSINESS_ADDRESS ?? "B-21, Bhan Nagar, Queens Road, Vaishali Nagar, Jaipur, Rajasthan 302021",
      },
    });
    update = { invoice_number: invoiceNumber };
  } else {
    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  }

  const { error: updErr } = await supabaseAdmin.from("orders").update(update).eq("id", order.id);
  if (updErr) {
    console.error("[admin/order-update] update failed:", updErr);
    return NextResponse.json({ error: "Could not update the order — email NOT sent" }, { status: 500 });
  }

  const mail = await sendTransactional({ to: order.customer_email, ...rendered });
  return NextResponse.json({ success: true, action, status: update.status ?? order.status, emailSent: mail.sent, emailNote: mail.reason ?? null });
}
