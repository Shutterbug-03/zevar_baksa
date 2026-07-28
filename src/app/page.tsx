"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { NewReleasesCarousel } from "@/components/NewReleasesCarousel";
import { MarqueeRibbon } from "@/components/MarqueeRibbon";
import { FaqSection } from "@/components/FaqSection";

export default function Home() {
  return (
    <Layout>

      {/* ════════════════════════════════════════════════════
          1. HERO — full viewport, celestial image bg
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full h-screen overflow-hidden bg-background flex flex-col">
        {/* Background */}
        <img
          src="/images/hero-maroon-2026.jpg"
          alt="Zevar Baksa Hero"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Content — fills viewport */}
        <div className="relative z-10 flex flex-col h-full mx-auto w-full max-w-[1600px] px-8 md:px-16 pt-[5.5rem] pb-12 justify-between">

          {/* Top Grand Brand Title Banner */}
          <div className="pt-6 md:pt-10 text-center flex flex-col items-center select-none">
            <p className="text-[10px] uppercase tracking-[0.45em] text-amber-300/90 font-sans font-semibold mb-2 drop-shadow-md">
              Haute Joaillerie Atelier • Jaipur
            </p>
            <h1 className="font-fancy text-5xl md:text-7xl lg:text-8xl text-[#FAF7F2] tracking-[0.18em] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] leading-none">
              ZEVAR BAKSA
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
              <div className="h-1.5 w-1.5 rotate-45 border border-amber-300/60" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
            </div>
          </div>

          {/* ── Bottom row: left copy / right links */}
          <div className="mt-auto flex items-end justify-between gap-12">
            {/* Left — Collection blurb */}
            <div className="flex flex-col items-start gap-4 max-w-[280px]">
              <p className="text-[9px] uppercase tracking-[0.35em] font-sans text-amber-200/90 font-semibold drop-shadow-sm">
                Collection 2026
              </p>
              <p className="text-[13px] text-[#FAF7F2]/90 leading-[1.7] font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                Discover exquisite jewellery inspired by the beauty of the
                heavens. Each piece crafted to bring elegance to your most
                cherished occasions.
              </p>
              <Link
                href="/shop"
                className="mt-1 inline-flex items-center gap-2 bg-[#FAF7F2] text-[#2D0D12] px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.22em] font-sans font-semibold hover:bg-amber-100 transition-all duration-300 shadow-md hover:scale-[1.03]"
              >
                Discover <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Right — Celestial tagline + category links */}
            <div className="flex flex-col gap-5 min-w-[210px] max-w-[240px]">
              <p className="text-[9px] uppercase tracking-[0.28em] text-amber-200 font-semibold font-sans text-right leading-[1.9] drop-shadow-sm">
                A Celestial Touch<br />for Timeless Moments
              </p>
              <div className="flex flex-col border-t border-[#FAF7F2]/20">
                {[
                  { label: "Rings" },
                  { label: "Earrings" },
                  { label: "Necklaces" },
                  { label: "Bracelets" },
                ].map(({ label }) => (
                  <Link
                    key={label}
                    href="/shop"
                    className="group relative flex items-center justify-between py-2.5 border-b border-[#FAF7F2]/20 text-[10px] uppercase tracking-[0.22em] font-sans text-[#FAF7F2]/90 hover:text-amber-200 transition-colors duration-300 overflow-hidden drop-shadow-sm"
                  >
                    <span className="absolute bottom-0 left-0 h-px w-full bg-amber-300 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-300">{label}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-[#FAF7F2]/70 group-hover:text-amber-200">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. ABOUT US — natural full-width editorial section
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[90vh] py-20 md:py-28 overflow-hidden bg-background flex flex-col justify-center">
        {/* Background Image */}
        <img
          src="/images/about-bg.jpg"
          alt="Zevar Baksa About Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Content Container */}
        <div className="relative z-10 w-full pl-8 md:pl-16 pr-0 h-full flex items-stretch py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center w-full h-full">
            
            {/* Left — copy */}
            <div className="md:col-span-5 flex flex-col justify-center h-full pl-2 py-8 pr-4 md:pr-8">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-semibold font-sans mb-2 drop-shadow-sm">
                    Our story
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.32em] text-[#FAF7F2]/90 font-sans drop-shadow-sm">
                    Jaipur, Rajasthan
                  </span>
                </div>
                <h3 className="font-display text-[3.5vw] min-text-[2.2rem] text-amber-300 leading-[1.05] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                  Where Royal Heritage Meets<br />Modern Craftsmanship.
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#FAF7F2]/95 leading-[1.8] font-sans max-w-md drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  Inspired by the architectural grandeur of Rajasthan, every
                  piece in our collection is a testament to centuries-old
                  techniques, reimagined for the contemporary woman. Our
                  artisans weave stories of gold and gemstones, capturing the
                  soul of Jaipur.
                </p>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-[#FAF7F2] text-[#2D0D12] px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-sans font-semibold hover:bg-amber-100 transition-all duration-300 shadow-md hover:scale-[1.03]"
                >
                  More About Us <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Right — portrait image */}
            <div className="md:col-span-7 h-[70vh] min-h-[480px] max-h-[640px] flex justify-end">
              <div className="w-full h-full rounded-tl-[9rem] overflow-hidden bg-black/25 backdrop-blur-xs shadow-2xl border-l border-t border-[#FAF7F2]/20">
                <img
                  src="/images/about-editorial.jpg"
                  alt="Zevar Baksa Heritage Craftsmanship"
                  className="h-full w-full object-cover object-[center_68%] transition-transform duration-500 hover:scale-105"
                />
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
      <MarqueeRibbon text="New Releases" />

      {/* ════════════════════════════════════════════════════
          4. SHOP BY CATEGORY — Natural fluid grid
      ════════════════════════════════════════════════════ */}
      <section className="w-full bg-background py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1400px] px-8 md:px-16">
          {/* Title */}
          <div className="pb-8 border-b border-foreground/10 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.38em] text-foreground/40 font-sans mb-2">Explore</p>
              <h2 className="font-display text-4xl md:text-5xl text-primary leading-none">Shop by Category</h2>
            </div>
            <Link
              href="/shop"
              className="text-[10px] uppercase tracking-[0.22em] font-sans text-primary/70 hover:text-primary transition-colors duration-300 flex items-center gap-1.5 font-semibold"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* 3×3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
            {[
              { label: "Rings", img: "/images/real-shot-1.jpg" },
              { label: "Earrings", img: "/images/real-shot-2.jpg" },
              { label: "Necklaces", img: "/images/real-shot-3.jpg" },
              { label: "Bracelets", img: "/images/real-shot-4.jpg" },
              { label: "Chokers", img: "/images/real-shot-5.jpg" },
              { label: "Jhumkas", img: "/images/real-shot-6.jpg" },
              { label: "Bridal Sets", img: "/images/real-shot-7.jpg" },
              { label: "Cuffs", img: "/images/real-shot-8.jpg" },
              { label: "All Jewellery", img: "/images/real-shot-3.jpg" },
            ].map(({ label, img }) => (
              <Link
                key={label}
                href="/shop"
                className="group flex flex-col gap-3"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted shadow-sm">
                  <img
                    src={img}
                    alt={label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.22em] font-sans text-foreground/80 group-hover:text-primary transition-colors duration-300 font-semibold">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          5. FAQ & DIRECT QUERY SECTION
      ════════════════════════════════════════════════════ */}
      <FaqSection />

      {/* ════════════════════════════════════════════════════
          6. NEWSLETTER
      ════════════════════════════════════════════════════ */}
      <section className="bg-secondary/70 py-24">
        <div className="mx-auto max-w-[1600px] px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left copy */}
          <div className="flex-1 max-w-lg">
            <p className="text-[10px] uppercase tracking-[0.38em] text-primary font-sans mb-3 font-semibold">The Baksa Letter</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary leading-tight">
              Whispers from <em className="not-italic italic text-zb-red">our atelier.</em>
            </h2>
            <p className="mt-4 text-[14px] text-foreground/70 leading-[1.75] font-sans">
              New releases, private previews, and the occasional love letter.
              No noise, ever.
            </p>
          </div>

          {/* Right form */}
          <div className="flex-shrink-0 w-full max-w-sm">
            <form
              className="flex items-center border-b-2 border-foreground/20 focus-within:border-primary transition-colors duration-300"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-transparent py-4 text-[13px] outline-none text-foreground placeholder:text-foreground/40 font-sans"
              />
              <button
                type="submit"
                className="flex-shrink-0 text-[10px] uppercase tracking-[0.3em] px-3 py-4 text-primary hover:text-zb-red transition-colors duration-300 font-sans font-semibold"
              >
                Subscribe →
              </button>
            </form>
            <p className="mt-3 text-[10px] text-foreground/40 font-sans tracking-[0.05em]">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

    </Layout>
  );
}
