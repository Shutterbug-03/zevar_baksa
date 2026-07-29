"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, Search, ArrowRight } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { products } from "@/data/products";
import { useCurrencyStore } from "@/store/currencyStore";

export function SearchModal() {
  const { searchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { format } = useCurrencyStore();

  // Filter products by query
  const results = query.trim().length >= 2
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.collection?.toLowerCase().includes(q) ||
          p.specs.gemstones.toLowerCase().includes(q)
        );
      })
    : [];

  // Auto-focus input when modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeSearch]);

  // Lock body scroll
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className={`fixed inset-0 z-[80] bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Search Panel */}
      <div
        className={`fixed inset-x-0 top-0 z-[90] bg-background border-b border-border shadow-2xl transition-transform duration-500 ease-in-out ${
          searchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          {/* Search Input Row */}
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 text-foreground/40 flex-shrink-0 stroke-[1.4]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search heirloom pieces, collections, gemstones..."
              className="flex-1 bg-transparent text-lg md:text-2xl font-display text-foreground placeholder:text-foreground/25 outline-none border-none"
            />
            <button
              onClick={closeSearch}
              className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors flex-shrink-0"
            >
              <X className="h-4 w-4 stroke-[1.5] text-foreground/60" />
            </button>
          </div>

          {/* Quick suggestions when query is empty */}
          {query.trim().length === 0 && (
            <div className="mt-6 pb-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-sans mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {["Jhumka", "Bridal Set", "Kundan", "Polki", "Necklace", "Bracelet"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full border border-border/60 text-[11px] uppercase tracking-[0.15em] font-sans text-foreground/60 hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-6 pb-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-sans mb-4">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={closeSearch}
                    className="group flex gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-14 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <h3 className="text-sm font-display text-foreground group-hover:text-primary transition-colors truncate">
                        {product.name}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-sans">
                        {product.category}
                      </p>
                      <p className="text-sm font-sans font-semibold text-primary mt-0.5">
                        {format(product.price)}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-foreground/20 group-hover:text-primary ml-auto self-center flex-shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {query.trim().length >= 2 && results.length === 0 && (
            <div className="mt-6 pb-4 text-center">
              <p className="text-sm text-foreground/50 font-sans">
                No pieces found for &quot;{query}&quot;
              </p>
              <Link
                href="/shop"
                onClick={closeSearch}
                className="inline-flex items-center gap-1.5 mt-3 text-[11px] uppercase tracking-[0.2em] font-sans text-primary hover:underline"
              >
                Browse All Pieces <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
