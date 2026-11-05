/**
 * POST /api/create-order
 *
 * Creates a Razorpay order server-side and saves it as "pending" in Supabase.
 * Returns the order_id + public key for the frontend to open the Razorpay modal.
 *
 * Prices are NEVER taken from the browser: every line is re-priced from the
 * catalog (lib/catalog.ts). `amount` is only a sanity check — if it differs
 * from the server total we reject so the customer is never charged a surprise.
 *
 * Online payment only (UPI / card / net banking via Razorpay); no cash on delivery.
 *
 * Body: { amount, items: [{product_id, quantity, size_preference}], customerEmail,
 *         customerName, customerPhone, address, paymentMethod }
 */

import { NextRequest, NextResponse } from "next/server";
import { getRazorpay, generateReceipt } from "@/lib/razorpay";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { priceCart, OutOfStockError } from "@/lib/catalog";
import { rateLimit } from "@/lib/rateLimit";
import { normalizeIndianPhone, isValidPincode, isValidEmail } from "@/lib/validation";

export async function POST(req: NextRequest) {
  // ── Rate limit: 5 orders / 60 s per IP ──────────────────────────────────
  const rl = rateLimit(req, { limit: 5, windowMs: 60_000 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const body = await req.json();
    const { amount, items, customerEmail, customerName, customerPhone, address, paymentMethod } = body;

    // ── Validate ────────────────────────────────────────────────────────────
    if (!customerEmail || !isValidEmail(customerEmail)) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }
    const phone = normalizeIndianPhone(customerPhone ?? "");
    if (!phone) {
      return NextResponse.json({ error: "Enter a valid 10-digit Indian mobile number" }, { status: 400 });
    }
    if (!isValidPincode(address?.pincode ?? "")) {
      return NextResponse.json({ error: "Enter a valid 6-digit PIN code" }, { status: 400 });
    }
    if (!address?.address1?.trim() || !address?.city?.trim() || !address?.state?.trim()) {
      return NextResponse.json({ error: "Complete shipping address is required" }, { status: 400 });
    }

    // ── Re-price the cart server-side ───────────────────────────────────────
    let pricedItems, totalINR: number;
    try {
      ({ lines: pricedItems, totalINR } = await priceCart(items));
    } catch (e) {
      if (e instanceof OutOfStockError) {
        return NextResponse.json({ error: e.message }, { status: 409 });
      }
      return NextResponse.json({ error: e instanceof Error ? e.message : "Invalid cart" }, { status: 400 });
    }
    if (Number(amount) !== totalINR) {
      return NextResponse.json(
        {
          error: "Prices have been updated since you added these items. Your order total has been refreshed — please review it and place your order again.",
          currentPrices: Object.fromEntries(pricedItems.map((l) => [l.product_id, l.price])),
        },
        { status: 409 }
      );
    }

    if (paymentMethod !== undefined && !["upi", "card", "netbanking"].includes(paymentMethod)) {
      return NextResponse.json({ error: "Please choose an online payment method." }, { status: 400 });
    }

    const amountInPaise = totalINR * 100; // Razorpay uses paise
    const receipt = generateReceipt();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[create-order] Razorpay/Supabase credentials missing");
      return NextResponse.json({ error: "Checkout is temporarily unavailable." }, { status: 503 });
    }

    const order = await getRazorpay().orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt,
      notes: {
        customer_email: customerEmail,
        payment_method: paymentMethod ?? "upi",
      },
    });
    const razorpayOrderId = order.id;

    // ── Save pending order to Supabase ───────────────────────────────────────
    const { userId } = await auth(); // null for guest checkout

    const { error } = await supabaseAdmin.from("orders").insert({
      razorpay_order_id: razorpayOrderId,
      amount: amountInPaise,
      currency: "INR",
      status: "pending",
      customer_email: customerEmail.trim().toLowerCase(),
      customer_name: customerName ?? "",
      customer_phone: phone,
      address,
      items: pricedItems,
      payment_method: paymentMethod ?? "upi",
      clerk_user_id: userId,
    });

    // Without a DB row the webhook/verify step has nothing to fulfil — don't take payment.
    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to create order. Please try again." }, { status: 500 });
    }

    return NextResponse.json({
      order_id: razorpayOrderId,
      amount: amountInPaise,
      currency: "INR",
      // The key id is public by design; reading it at runtime means a key swap needs no rebuild.
      key: process.env.RAZORPAY_KEY_ID,
      receipt,
    });
  } catch (err) {
    console.error("[create-order] Error:", err);
    return NextResponse.json(
      { error: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}
