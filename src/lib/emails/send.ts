import { resend, FROM_EMAIL, ADMIN_EMAIL, isResendPlaceholder } from "@/lib/resend";

/** Sends one customer email, BCC'ing the admin inbox as an audit trail. Never throws. */
export async function sendTransactional(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ sent: boolean; reason?: string }> {
  if (isResendPlaceholder()) {
    console.log(`📧 EMAIL (placeholder): to ${opts.to} — ${opts.subject}`);
    return { sent: false, reason: "RESEND_API_KEY not configured (logged only)" };
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: opts.to,
      bcc: ADMIN_EMAIL,
      subject: opts.subject,
      html: opts.html,
    });
    if (error) {
      console.error("[email] Resend error:", error);
      return { sent: false, reason: error.message };
    }
    return { sent: true };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { sent: false, reason: err instanceof Error ? err.message : "send failed" };
  }
}
