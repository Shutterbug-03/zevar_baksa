"use client";

import type { Product } from "@/data/products";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import { useHydrated } from "@/hooks/useHydrated";

export function ProductCard({ product }: { product: Product }) {
  const { toggle, isWishlisted } = useWishlistStore();
  const { format } = useCurrencyStore();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useHydrated();
  const wishlisted = hydrated ? isWishlisted(product.id) : false;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && product.gallery && product.gallery.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.gallery.length);
      }, 1400); // Very smooth, slightly slower pacing
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, product.gallery]);

  return (
    <div className="group block relative">
      <Link href={`/product/${product.id}`}>
        <div 
          className="relative overflow-hidden aspect-[4/5] rounded-lg bg-[#0d0204]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {product.gallery && product.gallery.length > 0 ? (
            product.gallery.map((imgSrc, idx) => (
              <img
                key={imgSrc}
                src={imgSrc}
                alt={`${product.name} - view ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105"
                style={{ 
                  opacity: idx === currentImageIndex ? 1 : 0,
                  zIndex: idx === currentImageIndex ? 10 : 0,
                  transition: `opacity 700ms ease-in-out ${idx === currentImageIndex ? '0ms' : '700ms'}, transform 1500ms ease-out`
                }}
              />
            ))
          ) : (
            <img
              src={product.image}
              alt={product.name}
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
            />
          )}
          <span className="absolute left-3 top-3 bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-foreground/80 rounded-sm shadow-sm font-body z-20">
            {product.status}
          </span>
        </div>
      </Link>

      {/* Wishlist heart */}
      <button
        onClick={(e) => {
          e.preventDefault();
          if (authLoaded && !isSignedIn) {
            router.push(`/login?redirect_url=${encodeURIComponent(pathname)}`);
            return;
          }
          toggle(product);
        }}
        aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
        className={`absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 z-30 ${
          wishlisted
            ? "bg-primary/90 text-primary-foreground"
            : "bg-background/80 text-foreground/50 hover:text-primary hover:bg-background"
        }`}
      >
        <Heart className={`h-3.5 w-3.5 ${wishlisted ? "fill-current" : ""}`} />
      </button>

      <div className="mt-4 flex items-start justify-between gap-4">
        <Link href={`/product/${product.id}`} className="flex-1">
          <h3 className="font-serif text-xl md:text-2xl leading-none text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.24em] font-body text-muted-foreground">
            {product.category}
          </p>
        </Link>
        <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
          <span className="text-sm font-body text-foreground/75 font-medium">
            {hydrated ? format(product.price) : `₹${product.price.toLocaleString("en-IN")}`}
          </span>
        </div>
      </div>
    </div>
  );
}
