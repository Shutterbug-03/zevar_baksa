"use client";

import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useHydrated } from "@/hooks/useHydrated";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { format } = useCurrencyStore();
  const hydrated = useHydrated();

  const wishlistItems = hydrated ? items : [];

  return (
    <Layout>
      <section className="pt-32 md:pt-40 pb-16 border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.32em] text-primary">Your Collection</p>
          <h1 className="mt-4 font-display text-6xl md:text-8xl leading-[0.9]">
            Wishlist.<em className="not-italic italic"> ({wishlistItems.length})</em>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 md:px-12 py-16 md:py-20">
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <div className="h-20 w-20 rounded-full bg-secondary/60 flex items-center justify-center">
              <Heart className="h-9 w-9 text-foreground/20 stroke-[1.2]" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/40 font-sans">
              No pieces saved yet
            </p>
            <p className="text-sm text-foreground/50 font-sans max-w-[280px]">
              Tap the heart icon on any piece to save it to your wishlist.
            </p>
            <Link
              href="/shop"
              className="mt-2 inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full text-[11px] uppercase tracking-[0.22em] font-sans font-semibold hover:bg-[#5C0A19] transition-all duration-300 shadow-md"
            >
              Explore Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
            {wishlistItems.map((product) => (
              <div key={product.id} className="group relative">
                {/* Image */}
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Status badge */}
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] font-semibold font-sans ${
                      product.status === "Ready to Ship"
                        ? "bg-emerald-950/80 text-emerald-200 border border-emerald-500/30"
                        : product.status === "Made to Order"
                        ? "bg-amber-950/80 text-amber-200 border border-amber-500/30"
                        : "bg-stone-900/80 text-stone-300 border border-stone-700/30"
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </Link>

                {/* Remove wishlist */}
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-red-400 hover:bg-background transition-all shadow-md"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>

                {/* Info */}
                <div className="mt-4 space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-sans">
                    {product.category}
                  </p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-display text-xl text-foreground hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-base font-sans font-semibold text-primary">
                    {format(product.price)}
                  </p>
                </div>

                {/* Add to cart */}
                <button
                  onClick={() => addItem(product)}
                  disabled={product.status === "Out of Stock"}
                  className="mt-3 w-full py-2.5 rounded-full border border-primary/30 text-primary text-[10px] uppercase tracking-[0.2em] font-sans font-semibold hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {product.status === "Out of Stock" ? "Out of Stock" : "Add to Heirloom Box"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
