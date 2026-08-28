"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export interface ParallaxImage {
  src: string;
  alt?: string;
  tag?: string;
}

export interface ZoomParallaxProps {
  /** Array of images to be displayed in the parallax effect max 7 images */
  images: ParallaxImage[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Center image scales to 4x (filling entire viewport), others expand outwards
  const scale4 = useTransform(scrollYProgress, [0, 0.85], [1, 4.5]);
  const scale5 = useTransform(scrollYProgress, [0, 0.85], [1, 5.5]);
  const scale6 = useTransform(scrollYProgress, [0, 0.85], [1, 6.5]);
  const scale8 = useTransform(scrollYProgress, [0, 0.85], [1, 8.5]);
  const scale9 = useTransform(scrollYProgress, [0, 0.85], [1, 9.5]);

  // Outer images fade out as center takes over
  const outerOpacity = useTransform(scrollYProgress, [0.45, 0.75], [1, 0]);

  // Smooth cinematic transition into pure white/ivory screen at the end of the zoom
  const whiteScreenOpacity = useTransform(scrollYProgress, [0.72, 0.95], [0, 1]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[280vh] sm:h-[320vh] bg-[#fffaee]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {images.map(({ src, alt, tag }, index) => {
          const scale = scales[index % scales.length];
          const isCenter = index === 0;

          return (
            <motion.div
              key={index}
              style={{
                scale,
                opacity: isCenter ? 1 : outerOpacity,
              }}
              className={`absolute top-0 flex h-full w-full items-center justify-center pointer-events-none select-none ${
                index === 1
                  ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[32vh] [&>div]:!w-[34vw]"
                  : ""
              } ${
                index === 2
                  ? "[&>div]:!-top-[12vh] [&>div]:!-left-[26vw] [&>div]:!h-[46vh] [&>div]:!w-[22vw]"
                  : ""
              } ${
                index === 3
                  ? "[&>div]:!left-[28vw] [&>div]:!h-[26vh] [&>div]:!w-[26vw]"
                  : ""
              } ${
                index === 4
                  ? "[&>div]:!top-[28vh] [&>div]:!left-[6vw] [&>div]:!h-[28vh] [&>div]:!w-[22vw]"
                  : ""
              } ${
                index === 5
                  ? "[&>div]:!top-[28vh] [&>div]:!-left-[24vw] [&>div]:!h-[28vh] [&>div]:!w-[30vw]"
                  : ""
              } ${
                index === 6
                  ? "[&>div]:!top-[22vh] [&>div]:!left-[26vw] [&>div]:!h-[18vh] [&>div]:!w-[18vw]"
                  : ""
              }`}
            >
              <div
                className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(66,0,2,0.3)] border-2 border-[#fffaee] bg-[#f4eee1] ${
                  isCenter ? "h-[28vh] w-[28vw] sm:h-[30vh] sm:w-[30vw]" : "h-[25vh] w-[25vw]"
                }`}
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
                {tag && (
                  <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-[#420002]/90 text-[#fffaee] text-[8px] sm:text-[9.5px] uppercase tracking-wider font-semibold backdrop-blur-md border border-[#fffaee]/20">
                    {tag}
                  </div>
                )}
                {/* Subtle inner hairline */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-[#420002]/10" />
              </div>
            </motion.div>
          );
        })}

        {/* ── Cinematic Transition to White/Ivory Screen ── */}
        <motion.div
          style={{ opacity: whiteScreenOpacity }}
          className="absolute inset-0 bg-[#fffaee] pointer-events-none z-30 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center text-center px-6 max-w-md">
            <span className="text-[11px] text-[#c82127] mb-2">✦</span>
            <p className="font-serif-brand italic text-2xl sm:text-3xl text-[#420002] leading-tight">
              “Every jewel is a conversation between past and present.”
            </p>
            <div className="w-12 h-[1.5px] bg-[#c82127] my-3 rounded-full" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#420002]/60 font-semibold font-sans">
              Jaipur Heirloom Archives
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
