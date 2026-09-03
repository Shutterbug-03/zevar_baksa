"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSignIn, useSignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  // Clerk v7 Future API
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

  // Redirect if already authenticated
  useEffect(() => {
    if (authLoaded && isSignedIn) {
      router.replace("/account");
    }
  }, [authLoaded, isSignedIn, router]);

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
      console.error("Google sign in error:", err);
      setError(
        err?.message ?? err?.longMessage ?? "Google sign-in failed. Please try again."
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
        throw new Error("No account found with this email. Please create an account first.");
      } else if (code === "form_password_incorrect") {
        throw new Error("Incorrect password. Please verify and try again.");
      }
      throw new Error((error as any)?.longMessage ?? (error as any)?.message ?? "Sign-in failed.");
    }
    const finalizeResult = await signIn.finalize();
    if (finalizeResult?.error) {
      throw new Error(
        (finalizeResult.error as any)?.longMessage ??
          (finalizeResult.error as any)?.message ??
          "Could not complete sign-in."
      );
    }
    
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get("redirect_url") || "/account";
    router.push(redirectUrl);
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
        throw new Error("An account with this email already exists. Please sign in instead.");
      }
      throw new Error((error as any)?.longMessage ?? (error as any)?.message ?? "Sign-up failed.");
    }

    if (signUp.status === "complete") {
      const finalizeResult = await signUp.finalize();
      if (finalizeResult?.error) {
        throw new Error(
          (finalizeResult.error as any)?.longMessage ??
            (finalizeResult.error as any)?.message ??
            "Could not complete sign-up."
        );
      }
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get("redirect_url") || "/account";
      router.push(redirectUrl);
    } else {
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

  // ── Verify OTP ──────────────────────────────────────────────────
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
      const finalizeResult = await signUp.finalize();
      if (finalizeResult?.error) {
        throw new Error(
          (finalizeResult.error as any)?.longMessage ??
            (finalizeResult.error as any)?.message ??
            "Could not create session."
        );
      }
      const params = new URLSearchParams(window.location.search);
      const redirectUrl = params.get("redirect_url") || "/account";
      router.push(redirectUrl);
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
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!password) { setError("Please enter your password."); return; }

    setSubmitting(true);
    try {
      if (mode === "login") {
        await handleSignIn();
      } else {
        await handleSignUp();
      }
    } catch (err: any) {
      setError(err?.message ?? "Authentication failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fffaee] text-[#420002]">

      {/* ── LEFT PANEL: Form ─────────────────────────────────────── */}
      <div className="w-full lg:w-[48%] xl:w-[45%] flex flex-col justify-between p-6 sm:p-10 xl:p-14 bg-[#fffaee] border-r border-[#420002]/10 z-10">

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#420002]/70 hover:text-[#c82127] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to store</span>
          </Link>
          <Link href="/">
            <img src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/logos/submark.png" alt="Zevar Baksa" className="h-8 w-auto object-contain" />
          </Link>
        </div>

        {/* Main Content */}
        <div className="my-auto py-8 sm:py-10 max-w-[400px] w-full mx-auto">

          {verifying ? (
            /* ── Verification Screen ── */
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="font-display text-3xl sm:text-4xl text-[#420002]">Verify your email</h1>
                <p className="text-xs sm:text-sm text-[#420002]/70 font-sans leading-relaxed">
                  We sent a 6-digit code to <strong>{email}</strong>.
                </p>
              </div>
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.18em] font-sans font-medium text-[#420002]/70 mb-1.5">
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
                    className="w-full px-4 py-3 rounded-lg border border-[#420002]/20 bg-white text-base tracking-widest text-center font-mono text-[#420002] placeholder:text-[#420002]/30 focus:outline-none focus:border-[#c82127] focus:ring-1 focus:ring-[#c82127] transition-all"
                  />
                </div>
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-sans flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-lg bg-[#c82127] hover:bg-[#a5181d] text-[#fffaee] text-xs uppercase tracking-[0.2em] font-sans font-semibold transition-colors cursor-pointer disabled:opacity-60"
                >
                  {submitting ? "Verifying..." : "Complete Registration"}
                </button>
                <button
                  type="button"
                  onClick={() => { setVerifying(false); setError(""); }}
                  className="w-full text-center text-xs text-[#420002]/60 hover:text-[#c82127] font-sans transition-colors pt-2"
                >
                  ← Change email address
                </button>
              </form>
            </div>
          ) : (
            /* ── Sign In / Sign Up Form ── */
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="font-display text-3xl sm:text-4xl text-[#420002] tracking-tight">
                  {mode === "login" ? "Welcome back" : "Create an account"}
                </h1>
                <p className="text-xs sm:text-sm text-[#420002]/70 font-sans leading-relaxed">
                  {mode === "login"
                    ? "Sign in with your email and password to access your account."
                    : "Register to save your favourite pieces, track orders, and checkout faster."}
                </p>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={oauthLoading || submitting}
                className="w-full py-3 px-4 rounded-lg border border-[#420002]/20 bg-white hover:bg-[#f4eee1]/60 text-[#420002] text-xs font-sans font-medium flex items-center justify-center gap-3 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
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
                    ? "Connecting to Google..."
                    : mode === "login"
                    ? "Continue with Google"
                    : "Sign up with Google"}
                </span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-[#420002]/15 w-full" />
                <span className="bg-[#fffaee] px-3 text-[10px] uppercase tracking-[0.2em] text-[#420002]/50 font-sans whitespace-nowrap">
                  or with email
                </span>
                <div className="border-t border-[#420002]/15 w-full" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-1">
                    <label className="block text-[11px] uppercase tracking-[0.16em] font-sans font-medium text-[#420002]/70">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#420002]/40" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#420002]/20 bg-white text-sm font-sans text-[#420002] placeholder:text-[#420002]/30 focus:outline-none focus:border-[#c82127] focus:ring-1 focus:ring-[#c82127] transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-[0.16em] font-sans font-medium text-[#420002]/70">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#420002]/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#420002]/20 bg-white text-sm font-sans text-[#420002] placeholder:text-[#420002]/30 focus:outline-none focus:border-[#c82127] focus:ring-1 focus:ring-[#c82127] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-[0.16em] font-sans font-medium text-[#420002]/70">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#420002]/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#420002]/20 bg-white text-sm font-sans text-[#420002] placeholder:text-[#420002]/30 focus:outline-none focus:border-[#c82127] focus:ring-1 focus:ring-[#c82127] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#420002]/40 hover:text-[#420002] transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-sans flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || oauthLoading}
                  className="w-full py-3.5 rounded-lg bg-[#c82127] hover:bg-[#a5181d] text-[#fffaee] text-xs uppercase tracking-[0.2em] font-sans font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer disabled:opacity-60"
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

                <div className="text-center pt-2">
                  {mode === "login" ? (
                    <p className="text-xs text-[#420002]/70 font-sans">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => { setMode("signup"); setError(""); }}
                        className="text-[#c82127] hover:underline font-semibold cursor-pointer"
                      >
                        Create an account
                      </button>
                    </p>
                  ) : (
                    <p className="text-xs text-[#420002]/70 font-sans">
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

        {/* Footer */}
        <div className="pt-6 border-t border-[#420002]/10 flex items-center justify-between text-[11px] text-[#420002]/50 font-sans">
          <p>© {new Date().getFullYear()} Zevar Baksa</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#c82127] transition-colors">Privacy</Link>
            <Link href="/terms-conditions" className="hover:text-[#c82127] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#c82127] transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Editorial Image ─────────────────────────── */}
      <div className="hidden lg:block lg:w-[52%] xl:w-[55%] relative overflow-hidden bg-[#f4eee1]">
        <img
          src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/editorial-1.jpg"
          alt="Zevar Baksa Jewellery"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffaee]/15 via-transparent to-black/25" />
      </div>

    </div>
  );
}
