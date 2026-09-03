"use client";

import * as React from "react";

// Continuous wavy divider line
const WavyBorder = () => (
  <div className="w-full overflow-hidden h-[7px] relative flex justify-start items-center opacity-40 select-none pointer-events-none">
    <div className="flex w-max flex-shrink-0 animate-[ribbon-wavy_20s_linear_infinite]">
      {Array(60)
        .fill(0)
        .map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 40 8"
            className="w-[40px] h-[8px] fill-none stroke-[#fffaee] stroke-[1.3] flex-shrink-0"
          >
            <path d="M0,4 C5,0 15,0 20,4 C25,8 35,8 40,4" />
          </svg>
        ))}
    </div>
  </div>
);

// Monogram brand seal stamp
const Stamp = () => (
  <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-[#fffaee]/30 rounded-full p-2 bg-[#420002] flex-shrink-0 shadow-md">
    <div className="absolute inset-0.5 border border-[#fffaee]/15 rounded-full" />
    <img
      src="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/logos/submark.png"
      alt="Zevar Baksa Seal"
      className="h-4 sm:h-5 w-auto object-contain brightness-0 invert opacity-95"
    />
  </div>
);

export function MarqueeRibbon({ text = "Mina Bagh • New Releases" }: { text?: string }) {
  const marqueeItems = Array(6).fill(text);

  return (
    <div className="relative w-full bg-[#c82127] py-2.5 sm:py-3.5 border-y border-[#420002]/20 overflow-hidden shadow-sm select-none">
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
                className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-[0.25em] text-[#fffaee] flex-shrink-0"
              >
                <span>{item}</span>
                <Stamp />
              </div>
            ))}

            {/* Set 2 (Identical Clone for 100% Seamless Infinite Loop) */}
            {marqueeItems.map((item, idx) => (
              <div
                key={`set-2-${idx}`}
                className="flex items-center gap-6 sm:gap-8 pr-6 sm:pr-8 whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-display uppercase tracking-[0.25em] text-[#fffaee] flex-shrink-0"
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
