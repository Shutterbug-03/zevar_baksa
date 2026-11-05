/**
 * Public business contact details. Set these in .env.local / hosting env —
 * Razorpay's website review and the Consumer Protection (E-Commerce) Rules 2020
 * require a real phone number and a named Grievance Officer to be shown.
 * Anything left unset is simply not rendered (no placeholder text on the site).
 */

export const siteConfig = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 92160 48928",
  /** Digits only with country code, e.g. 919876543210 */
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919216048928").replace(/\D/g, ""),
  /** Shown on the site. Point at a working inbox until the business mailbox exists. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@zevarbaksa.com",
  grievanceOfficer: {
    name: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_NAME ?? "",
    designation: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_DESIGNATION ?? "Grievance Officer",
    email: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_EMAIL ?? "info@zevarbaksa.com",
  },
};

export const whatsappLink = (text?: string) =>
  siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : "/contact";
