"use client";

import { use, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { collections } from "@/data/collections";
import type { CollectionItem } from "@/data/collections";

/* ─── Ornamental thin divider ─── */
function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-1 select-none pointer-events-none">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-foreground/15" />
      <div className="h-1.5 w-1.5 rotate-45 border border-foreground/20" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-foreground/15" />
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

/* ═══════════════════════════════════════════
   HERO SECTION — Full viewport collection banner
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
    <section className="relative w-full h-[85vh] min-h-[560px] overflow-hidden bg-[#0A0506] flex flex-col">
      {/* Background image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover object-center opacity-70 pointer-events-none select-none"
      />

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />

      {/* Content — centered text */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 px-8 text-center">
        {/* Kicker */}
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#FAF7F2]/70 font-body mb-4 drop-shadow-sm">
          The Collection
        </p>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#FAF7F2] leading-[0.95] drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] max-w-4xl">
          {title}
        </h1>

        {/* Ornament */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FAF7F2]/40" />
          <div className="h-2 w-2 rotate-45 border border-[#FAF7F2]/40" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FAF7F2]/40" />
        </div>

        {/* Subtitle */}
        <p className="text-[14px] md:text-[16px] text-[#FAF7F2]/85 leading-[1.8] font-body max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {subtitle}
        </p>

        {/* Scroll indicator */}
        <div className="mt-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#FAF7F2]/50 font-body">
            Scroll to Explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[#FAF7F2]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PRODUCT SHOWCASE — Alternating image/text blocks
   Inspired by Tiffany's layout
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
      className={`w-full grid grid-cols-1 md:grid-cols-2 min-h-[85vh] border-b border-border/20 transition-all duration-[1200ms] ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* IMAGE PANEL */}
      <div
        className={`relative overflow-hidden bg-[#F0EDE8] min-h-[50vh] md:min-h-[85vh] ${
          isReversed ? "md:order-2" : "md:order-1"
        }`}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[2000ms] ease-out hover:scale-[1.03]"
        />
      </div>

      {/* TEXT PANEL */}
      <div
        className={`flex items-center justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 bg-background ${
          isReversed ? "md:order-1" : "md:order-2"
        }`}
      >
        <div className="max-w-md w-full flex flex-col items-center text-center">
          {/* Collection item index */}
          <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 font-body mb-6">
            {String(index + 1).padStart(2, "0")} / Piece
          </span>

          {/* Name */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary leading-[1.05] mb-3">
            {item.name}
          </h2>

          {/* Tagline */}
          <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50 font-body mb-6">
            {item.tagline}
          </p>

          <OrnamentalDivider />

          {/* Description */}
          <p className="text-[14px] md:text-[15px] text-foreground/75 leading-[1.85] font-body mt-6 mb-8">
            {item.description}
          </p>

          {/* Price */}
          <span className="text-[13px] tracking-[0.15em] text-foreground/40 font-body mb-6">
            Starting at {item.price}
          </span>

          {/* CTA Button */}
          <Link
            href={`/product/${item.id}`}
            className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-body font-semibold hover:bg-[#5C0A19] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
          >
            {item.cta} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   COLLECTION INDEX — "Explore All Pieces" grid
═══════════════════════════════════════════ */
function CollectionIndex({
  items,
}: {
  items: CollectionItem[];
}) {
  return (
    <section className="w-full bg-[#0A0506] py-24 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#FAF7F2]/50 font-body mb-3">
            All Pieces
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-[#FAF7F2] leading-tight">
            Explore the Full Collection
          </h2>
        </div>

        {/* Grid of thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="group block overflow-hidden"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1a0a0e]">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-display text-lg md:text-xl text-[#FAF7F2] leading-snug mb-1 drop-shadow-sm">
                    {item.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#FAF7F2]/60 font-body">
                    {item.price}
                  </p>
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
   BOTTOM CTA — Back to collections
═══════════════════════════════════════════ */
function BottomCTA() {
  return (
    <section className="w-full bg-background border-t border-border py-20 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/40 font-body mb-3">
          Continue Exploring
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-primary leading-tight mb-6">
          Every Piece Tells a Story
        </h2>
        <p className="text-[14px] text-foreground/60 leading-[1.8] font-body mb-8">
          Our collections are inspired by the architectural grandeur of
          Rajasthan and the celestial beauty of Indian heritage. Each piece is
          handcrafted with love and precision.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-body font-semibold hover:bg-[#5C0A19] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.03]"
          >
            Shop All Pieces <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-body text-foreground/50 hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Home
          </Link>
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
        <div className="flex items-center justify-center h-screen bg-background">
          <div className="text-center">
            <h1 className="font-display text-4xl text-primary mb-4">
              Collection Not Found
            </h1>
            <p className="text-foreground/60 font-body mb-8">
              The collection you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-body font-semibold hover:bg-[#5C0A19] transition-all duration-300"
            >
              <ArrowLeft className="h-3 w-3" /> Go Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <CollectionHero
        title={collection.heroTitle}
        subtitle={collection.heroSubtitle}
        image={collection.heroImage}
      />

      {/* Alternating Product Showcases */}
      {collection.items.map((item, index) => (
        <ProductShowcase key={item.id} item={item} index={index} />
      ))}

      {/* Collection Index Grid */}
      <CollectionIndex items={collection.items} />

      {/* Bottom CTA */}
      <BottomCTA />
    </Layout>
  );
}
