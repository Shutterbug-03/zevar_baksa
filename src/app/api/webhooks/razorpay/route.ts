/**
 * POST /api/webhooks/razorpay
 *
 * Server-to-server payment confirmation from Razorpay. This is the safety net
 * for customers who pay (esp. UPI) and then close the tab / switch apps before
 * the browser callback to /api/verify-payment fires.
 *
 * Setup: Razorpay Dashboard → Settings → Webhooks → Add
 *   URL:    https://<your-domain>/api/webhooks/razorpay
 *   Secret: same value as RAZORPAY_WEBHOOK_SECRET
 *   Events: payment.captured, order.paid
 *
 * Idempotent — safe if Razorpay retries or /api/verify-payment already ran.
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { fulfillPaidOrder } from "@/lib/fulfillOrder";

function signatureMatches(rawBody: string, signature: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[razorpay-webhook] RAZORPAY_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  // Signature is computed over the exact raw body — don't parse first.
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  if (!signature || !signatureMatches(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: {
    event?: string;
    payload?: {
      payment?: { entity?: { id?: string; order_id?: string } };
      order?: { entity?: { id?: string } };
    };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.event !== "payment.captured" && event.event !== "order.paid") {
    return NextResponse.json({ received: true, ignored: event.event });
  }

  const payment = event.payload?.payment?.entity;
  const orderId = payment?.order_id ?? event.payload?.order?.entity?.id;
  if (!orderId || !payment?.id) {
    // Nothing we can act on; 200 so Razorpay doesn't retry forever.
    console.error("[razorpay-webhook] Missing order/payment id", event.event);
    return NextResponse.json({ received: true });
  }

  try {
    const { alreadyProcessed } = await fulfillPaidOrder({
      razorpayOrderId: orderId,
      razorpayPaymentId: payment.id,
    });
    return NextResponse.json({ received: true, alreadyProcessed });
  } catch (err) {
    console.error("[razorpay-webhook] Fulfil error:", err);
    // 500 → Razorpay retries with backoff.
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
