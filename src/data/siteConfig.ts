/**
 * Public business contact details. Set these in .env.local / hosting env —
 * Razorpay's website review and the Consumer Protection (E-Commerce) Rules 2020
 * require a real phone number and a named Grievance Officer to be shown.
 * Anything left unset is simply not rendered (no placeholder text on the site).
 */

export const siteConfig = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  /** Digits only with country code, e.g. 919876543210 */
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  email: "info@zevarbaksa.com",
  grievanceOfficer: {
    name: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_NAME ?? "",
    designation: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_DESIGNATION ?? "Grievance Officer",
    email: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_EMAIL ?? "info@zevarbaksa.com",
  },
};

/**
 * Cash on delivery. Fee is added to the order total; orders whose item subtotal
 * is above maxOrder must pay online (COD on high-ticket jewellery = fraud/RTO risk).
 * NEXT_PUBLIC_ so the checkout UI and the server enforce the same numbers.
 */
export const codConfig = {
  fee: Number(process.env.NEXT_PUBLIC_COD_FEE ?? 499),
  maxOrder: Number(process.env.NEXT_PUBLIC_COD_MAX_ORDER ?? 50000),
};

export const whatsappLink = (text?: string) =>
  siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : "/contact";
