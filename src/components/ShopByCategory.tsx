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
    <section className="relative w-full bg-[#1A0307] py-20 sm:py-28 md:py-36 overflow-hidden flex flex-col justify-center font-sans">
      {/* Authentic Red Damask Heritage Pattern Background (Image 2) */}
      <img
        src="/images/about-bg.jpg"
        alt="Zevar Baksa Heritage Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-90"
      />
      {/* Warm Ambient Shading Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/55 pointer-events-none" />

      {/* Seamless Blend Gradients */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#1A0307] via-[#1A0307]/70 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#1A0307]/70 to-[#1A0307] pointer-events-none z-10" />

      <div className="relative z-20 mx-auto w-full max-w-[1500px] px-5 sm:px-8 md:px-16">
        
        {/* Section Header with Authentic Royal Filigree Lockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-amber-300/25">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-amber-300">✦</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-300 font-semibold font-sans">
                Curated Jaipur Archive
              </span>
              <span className="text-[10px] text-amber-300">✦</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FAF7F2] leading-none drop-shadow-md">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2.5 rounded-full border border-amber-300/40 bg-[#2B050B]/90 px-6 sm:px-7 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FAF7F2] backdrop-blur-md shadow-lg transition-all duration-300 hover:border-amber-300 hover:bg-[#450A14] hover:shadow-[0_0_20px_rgba(252,211,77,0.3)] active:scale-95 self-start md:self-auto"
          >
            <span>Explore Entire Atelier</span>
            <ArrowRight className="h-3.5 w-3.5 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Authentic Royal Directory Tabs */}
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto py-6 sm:py-8 no-scrollbar select-none border-b border-amber-300/15">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex-shrink-0 pb-2 text-xs sm:text-[13px] uppercase tracking-[0.22em] font-sans font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-amber-300 font-semibold drop-shadow-[0_0_8px_rgba(252,211,77,0.4)]"
                    : "text-amber-200/70 hover:text-amber-100"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_8px_rgba(252,211,77,0.6)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Royal Jharokha (Arch) Atelier Showcase Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7 mt-8">
          {filteredCategories.map((cat) => (
            <Link
              key={cat.id}
              href="/shop"
              className="group relative flex flex-col rounded-t-[3rem] sm:rounded-t-[3.5rem] rounded-b-2xl overflow-hidden border border-amber-300/30 bg-gradient-to-b from-[#2B050B]/90 via-black/60 to-black/90 shadow-[0_12px_35px_rgba(0,0,0,0.65)] backdrop-blur-sm transition-all duration-500 hover:border-amber-300/70 hover:shadow-[0_18px_45px_rgba(252,211,77,0.25)] hover:-translate-y-1.5"
            >
              {/* Image Container with Palace Arch Silhouette */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-[3rem] sm:rounded-t-[3.5rem] bg-black/60">
                <img
                  src={cat.img}
                  alt={cat.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />
                
                {/* Multi-layered Shading & Vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/25 pointer-events-none" />

                {/* Inner Gold Filigree Inlay Frame */}
                <div className="absolute inset-2 sm:inset-2.5 rounded-t-[2.7rem] sm:rounded-t-[3.2rem] rounded-b-xl border border-amber-300/20 group-hover:border-amber-300/50 transition-colors duration-500 pointer-events-none" />

                {/* Bottom Card Copy & Glowing Monogram Arrow */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between">
                  <div>
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-amber-300/90 font-sans font-medium mb-1 flex items-center gap-1.5">
                      <span>✦</span> {cat.hallmark}
                    </p>
                    <h3 className="font-display text-lg sm:text-xl md:text-[1.35rem] text-[#FAF7F2] leading-tight drop-shadow-md">
                      {cat.label}
                    </h3>
                  </div>

                  <span className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-amber-300/40 bg-[#2B050B]/90 text-amber-200 backdrop-blur-md opacity-90 group-hover:opacity-100 group-hover:bg-amber-300 group-hover:text-[#1A0307] group-hover:shadow-[0_0_15px_rgba(252,211,77,0.5)] transition-all duration-300 flex-shrink-0">
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
