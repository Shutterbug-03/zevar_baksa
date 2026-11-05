/** Razorpay server-side client singleton. */

import Razorpay from "razorpay";

let razorpayInstance: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  razorpayInstance ??= new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
  return razorpayInstance;
}

/** Generate a short unique receipt ID */
export function generateReceipt(): string {
  return `zb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
