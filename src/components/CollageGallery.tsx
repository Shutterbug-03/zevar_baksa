"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BentoCard {
  src: string;
  alt: string;
  aspect: string;
}

const topLayer: BentoCard[] = [
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07871.JPG",
    alt: "Handcrafted Meenakari Chandbali Shoot",
    aspect: "aspect-[4/3.8]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07714.JPG",
    alt: "Signature Royal Gold Haar Shoot",
    aspect: "aspect-[4/3.8]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/real-shot-8.jpg",
    alt: "Royal Poshak Muse Shoot",
    aspect: "aspect-[4/3.8]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/real-shot-4.jpg",
    alt: "Editorial Kundan Set Shoot",
    aspect: "aspect-[4/3.8]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/products/e2-1.jpg",
    alt: "Handcrafted Miniature Art Drop Earrings on Deep Red Enamel",
    aspect: "aspect-[4/3.8]",
  },
];

const bottomLayer: BentoCard[] = [
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07812.JPG",
    alt: "Grand Royal Bridal Suite Shoot",
    aspect: "aspect-[16/9.5]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07753.JPG",
    alt: "Kiln-Fired Floral Enamel Choker Shoot",
    aspect: "aspect-[16/9.5]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/products/e1-1.jpg",
    alt: "Handcrafted Bird Motif Drop Earrings on Pink Enamel",
    aspect: "aspect-[16/9.5]",
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
                className="group relative aspect-[4/3.8] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#f4eee1] border border-[#420002]/15 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500"
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Layer 2: 3 Wide Images on Bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {bottomLayer.map((card, idx) => (
              <div
                key={`bottom-${idx}`}
                className="group relative aspect-[16/9.5] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#f4eee1] border border-[#420002]/15 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500"
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
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
