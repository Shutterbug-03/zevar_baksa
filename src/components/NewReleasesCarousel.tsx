"use client";

import * as React from "react";
import Link from "next/link";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { products } from "@/data/products";

// A repeating wavy divider line using SVG path
const WavyBorder = () => (
  <div className="w-full overflow-hidden h-[8px] relative flex justify-start items-center my-3 opacity-30 select-none pointer-events-none">
    <div className="flex w-max">
      {Array(100)
        .fill(0)
        .map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 40 8"
            className="w-[40px] h-[8px] fill-none stroke-foreground stroke-[1]"
          >
            <path d="M0,4 C5,0 15,0 20,4 C25,8 35,8 40,4" />
          </svg>
        ))}
    </div>
  </div>
);

// The monogram brand stamp
const Stamp = () => (
  <div className="relative flex items-center justify-center w-14 h-14 border border-foreground/30 rounded-full p-2 bg-background mx-8 my-1 flex-shrink-0">
    <div className="absolute inset-0.5 border border-foreground/10 rounded-full" />
    <img
      src="/logos/submark.png"
      alt="Stamp"
      className="h-7 w-auto object-contain brightness-0 contrast-200 text-foreground"
    />
  </div>
);

export function NewReleasesCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28 bg-background">
      {/* Background Image */}
      <img
        src="/images/new-releases-bg.jpg"
        alt="New Releases Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />

      <div className="relative z-10">
        {/* Centered Section Heading — constrained inside central dark maroon block */}
        <div className="text-center max-w-md md:max-w-lg mx-auto px-4 mb-8 flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#FAF7F2]/90 font-semibold font-body mb-1.5 drop-shadow-sm">
            New Releases
          </p>

          {/* Bold Thick Ornamental Maroon & Cream Line */}
          <div className="flex items-center gap-3 my-2">
            <div className="h-[3px] w-8 bg-gradient-to-r from-transparent to-[#FAF7F2]/60 rounded-full" />
            <div className="h-[5px] w-24 bg-gradient-to-r from-[#7A1D2E] via-[#FAF7F2] to-[#7A1D2E] rounded-full shadow-lg border border-[#FAF7F2]/30" />
            <div className="h-[3px] w-8 bg-gradient-to-l from-transparent to-[#FAF7F2]/60 rounded-full" />
          </div>

          <h2 className="font-display text-2xl md:text-4xl text-[#FAF7F2] leading-[1.15] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] mt-1">
            Collection Designed for Every Occasion
          </h2>
        </div>

        {/* Embla Product Carousel */}
        <div className="mx-auto max-w-[1600px] px-6 md:px-16 pt-2 pb-6 relative group">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Link href={`/product/${product.id}`} className="group block overflow-hidden rounded-xl border border-[#FAF7F2]/20 bg-[#2B050B]/90 backdrop-blur-sm shadow-xl transition-all duration-300 hover:border-[#FAF7F2]/60 hover:shadow-2xl">
                    {/* Image container */}
                    <div className="relative overflow-hidden aspect-[4/5] bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                    </div>
                    {/* Meta details wrapped in rich maroon card panel */}
                    <div className="p-4 flex flex-col items-start gap-1 bg-[#3B0710]/95 backdrop-blur-md border-t border-[#FAF7F2]/10">
                      <h3 className="font-serif-brand text-xl text-[#FAF7F2] group-hover:text-[#FAF7F2]/90 transition-colors leading-snug drop-shadow-sm">
                        {product.name}
                      </h3>
                      <span className="text-sm text-[#FAF7F2]/80 font-body drop-shadow-sm">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="mt-1 text-[9px] uppercase tracking-[0.18em] font-semibold text-[#FAF7F2]/90 font-body">
                        {product.status}
                      </span>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Controls in maroon theme */}
            <div className="absolute top-[38%] -left-4 md:left-4 z-10 transition-opacity duration-300 opacity-80 group-hover:opacity-100">
              <CarouselPrevious className="h-9 w-9 rounded-full border border-[#FAF7F2]/40 hover:border-[#FAF7F2] hover:text-[#FAF7F2] bg-[#3B0710]/90 hover:bg-[#5C0A19] backdrop-blur-md text-[#FAF7F2] shadow-lg flex items-center justify-center disabled:opacity-30" />
            </div>
            <div className="absolute top-[38%] -right-4 md:right-4 z-10 transition-opacity duration-300 opacity-80 group-hover:opacity-100">
              <CarouselNext className="h-9 w-9 rounded-full border border-[#FAF7F2]/40 hover:border-[#FAF7F2] hover:text-[#FAF7F2] bg-[#3B0710]/90 hover:bg-[#5C0A19] backdrop-blur-md text-[#FAF7F2] shadow-lg flex items-center justify-center disabled:opacity-30" />
            </div>
          </Carousel>

          {/* Page indicator dots */}
          <div className="flex justify-center gap-2.5 mt-10">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-[#FAF7F2] w-6 scale-100 shadow-sm"
                    : "bg-[#FAF7F2]/30 hover:bg-[#FAF7F2]/60 scale-90"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
