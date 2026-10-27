/**
 * POST /api/contact
 * Emails a contact-form enquiry to CONTACT_EMAIL (reply-to = the visitor).
 * Body: { name, email, topic?, message, website? }  — `website` is a honeypot.
 */

import { NextRequest, NextResponse } from "next/server";
import { resend, FROM_EMAIL, CONTACT_EMAIL, isResendPlaceholder } from "@/lib/resend";
import { rateLimit } from "@/lib/rateLimit";
import { escapeHtml, isValidEmail } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, { limit: 3, windowMs: 60_000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }

  try {
    const { name, email, topic, message, website } = await req.json();

    // Honeypot — bots fill the hidden field. Pretend success.
    if (website) return NextResponse.json({ success: true });

    if (!name?.trim() || !message?.trim() || !isValidEmail(email ?? "")) {
      return NextResponse.json({ error: "Name, a valid email and a message are required." }, { status: 400 });
    }
    if (String(message).length > 5000 || String(name).length > 200 || String(topic ?? "").length > 300) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    if (isResendPlaceholder()) {
      console.log(`📧 CONTACT (placeholder): ${name} <${email}> — ${topic ?? ""}\n${message}`);
      return NextResponse.json({ success: true });
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: String(email).trim(),
      subject: `Website enquiry${topic ? ` — ${String(topic).slice(0, 80).replace(/[\r\n]+/g, " ")}` : ""}`,
      html: `
<div style="font-family:Arial,sans-serif;font-size:14px;color:#222;max-width:600px;">
  <p><b>Name:</b> ${escapeHtml(name)}</p>
  <p><b>Email:</b> ${escapeHtml(email)}</p>
  <p><b>Topic:</b> ${escapeHtml(topic ?? "")}</p>
  <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
</div>`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Could not send your message. Please email us directly." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json({ error: "Could not send your message." }, { status: 500 });
  }
}
