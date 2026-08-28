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
          1. HERO — Minimalist Luxury Editorial
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[90vh] md:min-h-[92vh] bg-[#fffaee] flex flex-col justify-center overflow-hidden pt-20 pb-12 sm:pb-16 border-b border-[#420002]/10">
        
        {/* Content Container */}
        <div className="relative z-20 mx-auto w-full max-w-[1500px] px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column — Editorial Text & Brand Headline */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              
              {/* Kicker */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] text-[#c82127]">✦</span>
                <span className="text-[9.5px] uppercase tracking-[0.3em] text-[#c82127] font-semibold font-sans">
                  Jaipur Atelier • Fine Jewellery
                </span>
              </div>

              {/* Minimal Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] text-[#420002] leading-[1.08] tracking-tight mb-4">
                Heirlooms of <br />
                <span className="font-serif-brand italic font-normal text-[#c82127]">
                  Devotion & Craft.
                </span>
              </h1>

              {/* Minimal Accent Line */}
              <div className="w-16 h-[2px] bg-[#c82127] mb-6" />

              {/* Description */}
              <p className="text-[14px] sm:text-[15.5px] text-[#420002]/80 leading-[1.8] font-sans font-light max-w-lg mb-8">
                Every piece is born in Jaipur, handcrafted by master karigars in kiln-fired Meenakari enamel, solid 925 sterling silver, and 22K gold vermeil.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/collection/mina-bagh"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#c82127] text-[#fffaee] px-7 sm:px-8 py-3.5 text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] shadow-sm transition-all duration-300 hover:bg-[#a5181d] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full border border-[#420002]/20 text-[#420002] px-7 sm:px-8 py-3.5 text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] hover:border-[#c82127] hover:text-[#c82127] transition-all duration-300"
                >
                  <span>Shop All Pieces</span>
                </Link>
              </div>

              {/* Minimal Hallmarks Bar */}
              <div className="mt-10 pt-6 border-t border-[#420002]/10 flex flex-wrap items-center gap-6 sm:gap-8 text-[#420002]/70 text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className="text-[#c82127]">✦</span>
                  <span className="tracking-wide">750°C Kiln Enamel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#c82127]">✦</span>
                  <span className="tracking-wide">BIS 925 Silver</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#c82127]">✦</span>
                  <span className="tracking-wide">22K Gold Vermeil</span>
                </div>
              </div>

            </div>

            {/* Right Column — Clean Minimal Hero Imagery */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px]">
                
                {/* Main Clean Editorial Image */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[#420002]/15 bg-[#fffaee] shadow-lg group">
                  <img
                    src="/images/hero-maroon-2026.jpg"
                    alt="Zevar Baksa Fine Jewellery"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#420002]/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Subtle Floating Atelier Badge */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 z-30 bg-[#fffaee] border border-[#420002]/15 p-3.5 sm:p-4 rounded-xl shadow-md flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#c82127] flex items-center justify-center text-[#fffaee] text-xs font-serif font-bold">
                    ZB
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#420002] font-semibold font-sans">
                      Jaipur Atelier
                    </p>
                    <p className="text-[9px] text-[#420002]/60 font-sans">
                      Handcrafted Heritage
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. ABOUT US — Clean Minimal Jaipur Heritage
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#fffaee] py-20 sm:py-28 px-6 md:px-16 border-b border-[#420002]/10 overflow-hidden">
        <div className="relative z-20 mx-auto w-full max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column — Clean Story Narrative */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] text-[#c82127]">✦</span>
                <span className="text-[9.5px] uppercase tracking-[0.3em] text-[#c82127] font-semibold font-sans">
                  The Atelier Story
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#420002] leading-[1.12] mb-4">
                Not Made to Be Waited On.<br />
                <span className="font-serif-brand italic font-normal text-[#c82127]">
                  Made to Be Worn.
                </span>
              </h2>

              <div className="w-16 h-[2px] bg-[#c82127] mb-6" />

              <p className="text-[14px] sm:text-[15px] text-[#420002]/80 leading-[1.85] font-sans font-light mb-6">
                It started with crayons on a bedroom floor watching a mother design jewellery. Today, Zevar Baksa gives Jaipur’s master artisans the credit they deserve — crediting karigars by name and giving centuries of heritage craft a clean, contemporary edge.
              </p>

              {/* Minimal Lineage Stats */}
              <div className="grid grid-cols-3 gap-4 py-5 border-y border-[#420002]/10 w-full max-w-lg mb-8">
                <div>
                  <span className="font-display text-2xl text-[#420002] block">Jaipur</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#420002]/60 font-sans">Johri Bazar Roots</span>
                </div>
                <div>
                  <span className="font-display text-2xl text-[#420002] block">750°C</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#420002]/60 font-sans">Kiln-Fired Enamel</span>
                </div>
                <div>
                  <span className="font-display text-2xl text-[#420002] block">BIS 925</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#420002]/60 font-sans">Certified Purity</span>
                </div>
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.25em] font-sans font-semibold text-[#c82127] hover:text-[#420002] transition-colors"
              >
                <span>Read Full Atelier Story</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

            </div>

            {/* Right Column — Clean Minimal Architectural & Craft Framing */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                
                {/* Main Editorial Card */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[#420002]/15 bg-[#fffaee] shadow-lg group">
                  <img
                    src="/images/about-editorial.jpg"
                    alt="Master Karigar Craftsmanship"
                    className="h-full w-full object-cover object-[center_65%] transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#420002]/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Secondary Floating Hawa Mahal Card (Top-Aligned) */}
                <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 z-30 w-36 sm:w-44 aspect-square rounded-xl overflow-hidden shadow-lg border-2 border-[#fffaee] bg-[#fffaee] group/accent">
                  <img
                    src="/images/hawa-mahal.jpg"
                    alt="Jaipur Architecture"
                    className="h-full w-full object-cover object-top origin-top transition-transform duration-700 group-hover/accent:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-[#420002]/80 backdrop-blur-sm p-1.5 text-center">
                    <p className="text-[7.5px] uppercase tracking-widest text-[#fffaee] font-semibold font-sans">
                      Jaipur, Rajasthan
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. NEW RELEASES CAROUSEL
      ════════════════════════════════════════════════════ */}
      <NewReleasesCarousel />

      {/* ════════════════════════════════════════════════════
          MARQUEE RIBBON
      ════════════════════════════════════════════════════ */}
      <MarqueeRibbon text="Mina Bagh • Jaipur Fine Jewellery • Kiln-Fired Enamel" />

      {/* ════════════════════════════════════════════════════
          4. SHOP BY CATEGORY
      ════════════════════════════════════════════════════ */}
      <ShopByCategory />

      {/* ════════════════════════════════════════════════════
          5. FAQ & DIRECT QUERY SECTION
      ════════════════════════════════════════════════════ */}
      <FaqSection />

    </Layout>
  );
}
