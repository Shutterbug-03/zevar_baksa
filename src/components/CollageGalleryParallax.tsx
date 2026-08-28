"use client";

import React from "react";
import { ZoomParallax, type ParallaxImage } from "@/components/ui/zoom-parallax";

const collageImages: ParallaxImage[] = [
  {
    // 1. Center Zoom Hero (Model Shoot Portrait)
    src: "/images/shoots/DSC07714.JPG",
    alt: "Zevar Baksa Model Wearing Signature Gold Haar",
    tag: "Signature Heirloom",
  },
  {
    // 2. Top-Right (Full Bridal Model Shoot)
    src: "/images/shoots/DSC07812.JPG",
    alt: "Bridal Couture Model Shoot",
    tag: "Bridal Trousseau",
  },
  {
    // 3. Mid-Left (Product Close-Up)
    src: "/images/shoots/DSC07871.JPG",
    alt: "Royal Meenakari Chandbali Earring",
    tag: "Meenakari Chandbali",
  },
  {
    // 4. Mid-Right (Model Portrait Close-Up)
    src: "/images/shoots/DSC07817.JPG",
    alt: "Model Wearing Royal Haar Set",
    tag: "Royal Haar",
  },
  {
    // 5. Bottom-Left (Product Close-Up)
    src: "/images/shoots/DSC07753.JPG",
    alt: "Fired Enamel Royal Choker Haar",
    tag: "Kiln Fired Choker",
  },
  {
    // 6. Bottom-Right (Editorial Model Shoot)
    src: "/images/about-editorial.jpg",
    alt: "Editorial Couture Model Wearing Meenakari",
    tag: "Jaipur Atelier",
  },
  {
    // 7. Accent Top-Left (Product Close-Up)
    src: "/images/shoots/DSC07736.JPG",
    alt: "Filigree Kada Bracelet Close-Up",
    tag: "Filigree Kada",
  },
];

export function CollageGalleryParallax() {
  return (
    <section className="relative w-full bg-[#fffaee] overflow-hidden font-sans">
      
      {/* Intro Header Section before Zoom Collage Scroll */}
      <div className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 text-center max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-2.5">
          <span className="text-[10px] text-[#c82127]">✦</span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#c82127] font-semibold">
            Visual Atelier Archives • 3-Layer Collage
          </span>
          <span className="text-[10px] text-[#c82127]">✦</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#420002] leading-tight">
          Devotion Fired in Metal. <br />
          <span className="font-serif-brand italic font-normal text-[#c82127]">
            Scroll to Experience the Craft.
          </span>
        </h2>

        {/* Ornamental Divider */}
        <div className="flex items-center justify-center gap-2.5 my-3.5 sm:my-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c82127]/60" />
          <div className="h-[2px] w-14 bg-gradient-to-r from-[#420002] via-[#c82127] to-[#420002] rounded-full" />
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c82127]/60" />
        </div>

        <p className="text-xs sm:text-[14px] text-[#420002]/75 font-sans font-light leading-relaxed max-w-lg mx-auto">
          From raw silver sculpting to kiln-fired Meenakari enamel and modern heirloom model portraiture.
        </p>
      </div>

      {/* Zoom Parallax Canvas (Zooms into photo and transitions to white screen before categories) */}
      <ZoomParallax images={collageImages} />

    </section>
  );
}
