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
      // Mount to DOM immediately
      setMounted(true);
      // Slight tick for CSS opacity transition to trigger cleanly
      const t = setTimeout(() => setVisible(true), 20);

      // Safety timeout: dismiss after 2.5s max so user is never trapped
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          stopPageLoading();
          setMounted(false);
        }, 280);
      }, 2500);

      return () => clearTimeout(t);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 280);
      return () => clearTimeout(t);
    }
  }, [pageLoading, stopPageLoading]);

  // Route change detector: when pathname or searchParams change while loading, complete the transition
  useEffect(() => {
    const currentRoute = pathname + (searchParams ? searchParams.toString() : "");
    if (currentRoute !== lastRouteRef.current) {
      lastRouteRef.current = currentRoute;

      if (pageLoading) {
        // Quick 120ms tick so the new page has painted its initial DOM
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
          setTimeout(() => {
            stopPageLoading();
            setMounted(false);
          }, 280);
        }, 120);
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
        let msg = "Jaipur Atelier";
        if (url.pathname.includes("/product/")) {
          msg = "Curating Masterpiece";
        } else if (url.search.includes("Necklaces") || url.search.includes("pendants") || url.pathname.includes("pendant")) {
          msg = "Pendants & Necklaces";
        } else if (url.search.includes("Earrings") || url.pathname.includes("earring")) {
          msg = "Handcrafted Earrings";
        } else if (url.search.includes("Bracelets") || url.pathname.includes("bracelet")) {
          msg = "Bangles & Bracelets";
        } else if (url.search.includes("Bridal") || url.pathname.includes("bridal")) {
          msg = "Bridal Trousseau";
        } else if (url.pathname.startsWith("/collection/")) {
          msg = "Jaipur Collection Archive";
        } else if (url.pathname === "/shop") {
          msg = "All Masterpieces";
        } else if (url.pathname === "/about") {
          msg = "Heritage & Craftsmanship";
        } else if (url.pathname === "/wishlist") {
          msg = "Saved Heirlooms";
        } else if (url.pathname === "/contact") {
          msg = "Connecting With Atelier";
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
      className={`fixed inset-0 z-[100] bg-[#fffaee]/98 backdrop-blur-sm flex flex-col items-center justify-center px-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        visible
          ? "opacity-100 pointer-events-auto scale-100"
          : "opacity-0 pointer-events-none scale-[1.008]"
      }`}
    >
      {/* Ambient Radial Warmth */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at 50% 48%, rgba(200, 33, 39, 0.04) 0%, rgba(255, 250, 238, 0) 65%)"
        }}
      />

      {/* Main Center Composition */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        
        {/* Monogram Crest with Enamel & Golden Luster Sweep */}
        <div 
          className="relative flex items-center justify-center"
          style={{ animation: "luxury-breathe 2.8s ease-in-out infinite" }}
        >
          {/* Subtle Ambient Halo */}
          <div className="absolute -inset-6 rounded-full bg-[#c82127]/[0.035] blur-xl pointer-events-none" />

          {/* Authentic Pill Submark (Protected Brand Geometry) */}
          <div className="relative h-18 sm:h-22 w-auto flex items-center justify-center">
            <img
              src="/logos/submark.png"
              alt="Zevar Baksa"
              className="h-full w-auto object-contain select-none pointer-events-none drop-shadow-[0_2px_8px_rgba(66,0,2,0.06)]"
            />

            {/* Golden & Vitreous Enamel Sheen Sweep */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{
                WebkitMaskImage: "url('/logos/submark.png')",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: "url('/logos/submark.png')",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
              }}
            >
              <div
                className="absolute -inset-y-6 -left-full w-[260%] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 32%, rgba(255, 238, 180, 0.45) 46%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 238, 180, 0.45) 54%, transparent 68%)",
                  animation: "luxury-sheen 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                }}
              />
            </div>
          </div>
        </div>

        {/* Minimalist Hairline Progress Indicator */}
        <div className="w-20 sm:w-24 h-[1px] bg-[#420002]/10 rounded-full mt-7 overflow-hidden relative">
          <div 
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#c82127] to-transparent"
            style={{ animation: "luxury-track 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
          />
        </div>

        {/* Brand Identification */}
        <div className="mt-5 flex flex-col items-center">
          <span className="font-display text-xs sm:text-[13px] uppercase tracking-[0.45em] text-[#420002] font-medium pl-[0.45em]">
            ZEVAR BAKSA
          </span>
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-[#c82127]/80 font-normal mt-1 pl-[0.35em]">
            JAIPUR · MEENAKARI
          </span>

          {/* Curated Route Context Caption (Subtle & Understated) */}
          {pageLoadingMessage && (
            <p className="font-serif-brand italic text-[11px] sm:text-xs text-[#420002]/50 tracking-wider mt-2.5">
              {pageLoadingMessage}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
