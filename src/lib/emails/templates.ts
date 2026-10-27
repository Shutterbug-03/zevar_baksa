/**
 * Customer-facing lifecycle emails sent from the admin endpoint
 * (/api/admin/order-update): dispatched, refunded, tax invoice.
 * Each returns { subject, html }; sending is in lib/emails/send.ts.
 */

import type { Order } from "@/lib/supabase";
import { escapeHtml } from "@/lib/validation";
import { emailShell, label, paragraph, infoBox, button, inr, shortRef } from "@/lib/emails/shell";

type Rendered = { subject: string; html: string };

const addressLine = (a: Record<string, string> = {}) =>
  [a.address1, a.address2, a.city, a.state, a.pincode].filter(Boolean).join(", ");

const itemRows = (items: Order["items"]) =>
  items
    .map(
      (i) => `<div style="display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid #1e1e1e;font-family:Arial,sans-serif;font-size:13px;">
        <span style="color:#ddd;">${escapeHtml(i.name)} <span style="color:#777;">× ${Number(i.quantity)}</span></span>
        <span style="color:#d4a853;">${inr(i.price * i.quantity)}</span>
      </div>`
    )
    .join("");

// ─── Dispatched ───────────────────────────────────────────────────────────────

export function dispatchedEmail(
  order: Order,
  d: { courier: string; trackingNumber: string; trackingUrl?: string; expectedDelivery?: string }
): Rendered {
  const ref = shortRef(order.razorpay_order_id ?? order.id);

  const body = `
    ${paragraph(`Dear ${escapeHtml(order.customer_name || "Valued Customer")},`)}
    ${paragraph("Your piece has left our atelier and is on its way to you, fully insured and carefully packed in its velvet box.")}
    ${infoBox(
      `${label("Order")}<span style="font-size:18px;color:#d4a853;font-family:Georgia,serif;">#ZB-${ref}</span><br><br>
       ${label("Courier")}${escapeHtml(d.courier)}<br><br>
       ${label("Tracking number")}<span style="color:#fff;">${escapeHtml(d.trackingNumber)}</span>
       ${d.expectedDelivery ? `<br><br>${label("Expected delivery")}${escapeHtml(d.expectedDelivery)}` : ""}`
    )}
    ${d.trackingUrl ? `<div style="text-align:center;margin:0 0 28px;">${button(d.trackingUrl, "Track your order")}</div>` : ""}
    ${label("Delivering to")}
    ${paragraph(escapeHtml(addressLine(order.address)))}
    ${label("In this parcel")}
    <div style="margin-bottom:24px;">${itemRows(order.items)}</div>
    ${infoBox(
      "A signature is required on delivery. Please record an unboxing video when you open the parcel — it helps us resolve any transit issue quickly.",
      "gold"
    )}`;

  return {
    subject: `Your Zevar Baksa order #ZB-${ref} has shipped`,
    html: emailShell({ preheader: `Shipped via ${d.courier} — tracking ${d.trackingNumber}`, heading: "On Its Way", body }),
  };
}

// ─── Refund ───────────────────────────────────────────────────────────────────

export function refundEmail(
  order: Order,
  r: { amountINR: number; reason?: string; refundId?: string }
): Rendered {
  const ref = shortRef(order.razorpay_order_id ?? order.id);
  const full = r.amountINR >= Math.round(order.amount / 100);

  const body = `
    ${paragraph(`Dear ${escapeHtml(order.customer_name || "Valued Customer")},`)}
    ${paragraph(`We have initiated a ${full ? "full" : "partial"} refund for your order <b style="color:#d4a853;">#ZB-${ref}</b>.`)}
    ${infoBox(
      `${label("Refund amount")}<span style="font-size:22px;color:#d4a853;font-family:Georgia,serif;">${inr(r.amountINR)}</span>
       ${r.refundId ? `<br><br>${label("Refund reference")}${escapeHtml(r.refundId)}` : ""}
       ${r.reason ? `<br><br>${label("Reason")}${escapeHtml(r.reason)}` : ""}`
    )}
    ${infoBox(
      "The amount is returned to the original payment method. Banks typically take <b>5–7 working days</b> to show it on your statement (UPI refunds are often faster). If it hasn’t arrived after 7 working days, reply to this email with your bank reference and we will chase it with our payment partner.",
      "gold"
    )}
    ${paragraph("We are sorry this order didn’t work out, and we hope to serve you again.")}`;

  return {
    subject: `Refund initiated for order #ZB-${ref} — ${inr(r.amountINR)}`,
    html: emailShell({ preheader: `${inr(r.amountINR)} refund initiated — arrives in 5–7 working days`, heading: "Refund Initiated", body }),
  };
}

