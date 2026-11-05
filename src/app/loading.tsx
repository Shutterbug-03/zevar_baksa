import React from "react";

export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-[100] bg-[#fffaee]/98 backdrop-blur-sm flex flex-col items-center justify-center px-6 select-none"
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
        </div>

      </div>
    </div>
  );
}
