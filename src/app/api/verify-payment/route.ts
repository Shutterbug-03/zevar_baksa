/**
 * POST /api/verify-payment
 *
 * Verifies Razorpay payment signature, then marks the order "paid" in Supabase,
 * syncs it to BUSY and emails customer + admin (see lib/fulfillOrder.ts).
 * The Razorpay webhook (/api/webhooks/razorpay) does the same if this call
 * never arrives, e.g. the customer closed the tab after paying via UPI.
 *
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { fulfillPaidOrder } from "@/lib/fulfillOrder";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  // ── Rate limit: 10 verifications / 60 s per IP ──────────────────────
  const rl = rateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      console.error("[verify-payment] RAZORPAY_KEY_SECRET missing");
      return NextResponse.json({ error: "Payment verification unavailable." }, { status: 503 });
    }

    const expected = Buffer.from(
      crypto.createHmac("sha256", keySecret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex")
    );
    const given = Buffer.from(String(razorpay_signature ?? ""));
    const isValid = given.length === expected.length && crypto.timingSafeEqual(given, expected);

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment verification failed. Invalid signature." },
        { status: 400 }
      );
    }

    // ── Mark paid + BUSY + emails (shared with the Razorpay webhook) ───────
    await fulfillPaidOrder({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
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
