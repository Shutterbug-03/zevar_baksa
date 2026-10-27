"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CONSENT_KEY } from "./GoogleAnalytics";

type Choice = "granted" | "denied" | "unset";

const CHANGE_EVENT = "zevar-consent-change";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Choice {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

// Server (and hydration) render treats consent as already given, so the banner
// is never in the SSR HTML and cannot cause a hydration mismatch.
const getServerSnapshot = (): Choice => "granted";

function choose(choice: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // storage blocked: the choice just won't persist
  }
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { analytics_storage: choice });
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function CookieConsent() {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (choice !== "unset") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#420002]/15 bg-[#fffaee]/95 backdrop-blur-md sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-sm sm:rounded-xl sm:border sm:shadow-xl"
    >
      <div className="flex flex-col gap-2.5 px-4 py-3 font-sans text-[#420002]">
        <p className="text-[11px] leading-snug text-[#420002]/75">
          We use analytics cookies to understand how the site is used. Nothing is
          tracked unless you accept.{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-[#c82127]">
            Privacy policy
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => choose("granted")}
            className="flex-1 rounded-full bg-[#c82127] px-4 py-1.5 text-[10px] font-medium tracking-[0.12em] text-[#fffaee] transition-colors hover:bg-[#a5181d]"
          >
            ACCEPT
          </button>
          <button
            onClick={() => choose("denied")}
            className="flex-1 rounded-full border border-[#420002]/25 px-4 py-1.5 text-[10px] font-medium tracking-[0.12em] transition-colors hover:border-[#c82127] hover:text-[#c82127]"
          >
            DECLINE
          </button>
        </div>
      </div>
    </div>
  );
}
