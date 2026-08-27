"use client";

import Link from "next/link";
import { Mail, ArrowLeft, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function VerifyRequestPage() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6 py-32">
        <div className="w-full max-w-[420px] text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Mail className="h-10 w-10 text-primary stroke-[1.2]" />
              </div>
              <div className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary font-sans font-semibold">
              Check your inbox
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground leading-[1.1]">
              Magic link sent.
            </h1>
            <p className="text-sm text-foreground/60 font-sans leading-relaxed max-w-[320px] mx-auto">
              We sent a secure sign-in link to your email address. Click the link
              to access your Zevar Baksa account — no password needed.
            </p>
          </div>

          {/* Info box */}
          <div className="bg-secondary/40 border border-border/60 rounded-2xl p-5 text-left space-y-3">
            {[
              { icon: "📬", text: "Check your spam folder if you don't see it" },
              { icon: "⏱️", text: "The link expires in 24 hours" },
              { icon: "🔒", text: "Each link can only be used once" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>
                <p className="text-xs text-foreground/60 font-sans leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-sans text-foreground/40 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
