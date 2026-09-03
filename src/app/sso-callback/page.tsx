import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0305] text-[#fffaee]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-[#c82127]/20 border-t-[#c82127] animate-spin" />
        <p className="text-xs uppercase tracking-[0.25em] text-[#fffaee]/50 font-sans">
          Authenticating with Atelier...
        </p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
