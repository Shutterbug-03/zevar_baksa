"use client";

import { useEffect } from "react";
import { Img } from "@/components/Img";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { collections } from "@/data/collections";
import { useProductStore } from "@/store/productStore";
import { ProductCard } from "@/components/ProductCard";
export default function CollectionClient({ slug }: { slug: string }) {
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
        {/* Full-Bleed Center-Aligned Hero Image — Fully Visible with Subtle Cinematic Blur */}
        <Img
          src={collection.heroImage}
          sizes="100vw"
          priority
          alt={collection.heroTitle}
          style={{ filter: "blur(2.5px)" }}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 pointer-events-none select-none transition-opacity duration-700"
        />

        {/* Ambient Luxury Scrim: Keeps the background image fully visible & vibrant while ensuring razor-sharp text readability */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75 pointer-events-none" />

        {/* Hero Narrative Container - Perfectly Centered */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-24 sm:py-32 md:py-36 space-y-6 sm:space-y-7">
          
          {/* Title & Gold Accent Line */}
          <div className="flex flex-col items-center space-y-4">
            <h1 className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-[#fffaee] tracking-[0.16em] font-normal leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {collection.heroTitle}
            </h1>
            <div className="w-12 sm:w-14 h-[1.5px] bg-[#d4af37] shadow-[0_1px_4px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Narrative Text Paragraphs — Wider Layout with Less Side Padding */}
          <div className="space-y-3.5 sm:space-y-4 text-[12.5px] sm:text-[13.5px] md:text-[14px] text-[#fffaee] font-sans font-light leading-[1.7] sm:leading-[1.75] max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <p>
              Meenakari is the art of placing colour onto metal and making it permanent. The name comes from the Persian mina, meaning paradise, and the craft travelled from Persia into the Mughal court, and from there to Jaipur, where it found the hands that would keep it alive for centuries to come.
            </p>
            <p>
              A single piece passes through many artisans before it is finished, each one adding what the last could not, then fired at close to 750°C, fused to metal by heat that forgives nothing.
            </p>
            <p>
              Deepak Sankit (Designer/Artisan) was born into this craft. He continues the ritual and tradition seven generations of jewellers followed before him. He picks up the same tools which once made jewellery for the royals and now carries the family&apos;s legacy forward.
            </p>
            <p>
              For Tanishka (Founder), Meenakari has always stood apart: a craft where colour becomes permanent, where patience is shown in places one thinks not to look. It was the kind of artistry she wanted the brand built around from the start. Not decoration, but devotion, fired into metal.
            </p>
            <p>
              The collection is meant to be timeless, something to be passed down to generations, something they choose. It is meant to be chosen everyday, the same way Deepak chooses to sit on the bench his predecessors sat at. The thread does not survive because it was handed down. It survives because someone, generation after generation, decides to pick it up.
            </p>
            <p>
              It&apos;s a craft to sit with, to be indulged in.
            </p>
          </div>

          {/* Hallmarks Badges */}
          <div className="pt-2 sm:pt-3">
            <p className="text-[9.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-[#d4af37] font-sans font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
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
