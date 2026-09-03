"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CollageCard {
  src: string;
  alt: string;
  title: string;
  category: string;
  aspect: string;
}

const row1: CollageCard[] = [
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/real-shot-1.jpg",
    alt: "Meenakari Royal Choker Detail",
    title: "Mina Bagh Choker",
    category: "Choker Haar",
    aspect: "w-[160px] sm:w-[200px] md:w-[230px] aspect-[4/3]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/editorial-1.jpg",
    alt: "Royal Bridal Model Editorial",
    title: "Imperial Trousseau",
    category: "Bridal Suite",
    aspect: "w-[150px] sm:w-[190px] md:w-[220px] aspect-[3/4]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07871.JPG",
    alt: "Handcrafted Meenakari Chandbali",
    title: "Meenakari Chandbali",
    category: "Earrings",
    aspect: "w-[140px] sm:w-[180px] md:w-[200px] aspect-square",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/real-shot-4.jpg",
    alt: "Editorial Model in Kundan Set",
    title: "Jaipur Jhumka",
    category: "Earrings",
    aspect: "w-[150px] sm:w-[190px] md:w-[220px] aspect-[3/4]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07736.JPG",
    alt: "Jaipur Filigree Kada Bracelet",
    title: "Filigree Kada",
    category: "Bangles",
    aspect: "w-[160px] sm:w-[200px] md:w-[230px] aspect-[4/3]",
  },
];

const row2: CollageCard[] = [
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07753.JPG",
    alt: "Kiln Fired Floral Enamel Choker",
    title: "Gulab Bagh Choker",
    category: "Meenakari",
    aspect: "w-[160px] sm:w-[200px] md:w-[230px] aspect-[4/3]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/about-editorial.jpg",
    alt: "Johri Bazar Atelier Model",
    title: "Johri Bazar Muse",
    category: "Atelier Couture",
    aspect: "w-[160px] sm:w-[200px] md:w-[240px] aspect-[3/4]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/real-shot-2.jpg",
    alt: "Model Wearing Jaipur Chandbali",
    title: "Royal Chandbali & Haar",
    category: "Neckwear",
    aspect: "w-[150px] sm:w-[190px] md:w-[220px] aspect-[3/4]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/real-shot-7.jpg",
    alt: "Model in Starlight Heritage Haar",
    title: "Starlight Heritage Haar",
    category: "Haar",
    aspect: "w-[150px] sm:w-[190px] md:w-[220px] aspect-[3/4]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07812.JPG",
    alt: "Grand Bridal Suite Complete Set",
    title: "Royal Bridal Suite",
    category: "Bridal Suite",
    aspect: "w-[160px] sm:w-[200px] md:w-[230px] aspect-[4/3]",
  },
];

const row3: CollageCard[] = [
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/craft.jpg",
    alt: "Master Karigar Handcrafting Silver",
    title: "Jaipur Atelier Roots",
    category: "Artisan Craft",
    aspect: "w-[160px] sm:w-[200px] md:w-[230px] aspect-[4/3]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07817.JPG",
    alt: "Bridal Model Neckpiece Close-Up",
    title: "Devotion Haar",
    category: "Haar",
    aspect: "w-[150px] sm:w-[190px] md:w-[220px] aspect-[3/4]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/real-shot-3.jpg",
    alt: "Jaipur Enamel Palette and Stones",
    title: "Raw Mineral Enamel",
    category: "Atelier Roots",
    aspect: "w-[140px] sm:w-[180px] md:w-[200px] aspect-square",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/real-shot-8.jpg",
    alt: "Model in Traditional Rajasthani Poshak & Jewels",
    title: "Royal Poshak Muse",
    category: "Editorial",
    aspect: "w-[150px] sm:w-[190px] md:w-[220px] aspect-[3/4]",
  },
  {
    src: "https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/shoots/DSC07714.JPG",
    alt: "Signature Model Shoot in Gold Haar",
    title: "Mina Bagh Royal Haar",
    category: "Signature",
    aspect: "w-[160px] sm:w-[200px] md:w-[230px] aspect-[4/3]",
  },
];

