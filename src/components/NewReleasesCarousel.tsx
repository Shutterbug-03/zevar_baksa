"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { products } from "@/data/products";

export function NewReleasesCarousel() {
  const slides = React.useMemo(() => {
    return products.map((product) => ({
      src: product.image,
      alt: product.name,
      title: product.name,
      subtitle: product.subtitle,
      price: `₹${product.price.toLocaleString("en-IN")}`,
      href: `/product/${product.id}`,
    }));
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] md:min-h-screen overflow-hidden pt-10 sm:pt-14 pb-16 sm:pb-20 md:pb-24 bg-[#1A0307] flex flex-col justify-center">
      {/* Background Image with rich seamless maroon overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/images/new-releases-bg.jpg"
          alt="New Releases Background"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        {/* Seamless top & bottom blending gradients */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#1A0307] via-[#1A0307]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0307]/60 via-transparent to-[#1A0307]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0307]/90 via-transparent to-[#1A0307]/90" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-3 sm:px-6 md:px-12 flex flex-col items-center">
        {/* Section Heading — Fluid responsive typography */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6 md:mb-8 flex flex-col items-center px-4">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-amber-300 font-semibold font-body mb-1">
            New Releases
          </p>

          {/* Ornamental Gold Accent */}
          <div className="flex items-center gap-2 sm:gap-2.5 my-1 sm:my-1.5">
            <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-amber-300/70" />
            <div className="h-[2.5px] sm:h-[3px] w-14 sm:w-20 bg-gradient-to-r from-[#7A1D2E] via-amber-300 to-[#7A1D2E] rounded-full shadow-[0_0_10px_rgba(252,211,77,0.4)]" />
            <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-amber-300/70" />
          </div>

          <h2 className="font-display text-xl sm:text-3xl md:text-4xl text-[#FAF7F2] leading-tight drop-shadow-md">
            Collection Designed for Every Occasion
          </h2>
        </div>

        {/* 3D Coverflow Sized for Phones, Tablets & Desktop */}
        <div className="relative mx-auto w-full max-w-5xl">
          <CoverflowCarousel
            slides={slides}
            showCaption={true}
            showNavigation={true}
            showPagination={false}
            cardWidth="clamp(190px, 52vw, 340px)"
            rotate={34}
            depth={0.65}
            perspective={2.7}
            gap={0.06}
            className="py-1 sm:py-2"
          />
        </div>

        {/* Minimal Explore All Masterpieces Button */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-[#2B050B]/90 px-6 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#FAF7F2] backdrop-blur-md shadow-xl transition-all duration-300 hover:border-amber-300 hover:bg-[#450A14] hover:shadow-[0_0_20px_rgba(252,211,77,0.25)] active:scale-95 hover:scale-105"
          >
            Explore All Masterpieces
            <ArrowRight className="h-3.5 w-3.5 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
