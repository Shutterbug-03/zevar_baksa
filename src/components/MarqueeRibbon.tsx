"use client";

import * as React from "react";

// Continuous wavy gold SVG divider line
const WavyBorder = () => (
  <div className="w-full overflow-hidden h-[7px] relative flex justify-start items-center opacity-60 select-none pointer-events-none">
    <div className="flex w-max flex-shrink-0 animate-[ribbon-wavy_20s_linear_infinite]">
      {Array(60)
        .fill(0)
        .map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 40 8"
            className="w-[40px] h-[8px] fill-none stroke-amber-300 stroke-[1.3] flex-shrink-0"
          >
            <path d="M0,4 C5,0 15,0 20,4 C25,8 35,8 40,4" />
          </svg>
        ))}
    </div>
  </div>
);

// Monogram brand seal stamp with gold border and amber glow
const Stamp = () => (
  <div className="relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 border border-amber-300/40 rounded-full p-2 bg-[#2B050B]/95 flex-shrink-0 shadow-[0_0_15px_rgba(252,211,77,0.3)] backdrop-blur-md">
    <div className="absolute inset-0.5 border border-amber-300/20 rounded-full" />
    <img
      src="/logos/submark.png"
      alt="Zevar Baksa Seal"
      className="h-5 sm:h-6 w-auto object-contain brightness-0 invert opacity-95"
    />
  </div>
);

export function MarqueeRibbon({ text = "Mina Bagh • New Releases" }: { text?: string }) {
  const marqueeItems = Array(6).fill(text);

  return (
    <div className="relative w-full bg-gradient-to-r from-[#1A0307] via-[#33070E] to-[#1A0307] py-2.5 sm:py-3.5 border-y border-amber-300/30 overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.6)] select-none">
      <style jsx>{`
        @keyframes marquee-continuous {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .ribbon-track {
          display: flex;
          width: max-content;
          animation: marquee-continuous 60s linear infinite;
          will-change: transform;
        }
        .ribbon-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative z-10 flex flex-col gap-1 sm:gap-1.5">
        <WavyBorder />

        {/* Truly Continuous Single Track with 2x Duplicate Set (Moves 0% to -50%) */}
        <div className="overflow-hidden w-full flex">
          <div className="ribbon-track flex items-center">
            {/* Set 1 */}
            {marqueeItems.map((item, idx) => (
              <div
                key={`set-1-${idx}`}
                className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-[0.25em] text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] flex-shrink-0"
              >
                <span>{item}</span>
                <Stamp />
              </div>
            ))}

            {/* Set 2 (Identical Clone for 100% Seamless Infinite Loop) */}
            {marqueeItems.map((item, idx) => (
              <div
                key={`set-2-${idx}`}
                className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-[0.25em] text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] flex-shrink-0"
                aria-hidden="true"
              >
                <span>{item}</span>
                <Stamp />
              </div>
            ))}
          </div>
        </div>

        <WavyBorder />
      </div>
    </div>
  );
}
