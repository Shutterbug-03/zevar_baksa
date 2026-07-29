"use client";

import { useState, useEffect } from "react";
import { X, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

type Mode = "login" | "signup" | "forgot";

export function LoginModal() {
  const { loginOpen, closeLogin } = useUIStore();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLogin();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeLogin]);

  // Lock body scroll
  useEffect(() => {
    if (loginOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setMode("login");
      setEmail("");
      setPassword("");
      setSuccess(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [loginOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async — replace with real auth (NextAuth, Supabase, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    if (mode === "forgot") {
      setSuccess(true);
    } else {
      // For now show a "coming soon" — wire real auth in Phase 2
      setSuccess(true);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeLogin}
        className={`fixed inset-0 z-[80] bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          loginOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center p-4 transition-all duration-400 ${
          loginOpen ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        <div className="relative w-full max-w-[420px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Close */}
          <button
            onClick={closeLogin}
            className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors z-10"
          >
            <X className="h-4 w-4 stroke-[1.5] text-foreground/60" />
          </button>

          {/* Header Brand */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-border/40">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-foreground/50">
                Zevar Baksa Atelier
              </span>
            </div>
            <h2 className="font-display text-3xl text-foreground">
              {mode === "login" && "Welcome Back"}
              {mode === "signup" && "Join the Atelier"}
              {mode === "forgot" && "Reset Password"}
            </h2>
            <p className="mt-1.5 text-xs text-foreground/50 font-sans">
              {mode === "login" && "Sign in to your heirloom account"}
              {mode === "signup" && "Create your Zevar Baksa account"}
              {mode === "forgot" && "We'll send a reset link to your email"}
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            {success ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                </div>
                <p className="text-sm font-sans text-foreground/80">
                  {mode === "forgot"
                    ? "Password reset link sent to your email."
                    : "Customer accounts are coming soon. Use WhatsApp for order tracking."}
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Zevar%20Baksa!%20I'd%20like%20help%20with%20my%20account."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 text-[11px] uppercase tracking-[0.2em] font-sans text-primary hover:underline"
                >
                  Contact via WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-foreground/70 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30 stroke-[1.4]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-secondary/30 text-sm font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                {mode !== "forgot" && (
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-foreground/70 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30 stroke-[1.4]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-border bg-secondary/30 text-sm font-sans text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Forgot password link */}
                {mode === "login" && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-[10px] uppercase tracking-[0.15em] font-sans text-foreground/40 hover:text-primary transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.25em] font-sans font-semibold flex items-center justify-center gap-2 hover:bg-[#5C0A19] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-md"
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      {mode === "login" && "Sign In"}
                      {mode === "signup" && "Create Account"}
                      {mode === "forgot" && "Send Reset Link"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>

                {/* Mode switcher */}
                <div className="text-center pt-2">
                  {mode === "login" ? (
                    <p className="text-xs text-foreground/40 font-sans">
                      New to Zevar Baksa?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("signup")}
                        className="text-primary hover:underline"
                      >
                        Create account
                      </button>
                    </p>
                  ) : (
                    <p className="text-xs text-foreground/40 font-sans">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </button>
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* WhatsApp CTA at bottom */}
          <div className="px-8 pb-6 border-t border-border/30 pt-4 text-center">
            <p className="text-[10px] text-foreground/30 font-sans">
              Need immediate help?{" "}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Chat with our atelier concierge
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
