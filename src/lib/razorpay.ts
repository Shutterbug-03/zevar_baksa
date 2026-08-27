/**
 * Razorpay server-side client singleton.
 * Usage: import { razorpay } from "@/lib/razorpay"
 *
 * When you have real keys, update RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local
 */

import Razorpay from "razorpay";

let razorpayInstance: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (!razorpayInstance) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId.includes("PLACEHOLDER")) {
      console.warn(
        "⚠️  Razorpay: Using placeholder credentials. Real payments will not work. " +
        "Update RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local"
      );
    }

    razorpayInstance = new Razorpay({
      key_id: keyId ?? "rzp_test_PLACEHOLDER",
      key_secret: keySecret ?? "PLACEHOLDER",
    });
  }
  return razorpayInstance;
}

/** Generate a short unique receipt ID */
export function generateReceipt(): string {
  return `zb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
