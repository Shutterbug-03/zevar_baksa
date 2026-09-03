/**
 * Resend email client.
 * Update RESEND_API_KEY in .env.local with your real Resend key.
 * Free tier: 3,000 emails/month — https://resend.com
 */

import { Resend } from "resend";

export const resend = new Resend(
  process.env.RESEND_API_KEY ?? "re_PLACEHOLDER_RESEND_KEY"
);

export const FROM_EMAIL = process.env.STORE_EMAIL ?? "Zevar Baksa <info@zevarbaksa.com>";
