"use client";

import { useState, useEffect } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

type Mode = "login" | "signup";

export function LoginModal() {
  const router = useRouter();
  const { loginOpen, closeLogin } = useUIStore();
  // Clerk v7 Future API: returns { signIn, errors, fetchStatus }
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState("");

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLogin();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeLogin]);

  // Lock body scroll & reset form state on close
  useEffect(() => {
    if (loginOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setMode("login");
      setName("");
      setEmail("");
      setPassword("");
      setVerificationCode("");
      setVerifying(false);
      setError("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loginOpen]);

  // ── Google SSO ──────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setError("");
    setOauthLoading(true);
    try {
      if (mode === "login") {
        if (!signIn) return;
        const { error } = await signIn.sso({
          strategy: "oauth_google",
          redirectUrl: `${window.location.origin}/sso-callback`,
          redirectCallbackUrl: `${window.location.origin}/account`,
        });
        if (error) throw error;
      } else {
        if (!signUp) return;
        const { error } = await signUp.sso({
          strategy: "oauth_google",
          redirectUrl: `${window.location.origin}/sso-callback`,
          redirectCallbackUrl: `${window.location.origin}/account`,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      console.error("[LoginModal] Google sign-in error:", err);
      setError(
        err?.message ?? err?.longMessage ?? "Google authentication failed. Please try again."
      );
      setOauthLoading(false);
    }
  };

  // ── Email + Password Sign In ────────────────────────────────────
  const handleSignIn = async () => {
    if (!signIn) return;
    const { error } = await signIn.password({
      identifier: email.trim(),
      password,
    });
    if (error) {
      const code = (error as any)?.code ?? "";
      if (code === "form_identifier_not_found") {
        throw new Error("No account found with this email. Please register first.");
      } else if (code === "form_password_incorrect") {
        throw new Error("Incorrect password. Please try again.");
      }
      throw new Error((error as any)?.longMessage ?? (error as any)?.message ?? "Sign-in failed.");
    }
    // finalize creates the active session
    const finalizeResult = await signIn.finalize();
    if (finalizeResult.error) {
      throw new Error(
        (finalizeResult.error as any)?.longMessage ??
          (finalizeResult.error as any)?.message ??
          "Could not complete sign-in."
      );
    }
  };

  // ── Email + Password Sign Up ────────────────────────────────────
  const handleSignUp = async () => {
    if (!signUp) return;
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || undefined;
    const lastName = nameParts.slice(1).join(" ") || undefined;

    const { error } = await signUp.password({
      emailAddress: email.trim(),
      password,
      firstName,
      lastName,
    });
    if (error) {
      const code = (error as any)?.code ?? "";
      if (code === "form_identifier_exists") {
        throw new Error("An account with this email already exists. Please sign in.");
      }
      throw new Error((error as any)?.longMessage ?? (error as any)?.message ?? "Sign-up failed.");
    }

    // Status after password() call — if complete, finalize immediately
    if (signUp.status === "complete") {
      const finalizeResult = await signUp.finalize();
      if (finalizeResult.error) {
        throw new Error(
          (finalizeResult.error as any)?.longMessage ??
            (finalizeResult.error as any)?.message ??
            "Could not complete sign-up."
        );
      }
    } else {
      // Needs email verification — send code
      const sendResult = await signUp.verifications.sendEmailCode();
      if (sendResult.error) {
        throw new Error(
          (sendResult.error as any)?.longMessage ??
            (sendResult.error as any)?.message ??
            "Failed to send verification email."
        );
      }
      setVerifying(true);
    }
  };

  // ── Verify OTP Code ─────────────────────────────────────────────
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!verificationCode.trim()) {
      setError("Please enter the verification code.");
      return;
    }
    if (!signUp) return;

    setSubmitting(true);
    try {
      const { error } = await signUp.verifications.verifyEmailCode({
        code: verificationCode.trim(),
      });
      if (error) {
        throw new Error(
          (error as any)?.longMessage ?? (error as any)?.message ?? "Invalid verification code."
        );
      }
      // After verification, finalize to create the session
      const finalizeResult = await signUp.finalize();
      if (finalizeResult.error) {
        throw new Error(
          (finalizeResult.error as any)?.longMessage ??
            (finalizeResult.error as any)?.message ??
            "Could not create session."
        );
      }
      closeLogin();
    } catch (err: any) {
      setError(err?.message ?? "Verification failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Main form submit ─────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        await handleSignIn();
        closeLogin();
      } else {
        await handleSignUp();
        // closeLogin() called inside handleSignUp only if fully complete
        if (signUp?.status === "complete") closeLogin();
      }
    } catch (err: any) {
      setError(err?.message ?? "Authentication failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeLogin}
        className={`fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          loginOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Modal Card */}
      <div
        className={`fixed inset-0 z-[90] flex items-center justify-center p-4 transition-all duration-300 ${
          loginOpen ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        <div className="relative w-full max-w-[420px] bg-[#fffaee] border border-[#420002]/15 text-[#420002] rounded-2xl shadow-2xl overflow-hidden font-sans">

          {/* Close Button */}
          <button
            onClick={closeLogin}
            className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#420002]/5 text-[#420002]/70 hover:text-[#420002] transition-colors z-10 cursor-pointer"
          >
            <X className="h-4 w-4 stroke-[1.5]" />
          </button>

          {/* Header */}
          <div className="px-8 pt-8 pb-5 text-center border-b border-[#420002]/10 bg-white">
            <h2 className="font-display text-2xl sm:text-3xl text-[#420002]">
              {verifying ? "Verify Email" : mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="mt-1 text-xs text-[#420002]/60">
              {verifying
                ? `Enter the 6-digit code sent to ${email}`
                : mode === "login"
                ? "Sign in to access your saved jewellery & orders"
                : "Register for faster checkout and order tracking"}
            </p>
          </div>

          {/* Body */}
          <div className="px-7 py-6">
            {verifying ? (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#420002]/70 mb-1">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    required
                    autoFocus
                    maxLength={6}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#420002]/20 bg-white text-center font-mono text-base text-[#420002] placeholder:text-[#420002]/30 focus:outline-none focus:border-[#c82127] focus:ring-1 focus:ring-[#c82127]"
                  />
                </div>

                {error && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-600 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-[#c82127] hover:bg-[#a5181d] text-[#fffaee] text-xs uppercase tracking-[0.2em] font-semibold transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {submitting ? "Verifying..." : "Verify & Sign In"}
                </button>

                <button
                  type="button"
                  onClick={() => { setVerifying(false); setError(""); }}
                  className="w-full text-center text-xs text-[#420002]/60 hover:text-[#c82127] transition-colors pt-1"
                >
                  ← Change email address
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                {/* Google SSO */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={oauthLoading || submitting}
                  className="w-full py-2.5 px-4 rounded-lg border border-[#420002]/20 bg-white hover:bg-[#f4eee1]/60 text-[#420002] text-xs font-medium flex items-center justify-center gap-3 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {oauthLoading ? (
                    <span className="h-4 w-4 rounded-full border-2 border-[#420002]/30 border-t-[#420002] animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                    </svg>
                  )}
                  <span>
                    {oauthLoading
                      ? "Connecting..."
                      : mode === "login"
                      ? "Continue with Google"
                      : "Sign up with Google"}
                  </span>
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-[#420002]/15 w-full" />
                  <span className="bg-[#fffaee] px-3 text-[10px] uppercase tracking-[0.2em] text-[#420002]/50 whitespace-nowrap">
                    or with email
                  </span>
                  <div className="border-t border-[#420002]/15 w-full" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {mode === "signup" && (
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#420002]/70 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#420002]/40" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#420002]/20 bg-white text-xs text-[#420002] placeholder:text-[#420002]/30 focus:outline-none focus:border-[#c82127] focus:ring-1 focus:ring-[#c82127]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#420002]/70 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#420002]/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="name@domain.com"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#420002]/20 bg-white text-xs text-[#420002] placeholder:text-[#420002]/30 focus:outline-none focus:border-[#c82127] focus:ring-1 focus:ring-[#c82127]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] font-medium text-[#420002]/70 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#420002]/40" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full pl-9 pr-9 py-2 rounded-lg border border-[#420002]/20 bg-white text-xs text-[#420002] placeholder:text-[#420002]/30 focus:outline-none focus:border-[#c82127] focus:ring-1 focus:ring-[#c82127]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#420002]/40 hover:text-[#420002] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-600 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || oauthLoading}
                    className="w-full py-3 rounded-lg bg-[#c82127] hover:bg-[#a5181d] text-[#fffaee] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Please wait...</span>
                      </>
                    ) : (
                      <>
                        <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    {mode === "login" ? (
                      <p className="text-xs text-[#420002]/70">
                        Don&apos;t have an account?{" "}
                        <button
                          type="button"
                          onClick={() => { setMode("signup"); setError(""); }}
                          className="text-[#c82127] hover:underline font-semibold cursor-pointer"
                        >
                          Register
                        </button>
                      </p>
                    ) : (
                      <p className="text-xs text-[#420002]/70">
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => { setMode("login"); setError(""); }}
                          className="text-[#c82127] hover:underline font-semibold cursor-pointer"
                        >
                          Sign in
                        </button>
                      </p>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
