"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryItem {
  id: string;
  label: string;
  subtitle: string;
  hallmark: string;
  img: string;
  tag: "all" | "neckwear" | "earrings" | "hands" | "bridal";
}

const categories: CategoryItem[] = [
  {
    id: "cat-1",
    label: "Royal Rings",
    subtitle: "Solitaires & Jaipur Bands",
    hallmark: "BIS 925 • 22K Vermeil",
    img: "/images/real-shot-1.jpg",
    tag: "hands",
  },
  {
    id: "cat-2",
    label: "Heritage Earrings",
    subtitle: "Chandbalis & Studs",
    hallmark: "Fired Meenakari Enamel",
    img: "/images/real-shot-2.jpg",
    tag: "earrings",
  },
  {
    id: "cat-3",
    label: "Statement Necklaces",
    subtitle: "Chokers & Royal Haars",
    hallmark: "Solid 925 Silver Base",
    img: "/images/real-shot-3.jpg",
    tag: "neckwear",
  },
  {
    id: "cat-4",
    label: "Kadas & Bracelets",
    subtitle: "Carved Filigree Cuffs",
    hallmark: "Ergonomic Comfort Fit",
    img: "/images/real-shot-4.jpg",
    tag: "hands",
  },
  {
    id: "cat-5",
    label: "Bridal Chokers",
    subtitle: "Festive & Wedding Trousseau",
    hallmark: "750°C Kiln Fired Enamel",
    img: "/images/real-shot-5.jpg",
    tag: "bridal",
  },
  {
    id: "cat-6",
    label: "Meenakari Jhumkas",
    subtitle: "Jaipur Palace Heritage",
    hallmark: "Artisan Hand-Shaped",
    img: "/images/real-shot-6.jpg",
    tag: "earrings",
  },
  {
    id: "cat-7",
    label: "Bridal Trousseau",
    subtitle: "Complete Heirloom Sets",
    hallmark: "Collector Limited Run",
    img: "/images/real-shot-7.jpg",
    tag: "bridal",
  },
  {
    id: "cat-8",
    label: "Statement Cuffs",
    subtitle: "Sculpted Silver Masterpieces",
    hallmark: "Nickel-Free & Hypoallergenic",
    img: "/images/real-shot-8.jpg",
    tag: "hands",
  },
];

const filterTabs = [
  { key: "all", label: "All Heirlooms" },
  { key: "neckwear", label: "Necklaces & Chokers" },
  { key: "earrings", label: "Earrings & Jhumkas" },
  { key: "hands", label: "Rings & Bangles" },
  { key: "bridal", label: "Bridal Trousseau" },
] as const;

export function ShopByCategory() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredCategories =
    activeTab === "all"
      ? categories
      : categories.filter((c) => c.tag === activeTab);

  return (
    <section className="relative w-full bg-[#fffaee] py-20 sm:py-28 md:py-36 overflow-hidden flex flex-col justify-center font-sans border-b border-[#420002]/10">

      <div className="relative z-20 mx-auto max-w-[1500px] px-5 sm:px-8 md:px-16 w-full">
        
        {/* Header Title Lockup */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[10px] text-[#c82127]">✦</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#c82127] font-semibold font-sans">
              Jaipur Heirloom Archives
            </span>
            <span className="text-[10px] text-[#c82127]">✦</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] text-[#420002] font-normal leading-tight">
            Shop by Category
          </h2>

          {/* Delicate Ornamental Line */}
          <div className="flex items-center justify-center gap-2.5 my-3 sm:my-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c82127]/60" />
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#420002] via-[#c82127] to-[#420002] rounded-full" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c82127]/60" />
          </div>

          <p className="text-[13px] sm:text-[14.5px] text-[#420002]/75 font-sans font-light leading-relaxed">
            Handcrafted with solid 925 sterling silver, 22K gold vermeil, and permanent kiln-fired Meenakari enamel.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12 sm:mb-16">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-sans font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#c82127] text-[#fffaee] shadow-sm scale-105"
                    : "bg-[#f4eee1] text-[#420002]/80 border border-[#420002]/10 hover:border-[#c82127]/40 hover:text-[#420002]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredCategories.map((item) => (
            <Link
              key={item.id}
              href={`/shop?category=${item.tag}`}
              className="group relative rounded-2xl overflow-hidden bg-[#ffffff] border border-[#420002]/10 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image Container with Jharokha Framing */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4eee1]">
                <img
                  src={item.img}
                  alt={item.label}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#420002]/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Hallmark Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#fffaee]/90 text-[#420002] border border-[#420002]/10 text-[8.5px] uppercase tracking-wider font-semibold shadow-sm backdrop-blur-sm">
                  {item.hallmark}
                </div>

                {/* Bottom Overlay Label inside image */}
                <div className="absolute bottom-4 inset-x-4 text-left">
                  <h3 className="font-display text-xl sm:text-2xl text-[#fffaee] group-hover:text-[#fffaee] transition-colors drop-shadow-sm">
                    {item.label}
                  </h3>
                  <p className="text-[11.5px] text-[#fffaee]/80 font-sans font-light mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Quick Action Bar */}
              <div className="p-3.5 bg-[#ffffff] flex items-center justify-between text-[#420002] border-t border-[#420002]/5">
                <span className="text-[10px] uppercase tracking-[0.22em] font-sans font-semibold text-[#420002]/80 group-hover:text-[#c82127] transition-colors">
                  Explore Designs
                </span>
                <div className="h-6 w-6 rounded-full bg-[#f4eee1] text-[#420002] group-hover:bg-[#c82127] group-hover:text-[#fffaee] flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Global Catalog Link Button */}
        <div className="mt-14 sm:mt-18 text-center flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2.5 bg-[#420002] text-[#fffaee] px-8 sm:px-10 py-3.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-sans font-semibold hover:bg-[#c82127] transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>View Full Jaipur Catalog</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#fffaee] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
