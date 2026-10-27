/**
 * Resend email client.
 * Update RESEND_API_KEY in .env.local with your real Resend key.
 * Free tier: 3,000 emails/month — https://resend.com
 *
 * FROM_EMAIL must be on a domain verified in Resend (SPF + DKIM + DMARC),
 * otherwise Gmail/Yahoo will spam-folder or reject order emails.
 */

import { Resend } from "resend";

export const resend = new Resend(
  process.env.RESEND_API_KEY ?? "re_PLACEHOLDER_RESEND_KEY"
);

const DEFAULT_FROM = "Zevar Baksa <info@zevarbaksa.com>";
const storeEmail = process.env.STORE_EMAIL?.trim();

// STORE_EMAIL may be a bare address; wrap it so inboxes show the brand name.
export const FROM_EMAIL = !storeEmail
  ? DEFAULT_FROM
  : /<[^>]+>/.test(storeEmail)
    ? storeEmail
    : `Zevar Baksa <${storeEmail}>`;

/** Receives a copy of every paid order so fulfilment knows to ship. */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "hello@zevarbaksa.com";

/** Receives contact-form enquiries. */
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "info@zevarbaksa.com";

export const isResendPlaceholder = () =>
  !process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes("PLACEHOLDER");
