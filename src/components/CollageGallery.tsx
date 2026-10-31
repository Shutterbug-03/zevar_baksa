"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BentoCard {
  src: string;
  alt: string;
  aspect: string;
  position?: string;
}

const topLayer: BentoCard[] = [
  {
    src: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/landing-grid/grid-1.jpg",
    alt: "Handcrafted Three-Tier Hair Jewelry Chains",
    aspect: "aspect-[4/3.8]",
    position: "object-[center_22%]",
  },
  {
    src: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/landing-grid/grid-2.jpg",
    alt: "Handcrafted Bird Motif Pendant Close-up",
    aspect: "aspect-[4/3.8]",
    position: "object-[center_35%]",
  },
  {
    src: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/landing-grid/grid-3.jpg",
    alt: "Green Meenakari Floral Pendant on Pearl Strand",
    aspect: "aspect-[4/3.8]",
    position: "object-center",
  },
  {
    src: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/landing-grid/grid-4.jpg",
    alt: "Purple Enamel Drop Earrings on Sacred Leaf",
    aspect: "aspect-[4/3.8]",
    position: "object-center",
  },
  {
    src: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/landing-grid/grid-5.jpg",
    alt: "Sterling Silver and Blue Enamel Royal Choker and Earrings",
    aspect: "aspect-[4/3.8]",
    position: "object-[center_18%]",
  },
];

const bottomLayer: BentoCard[] = [
  {
    src: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/landing-grid/grid-6.jpg",
    alt: "Emerald Green Meenakari Statement Necklace",
    aspect: "aspect-[16/9.5]",
    position: "object-[center_30%]",
  },
  {
    src: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/landing-grid/grid-7.jpg",
    alt: "Zevar Baksa Signature Crimson Trunk with Handcrafted Jewels",
    aspect: "aspect-[16/9.5]",
    position: "object-center",
  },
  {
    src: "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/landing-grid/grid-8.jpg",
    alt: "Sterling Silver Turquoise Enamel Filigree Tassel Necklace",
    aspect: "aspect-[16/9.5]",
    position: "object-[center_35%]",
  },
];

export function CollageGallery() {
  return (
    <section className="relative w-full bg-[#fffaee] pt-16 sm:pt-24 md:pt-28 pb-12 sm:pb-16 overflow-hidden font-sans">
      {/* Ambient luxury center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#c82127]/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
        {/* ── 2-Layer Bento Mosaic Covering Full Area ── */}
        <div className="space-y-3.5 sm:space-y-4">
          {/* Layer 1: 5 Images on Top */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {topLayer.map((card, idx) => (
              <div
                key={`top-${idx}`}
                className="group relative aspect-[4/3.8] w-full overflow-hidden rounded-lg bg-[#f4eee1] shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500"
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className={`h-full w-full object-cover ${card.position || "object-center"} transition-transform duration-700 group-hover:scale-105`}
                />
              </div>
            ))}
          </div>

          {/* Layer 2: 3 Wide Images on Bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {bottomLayer.map((card, idx) => (
              <div
                key={`bottom-${idx}`}
                className="group relative aspect-[16/9.5] w-full overflow-hidden rounded-lg bg-[#f4eee1] shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500"
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className={`h-full w-full object-cover ${card.position || "object-center"} transition-transform duration-700 group-hover:scale-105`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gallery CTA */}
        <div className="mt-12 sm:mt-16 text-center flex justify-center items-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2.5 bg-[#420002] text-[#fffaee] px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] font-sans font-semibold hover:bg-[#c82127] transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore Entire Collection</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#fffaee] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
