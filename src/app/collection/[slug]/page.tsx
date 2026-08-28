"use client";

import { use, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Shield, Sparkles, Check, Heart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { collections } from "@/data/collections";
import type { CollectionItem, Collection } from "@/data/collections";

/* ─── Royal Gold Ornamental Divider ─── */
function OrnamentalGoldDivider() {
  return (
    <div className="flex items-center justify-center gap-2.5 my-5 select-none pointer-events-none">
      <div className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-amber-300/80" />
      <div className="h-[2px] w-12 sm:w-14 bg-gradient-to-r from-[#7A1D2E] via-amber-300 to-[#7A1D2E] rounded-full shadow-[0_0_8px_rgba(252,211,77,0.4)]" />
      <div className="h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-amber-300/80" />
    </div>
  );
}

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
   1. HERO SECTION — Royal Editorial Full-Bleed Banner
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
    <section className="relative w-full min-h-[90vh] md:min-h-[92vh] overflow-hidden bg-[#1A0307] flex flex-col justify-end">
      {/* Background Hero Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-75 pointer-events-none select-none"
      />

      {/* Ambient Gradient Shading */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0307] via-black/45 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

      {/* Seamless Bottom Blend Gradient */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent via-[#1A0307]/70 to-[#1A0307] pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-16 sm:pb-20 md:pb-24 px-6 sm:px-10 text-center max-w-4xl mx-auto">
        
        {/* Atelier Hallmark Kicker */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] text-amber-300">✦</span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-amber-300 font-semibold font-sans drop-shadow-sm">
            Jaipur Signature Archive
          </span>
          <span className="text-[10px] text-amber-300">✦</span>
        </div>

        {/* Grand Collection Title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF7F2] leading-[1.02] drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
          {title}
        </h1>

        <OrnamentalGoldDivider />

        {/* Subtitle / Poetic Theme */}
        <p className="text-[13.5px] sm:text-[15.5px] md:text-[17px] text-amber-100/90 leading-[1.8] font-sans font-light max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          {subtitle}
        </p>

        {/* Hallmarks Quick Row */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-sans text-amber-200/90">
          <span className="px-3.5 py-1.5 rounded-full border border-amber-300/35 bg-[#2B050B]/80 backdrop-blur-md">
            ✦ 750°C Kiln-Fired Enamel
          </span>
          <span className="px-3.5 py-1.5 rounded-full border border-amber-300/35 bg-[#2B050B]/80 backdrop-blur-md">
            ✦ Solid 925 & 22K Gold Vermeil
          </span>
          <span className="px-3.5 py-1.5 rounded-full border border-amber-300/35 bg-[#2B050B]/80 backdrop-blur-md">
            ✦ BIS Hallmarked Purity
          </span>
        </div>

        {/* Smooth Scroll Cue */}
        <div className="mt-10 flex flex-col items-center gap-2 animate-bounce opacity-75">
          <span className="text-[8.5px] uppercase tracking-[0.3em] text-amber-200/60 font-sans">
            Explore Masterpieces
          </span>
          <div className="w-px h-6 bg-gradient-to-b from-amber-300/80 to-transparent" />
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
    <section className="relative w-full bg-[#1A0307] py-20 sm:py-28 md:py-32 px-6 md:px-16 overflow-hidden">
      {/* Authentic Red Damask Heritage Pattern Background */}
      <img
        src="/images/about-bg.jpg"
        alt="Zevar Baksa Heritage Craft Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/65 pointer-events-none" />

      {/* Seamless Blend Gradients */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#1A0307] via-[#1A0307]/70 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#1A0307]/70 to-[#1A0307] pointer-events-none z-10" />

      <div className="relative z-20 max-w-[1300px] mx-auto space-y-14 sm:space-y-18">
        
        {/* Header / Lineage */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-[10px] text-amber-300">✦</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-300 font-semibold font-sans">
              Jaipur Craft Lineage
            </span>
            <span className="text-[10px] text-amber-300">✦</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#FAF7F2] leading-tight drop-shadow-md">
            Meenakari: Paradise Fired at 750°C
          </h2>
          <p className="text-[13.5px] sm:text-[15px] text-[#FAF7F2]/90 leading-[1.8] font-sans font-light pt-2">
            {story.meenakariHistory}
          </p>
        </div>

        {/* 2-Column: Master Karigar Spotlight & Founder Vision */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Artisan Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-[#240409]/90 border border-amber-300/30 shadow-[0_15px_40px_rgba(0,0,0,0.65)] backdrop-blur-md space-y-3.5 transition-all duration-500 hover:border-amber-300/60">
            <span className="text-[9.5px] uppercase tracking-[0.25em] text-amber-300 font-semibold font-sans flex items-center gap-1.5">
              <span>✦</span> Master Karigar & Designer
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#FAF7F2]">Deepak Sankit</h3>
            <p className="text-xs sm:text-[13.5px] text-[#FAF7F2]/80 leading-[1.8] font-sans font-light">
              {story.artisanDesigner}
            </p>
          </div>

          {/* Founder Card */}
          <div className="p-7 sm:p-9 rounded-3xl bg-[#240409]/90 border border-amber-300/30 shadow-[0_15px_40px_rgba(0,0,0,0.65)] backdrop-blur-md space-y-3.5 transition-all duration-500 hover:border-amber-300/60">
            <span className="text-[9.5px] uppercase tracking-[0.25em] text-amber-300 font-semibold font-sans flex items-center gap-1.5">
              <span>✦</span> Founder&apos;s Devotion
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#FAF7F2]">Tanishka</h3>
            <p className="text-xs sm:text-[13.5px] text-[#FAF7F2]/80 leading-[1.8] font-sans font-light">
              {story.founderNote}
            </p>
          </div>
        </div>

        {/* Philosophy Card Banner */}
        <div className="text-center max-w-3xl mx-auto bg-gradient-to-r from-[#240409]/95 via-[#3B0710]/95 to-[#240409]/95 border border-amber-300/35 text-amber-100 p-8 sm:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md">
          <p className="font-serif-brand text-xl sm:text-2xl md:text-3xl leading-relaxed italic font-light text-amber-200">
            &ldquo;{story.philosophy}&rdquo;
          </p>
        </div>

        {/* Formats & Available Precious Metals */}
        <div className="pt-4 border-t border-amber-300/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold font-sans mb-1">
              Crafted Formats
            </h4>
            <p className="text-xs text-[#FAF7F2]/75 font-sans font-light">
              Each edition is cast in solid precious metals with authentic hallmark certifications.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {story.makingFormats.map((fmt) => (
              <span
                key={fmt}
                className="px-4 py-2 rounded-full border border-amber-300/40 bg-[#2B050B]/90 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-amber-200 backdrop-blur-md shadow-sm"
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
   3. PRODUCT SHOWCASE — Royal Alternating Editorial Panels
═══════════════════════════════════════════ */
function ProductShowcase({
  item,
  index,
}: {
  item: CollectionItem;
  index: number;
}) {
  const isReversed = index % 2 !== 0; // Even = image-left, Odd = image-right
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`relative w-full bg-[#1A0307] py-14 sm:py-20 md:py-24 border-b border-amber-300/15 overflow-hidden transition-all duration-[1000ms] ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Heritage Pattern Backdrop */}
      <img
        src="/images/about-bg.jpg"
        alt="Zevar Baksa Heritage Pattern"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-85 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/65 pointer-events-none" />

      <div className="relative z-20 max-w-[1500px] mx-auto px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* IMAGE PANEL — Royal Arched Jharokha Framing */}
          <div
            className={`lg:col-span-6 flex justify-center ${
              isReversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="relative w-full max-w-[540px] aspect-[4/5] sm:aspect-[14/15] rounded-t-[3.5rem] rounded-b-3xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.85)] border border-amber-300/35 bg-black/50 group">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {/* Subtle Vignette & Inner Gold Hairline Inlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="pointer-events-none absolute inset-2.5 rounded-t-[3rem] rounded-b-2xl border border-amber-300/25 group-hover:border-amber-300/50 transition-colors duration-500" />
              
              {/* Top Hallmark Badge */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-[#1A0307]/90 px-3.5 py-1 text-[8.5px] uppercase tracking-[0.2em] font-sans font-medium text-amber-300 shadow-sm backdrop-blur-md">
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
            {/* Index & Subtitle */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-amber-300">✦</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-300 font-semibold font-sans">
                {item.tagline}
              </span>
            </div>

            {/* Masterpiece Name */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] text-[#FAF7F2] leading-[1.08] drop-shadow-md mb-2">
              {item.name}
            </h2>

            <OrnamentalGoldDivider />

            {/* Description */}
            <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#FAF7F2]/90 leading-[1.8] font-sans font-light max-w-lg mb-6">
              {item.description}
            </p>

            {/* Price & Hallmark Line */}
            <div className="flex items-center gap-4 mb-8 pt-4 border-t border-amber-300/20 w-full max-w-lg">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#FAF7F2]/60 font-sans block mb-0.5">
                  Acquisition Value
                </span>
                <span className="font-display text-2xl sm:text-3xl text-amber-200">
                  {item.price}
                </span>
              </div>
              <div className="h-8 w-px bg-amber-300/20" />
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#FAF7F2]/60 font-sans block mb-0.5">
                  Hallmark
                </span>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold font-sans">
                  BIS 925 • 22K Vermeil
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/product/${item.id}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-amber-300/40 bg-[#2B050B]/90 px-7 sm:px-8 py-3 sm:py-3.5 text-[10.5px] sm:text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#FAF7F2] backdrop-blur-md shadow-lg transition-all duration-300 hover:border-amber-300 hover:bg-[#450A14] hover:shadow-[0_0_25px_rgba(252,211,77,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Acquire Masterpiece</span>
                <ArrowRight className="h-3.5 w-3.5 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-amber-200/80 hover:text-amber-100 transition-colors py-2"
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
   4. COLLECTION INDEX — Grand Royal Gallery Grid
═══════════════════════════════════════════ */
function CollectionIndex({
  items,
}: {
  items: CollectionItem[];
}) {
  return (
    <section className="relative w-full bg-[#1A0307] py-20 sm:py-28 px-6 md:px-16 overflow-hidden">
      {/* Background Texture */}
      <img
        src="/images/about-bg.jpg"
        alt="Zevar Baksa Heritage Gallery Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-90 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/65 pointer-events-none" />

      <div className="relative z-20 max-w-[1500px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[10px] text-amber-300">✦</span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-300 font-semibold font-sans">
              Complete Archive
            </span>
            <span className="text-[10px] text-amber-300">✦</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#FAF7F2] leading-tight drop-shadow-md">
            Explore All Creations
          </h2>
        </div>

        {/* 4-Col Royal Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="group relative flex flex-col rounded-t-[3rem] rounded-b-2xl overflow-hidden border border-amber-300/30 bg-gradient-to-b from-[#2B050B]/90 via-black/60 to-black/90 shadow-[0_12px_35px_rgba(0,0,0,0.65)] backdrop-blur-sm transition-all duration-500 hover:border-amber-300/70 hover:shadow-[0_18px_45px_rgba(252,211,77,0.25)] hover:-translate-y-1.5"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-[3rem] bg-black/60">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                />
                
                {/* Vignettes & Inner Gold Border */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/25 pointer-events-none" />
                <div className="absolute inset-2 sm:inset-2.5 rounded-t-[2.7rem] rounded-b-xl border border-amber-300/20 group-hover:border-amber-300/50 transition-colors duration-500 pointer-events-none" />

                {/* Bottom Card Info */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between">
                  <div>
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-amber-300 font-sans font-medium mb-1">
                      {item.price}
                    </p>
                    <h3 className="font-display text-base sm:text-lg text-[#FAF7F2] leading-tight drop-shadow-md">
                      {item.name}
                    </h3>
                  </div>

                  <span className="flex items-center justify-center h-8 w-8 rounded-full border border-amber-300/40 bg-[#2B050B]/90 text-amber-200 backdrop-blur-md opacity-90 group-hover:opacity-100 group-hover:bg-amber-300 group-hover:text-[#1A0307] group-hover:shadow-[0_0_15px_rgba(252,211,77,0.5)] transition-all duration-300 flex-shrink-0">
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
   5. HEIRLOOM CARE & BOX PRESENTATION
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
    <section className="relative w-full bg-[#1A0307] py-16 sm:py-20 px-6 md:px-16 border-t border-amber-300/20 overflow-hidden">
      <div className="relative z-20 max-w-[1200px] mx-auto grid md:grid-cols-12 gap-8 items-center">
        
        <div className="md:col-span-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-amber-300">✦</span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-amber-300 font-semibold font-sans">
              Heirloom Preservation
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#FAF7F2] leading-tight">
            The Ritual of Care & Storage
          </h3>
          <p className="mt-3 text-xs sm:text-[13.5px] text-[#FAF7F2]/80 font-sans font-light leading-relaxed">
            Every piece arrives nestled in our custom royal velvet jewel box, complete with certificates of authenticity and karigar hallmark guarantee.
          </p>
        </div>

        <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
          {list.slice(0, 4).map((item, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl bg-[#240409]/90 border border-amber-300/25 flex items-start gap-3 backdrop-blur-md shadow-sm"
            >
              <span className="text-amber-300 text-xs mt-0.5 flex-shrink-0">✦</span>
              <p className="text-xs text-[#FAF7F2]/85 font-sans font-light leading-relaxed">
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
        <div className="flex items-center justify-center min-h-[70vh] bg-[#1A0307] text-[#FAF7F2] px-6">
          <div className="text-center max-w-md">
            <h1 className="font-display text-4xl text-amber-200 mb-4">
              Collection Not Found
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/75 font-sans mb-8">
              The archive edition you are searching for is currently resting in our Jaipur atelier vaults.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-[#2B050B]/90 px-7 py-3 text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-[#FAF7F2] hover:bg-[#450A14] transition-all"
            >
              <ArrowLeft className="h-3 w-3 text-amber-300" /> Explore All Pieces
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* 1. Grand Royal Hero Banner */}
      <CollectionHero
        title={collection.heroTitle}
        subtitle={collection.heroSubtitle}
        image={collection.heroImage}
      />

      {/* 2. Story & Karigar Spotlight Section */}
      {collection.story && <CollectionStorySection story={collection.story} />}

      {/* 3. Alternating Editorial Masterpiece Showcases */}
      {collection.items.map((item, index) => (
        <ProductShowcase key={item.id} item={item} index={index} />
      ))}

      {/* 4. Complete Collection Gallery Grid */}
      <CollectionIndex items={collection.items} />

      {/* 5. Heirloom Care & Box Presentation */}
      <HeirloomCareGuide careInstructions={collection.story?.careInstructions} />
    </Layout>
  );
}