export function CollageGallery() {
  return (
    <section className="relative w-full bg-[#fffaee] pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-hidden font-sans">
      
      {/* Ambient center luxury glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#c82127]/[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12">

        {/* Brand Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-[#c82127] font-semibold font-body mb-1">
            Visual Archives
          </p>

          {/* Ornamental Brand Accent */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 my-1 sm:my-1.5">
            <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-[#c82127]/60" />
            <div className="h-[2px] w-14 sm:w-16 bg-gradient-to-r from-[#420002] via-[#c82127] to-[#420002] rounded-full" />
            <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-[#c82127]/60" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#420002] leading-tight">
            Devotion Fired in Metal. <br className="hidden sm:block" />
            <span className="font-serif-brand italic font-normal text-[#c82127]">
              Worn for Every Milestone.
            </span>
          </h2>

          <p className="text-xs sm:text-[13px] text-[#420002]/70 font-sans font-light leading-relaxed max-w-sm mx-auto mt-2.5">
            From raw silver sculpting to kiln-fired Meenakari enamel and contemporary heirloom portraiture.
          </p>
        </div>

        {/* ── Clean 3-Layer Luxury Gallery Mosaic ── */}
        <div className="flex flex-col gap-3.5 sm:gap-4 md:gap-5 items-center">

          {/* Layer 1 */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full">
            {row1.map((card, idx) => (
              <div
                key={`r1-${idx}`}
                className={`group relative ${card.aspect} shrink-0 rounded-2xl overflow-hidden bg-[#f4eee1] border border-[#420002]/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#420002]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Floating Tag */}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#fffaee]/90 text-[#420002] text-[7.5px] sm:text-[8px] font-semibold uppercase tracking-wider backdrop-blur-sm border border-[#420002]/10 shadow-xs">
                  {card.category}
                </span>

                {/* Bottom Caption on Hover */}
                <div className="absolute bottom-2.5 inset-x-2.5 text-[#fffaee] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1.5 group-hover:translate-y-0">
                  <p className="font-display text-[11px] sm:text-xs text-[#fffaee] leading-tight truncate">{card.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Layer 2 */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full">
            {row2.map((card, idx) => (
              <div
                key={`r2-${idx}`}
                className={`group relative ${card.aspect} shrink-0 rounded-2xl overflow-hidden bg-[#f4eee1] border border-[#420002]/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#420002]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Floating Tag */}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#fffaee]/90 text-[#420002] text-[7.5px] sm:text-[8px] font-semibold uppercase tracking-wider backdrop-blur-sm border border-[#420002]/10 shadow-xs">
                  {card.category}
                </span>

                {/* Bottom Caption on Hover */}
                <div className="absolute bottom-2.5 inset-x-2.5 text-[#fffaee] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1.5 group-hover:translate-y-0">
                  <p className="font-display text-[11px] sm:text-xs text-[#fffaee] leading-tight truncate">{card.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Layer 3 */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full">
            {row3.map((card, idx) => (
              <div
                key={`r3-${idx}`}
                className={`group relative ${card.aspect} shrink-0 rounded-2xl overflow-hidden bg-[#f4eee1] border border-[#420002]/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500`}
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#420002]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Floating Tag */}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#fffaee]/90 text-[#420002] text-[7.5px] sm:text-[8px] font-semibold uppercase tracking-wider backdrop-blur-sm border border-[#420002]/10 shadow-xs">
                  {card.category}
                </span>

                {/* Bottom Caption on Hover */}
                <div className="absolute bottom-2.5 inset-x-2.5 text-[#fffaee] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1.5 group-hover:translate-y-0">
                  <p className="font-display text-[11px] sm:text-xs text-[#fffaee] leading-tight truncate">{card.title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Gallery CTA */}
        <div className="mt-12 sm:mt-14 text-center flex justify-center items-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 bg-[#420002] text-[#fffaee] px-7 sm:px-8 py-3 rounded-full text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] font-sans font-semibold hover:bg-[#c82127] transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore Entire Collection</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#fffaee] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
