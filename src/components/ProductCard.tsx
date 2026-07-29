"use client";

import type { Product } from "@/data/products";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCurrencyStore } from "@/store/currencyStore";

export function ProductCard({ product }: { product: Product }) {
  const { toggle, isWishlisted } = useWishlistStore();
  const { format } = useCurrencyStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group block relative">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-muted aspect-[4/5] rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-foreground/80 rounded-sm shadow-sm font-body">
            {product.status}
          </span>
        </div>
      </Link>

      {/* Wishlist heart */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(product);
        }}
        aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
        className={`absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 ${
          wishlisted
            ? "bg-primary/90 text-primary-foreground"
            : "bg-background/80 text-foreground/50 hover:text-primary hover:bg-background"
        }`}
      >
        <Heart className={`h-3.5 w-3.5 ${wishlisted ? "fill-current" : ""}`} />
      </button>

      <Link href={`/product/${product.id}`}>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-xl md:text-2xl leading-none text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="text-sm font-body text-foreground/75 font-medium flex-shrink-0">
            {format(product.price)}
          </span>
        </div>
        <p className="mt-1 text-[10px] uppercase tracking-[0.24em] font-body text-muted-foreground">
          {product.category}
        </p>
      </Link>
    </div>
  );
}
