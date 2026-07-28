"use client";

import * as React from "react";

// A repeating wavy divider line using SVG path
const WavyBorder = () => (
  <div className="w-full overflow-hidden h-[8px] relative flex justify-start items-center my-3 opacity-30 select-none pointer-events-none">
    <div className="flex w-max">
      {Array(100)
        .fill(0)
        .map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 40 8"
            className="w-[40px] h-[8px] fill-none stroke-foreground stroke-[1]"
          >
            <path d="M0,4 C5,0 15,0 20,4 C25,8 35,8 40,4" />
          </svg>
        ))}
    </div>
  </div>
);

// The monogram brand stamp
const Stamp = () => (
  <div className="relative flex items-center justify-center w-14 h-14 border border-foreground/30 rounded-full p-2 bg-background mx-8 my-1 flex-shrink-0">
    <div className="absolute inset-0.5 border border-foreground/10 rounded-full" />
    <img
      src="/logos/submark.png"
      alt="Stamp"
      className="h-7 w-auto object-contain brightness-0 contrast-200 text-foreground"
    />
  </div>
);

export function MarqueeRibbon({ text = "New Releases" }: { text?: string }) {
  return (
    <div className="w-full bg-background py-4 border-t border-b border-border">
      <WavyBorder />
      <div className="marquee overflow-hidden w-full select-none flex">
        <div className="marquee-track flex items-center w-max flex-shrink-0">
          {Array(8)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="flex items-center text-3xl md:text-4xl font-display uppercase tracking-[0.2em] text-foreground/80 pl-8"
              >
                <span>{text}</span>
                <Stamp />
              </div>
            ))}
        </div>
        <div className="marquee-track flex items-center w-max flex-shrink-0" aria-hidden="true">
          {Array(8)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="flex items-center text-3xl md:text-4xl font-display uppercase tracking-[0.2em] text-foreground/80 pl-8"
              >
                <span>{text}</span>
                <Stamp />
              </div>
            ))}
        </div>
      </div>
      <WavyBorder />
    </div>
  );
}