// ─── Tax invoice ──────────────────────────────────────────────────────────────

export type InvoiceSeller = { legalName: string; gstin: string; stateName: string; hsn: string; address: string };

/**
 * GST-inclusive pricing: taxable value = total / (1 + rate). Intra-state supply
 * (buyer in the seller's state) splits into CGST + SGST; otherwise IGST.
 * The whole order total is taxed at one rate. Have your CA confirm HSN and rate.
 */
export const GST_RATE = 0.03;

export function invoiceEmail(
  order: Order,
  inv: { invoiceNumber: string; invoiceDate: Date; seller: InvoiceSeller }
): Rendered {
  const ref = shortRef(order.razorpay_order_id ?? order.id);
  const total = order.amount / 100;
  const taxable = total / (1 + GST_RATE);
  const gst = total - taxable;
  const buyerState = (order.address?.state ?? "").trim().toLowerCase();
  const intraState = buyerState !== "" && buyerState === inv.seller.stateName.toLowerCase();
  const items = Array.isArray(order.items) ? order.items : [];
  const date = inv.invoiceDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const money2 = (n: number) => `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const td = "padding:8px 6px;border-bottom:1px solid #1e1e1e;font-family:Arial,sans-serif;font-size:12px;color:#ddd;";

  const rows = items
    .map(
      (i) => `<tr>
        <td style="${td}">${escapeHtml(i.name)}</td>
        <td style="${td}text-align:center;">${escapeHtml(inv.seller.hsn)}</td>
        <td style="${td}text-align:center;">${Number(i.quantity)}</td>
        <td style="${td}text-align:right;">${money2(i.price * i.quantity)}</td>
      </tr>`
    )
    .join("");
  const sum = (k: string, v: string, strong = false) =>
    `<tr><td colspan="3" style="${td}text-align:right;${strong ? "color:#d4a853;font-weight:bold;" : "color:#999;"}">${k}</td><td style="${td}text-align:right;${strong ? "color:#d4a853;font-weight:bold;" : ""}">${v}</td></tr>`;

  const body = `
    ${paragraph(`Dear ${escapeHtml(order.customer_name || "Valued Customer")}, please find the tax invoice for your order <b style="color:#d4a853;">#ZB-${ref}</b> below. Keep it for your records and warranty.`)}
    ${infoBox(
      `${label("Tax invoice")}<span style="font-size:16px;color:#fff;">${escapeHtml(inv.invoiceNumber)}</span> &nbsp;·&nbsp; ${date}<br><br>
       ${label("Sold by")}<b>${escapeHtml(inv.seller.legalName)}</b><br>${escapeHtml(inv.seller.address)}<br>GSTIN: ${escapeHtml(inv.seller.gstin)}<br><br>
       ${label("Billed and shipped to")}${escapeHtml(order.customer_name)}<br>${escapeHtml(addressLine(order.address))}<br>Place of supply: ${escapeHtml(order.address?.state ?? "")}`
    )}
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr>
        <th style="${td}text-align:left;color:#777;">Description</th>
        <th style="${td}text-align:center;color:#777;">HSN</th>
        <th style="${td}text-align:center;color:#777;">Qty</th>
        <th style="${td}text-align:right;color:#777;">Amount (incl. GST)</th>
      </tr>
      ${rows}
      ${sum("Taxable value", money2(taxable))}
      ${
        intraState
          ? sum(`CGST @ ${(GST_RATE * 50).toFixed(1)}%`, money2(gst / 2)) + sum(`SGST @ ${(GST_RATE * 50).toFixed(1)}%`, money2(gst / 2))
          : sum(`IGST @ ${(GST_RATE * 100).toFixed(0)}%`, money2(gst))
      }
      ${sum("Invoice total", money2(total), true)}
    </table>
    ${paragraph(`Payment: paid online. Hallmarked jewellery — BIS hallmark details are on the piece and in your certificate of authenticity.`)}`;

  return {
    subject: `Tax invoice ${inv.invoiceNumber} — order #ZB-${ref} | Zevar Baksa`,
    html: emailShell({ preheader: `Tax invoice ${inv.invoiceNumber} for ${money2(total)}`, heading: "Tax Invoice", body }),
  };
}
