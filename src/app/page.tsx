"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { NewReleasesCarousel } from "@/components/NewReleasesCarousel";
import { MarqueeRibbon } from "@/components/MarqueeRibbon";
import { CollageGallery } from "@/components/CollageGallery";
import { FaqSection } from "@/components/FaqSection";

export default function Home() {
  return (
    <Layout>

      {/* ════════════════════════════════════════════════════
          1. HERO — Full Viewport Background Image with Transparent Header
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#fffaee]">
        
        {/* Full-Bleed Cover Background Image — smoothly dissolved into canvas with zero dividing line */}
        <img
          src="/images/hero-cover.png"
          alt="Zevar Baksa Hero Editorial Jewellery"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)",
          }}
          className="absolute inset-0 w-full h-full object-cover object-[center_15%] pointer-events-none select-none"
        />
      </section>

      {/* ════════════════════════════════════════════════════
          2. ABOUT US — Exact Brand Story (Blended seamlessly with Hero & Section 3)
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[75vh] -mt-1 pt-10 sm:pt-14 pb-12 sm:pb-16 overflow-hidden bg-[#fffaee] flex flex-col justify-center">
        
        {/* Content Container */}
        <div className="relative z-20 mx-auto w-full max-w-[1500px] px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column — Exact Editorial Brand Story */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Bespoke Heritage Submark */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-[10px] text-[#c82127]">✦</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#c82127] font-semibold font-sans">
                  About Zevar Baksa • Brand Story
                </span>
                <span className="text-[10px] text-[#c82127]">✦</span>
              </div>

              {/* Bold Editorial Headline */}
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#420002] leading-[1.15] max-w-xl">
                Not Made to Be Waited On.<br />
                <span className="font-serif-brand italic font-normal text-[#c82127]">
                  Made to Be Worn.
                </span>
              </h2>

              {/* Delicate Ornamental Line */}
              <div className="flex items-center gap-2.5 my-3 sm:my-4">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#c82127]/60" />
                <div className="h-[2px] w-12 bg-gradient-to-r from-[#420002] via-[#c82127] to-[#420002] rounded-full" />
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c82127]/60" />
              </div>

              {/* Exact Narrative Text Paragraphs — Compact & High Readability */}
              <div className="space-y-2.5 sm:space-y-3 text-[12px] sm:text-[13px] md:text-[13.5px] text-[#420002]/85 leading-[1.65] sm:leading-[1.7] font-sans font-light max-w-2xl">
                <p>
                  It started with crayons on a bedroom floor; a girl watching her mother design jewellery, then trying to design her own. That instinct never really left.
                </p>
                <p>
                  <strong className="font-medium text-[#420002]">Zevar Baksa is where it landed.</strong> <em>Zevar</em> means jewellery, <em>Baksa</em> means box; a jewellery box, a nod to everything jewellery can carry, and everything it can mean.
                </p>
                <p>
                  Jaipur runs on the hands of its artisans, and that&apos;s where we come from. Zevar Baksa exists to give them the credit they rarely receive; every piece designed from scratch, shaped in collaboration with the artisan and designer behind it, their name carried with the collection, not left behind at the workshop door.
                </p>
                <p>
                  Our aim is reinterpretation; taking culture, nature, and tradition and giving them a contemporary edge. Every collection, and every metal we choose for it, carries a reason; a purpose, a meaning, nothing picked at random.
                </p>
                <p>
                  That same intention runs through our logos. English marks our modern collections, Hindi marks the traditional ones; written in our founder&apos;s mother&apos;s hand, a personal thread stitched into the brand; and a submark that&apos;s simply us, distilled.
                </p>
                <p className="font-serif-brand italic text-[#c82127] text-sm sm:text-base pt-0.5 font-normal">
                  Zevar Baksa isn&apos;t made to be waited on. It&apos;s made to be worn.
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-5 sm:mt-7">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2.5 bg-[#420002] text-[#fffaee] px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-[10.5px] uppercase tracking-[0.22em] font-sans font-semibold hover:bg-[#c82127] transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                >
                  More About Us
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

            </div>

            {/* Right Column — Archival Heritage Visual Showcase */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="relative w-full max-w-[460px]">
                
                {/* Main Photo: Handcrafted Silver Enamel Necklace Masterpiece */}
                <div className="relative z-10 w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#420002]/15 bg-[#f4eee1] group">
                  <img
                    src="/images/about-editorial.jpg"
                    alt="Zevar Baksa Handcrafted Silver Necklace Panel Enamel Work"
                    className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle Luxury Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#420002]/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Artisan Monogram Seal Badge */}
                <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 z-30 flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full border border-[#420002]/15 bg-[#fffaee] shadow-xl">
                  <img
                    src="/logos/submark.png"
                    alt="Zevar Baksa Artisan Seal"
                    className="h-9 sm:h-11 w-auto object-contain"
                  />
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

      {/* MARQUEE RIBBON */}
      <MarqueeRibbon text="Mina Bagh • New Releases" />

      {/* ════════════════════════════════════════════════════
          4. 3-LAYER COLLAGE GALLERY — Model & Product Shoots
      ════════════════════════════════════════════════════ */}
      <CollageGallery />

      {/* ════════════════════════════════════════════════════
          5. FAQ & DIRECT QUERY SECTION
      ════════════════════════════════════════════════════ */}
      <FaqSection />

    </Layout>
  );
}
