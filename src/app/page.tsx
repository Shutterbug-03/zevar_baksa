"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { NewReleasesCarousel } from "@/components/NewReleasesCarousel";
import { MarqueeRibbon } from "@/components/MarqueeRibbon";
import { CollageGallery } from "@/components/CollageGallery";
import { FaqSection } from "@/components/FaqSection";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If src is not already picked by <source>, set according to viewport
    if (!video.currentSrc) {
      video.src = window.matchMedia("(max-width: 768px)").matches
        ? "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/hero-video-mobile.mp4"
        : "http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/hero-video.mp4";
    }

    // Safari requires muted to be set imperatively before calling play()
    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked (e.g. Safari low-power mode) — silently ignored
      });
    };

    // Attempt immediately, then retry on canplay in case Safari defers
    tryPlay();
    video.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <Layout>

      {/* ════════════════════════════════════════════════════
          1. HERO — Full Viewport Cinematic Video with Transparent Header
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[100svh] min-h-[640px] bg-[#fffaee]">
        
        {/* Full-Bleed Cinematic Background Video Container (Clipped) */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            poster="http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            {...{ "x-webkit-airplay": "deny" }}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          >
            <source
              media="(max-width: 768px)"
              src="http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/hero-video-mobile.mp4"
              type="video/mp4"
            />
            <source
              src="http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/hero-video.mp4"
              type="video/mp4"
            />
          </video>

          {/* Cinematic Scrim Gradient: Solves contrast against workbench clutter (tape, bottles) without blurring */}
          <div className="absolute inset-x-0 bottom-0 h-44 sm:h-56 bg-gradient-to-t from-[#1b0809]/85 via-[#1b0809]/40 to-transparent pointer-events-none" />
        </div>

        {/* ════════════════════════════════════════════════════
            CENTRAL SEAM WORDMARK — "ZEVAR BAKSA"
            UI/UX Pro Max Classical Luxury Editorial Architecture:
            - Cormorant Garamond classical Roman capitals (no drooping swashes)
            - Expanded royal letter-spacing (tracking-[0.28em] to 0.42em)
            - Precision split-tone across the exact seam
            - Upper: Warm Ivory (#fffaee) with ambient depth shadow
            - Lower: Imperial Jaipur Maroon (#420002)
        ════════════════════════════════════════════════════ */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-30 pointer-events-none select-none flex justify-center px-4">
          <div className="relative inline-flex justify-center items-center text-center">
            
            {/* Top Half (Over Video) — Warm Ivory with ambient luxury depth */}
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-cormorant), 'Playfair Display', Georgia, serif",
                clipPath: "polygon(0 0, 100% 0, 100% 50.2%, 0 50.2%)",
              }}
              className="absolute inset-0 font-light uppercase text-[#fffaee] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.75rem] tracking-[0.26em] sm:tracking-[0.32em] md:tracking-[0.38em] lg:tracking-[0.42em] leading-none whitespace-nowrap"
            >
              ZEVAR BAKSA
            </span>

            {/* Bottom Half (Over Cream Page) — Imperial Brand Maroon */}
            <h1
              style={{
                fontFamily: "var(--font-cormorant), 'Playfair Display', Georgia, serif",
                clipPath: "polygon(0 49.8%, 100% 49.8%, 100% 100%, 0 100%)",
              }}
              className="relative font-light uppercase text-[#420002] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.75rem] tracking-[0.26em] sm:tracking-[0.32em] md:tracking-[0.38em] lg:tracking-[0.42em] leading-none whitespace-nowrap"
            >
              ZEVAR BAKSA
            </h1>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. ABOUT US — Exact Brand Story (Blended seamlessly with Hero & Section 3)
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[75vh] pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 bg-[#fffaee] flex flex-col justify-center">
        
        {/* Content Container */}
        <div className="relative z-20 mx-auto w-full max-w-[1500px] px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column — Exact Editorial Brand Story */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Brand Story Heading */}
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#420002] leading-[1.15] max-w-xl mb-3 sm:mb-4">
                BRAND STORY
              </h2>

              {/* Exact Narrative Text Paragraphs — Compact & High Readability */}
              <div className="space-y-3.5 sm:space-y-4 text-[12px] sm:text-[13px] md:text-[13.5px] text-[#420002] leading-[1.65] sm:leading-[1.7] font-sans font-light max-w-2xl">
                <p>
                  It started with crayons on a bedroom floor; a girl watching her mother design jewellery, then trying to design her own. That instinct never really left.
                </p>
                <p>
                  Zevar Baksa is where it landed. Zevar means jewellery, Baksa means box; a jewellery box, a nod to everything jewellery can carry, and everything it can mean.
                </p>
                <p className="text-[#420002]/60 leading-[1.85] sm:leading-[1.95] tracking-wide">
                  Jaipur runs on the hands of its artisans, and that&apos;s where we come from. Zevar Baksa exists to give them the credit they rarely receive; every piece designed from scratch, shaped in collaboration with the artisan and designer behind it, their name carried with the collection, not left behind at the workshop door.
                </p>
                <p>
                  Our aim is reinterpretation; taking culture, nature, and tradition and giving them a contemporary edge. Every collection, and every metal we choose for it, carries a reason; a purpose, a meaning, nothing picked at random.
                </p>
                <p className="text-[#420002]/60 leading-[1.85] sm:leading-[1.95] tracking-wide">
                  That same intention runs through our logos. English marks our modern collections, Hindi marks the traditional ones; written in our founder&apos;s mother&apos;s hand, a personal thread stitched into the brand; and a submark that&apos;s simply us, distilled.
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
                
                {/* Main Photo: Brand Story Showcase */}
                <div className="relative z-10 w-full aspect-[4/5] overflow-hidden shadow-2xl rounded-lg bg-[#f4eee1] group">
                  <img
                    src="http://supabasekong-j3msdlgzavva5jgddpsq05gs.72.61.236.7.sslip.io/storage/v1/object/public/media/brand-story.jpg"
                    alt="Zevar Baksa Brand Story Jewellery"
                    className="h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle Luxury Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#420002]/40 via-transparent to-transparent pointer-events-none" />
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
      <MarqueeRibbon text="Meena Bagh • New Releases" />

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
