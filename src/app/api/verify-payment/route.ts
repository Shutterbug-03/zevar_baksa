/**
 * POST /api/verify-payment
 *
 * Verifies Razorpay payment signature, then marks the order "paid" in Supabase,
 * syncs it to BUSY and emails customer + admin (see lib/fulfillOrder.ts).
 * The Razorpay webhook (/api/webhooks/razorpay) does the same if this call
 * never arrives, e.g. the customer closed the tab after paying via UPI.
 *
 * Body: {
 *   razorpay_order_id: string,
 *   razorpay_payment_id: string,
 *   razorpay_signature: string,
 *   customerEmail: string,
 *   customerName: string,
 *   customerPhone?: string,   // fallback only — DB values win
 *   address?: object,         // fallback only — DB values win
 *   items: OrderItem[],
 *   amount: number (INR)
 * }
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
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerEmail,
      customerName,
      customerPhone,
      address,
      items,
      amount,
    } = body;

    // ── Detect placeholder mode ──────────────────────────────────────────────
    const isPlaceholder =
      !process.env.RAZORPAY_KEY_SECRET ||
      process.env.RAZORPAY_KEY_SECRET.includes("PLACEHOLDER");

    let isValid = false;

    // Skipping signature checks is for local dev only — never in production.
    if (isPlaceholder && process.env.NODE_ENV === "production") {
      console.error("[verify-payment] RAZORPAY_KEY_SECRET missing in production");
      return NextResponse.json({ error: "Payment verification unavailable." }, { status: 503 });
    }

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
      const given = Buffer.from(String(razorpay_signature ?? ""));
      const expected = Buffer.from(expectedSignature);
      isValid = given.length === expected.length && crypto.timingSafeEqual(given, expected);
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment verification failed. Invalid signature." },
        { status: 400 }
      );
    }

    // ── Mark paid + BUSY + emails (shared with the Razorpay webhook) ───────
    // Order details come from Supabase; the body values are a fallback for
    // when the DB row is missing (e.g. placeholder DB in dev).
    await fulfillPaidOrder({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      fallback: {
        email: customerEmail,
        name: customerName,
        phone: customerPhone,
        address,
        items,
        amountINR: amount,
      },
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
