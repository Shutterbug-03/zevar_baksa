"use client";

import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useState } from "react";

const categories = ["All", "Necklaces", "Earrings", "Bracelets", "Bridal"];

export default function Shop() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <Layout>
      {/* Header Banner */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-[#fffaee] border-b border-[#420002]/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <span className="text-[10px] text-[#c82127]">✦</span>
            <p className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.35em] text-[#c82127] font-semibold font-body">
              The Baksa Vault
            </p>
            <span className="text-[10px] text-[#c82127]">✦</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#420002] leading-[1.05]">
            Shop <span className="font-serif-brand italic font-normal text-[#c82127]">All Masterpieces.</span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-[#420002]/70 font-sans font-light max-w-lg">
            Solid 925 silver, 22K gold vermeil, and 750°C permanent Meenakari enamel, hallmarked with BIS purity.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2.5 justify-center md:justify-start">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-body font-semibold transition-all duration-300 shadow-xs cursor-pointer ${
                  cat === c
                    ? "bg-[#420002] text-[#fffaee] border border-[#420002] shadow-sm"
                    : "bg-[#ffffff] text-[#420002]/80 border border-[#420002]/15 hover:border-[#c82127] hover:text-[#c82127]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-[#fffaee] min-h-[60vh] mx-auto w-full px-6 md:px-12 py-14 md:py-20 border-b border-[#420002]/10">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-24 text-[#420002]/60 font-sans text-sm">
              Nothing here yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
