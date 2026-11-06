"use client";

import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/Img";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { NewReleasesCarousel } from "@/components/NewReleasesCarousel";
import { MarqueeRibbon } from "@/components/MarqueeRibbon";
import { CollageGallery } from "@/components/CollageGallery";
import { FaqSection } from "@/components/FaqSection";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // The poster still covers the video until it is really playing. If a phone blocks autoplay
  // (iOS Low Power Mode, data saver, in-app browsers) visitors see a clean still frame instead of
  // the browser's own play button, and the still fades into the video once it starts.
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly configure DOM properties required by Safari/WebKit & Chrome mobile autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    const tryPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay deferred (e.g. Safari low-power mode); will auto-start on first touch/scroll
        });
      }
    };

    // The video often starts before React attaches onPlaying, so read its real state here too.
    const markPlaying = () => {
      if (!video.paused && video.currentTime > 0) setVideoPlaying(true);
    };
    markPlaying();
    video.addEventListener("playing", markPlaying);
    video.addEventListener("timeupdate", markPlaying);

    // Attempt immediately, then on load events in case browser defers
    tryPlay();
    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", tryPlay, { once: true });
    video.addEventListener("canplaythrough", tryPlay, { once: true });

    // Phones that block autoplay (iOS Low Power Mode, data saver) allow play() after a tap.
    // Keep listening until playback really starts: a failed attempt must not use up the retry.
    // (Scroll is not a tap, so browsers reject play() from it; it is not used.)
    const onUserInteraction = () => {
      if (!video.paused) return removeInteractionListeners();
      video.play().then(removeInteractionListeners).catch(() => {});
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("touchend", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
    };

    window.addEventListener("touchend", onUserInteraction, { passive: true });
    window.addEventListener("pointerdown", onUserInteraction, { passive: true });
    window.addEventListener("keydown", onUserInteraction);

    return () => {
      video.removeEventListener("playing", markPlaying);
      video.removeEventListener("timeupdate", markPlaying);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("canplaythrough", tryPlay);
      removeInteractionListeners();
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
            poster="/hero-poster.jpg?v=3"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            {...{
              "webkit-playsinline": "true",
              "x-webkit-airplay": "deny",
              "x5-video-player-type": "h5",
              "x5-video-player-fullscreen": "true",
            }}
            onPlaying={() => setVideoPlaying(true)}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none [&::-webkit-media-controls]:hidden! [&::-webkit-media-controls-start-playback-button]:hidden! [&::-webkit-media-controls-play-button]:hidden!"
          >
            <source
              media="(max-width: 768px)"
              src="/hero-video-mobile.mp4?v=4"
              type="video/mp4"
            />
            <source
              src="/hero-video.mp4?v=4"
              type="video/mp4"
            />
          </video>

          {/* Poster cover: hides any native play button until the video is actually playing */}
          <Img
            src="/hero-poster.jpg"
            sizes="100vw"
            priority
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-opacity duration-700 ease-out ${
              videoPlaying ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Minimal Soft Vignette: Subtle, transparent, does not dim the video */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Semantic SEO Heading */}
        <h1 className="sr-only">Zevar Baksa — Handcrafted Heirloom Jewellery</h1>
      </section>

      {/* ════════════════════════════════════════════════════
          2. ABOUT US — Exact Brand Story (Blended seamlessly with Hero & Section 3)
      ════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[75vh] pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 bg-[#fffaee] flex flex-col justify-center">
        
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
                  <Img
                    src="/brand-story.jpg"
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
