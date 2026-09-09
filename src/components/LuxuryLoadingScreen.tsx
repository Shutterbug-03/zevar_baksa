"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useUIStore } from "@/store/uiStore";

export function LuxuryLoadingScreen() {
  const { pageLoading, pageLoadingMessage, stopPageLoading, startPageLoading } = useUIStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Internal visual state for smooth fading
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Keep track of current route to detect changes
  const lastRouteRef = useRef(pathname + (searchParams ? searchParams.toString() : ""));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with pageLoading state from store
  useEffect(() => {
    if (pageLoading) {
      setMounted(true);
      // Ensure slight tick for transition to take effect
      const t = setTimeout(() => setVisible(true), 20);

      // Safety timeout: dismiss after 3s max so user is never trapped
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          stopPageLoading();
          setMounted(false);
        }, 400);
      }, 3000);

      return () => clearTimeout(t);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 400);
      return () => clearTimeout(t);
    }
  }, [pageLoading, stopPageLoading]);

  // Route change detector: when pathname or searchParams change while loading, complete the transition
  useEffect(() => {
    const currentRoute = pathname + (searchParams ? searchParams.toString() : "");
    if (currentRoute !== lastRouteRef.current) {
      lastRouteRef.current = currentRoute;

      if (pageLoading) {
        // Wait 350ms so the new page has painted its initial DOM
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
          setTimeout(() => {
            stopPageLoading();
            setMounted(false);
          }, 400);
        }, 350);
      }
    }
  }, [pathname, searchParams, pageLoading, stopPageLoading]);

  // Global click listener to intercept internal link clicks seamlessly
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      // Ignore external, download, blank targets, or modified clicks
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return;

        // Skip same-page anchors
        const currentPathAndSearch = window.location.pathname + window.location.search;
        const targetPathAndSearch = url.pathname + url.search;
        if (targetPathAndSearch === currentPathAndSearch) {
          if (url.hash) return;
        }

        // Determine context-aware poetic message
        let msg = "Entering The Vault...";
        if (url.pathname.includes("/product/")) {
          msg = "Curating Masterpiece...";
        } else if (url.search.includes("Necklaces") || url.search.includes("pendants") || url.pathname.includes("pendant")) {
          msg = "Curating Pendants & Necklaces...";
        } else if (url.search.includes("Earrings") || url.pathname.includes("earring")) {
          msg = "Curating Handcrafted Earrings...";
        } else if (url.search.includes("Bracelets") || url.pathname.includes("bracelet")) {
          msg = "Curating Bangles & Bracelets...";
        } else if (url.search.includes("Bridal") || url.pathname.includes("bridal")) {
          msg = "Opening Bridal Trousseau...";
        } else if (url.pathname.startsWith("/collection/")) {
          msg = "Opening Jaipur Collection Archive...";
        } else if (url.pathname === "/shop") {
          msg = "Unlocking All Masterpieces...";
        } else if (url.pathname === "/about") {
          msg = "Discovering Our Heritage...";
        } else if (url.pathname === "/wishlist") {
          msg = "Opening Your Saved Heirlooms...";
        } else if (url.pathname === "/contact") {
          msg = "Connecting With Atelier...";
        }

        startPageLoading(msg);
      } catch {
        // Fallback
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, [startPageLoading]);

  // Clean up all timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, []);

  if (!mounted && !pageLoading) return null;

  return (
    <div
      aria-live="polite"
      aria-busy={visible}
      className={`fixed inset-0 z-[100] bg-[#fffaee] flex flex-col items-center justify-center px-6 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        visible
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-[1.01]"
      }`}
    >
      {/* Ambient Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(200, 33, 39, 0.04) 0%, rgba(255, 250, 238, 0) 70%)"
        }}
      />

      {/* Aristocratic Inset Border Frame */}
      <div className="absolute inset-4 sm:inset-8 border border-[#420002]/10 pointer-events-none" />

      {/* Corner Ornaments */}
      <span className="absolute top-3 left-3 sm:top-7 sm:left-7 text-[#c82127]/50 text-xs select-none">✦</span>
      <span className="absolute top-3 right-3 sm:top-7 sm:right-7 text-[#c82127]/50 text-xs select-none">✦</span>
      <span className="absolute bottom-3 left-3 sm:bottom-7 sm:left-7 text-[#c82127]/50 text-xs select-none">✦</span>
      <span className="absolute bottom-3 right-3 sm:bottom-7 sm:right-7 text-[#c82127]/50 text-xs select-none">✦</span>

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        
        {/* Monogram Crest with Breathing Aura */}
        <div className="relative flex items-center justify-center">
          <div 
            className="absolute -inset-3.5 rounded-full border border-[#c82127]/25"
            style={{ animation: "pulse-subtle 3s ease-in-out infinite" }}
          />
          <div className="relative h-18 w-18 sm:h-20 sm:w-20 rounded-full bg-[#fffaee] border border-[#420002]/15 flex items-center justify-center p-3.5 shadow-sm">
            <img
              src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/logos/submark.png"
              alt="Zevar Baksa Monogram Emblem"
              className="h-full w-full object-contain drop-shadow-xs"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="mt-7 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[9px] text-[#c82127]">✦</span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#420002] font-display font-semibold">
              ZEVAR BAKSA
            </span>
            <span className="text-[9px] text-[#c82127]">✦</span>
          </div>

          {/* Dynamic Poetic Message */}
          <p className="font-serif-brand italic text-sm sm:text-base text-[#c82127] min-h-[1.5rem]">
            {pageLoadingMessage || "Entering The Vault..."}
          </p>
        </div>

        {/* Luxury Shimmer Bar */}
        <div className="w-40 sm:w-52 h-[1.5px] bg-[#420002]/10 rounded-full mt-5 overflow-hidden relative">
          <div 
            className="absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-[#c82127] to-transparent"
            style={{ animation: "shimmer-bar 1.3s infinite ease-in-out" }}
          />
        </div>

        {/* Heritage Detail */}
        <p className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.32em] text-[#420002]/45 font-sans mt-5">
          Jaipur Meenakari & Kundan Atelier
        </p>

      </div>
    </div>
  );
}
