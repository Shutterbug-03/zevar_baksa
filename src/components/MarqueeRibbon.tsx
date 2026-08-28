"use client";

import * as React from "react";

// Monogram brand seal stamp with crimson accent
const Stamp = () => (
  <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 border border-[#c82127]/40 rounded-full p-1.5 bg-[#420002] flex-shrink-0">
    <span className="text-[10px] text-[#c82127] font-serif font-bold">ZB</span>
  </div>
);

export function MarqueeRibbon({ text = "Mina Bagh • Fine Jewellery • Jaipur Atelier" }: { text?: string }) {
  const marqueeItems = Array(6).fill(text);

  return (
    <div className="relative w-full bg-[#420002] py-3 sm:py-3.5 border-y border-[#420002] overflow-hidden select-none">
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
          animation: marquee-continuous 50s linear infinite;
          will-change: transform;
        }
        .ribbon-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative flex overflow-hidden">
        <div className="ribbon-track flex items-center">
          {/* First set of items */}
          <div className="flex items-center flex-shrink-0">
            {marqueeItems.map((item, index) => (
              <div key={`set1-${index}`} className="flex items-center flex-shrink-0">
                <span className="text-[11px] sm:text-[12.5px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-sans font-medium text-[#fffaee] px-6 sm:px-10 whitespace-nowrap">
                  {item}
                </span>
                <span className="text-[9px] text-[#c82127] flex-shrink-0">✦</span>
                <div className="mx-6 sm:mx-10 flex-shrink-0">
                  <Stamp />
                </div>
                <span className="text-[9px] text-[#c82127] flex-shrink-0">✦</span>
              </div>
            ))}
          </div>

          {/* Second identical set of items */}
          <div className="flex items-center flex-shrink-0">
            {marqueeItems.map((item, index) => (
              <div key={`set2-${index}`} className="flex items-center flex-shrink-0">
                <span className="text-[11px] sm:text-[12.5px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-sans font-medium text-[#fffaee] px-6 sm:px-10 whitespace-nowrap">
                  {item}
                </span>
                <span className="text-[9px] text-[#c82127] flex-shrink-0">✦</span>
                <div className="mx-6 sm:mx-10 flex-shrink-0">
                  <Stamp />
                </div>
                <span className="text-[9px] text-[#c82127] flex-shrink-0">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
