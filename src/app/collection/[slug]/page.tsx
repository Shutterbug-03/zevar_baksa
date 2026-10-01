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
          1. ELEGANT EDITORIAL HERO WITH CENTER-ALIGNED BG
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[92vh] md:min-h-screen overflow-hidden bg-[#0c0204] flex items-center justify-center">
        {/* Full-Bleed Center-Aligned Hero Image */}
        <img
          src={collection.heroImage}
          alt={collection.heroTitle}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Cinematic Vignette Overlay: ambient shading for crisp, luxury typography */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.72)_75%,rgba(0,0,0,0.92)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/90 pointer-events-none" />

        {/* Hero Narrative Container - Perfectly Centered */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 sm:px-10 md:px-14 py-28 sm:py-36 md:py-40 space-y-6 sm:space-y-7">
          
          {/* Title & Gold Accent Line */}
          <div className="flex flex-col items-center space-y-4">
            <h1 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-[#fffaee] tracking-[0.16em] font-normal leading-none drop-shadow-md">
              {collection.heroTitle}
            </h1>
            <div className="w-12 sm:w-14 h-[1.5px] bg-[#d4af37]" />
          </div>

          {/* Opening Paragraph */}
          <p className="text-[11px] sm:text-[12px] md:text-[13px] lowercase tracking-[0.18em] text-[#fffaee]/90 font-sans leading-[1.85] max-w-2xl mx-auto drop-shadow-xs">
            meenakari is the art of placing colour onto metal and making it permanent. fired at 750°c, each piece is a collaboration between centuries of jaipur tradition and modern design.
          </p>

          {/* History / Origin Paragraph */}
          <p className="text-[11px] sm:text-[12px] md:text-[13px] lowercase tracking-[0.18em] text-[#fffaee]/90 font-sans leading-[1.85] max-w-2xl mx-auto drop-shadow-xs">
            the name comes from the persian &apos;mina&apos;, meaning paradise. the craft travelled from persia into the mughal court, and from there to jaipur, where it found the hands that would keep it alive for centuries. a single piece passes through many artisans before it is finished, each adding what the last could not, then fired at close to 750°c — fused to metal by heat that forgives nothing.
          </p>

          {/* Karigar & Founder Line */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11px] sm:text-[12px] md:text-[12.5px] tracking-[0.22em] font-sans text-[#fffaee]">
            <span className="font-medium uppercase text-[#fffaee]">DEEPAK SANKIT</span>
            <span className="font-serif-brand italic font-normal text-amber-200/90 lowercase tracking-normal">— master karigar &amp; designer</span>
            <span className="text-amber-200/50 mx-1">·</span>
            <span className="font-medium uppercase text-[#fffaee]">TANISHKA</span>
            <span className="font-serif-brand italic font-normal text-amber-200/90 lowercase tracking-normal">— founder&apos;s devotion</span>
          </div>

          {/* Heritage Quote */}
          <div className="max-w-xl sm:max-w-2xl pt-2">
            <p className="font-serif-brand italic text-[13px] sm:text-[14px] md:text-[14.5px] text-[#fffaee]/90 leading-relaxed tracking-wide drop-shadow-xs">
              &ldquo;a woman chooses to wear what another woman once wore. she does not inherit it passively, she chooses it again, the way deepak chooses the bench each morning. the thread survives because someone, generation after generation, decides to pick it up. not a craft to be sold quickly, but one to be understood, and then worn.&rdquo;
            </p>
          </div>

          {/* Hallmarks Badges */}
          <div className="pt-2 sm:pt-3">
            <p className="text-[9.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-sans font-medium drop-shadow-xs">
              750°C KILN-FIRED ENAMEL &nbsp;·&nbsp; SOLID 925 &amp; 22K GOLD VERMEIL &nbsp;·&nbsp; BIS HALLMARKED PURITY
            </p>
          </div>

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
