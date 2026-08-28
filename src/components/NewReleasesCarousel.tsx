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
    <section className="relative w-full min-h-[85vh] sm:min-h-[88vh] overflow-hidden pt-14 sm:pt-18 pb-16 sm:pb-20 bg-[#fffaee] flex flex-col justify-center border-b border-[#420002]/10">
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-12 flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 flex flex-col items-center px-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-[#c82127]">✦</span>
            <span className="text-[9.5px] uppercase tracking-[0.3em] text-[#c82127] font-semibold font-sans">
              Curated Editions
            </span>
            <span className="text-[10px] text-[#c82127]">✦</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-[#420002] leading-tight">
            Designed for Every Occasion
          </h2>

          <div className="w-12 h-[2px] bg-[#c82127] mt-3" />
        </div>

        {/* 3D Coverflow Sized for Phones, Tablets & Desktop */}
        <div className="relative mx-auto w-full max-w-5xl">
          <CoverflowCarousel
            slides={slides}
            showCaption={true}
            showNavigation={true}
            showPagination={false}
            cardWidth="clamp(190px, 52vw, 340px)"
            rotate={30}
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
            className="group inline-flex items-center gap-2 rounded-full bg-[#c82127] text-[#fffaee] px-7 sm:px-8 py-3 text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] shadow-sm transition-all duration-300 hover:bg-[#a5181d] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore All Masterpieces</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
