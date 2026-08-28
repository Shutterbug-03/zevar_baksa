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
    <section className="relative w-full bg-[#fffaee] py-20 sm:py-28 overflow-hidden flex flex-col justify-center font-sans border-b border-[#420002]/10">
      <div className="relative z-20 mx-auto w-full max-w-[1500px] px-6 sm:px-10 md:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#420002]/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-[#c82127]">✦</span>
              <span className="text-[9.5px] uppercase tracking-[0.3em] text-[#c82127] font-semibold font-sans">
                Curated Collections
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#420002] leading-none">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#c82127] hover:text-[#420002] transition-colors self-start md:self-auto py-2"
          >
            <span>Explore Entire Archive</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Minimal Directory Tabs */}
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto py-5 sm:py-6 no-scrollbar select-none border-b border-[#420002]/10">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex-shrink-0 pb-2 text-xs sm:text-[13px] uppercase tracking-[0.22em] font-sans font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-[#c82127] font-semibold"
                    : "text-[#420002]/60 hover:text-[#420002]"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#c82127]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Minimal Luxury Category Showcase Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7 mt-8">
          {filteredCategories.map((cat) => (
            <Link
              key={cat.id}
              href="/shop"
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#420002]/15 bg-[#fffaee] shadow-sm transition-all duration-500 hover:border-[#c82127] hover:shadow-md hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#f4eee1]">
                <img
                  src={cat.img}
                  alt={cat.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Clean Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#420002]/90 via-[#420002]/20 to-transparent pointer-events-none" />

                {/* Bottom Card Copy */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between">
                  <div>
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#fffaee]/80 font-sans font-medium mb-1">
                      {cat.hallmark}
                    </p>
                    <h3 className="font-display text-lg sm:text-xl md:text-[1.3rem] text-[#fffaee] leading-tight drop-shadow-sm">
                      {cat.label}
                    </h3>
                  </div>

                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#c82127] text-[#fffaee] shadow-sm transition-all duration-300 group-hover:bg-[#a5181d] flex-shrink-0">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
