"use client";

import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useProductStore } from "@/store/productStore";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const categories = ["All", "Necklaces", "Earrings", "Bracelets", "Bridal"];

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-2xl bg-[#420002]/10 mb-3" />
      <div className="h-3 w-3/4 rounded-full bg-[#420002]/8 mb-1.5" />
      <div className="h-3 w-1/2 rounded-full bg-[#420002]/8" />
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { products, status, fetchProducts } = useProductStore();

  const resolveCategory = (param: string | null) => {
    if (!param) return "All";
    const match = categories.find(
      (c) => c.toLowerCase() === param.toLowerCase()
    );
    if (match) return match;
    if (param.toLowerCase() === "pendants") return "Necklaces";
    return "All";
  };

  const [cat, setCat] = useState<string>(() => resolveCategory(categoryParam));
  const [sortOrder, setSortOrder] = useState<string>("relevance");

  // Trigger API fetch on mount (idempotent — no-ops if already loaded)
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCat(resolveCategory(categoryParam));
  }, [categoryParam]);

  let filtered = cat === "All" ? products : products.filter((p) => p.category === cat);
  
  if (sortOrder === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const isLoading = status === "loading";

  return (
    <>
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

          {/* Filter Pills and Sort */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
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

            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent text-[#420002] border border-[#420002]/20 rounded-full px-4 py-2.5 text-[10px] sm:text-xs uppercase tracking-[0.1em] font-body font-semibold outline-none focus:border-[#c82127] cursor-pointer appearance-none transition-colors"
                style={{
                  backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23420002%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem top 50%",
                  backgroundSize: "0.65rem auto",
                  paddingRight: "2.5rem"
                }}
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-[#fffaee] min-h-[60vh] mx-auto w-full px-6 md:px-12 py-14 md:py-20 border-b border-[#420002]/10">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          {!isLoading && filtered.length === 0 && (
            <p className="text-center py-24 text-[#420002]/60 font-sans text-sm">
              Nothing here yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default function Shop() {
  return (
    <Layout>
      <Suspense fallback={<div className="min-h-screen bg-[#fffaee]" />}>
        <ShopContent />
      </Suspense>
    </Layout>
  );
}
