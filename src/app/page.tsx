"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { NewReleasesCarousel } from "@/components/NewReleasesCarousel";
import { MarqueeRibbon } from "@/components/MarqueeRibbon";
import { ShopByCategory } from "@/components/ShopByCategory";
import { FaqSection } from "@/components/FaqSection";

export default function Home() {
  return (
    <Layout>

      {/* ════════════════════════════════════════════════════
          1. HERO — full viewport, celestial image bg
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-background flex flex-col">
        {/* Background & Mobile-optimized Legibility Gradient */}
        <img
          src="/images/hero-maroon-2026.jpg"
          alt="Zevar Baksa Hero"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />
        {/* Seamless Blend Gradient into Section 2 */}
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-b from-transparent via-[#1A0307]/70 to-[#1A0307] pointer-events-none z-10" />

        {/* Content — fills viewport */}
        <div className="relative z-20 flex flex-col justify-between h-full mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-16 pt-24 md:pt-[6rem] pb-8 md:pb-12">

          {/* ── Top / Center: Grand Royal Editorial Title Lockup */}
          <div className="flex flex-col items-start max-w-2xl mt-4 sm:mt-8">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-[10px] text-amber-300">✦</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-200/90 font-medium font-sans drop-shadow-sm">
                Mina Bagh • Jaipur Atelier
              </span>
              <span className="text-[10px] text-amber-300">✦</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-[#FAF7F2] leading-[1.08] tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Heirlooms of <br />
              <span className="font-serif-brand italic font-normal text-amber-200 drop-shadow-md">
                Devotion & Starlight.
              </span>
            </h1>

            {/* Ornamental Gold Divider */}
            <div className="flex items-center gap-2.5 my-3 sm:my-4">
              <div className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-amber-300/80" />
              <div className="h-[2.5px] w-14 sm:w-16 bg-gradient-to-r from-[#7A1D2E] via-amber-300 to-[#7A1D2E] rounded-full shadow-[0_0_10px_rgba(252,211,77,0.5)]" />
              <div className="h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-amber-300/80" />
            </div>
          </div>

          {/* ── Bottom row: left copy blurb & Luxury CTA Button ── */}
          <div className="mt-auto flex flex-col items-start gap-3.5 sm:gap-4 max-w-lg pt-6">
            <p className="text-xs sm:text-[14px] text-[#FAF7F2]/90 leading-[1.65] sm:leading-[1.75] font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-light">
              Discover exquisite jewellery inspired by the beauty of the heavens. Each piece crafted in Jaipur to bring elegance to your most cherished occasions.
            </p>
            <Link
              href="/collection/mina-bagh"
              className="group inline-flex items-center gap-2.5 rounded-full border border-amber-300/40 bg-[#2B050B]/90 px-6 sm:px-7 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FAF7F2] backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-amber-300 hover:bg-[#450A14] hover:shadow-[0_0_25px_rgba(252,211,77,0.25)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-3.5 w-3.5 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. ABOUT US — Authentic Jaipur Heritage Editorial
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] md:min-h-[92vh] pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#1A0307] flex flex-col justify-center">
        {/* Previous Red Pattern Background */}
        <img
          src="/images/about-bg.jpg"
          alt="Zevar Baksa Royal Heritage Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none opacity-90"
        />
        {/* Subtle Warm Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/50 pointer-events-none" />
        
        {/* Seamless Blend Gradient from Hero */}
        <div className="absolute top-0 inset-x-0 h-28 sm:h-40 bg-gradient-to-b from-[#1A0307] via-[#1A0307]/70 to-transparent pointer-events-none z-10" />

        {/* Seamless Blend Gradient to Section 3 */}
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-b from-transparent via-[#1A0307]/70 to-[#1A0307] pointer-events-none z-10" />

        {/* Content Container */}
        <div className="relative z-20 mx-auto w-full max-w-[1500px] px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column — Editorial Craft Narrative */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              
              {/* Bespoke Heritage Submark */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-[10px] text-amber-300">✦</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-300 font-medium font-sans">
                  Jaipur, Rajasthan • Atelier Heritage
                </span>
                <span className="text-[10px] text-amber-300">✦</span>
              </div>

              {/* Bold Editorial Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] text-amber-200 leading-[1.12] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-xl">
                Not Made to Be Waited On.<br />
                <span className="font-serif-brand italic font-normal text-[#FAF7F2]">
                  Made to Be Worn.
                </span>
              </h2>

              {/* Delicate Gold Ornamental Line */}
              <div className="flex items-center gap-2.5 my-4 sm:my-5">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-300/80" />
                <div className="h-[2.5px] w-14 bg-gradient-to-r from-[#7A1D2E] via-amber-300 to-[#7A1D2E] rounded-full shadow-[0_0_8px_rgba(252,211,77,0.4)]" />
                <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-300/80" />
              </div>

              {/* Narrative Text */}
              <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#FAF7F2]/90 leading-[1.8] sm:leading-[1.85] font-sans max-w-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-light">
                It started with crayons on a bedroom floor watching a mother design jewellery. Today, Zevar Baksa gives Jaipur’s master artisans the credit they deserve — crediting karigars by name and giving heritage craft a contemporary edge.
              </p>

              {/* Karigar & Heritage Hallmarks — Natural Editorial Lockup */}
              <div className="mt-6 sm:mt-8 pt-5 border-t border-amber-300/20 w-full max-w-lg flex flex-wrap items-center justify-between gap-4 text-[#FAF7F2]/80">
                <div className="flex flex-col">
                  <span className="font-display text-base sm:text-lg text-amber-200">Jaipur Pink City</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#FAF7F2]/60 font-sans">Royal Atelier Roots</span>
                </div>
                <div className="h-8 w-px bg-amber-300/20 hidden sm:block" />
                <div className="flex flex-col">
                  <span className="font-display text-base sm:text-lg text-amber-200">750°C Enamel</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#FAF7F2]/60 font-sans">Permanent Meenakari</span>
                </div>
                <div className="h-8 w-px bg-amber-300/20 hidden sm:block" />
                <div className="flex flex-col">
                  <span className="font-display text-base sm:text-lg text-amber-200">BIS 925 / 22K</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#FAF7F2]/60 font-sans">Hallmarked Purity</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 sm:mt-10">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2.5 bg-[#FAF7F2] text-[#2D0D12] px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans font-semibold hover:bg-amber-100 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95"
                >
                  More About Us
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

            </div>

            {/* Right Column — Archival Heritage Visual Showcase */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="relative w-full max-w-[500px]">
                
                {/* Main Large Photo: Editorial Jewellery Model & Craftsmanship */}
                <div className="relative z-10 w-full aspect-[4/5] sm:aspect-[14/15] rounded-3xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.85)] border border-amber-300/30 bg-black/40 group">
                  <img
                    src="/images/about-editorial.jpg"
                    alt="Zevar Baksa Editorial Heritage Jewellery Craftsmanship"
                    className="h-full w-full object-cover object-[center_65%] transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle Gradient & Inner Gold Hairline */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-amber-300/25" />
                </div>

                {/* Secondary Floating Iconic Jaipur Palace Arch */}
                <div className="absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-8 z-30 w-36 sm:w-48 aspect-square rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.95)] border-2 border-amber-300/50 bg-[#1A0307] group/accent transition-transform duration-500 hover:scale-105">
                  <img
                    src="/images/hawa-mahal.jpg"
                    alt="Jaipur Royal Palace Architecture"
                    className="h-full w-full object-cover object-top origin-top transition-transform duration-700 group-hover/accent:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-2 text-center">
                    <p className="text-[7.5px] sm:text-[8.5px] uppercase tracking-widest text-amber-200 font-semibold font-sans">
                      Jaipur, Rajasthan
                    </p>
                  </div>
                </div>

                {/* Floating Artisan Monogram Seal Badge */}
                <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 z-30 flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-amber-300/50 bg-[#2B050B]/95 backdrop-blur-md shadow-[0_0_25px_rgba(252,211,77,0.3)]">
                  <div className="absolute inset-1 rounded-full border border-amber-300/20" />
                  <img
                    src="/logos/submark.png"
                    alt="Zevar Baksa Artisan Seal"
                    className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-95"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. NEW RELEASES CAROUSEL — Seamless Transition
      ════════════════════════════════════════════════════ */}
      <NewReleasesCarousel />

      {/* MARQUEE RIBBON */}
      <MarqueeRibbon text="Mina Bagh • New Releases" />

      {/* ════════════════════════════════════════════════════
          4. SHOP BY CATEGORY — Royal Jharokha Archive & Interactive Filters
      ════════════════════════════════════════════════════ */}
      <ShopByCategory />

      {/* ════════════════════════════════════════════════════
          5. FAQ & DIRECT QUERY SECTION
      ════════════════════════════════════════════════════ */}
      <FaqSection />

    </Layout>
  );
}
