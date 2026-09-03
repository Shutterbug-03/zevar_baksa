"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { collections } from "@/data/collections";
import { useProductStore } from "@/store/productStore";
import { ProductCard } from "@/components/ProductCard";
export default function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[70vh] bg-[#fffaee] text-[#420002] px-6">
          <div className="text-center max-w-md">
            <h1 className="font-display text-4xl text-[#420002] mb-4">
              Collection Not Found
            </h1>
            <p className="text-xs sm:text-sm text-[#420002]/70 font-sans mb-8">
              The archive edition you are searching for is resting in our Jaipur atelier vaults.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#420002] px-7 py-3 text-[10px] uppercase tracking-[0.25em] font-body font-semibold text-[#fffaee] hover:bg-[#c82127] transition-all"
            >
              <ArrowLeft className="h-3 w-3 text-[#fffaee]" /> Explore All Pieces
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const story = collection.story;

  return (
    <Layout>
      {/* ════════════════════════════════════════════════════
          1. ELEGANT EDITORIAL HERO WITH FULL NARRATIVE TEXT
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] md:min-h-[90vh] overflow-hidden bg-[#140205] flex flex-col justify-end">
        {/* Full-Bleed Hero Image */}
        <img
          src={collection.heroImage}
          alt={collection.heroTitle}
          className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-85 pointer-events-none select-none"
        />

        {/* Ambient Gradient Shading for Crisp Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none" />

        {/* Hero Narrative Container */}
        <div className="relative z-20 flex flex-col items-center justify-end h-full pt-32 pb-14 sm:pb-18 md:pb-20 px-6 sm:px-10 md:px-14 text-center max-w-3xl mx-auto space-y-4">
          
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-amber-200/90 font-sans font-medium">
            Jaipur Atelier Archive
          </p>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#fffaee] leading-[1.02] tracking-tight">
            {collection.heroTitle}
          </h1>

          {/* Hairline Accent */}
          <div className="w-12 h-px bg-amber-200/60 my-1" />

          {/* Collection Narrative Story */}
          <div className="space-y-2 max-w-2xl">
            <p className="text-sm sm:text-base text-amber-100 font-sans font-light leading-relaxed">
              {collection.heroSubtitle}
            </p>
            {story?.meenakariHistory && (
              <p className="text-xs sm:text-[13.5px] text-[#fffaee]/80 font-sans font-light leading-relaxed">
                {story.meenakariHistory}
              </p>
            )}
          </div>

          {/* Artisan & Founder Attributions */}
          {story && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-amber-100/90 font-sans pt-1">
              <span>
                <strong className="font-medium text-[#fffaee]">Deepak Sankit</strong> — Master Karigar & Designer
              </span>
              <span className="hidden sm:inline text-amber-300/60">•</span>
              <span>
                <strong className="font-medium text-[#fffaee]">Tanishka</strong> — Founder&apos;s Devotion
              </span>
            </div>
          )}

          {/* Philosophy Line */}
          {story?.philosophy && (
            <p className="font-serif-brand italic text-sm sm:text-base text-amber-200/90 max-w-lg pt-1">
              &ldquo;{story.philosophy}&rdquo;
            </p>
          )}

          {/* Hallmarks Line */}
          <p className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] text-amber-200/70 font-sans pt-1">
            750°C Kiln-Fired Enamel • Solid 925 & 22K Gold Vermeil • BIS Hallmarked Purity
          </p>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. MINIMALIST MASTERPIECE CATALOG
      ════════════════════════════════════════════════════ */}
      <section className="bg-[#fffaee] py-16 sm:py-20 md:py-24 font-sans border-b border-[#420002]/10">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 md:px-14 space-y-10 sm:space-y-12">
          
          {/* Subtle Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#420002]/10 pb-4">
            <h2 className="font-display text-2xl sm:text-3xl text-[#420002]">
              Pieces in Collection
            </h2>
            <span className="text-xs text-[#420002]/60 font-sans">
              {collection.items.length} creations
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {collection.items.map((item) => {
              const fullProduct = products.find((p) => p.id === item.id);
              if (!fullProduct) return null;
              return <ProductCard key={fullProduct.id} product={fullProduct} />;
            })}
          </div>

        </div>
      </section>
    </Layout>
  );
}
