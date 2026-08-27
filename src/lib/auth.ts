/**
 * NextAuth configuration — Email magic link (passwordless).
 *
 * Setup needed:
 * 1. Set NEXTAUTH_SECRET in .env.local
 * 2. Set RESEND_API_KEY in .env.local (used to send magic link emails)
 * 3. Once you have Supabase: uncomment the adapter lines
 *
 * To add Google login later, add a GoogleProvider here.
 */

import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { resend, FROM_EMAIL } from "@/lib/resend";

export const authOptions: NextAuthOptions = {
  // ─── Providers ─────────────────────────────────────────────────────────────
  providers: [
    EmailProvider({
      from: FROM_EMAIL,
      /**
       * Custom send function using Resend instead of nodemailer.
       * When RESEND_API_KEY is a placeholder, the email will NOT send —
       * the magic link will appear in the terminal console instead.
       */
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const isPlaceholder =
          !process.env.RESEND_API_KEY ||
          process.env.RESEND_API_KEY.includes("PLACEHOLDER");

        if (isPlaceholder) {
          // Dev mode — log the magic link to the terminal
          console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          console.log("🔐 MAGIC LINK (dev mode — no real email sent)");
          console.log(`📧 To: ${email}`);
          console.log(`🔗 URL: ${url}`);
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
          return;
        }

        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: "Your Zevar Baksa sign-in link",
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Georgia,serif;">
  <div style="max-width:520px;margin:40px auto;background:#111;border:1px solid #2a1a1a;border-radius:16px;overflow:hidden;">
    <!-- Header -->
    <div style="background:#6B1225;padding:32px;text-align:center;">
      <p style="margin:0;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#d4a853;font-family:Arial,sans-serif;">
        ✦ Zevar Baksa Atelier ✦
      </p>
    </div>
    <!-- Body -->
    <div style="padding:40px 32px;">
      <h1 style="margin:0 0 12px;font-size:28px;color:#f5f0e8;font-weight:400;">Sign in to your account</h1>
      <p style="margin:0 0 28px;font-size:14px;color:#888;font-family:Arial,sans-serif;line-height:1.6;">
        Click the button below to sign in to your Zevar Baksa account. This link expires in 24 hours.
      </p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${url}" style="display:inline-block;background:#6B1225;color:#fff;padding:16px 36px;border-radius:100px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-weight:600;text-decoration:none;">
          Sign In Securely
        </a>
      </div>
      <p style="margin:24px 0 0;font-size:12px;color:#555;font-family:Arial,sans-serif;text-align:center;line-height:1.5;">
        If you didn't request this, you can safely ignore this email.<br>
        This link will expire in 24 hours.
      </p>
    </div>
    <!-- Footer -->
    <div style="padding:16px 32px;border-top:1px solid #1e1e1e;text-align:center;">
      <p style="margin:0;font-size:10px;color:#444;font-family:Arial,sans-serif;letter-spacing:0.1em;">
        © Zevar Baksa Atelier · Crafted with care
      </p>
    </div>
  </div>
</body>
</html>`,
        });
      },
    }),
  ],

  // ─── Session ───────────────────────────────────────────────────────────────
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // ─── Pages ─────────────────────────────────────────────────────────────────
  pages: {
    signIn: "/",          // We use the modal, not a separate page
    verifyRequest: "/auth/verify", // "Check your email" page
    error: "/",
  },

  // ─── Callbacks ─────────────────────────────────────────────────────────────
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email) {
        session.user = session.user ?? {};
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET ?? "PLACEHOLDER_SECRET_CHANGE_ME",
};
