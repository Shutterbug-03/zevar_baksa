/**
 * Shared look for customer emails (same dark / maroon style as the order
 * confirmation). Table-free inline-CSS HTML keeps Gmail/Outlook/Apple Mail happy.
 */

import { escapeHtml } from "@/lib/validation";

export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export const shortRef = (razorpayOrderId: string) =>
  razorpayOrderId.replace("order_", "").slice(0, 12).toUpperCase();

export const label = (text: string) =>
  `<p style="margin:0 0 8px;font-size:10px;text-transform:uppercase;letter-spacing:0.3em;color:#777;font-family:Arial,sans-serif;">${escapeHtml(text)}</p>`;

export const paragraph = (html: string) =>
  `<p style="margin:0 0 20px;font-size:14px;color:#aaa;font-family:Arial,sans-serif;line-height:1.7;">${html}</p>`;

export const infoBox = (html: string, tone: "neutral" | "gold" = "neutral") =>
  `<div style="background:${tone === "gold" ? "#1a1a0a" : "#1a1a1a"};border:1px solid ${tone === "gold" ? "#3a2a0a" : "#2a2a2a"};border-radius:10px;padding:16px 20px;margin-bottom:24px;font-family:Arial,sans-serif;font-size:13px;line-height:1.7;color:${tone === "gold" ? "#b8963e" : "#ccc"};">${html}</div>`;

export const button = (href: string, text: string) =>
  `<a href="${escapeHtml(href)}" style="display:inline-block;background:#6B1225;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;">${escapeHtml(text)}</a>`;

export function emailShell({
  preheader,
  heading,
  body,
}: {
  preheader: string;
  heading: string;
  body: string;
}) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <div style="max-width:560px;margin:40px auto;background:#111;border:1px solid #2a1a1a;border-radius:16px;overflow:hidden;">
    <div style="background:#6B1225;padding:32px;text-align:center;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#d4a85390;font-family:Arial,sans-serif;">✦ Zevar Baksa Atelier ✦</p>
      <h1 style="margin:8px 0 0;font-size:26px;color:#fff;font-weight:400;">${escapeHtml(heading)}</h1>
    </div>
    <div style="padding:36px 32px;">${body}</div>
    <div style="padding:16px 32px;border-top:1px solid #1e1e1e;text-align:center;">
      <p style="margin:0;font-size:10px;color:#555;font-family:Arial,sans-serif;letter-spacing:0.1em;line-height:1.8;">
        Questions? Simply reply to this email.<br>
        ZevarBaksa LLP · B-21, Bhan Nagar, Queens Road, Vaishali Nagar, Jaipur, Rajasthan 302021
      </p>
    </div>
  </div>
</body>
</html>`;
}
