/** Shared client + server validation for Indian checkout fields. */

/** Strips spaces/dashes and a +91 / 91 / 0 prefix; returns the 10-digit mobile or null. */
export function normalizeIndianPhone(raw: string): string | null {
  const digits = (raw ?? "").replace(/[\s\-()]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function isValidPincode(raw: string): boolean {
  return /^[1-9]\d{5}$/.test((raw ?? "").trim());
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((raw ?? "").trim());
}

/** Escapes user-supplied text for safe interpolation into HTML emails. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
