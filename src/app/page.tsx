"use client";

import Link from "next/link";
import { useState } from "react";
import { Play } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Layout>
      <div className="relative min-h-screen bg-[#fffaee] text-[#420002] selection:bg-[#c82127] selection:text-[#fffaee] overflow-x-hidden font-sans pt-20 sm:pt-24">
        
        {/* Background Topographic Wave Contours (matching reference background) */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 20%, rgba(200, 33, 39, 0.05) 0%, transparent 40%), radial-gradient(circle at 85% 75%, rgba(66, 0, 2, 0.04) 0%, transparent 45%), url("data:image/svg+xml,%3Csvg width='800' height='800' viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,200 Q200,160 400,240 T800,200 M0,350 Q250,280 500,380 T800,340 M0,500 Q200,440 400,530 T800,480 M0,650 Q300,580 550,680 T800,620' fill='none' stroke='%23420002' stroke-width='0.45' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* ════════════════════════════════════════════════════
            HERO SECTION — "DISCOVER WORLD'S BEST JEWELRY*"
        ════════════════════════════════════════════════════ */}
        <section className="relative z-10 w-full pt-8 sm:pt-14 pb-16 px-6 sm:px-12 md:px-20 text-center">
          
          {/* Subtle Decorative Star Sparkles */}
          <span className="absolute top-10 left-[18%] text-[#c82127]/40 text-xs font-serif">✦</span>
          <span className="absolute top-24 right-[22%] text-[#c82127]/40 text-xs font-serif">✦</span>

          {/* Iconic Giant Headline with Oval Cutout */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] leading-[0.98] text-[#420002] tracking-tight uppercase max-w-6xl mx-auto font-normal select-none">
            <span className="inline-flex items-center justify-center flex-wrap gap-x-2 sm:gap-x-4">
              <span>DISC</span>
              {/* Inline Oval Cutout Image (Replacing the 'O') */}
              <span className="inline-block relative w-16 sm:w-28 md:w-36 h-9 sm:h-16 md:h-20 rounded-full overflow-hidden border border-[#420002]/20 shadow-md align-middle my-1">
                <img
                  src="/images/real-shot-1.jpg"
                  alt="Jewellery Detail"
                  className="w-full h-full object-cover object-center"
                />
              </span>
              <span>VER</span>
            </span>
            <br />
            <span>WORLD’S BEST</span>
            <br />
            <span className="inline-flex items-center justify-center">
              <span>JEWELRY</span>
              <span className="text-[#c82127] ml-1 font-serif text-4xl sm:text-6xl md:text-7xl">✦</span>
            </span>
          </h1>

          {/* ════════════════════════════════════════════════════
              HERO 3-PART ASYMMETRIC EDITORIAL PHOTO COLLAGE
          ════════════════════════════════════════════════════ */}
          <div className="mt-16 sm:mt-24 max-w-5xl mx-auto grid grid-cols-12 gap-6 sm:gap-8 items-start text-left">
            
            {/* Left Hero Card (01) */}
            <div className="col-span-12 sm:col-span-3 flex flex-col items-start pt-6 sm:pt-14">
              <span className="text-[11px] font-serif italic text-[#420002]/70 mb-2">01</span>
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f4eee1] mb-6 shadow-sm group">
                <img
                  src="/images/real-shot-2.jpg"
                  alt="Earrings Detail"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Oval Pill Button "Shop Now ⟶" */}
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full border border-[#420002] px-6 sm:px-8 py-2.5 text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-[#420002] hover:bg-[#420002] hover:text-[#fffaee] transition-all duration-300 active:scale-95"
              >
                <span>Shop Now</span>
                <span className="ml-2 font-serif text-sm">⟶</span>
              </Link>
            </div>

            {/* Center Tall Hero Portrait */}
            <div className="col-span-12 sm:col-span-6 px-0 sm:px-2">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f4eee1] shadow-lg group">
                <img
                  src="/images/hero-maroon-2026.jpg"
                  alt="Editorial Necklace Portrait"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right Hero Column with Circular Rotating Stamp & Card (03) */}
            <div className="col-span-12 sm:col-span-3 flex flex-col items-end pt-2 sm:pt-8">
              {/* Rotating Circular Fashion Stamp Badge */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-10 sm:mb-14 mr-2">
                <div className="w-full h-full animate-[spin_20s_linear_infinite] flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-[#420002]">
                    <path
                      id="stampCircle"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[9.5px] uppercase tracking-[0.24em] font-sans font-medium">
                      <textPath href="#stampCircle">
                        • JAIPUR ATELIER • FINE HEIRLOOM
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-[#c82127]" />
                </div>
              </div>

              {/* Small Right Photo (03) */}
              <div className="w-full flex flex-col items-start pl-4 sm:pl-6">
                <span className="text-[11px] font-serif italic text-[#420002]/70 mb-2">03</span>
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f4eee1] shadow-sm group">
                  <img
                    src="/images/real-shot-4.jpg"
                    alt="Heirloom Detail"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            ABOUT US SECTION (Exact Reference Layout)
        ════════════════════════════════════════════════════ */}
        <section className="relative z-10 w-full py-20 sm:py-28 px-6 sm:px-12 md:px-20 border-t border-[#420002]/10">
          <div className="max-w-5xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
              <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-[0.18em] text-[#420002] font-normal mb-6">
                ABOUT US
              </h2>
              <p className="text-[13px] sm:text-[14px] text-[#420002]/75 leading-[1.9] font-sans font-light">
                Zevar Baksa designs modern, heirloom jewellery pieces that are handcrafted from solid 925 sterling silver, 22K gold vermeil and 750°C kiln-fired Meenakari enamel. In an industry that’s focused on trends, we believe in timelessness.
              </p>
            </div>

            {/* Asymmetric 2-Column Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
              
              {/* Left Column (Photo 03 + Narrative + Pill CTA) */}
              <div className="md:col-span-5 flex flex-col items-start">
                <span className="text-[11px] font-serif italic text-[#420002]/70 mb-2">03</span>
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f4eee1] mb-8 shadow-sm group">
                  <img
                    src="/images/real-shot-3.jpg"
                    alt="Necklace Craftsmanship"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <p className="text-[13px] sm:text-[14px] text-[#420002]/75 leading-[1.8] font-sans font-light mb-8 max-w-sm">
                  Our goal is to create heirlooms that are made for life. We encourage people to think about jewellery as part of their identity and legacy.
                </p>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border border-[#420002] px-7 py-2.5 text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-[#420002] hover:bg-[#420002] hover:text-[#fffaee] transition-all duration-300 active:scale-95"
                >
                  <span>More Information</span>
                  <span className="ml-2 font-serif text-sm">⟶</span>
                </Link>
              </div>

              {/* Right Column (Large Tall Portrait 04) */}
              <div className="md:col-span-7">
                <span className="text-[11px] font-serif italic text-[#420002]/70 mb-2 block">04</span>
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f4eee1] shadow-lg group">
                  <img
                    src="/images/hero-1.jpg"
                    alt="Heirloom Portrait Showcase"
                    className="w-full h-full object-cover object-[center_35%] transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            NEW COLLECTION SECTION (Exact Reference Layout)
        ════════════════════════════════════════════════════ */}
        <section className="relative z-10 w-full py-20 sm:py-28 px-6 sm:px-12 md:px-20 border-t border-[#420002]/10">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Headline */}
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-[0.15em] text-[#420002] font-normal text-center mb-16 sm:mb-20">
              NEW COLLECTION
            </h2>

            {/* 4-Item Staggered Product Cards Row (Using DSC Shoot Images) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-end">
              
              {/* Item 1: Ear Ring */}
              <Link href="/product/meenakari-silver-earrings" className="group flex flex-col">
                <div className="flex items-center justify-between text-[11px] sm:text-[12px] font-sans text-[#420002] mb-2.5">
                  <span><em className="font-serif mr-1">01</em> Ear Ring</span>
                  <span className="font-medium text-[#c82127]">₹ 4,200</span>
                </div>
                <div className="relative aspect-square w-full bg-[#000000] overflow-hidden flex items-center justify-center p-3 border border-[#420002]/10 shadow-sm">
                  <img
                    src="/images/shoots/DSC07714.JPG"
                    alt="Jaipur Meenakari Silver Earring"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </Link>

              {/* Item 2: Bracelets / Rings (Tall Card) */}
              <Link href="/product/turquoise-ruby-ring" className="group flex flex-col md:-mb-8">
                <div className="relative aspect-[3/4] w-full bg-[#000000] overflow-hidden flex items-center justify-center p-3 border border-[#420002]/10 shadow-sm mb-2.5">
                  <img
                    src="/images/shoots/DSC07871.JPG"
                    alt="Mina Bagh Turquoise & Ruby Ring"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] sm:text-[12px] font-sans text-[#420002]">
                  <span><em className="font-serif mr-1">01</em> Bracelets</span>
                  <span className="font-medium text-[#c82127]">₹ 3,800</span>
                </div>
              </Link>

              {/* Item 3: Rings / Drops */}
              <Link href="/product/cobalt-parrot-pendant" className="group flex flex-col">
                <div className="flex items-center justify-between text-[11px] sm:text-[12px] font-sans text-[#420002] mb-2.5">
                  <span><em className="font-serif mr-1">01</em> Rings</span>
                  <span className="font-medium text-[#c82127]">₹ 3,200</span>
                </div>
                <div className="relative aspect-square w-full bg-[#000000] overflow-hidden flex items-center justify-center p-3 border border-[#420002]/10 shadow-sm">
                  <img
                    src="/images/shoots/DSC07753.JPG"
                    alt="Cobalt Parrot Pendant"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </Link>

              {/* Item 4: Necklaces */}
              <Link href="/product/emerald-bird-pearl-haar" className="group flex flex-col">
                <div className="relative aspect-square w-full bg-[#000000] overflow-hidden flex items-center justify-center p-3 border border-[#420002]/10 shadow-sm mb-2.5">
                  <img
                    src="/images/shoots/DSC07736.JPG"
                    alt="Emerald Bird Pearl Strand Haar"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] sm:text-[12px] font-sans text-[#420002]">
                  <span><em className="font-serif mr-1">01</em> Necklaces</span>
                  <span className="font-medium text-[#c82127]">₹ 5,600</span>
                </div>
              </Link>

            </div>

            {/* Bottom Right "View All ⟶" Link */}
            <div className="flex justify-end mt-12 sm:mt-16">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-sans font-medium text-[#420002] hover:text-[#c82127] transition-colors group"
              >
                <span>View All</span>
                <span className="font-serif text-sm transition-transform duration-300 group-hover:translate-x-1">⟶</span>
              </Link>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            FULL-BLEED CINEMATIC BANNER WITH PLAY BUTTON
        ════════════════════════════════════════════════════ */}
        <section className="relative z-10 w-full aspect-[16/9] sm:aspect-[21/9] max-h-[640px] overflow-hidden group border-y border-[#420002]/10">
          <img
            src="/images/craft.jpg"
            alt="Layered Jewellery Showcase"
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

          {/* Centered Translucent Glass Play Button (Matching Reference) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label="Play Atelier Film"
              className="group/btn relative flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-2xl"
            >
              {/* Outer concentric pulse ring */}
              <div className="absolute -inset-2 rounded-full border border-white/20 animate-ping opacity-60 pointer-events-none" />
              
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fffaee] text-[#420002] flex items-center justify-center pl-1 shadow-md group-hover/btn:bg-[#c82127] group-hover/btn:text-[#fffaee] transition-colors">
                <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
              </div>
            </button>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            EDITORIAL MOSAIC & "FOLLOW US @ZEVARBAKSA"
        ════════════════════════════════════════════════════ */}
        <section className="relative z-10 w-full py-20 sm:py-28 px-6 sm:px-12 md:px-20 overflow-hidden">
          <div className="max-w-6xl mx-auto">

            {/* Staggered Mosaic Multi-Tile Grid */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center">
              
              {/* Column 1: Small tile + Long tile */}
              <div className="col-span-6 sm:col-span-3 flex flex-col gap-4 sm:gap-6">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4eee1] shadow-sm group">
                  <img
                    src="/images/real-shot-5.jpg"
                    alt="Editorial Hand Rings"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4eee1] shadow-sm group">
                  <img
                    src="/images/real-shot-6.jpg"
                    alt="Jewellery Stacking"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Column 2: Large Center Tile (Model Portrait) */}
              <div className="col-span-12 sm:col-span-6 order-first sm:order-none">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4eee1] shadow-lg group">
                  <img
                    src="/images/about-editorial.jpg"
                    alt="Signature Heirloom Shoot"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Column 3: Stacked Right Photos */}
              <div className="col-span-6 sm:col-span-3 flex flex-col gap-4 sm:gap-6">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4eee1] shadow-sm group">
                  <img
                    src="/images/real-shot-7.jpg"
                    alt="Editorial Necklace Layers"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4eee1] shadow-sm group">
                  <img
                    src="/images/real-shot-8.jpg"
                    alt="Heirloom Details"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

            </div>

            {/* Integrated Typography & Thumbnail Row (Exact Reference Format) */}
            <div className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-[#420002]/10 pt-10">
              
              {/* Big Follow Us Serif Typography */}
              <div className="flex flex-col text-left">
                <span className="font-serif text-4xl sm:text-6xl md:text-7xl lowercase tracking-tight text-[#420002] leading-none">
                  follow us
                </span>
                <span className="font-serif text-4xl sm:text-6xl md:text-7xl lowercase tracking-tight text-[#c82127] leading-none">
                  @zevarbaksa
                </span>
              </div>

              {/* Lifestyle Thumbnail Accents */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative w-16 h-20 sm:w-20 sm:h-24 overflow-hidden bg-[#f4eee1] shadow-sm">
                  <img
                    src="/images/real-shot-3.jpg"
                    alt="Follow Thumbnail 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 overflow-hidden bg-[#f4eee1] shadow-sm">
                  <img
                    src="/images/real-shot-4.jpg"
                    alt="Follow Thumbnail 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>
    </Layout>
  );
}
