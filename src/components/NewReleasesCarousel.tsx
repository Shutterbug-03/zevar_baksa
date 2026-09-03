"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { useProductStore } from "@/store/productStore";

export function NewReleasesCarousel() {
  const { products } = useProductStore();

  const slides = React.useMemo(() => {
    return products.map((product) => ({
      src: product.image,
      alt: product.name,
      title: product.name,
      subtitle: product.subtitle,
      href: `/product/${product.id}`,
    }));
  }, [products]);

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] md:min-h-screen overflow-hidden pt-6 sm:pt-10 pb-16 sm:pb-20 md:pb-24 bg-[#fffaee] flex flex-col justify-center">
      
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-3 sm:px-6 md:px-12 flex flex-col items-center">
        {/* Section Heading — Fluid responsive typography */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 md:mb-10 flex flex-col items-center px-4">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-[#c82127] font-semibold font-body mb-1">
            New Releases
          </p>

          {/* Ornamental Brand Accent */}
          <div className="flex items-center gap-2 sm:gap-2.5 my-1 sm:my-1.5">
            <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-[#c82127]/60" />
            <div className="h-[2px] w-14 sm:w-16 bg-gradient-to-r from-[#420002] via-[#c82127] to-[#420002] rounded-full" />
            <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-[#c82127]/60" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#420002] leading-tight">
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
        <div className="mt-8 sm:mt-10 flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 rounded-full bg-[#420002] px-7 sm:px-8 py-3 sm:py-3.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#fffaee] shadow-md transition-all duration-300 hover:bg-[#c82127] active:scale-95 hover:scale-105"
          >
            Explore All Masterpieces
            <ArrowRight className="h-3.5 w-3.5 text-[#fffaee] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
