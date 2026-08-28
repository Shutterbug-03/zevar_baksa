"use client";

import { use, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { collections } from "@/data/collections";
import type { CollectionItem, Collection } from "@/data/collections";

/* ─── Scroll-triggered fade-in hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

/* ═══════════════════════════════════════════
   1. HERO SECTION — Minimalist Editorial Banner
═══════════════════════════════════════════ */
function CollectionHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[88vh] overflow-hidden bg-[#fffaee] flex flex-col justify-end border-b border-[#420002]/10">
      {/* Background Hero Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-40 pointer-events-none select-none"
      />

      {/* Ambient Gradient Shading */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#fffaee] via-[#fffaee]/60 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-16 sm:pb-20 px-6 sm:px-10 text-center max-w-4xl mx-auto">
        
        {/* Kicker */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] text-[#c82127]">✦</span>
          <span className="text-[9.5px] uppercase tracking-[0.35em] text-[#c82127] font-semibold font-sans">
            Jaipur Signature Archive
          </span>
          <span className="text-[10px] text-[#c82127]">✦</span>
        </div>

        {/* Collection Title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#420002] leading-[1.02] mb-3">
          {title}
        </h1>

        <div className="w-16 h-[2px] bg-[#c82127] my-3" />

        {/* Subtitle */}
        <p className="text-[14px] sm:text-[16px] text-[#420002]/80 leading-[1.8] font-sans font-light max-w-2xl">
          {subtitle}
        </p>

        {/* Hallmarks Quick Row */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 text-[9.5px] uppercase tracking-[0.2em] font-sans text-[#420002]">
          <span className="px-4 py-1.5 rounded-full border border-[#420002]/15 bg-[#ffffff]">
            ✦ 750°C Kiln-Fired Enamel
          </span>
          <span className="px-4 py-1.5 rounded-full border border-[#420002]/15 bg-[#ffffff]">
            ✦ Solid 925 & 22K Gold Vermeil
          </span>
          <span className="px-4 py-1.5 rounded-full border border-[#420002]/15 bg-[#ffffff]">
            ✦ BIS Hallmarked Purity
          </span>
        </div>

        {/* Scroll Cue */}
        <div className="mt-8 flex flex-col items-center gap-2 animate-bounce opacity-70">
          <span className="text-[8.5px] uppercase tracking-[0.3em] text-[#420002]/60 font-sans">
            Explore Masterpieces
          </span>
          <div className="w-px h-6 bg-[#420002]/40" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2. HERITAGE STORY & CRAFT SPOTLIGHT SECTION
═══════════════════════════════════════════ */
function CollectionStorySection({ story }: { story: NonNullable<Collection['story']> }) {
  return (
    <section className="relative w-full bg-[#fffaee] py-20 sm:py-28 px-6 md:px-16 border-b border-[#420002]/10 overflow-hidden">
      <div className="relative z-20 max-w-[1300px] mx-auto space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-[10px] text-[#c82127]">✦</span>
            <span className="text-[9.5px] uppercase tracking-[0.35em] text-[#c82127] font-semibold font-sans">
              Jaipur Craft Lineage
            </span>
            <span className="text-[10px] text-[#c82127]">✦</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#420002] leading-tight">
            Meenakari: Paradise Fired at 750°C
          </h2>
          <div className="w-16 h-[2px] bg-[#c82127] mx-auto my-2" />
          <p className="text-[14px] sm:text-[15.5px] text-[#420002]/80 leading-[1.8] font-sans font-light pt-2">
            {story.meenakariHistory}
          </p>
        </div>

        {/* 2-Column: Master Karigar & Founder */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          
          <div className="p-7 sm:p-9 rounded-2xl bg-[#ffffff] border border-[#420002]/15 shadow-sm space-y-3">
            <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#c82127] font-semibold font-sans flex items-center gap-1.5">
              <span>✦</span> Master Karigar & Designer
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#420002]">Deepak Sankit</h3>
            <p className="text-xs sm:text-[13.5px] text-[#420002]/75 leading-[1.8] font-sans font-light">
              {story.artisanDesigner}
            </p>
          </div>

          <div className="p-7 sm:p-9 rounded-2xl bg-[#ffffff] border border-[#420002]/15 shadow-sm space-y-3">
            <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#c82127] font-semibold font-sans flex items-center gap-1.5">
              <span>✦</span> Founder&apos;s Devotion
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#420002]">Tanishka</h3>
            <p className="text-xs sm:text-[13.5px] text-[#420002]/75 leading-[1.8] font-sans font-light">
              {story.founderNote}
            </p>
          </div>
        </div>

        {/* Philosophy Banner */}
        <div className="text-center max-w-3xl mx-auto bg-[#420002] text-[#fffaee] p-8 sm:p-12 rounded-2xl shadow-sm">
          <p className="font-serif-brand text-xl sm:text-2xl md:text-3xl leading-relaxed italic font-light text-[#fffaee]">
            &ldquo;{story.philosophy}&rdquo;
          </p>
        </div>

        {/* Formats */}
        <div className="pt-4 border-t border-[#420002]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#420002] font-semibold font-sans mb-1">
              Crafted Formats
            </h4>
            <p className="text-xs text-[#420002]/70 font-sans font-light">
              Each edition is cast in solid precious metals with authentic hallmark certifications.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {story.makingFormats.map((fmt) => (
              <span
                key={fmt}
                className="px-4 py-2 rounded-full border border-[#420002]/15 bg-[#ffffff] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-[#420002]"
              >
                ✦ {fmt}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3. PRODUCT SHOWCASE — Alternating Editorial Panels
═══════════════════════════════════════════ */
function ProductShowcase({
  item,
  index,
}: {
  item: CollectionItem;
  index: number;
}) {
  const isReversed = index % 2 !== 0;
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`relative w-full bg-[#fffaee] py-14 sm:py-20 border-b border-[#420002]/10 overflow-hidden transition-all duration-[1000ms] ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="relative z-20 max-w-[1500px] mx-auto px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* IMAGE PANEL */}
          <div
            className={`lg:col-span-6 flex justify-center ${
              isReversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="relative w-full max-w-[520px] aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-[#420002]/15 bg-[#ffffff] group">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#420002]/15 bg-[#fffaee]/90 px-3.5 py-1 text-[8.5px] uppercase tracking-[0.2em] font-sans font-medium text-[#420002]">
                  <span>✦</span> Edition {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* TEXT PANEL */}
          <div
            className={`lg:col-span-6 flex flex-col items-start text-left ${
              isReversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-[#c82127]">✦</span>
              <span className="text-[9.5px] uppercase tracking-[0.35em] text-[#c82127] font-semibold font-sans">
                {item.tagline}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#420002] leading-[1.08] mb-2">
              {item.name}
            </h2>

            <div className="w-12 h-[2px] bg-[#c82127] my-3" />

            <p className="text-[14px] sm:text-[15px] text-[#420002]/80 leading-[1.8] font-sans font-light max-w-lg mb-6">
              {item.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8 pt-4 border-t border-[#420002]/10 w-full max-w-lg">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#420002]/60 font-sans block mb-0.5">
                  Acquisition Value
                </span>
                <span className="font-display text-2xl sm:text-3xl text-[#420002]">
                  {item.price}
                </span>
              </div>
              <div className="h-8 w-px bg-[#420002]/15" />
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#420002]/60 font-sans block mb-0.5">
                  Hallmark
                </span>
                <span className="text-xs uppercase tracking-wider text-[#c82127] font-semibold font-sans">
                  BIS 925 • 22K Vermeil
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/product/${item.id}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#c82127] text-[#fffaee] px-7 sm:px-8 py-3.5 text-[10.5px] font-semibold uppercase tracking-[0.22em] shadow-sm transition-all duration-300 hover:bg-[#a5181d] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Acquire Masterpiece</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.2em] font-sans font-medium text-[#420002]/70 hover:text-[#c82127] transition-colors py-2"
              >
                <span>View Full Catalog</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   4. COLLECTION INDEX — Gallery Grid
═══════════════════════════════════════════ */
function CollectionIndex({
  items,
}: {
  items: CollectionItem[];
}) {
  return (
    <section className="relative w-full bg-[#fffaee] py-20 sm:py-28 px-6 md:px-16 border-b border-[#420002]/10 overflow-hidden">
      <div className="relative z-20 max-w-[1500px] mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[10px] text-[#c82127]">✦</span>
            <span className="text-[9.5px] uppercase tracking-[0.35em] text-[#c82127] font-semibold font-sans">
              Complete Archive
            </span>
            <span className="text-[10px] text-[#c82127]">✦</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#420002] leading-tight">
            Explore All Creations
          </h2>
          <div className="w-12 h-[2px] bg-[#c82127] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#420002]/15 bg-[#ffffff] shadow-sm transition-all duration-500 hover:border-[#c82127] hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#f4eee1]">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#420002]/90 via-[#420002]/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between">
                  <div>
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#fffaee]/80 font-sans font-medium mb-1">
                      {item.price}
                    </p>
                    <h3 className="font-display text-base sm:text-lg text-[#fffaee] leading-tight">
                      {item.name}
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

/* ═══════════════════════════════════════════
   5. HEIRLOOM CARE
═══════════════════════════════════════════ */
function HeirloomCareGuide({ careInstructions }: { careInstructions?: string[] }) {
  const defaultCare = [
    "Keep your piece dry and away from direct perfumes, lotions, or abrasive surfaces.",
    "Store in your signature Zevar Baksa velvet casket to preserve enamel vibrancy.",
    "Polish gently with the complimentary microfibre cloth provided with your edition.",
    "Kiln-fired at 750°C for lifelong colour permanence with BIS certified purity.",
  ];

  const list = careInstructions && careInstructions.length > 0 ? careInstructions : defaultCare;

  return (
    <section className="relative w-full bg-[#fffaee] py-16 sm:py-20 px-6 md:px-16 overflow-hidden">
      <div className="relative z-20 max-w-[1200px] mx-auto grid md:grid-cols-12 gap-8 items-center">
        
        <div className="md:col-span-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-[#c82127]">✦</span>
            <span className="text-[9.5px] uppercase tracking-[0.35em] text-[#c82127] font-semibold font-sans">
              Heirloom Preservation
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#420002] leading-tight">
            The Ritual of Care & Storage
          </h3>
          <p className="mt-3 text-xs sm:text-[13.5px] text-[#420002]/75 font-sans font-light leading-relaxed">
            Every piece arrives nestled in our custom royal velvet casket, complete with certificates of authenticity and karigar hallmark guarantee.
          </p>
        </div>

        <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
          {list.slice(0, 4).map((item, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-[#ffffff] border border-[#420002]/15 flex items-start gap-3 shadow-sm"
            >
              <span className="text-[#c82127] text-xs mt-0.5 flex-shrink-0">✦</span>
              <p className="text-xs text-[#420002]/80 font-sans font-light leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════════ */
export default function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
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
              The archive edition you are searching for is currently resting in our Jaipur atelier vaults.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#c82127] text-[#fffaee] px-7 py-3 text-[10px] uppercase tracking-[0.25em] font-sans font-semibold hover:bg-[#a5181d] transition-all"
            >
              <ArrowLeft className="h-3 w-3" /> Explore All Pieces
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CollectionHero
        title={collection.heroTitle}
        subtitle={collection.heroSubtitle}
        image={collection.heroImage}
      />

      {collection.story && <CollectionStorySection story={collection.story} />}

      {collection.items.map((item, index) => (
        <ProductShowcase key={item.id} item={item} index={index} />
      ))}

      <CollectionIndex items={collection.items} />

      <HeirloomCareGuide careInstructions={collection.story?.careInstructions} />
    </Layout>
  );
}
