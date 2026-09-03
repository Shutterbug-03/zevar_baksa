/**
 * POST /api/create-order
 *
 * Creates a Razorpay order server-side and saves it as "pending" in Supabase.
 * Returns the order_id + public key for the frontend to open the Razorpay modal.
 *
 * Body: { amount: number (INR), items: OrderItem[], customerEmail: string, paymentMethod: string }
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getRazorpay, generateReceipt } from "@/lib/razorpay";
import { supabaseAdmin, type OrderItem } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimit";

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
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }
    if (!customerEmail) {
      return NextResponse.json({ error: "Customer email is required" }, { status: 400 });
    }

    const amountInPaise = Math.round(amount * 100); // Razorpay uses paise
    const receipt = generateReceipt();

    // ── Detect placeholder keys ──────────────────────────────────────────────
    const isPlaceholder =
      !process.env.RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID.includes("PLACEHOLDER");

    let razorpayOrderId: string;

    if (isPlaceholder) {
      // Dev / placeholder mode — generate a fake order ID
      razorpayOrderId = `order_test_${crypto.randomBytes(10).toString("hex")}`;
      console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🧪 RAZORPAY: Placeholder mode — no real order created");
      console.log(`💰 Amount: ₹${amount} (${amountInPaise} paise)`);
      console.log(`📦 Fake Order ID: ${razorpayOrderId}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    } else {
      // ── Real Razorpay order ──────────────────────────────────────────────
      const razorpay = getRazorpay();
      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt,
        notes: {
          customer_email: customerEmail,
          payment_method: paymentMethod ?? "upi",
        },
      });
      razorpayOrderId = order.id;
    }

    // ── Save pending order to Supabase ───────────────────────────────────────
    const isSupabasePlaceholder =
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SERVICE_ROLE_KEY.includes("PLACEHOLDER");

    if (!isSupabasePlaceholder) {
      const { error } = await supabaseAdmin.from("orders").insert({
        razorpay_order_id: razorpayOrderId,
        amount: amountInPaise,
        currency: "INR",
        status: paymentMethod === "cod" ? "cod_pending" : "pending",
        customer_email: customerEmail,
        customer_name: customerName ?? "",
        customer_phone: customerPhone ?? "",
        address: address ?? {},
        items: items ?? [],
        payment_method: paymentMethod ?? "upi",
      });

      if (error) {
        console.error("Supabase insert error:", error);
        // Don't fail the request — Supabase might be placeholder
      }
    } else {
      console.log("ℹ️  Supabase: Placeholder mode — order not saved to DB");
    }

    return NextResponse.json({
      order_id: razorpayOrderId,
      amount: amountInPaise,
      currency: "INR",
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "rzp_test_PLACEHOLDER",
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
