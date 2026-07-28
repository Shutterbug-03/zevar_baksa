"use client";

import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useState } from "react";

const categories = ["All", "Necklaces", "Earrings", "Bracelets", "Bridal"];

export default function Shop() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <Layout>
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.32em] text-primary">The Baksa</p>
          <h1 className="mt-4 font-display text-6xl md:text-8xl leading-[0.9]">
            Shop <em className="not-italic italic">all pieces.</em>
          </h1>
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2 text-xs uppercase tracking-[0.24em] border transition ${
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground/70 hover:border-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-24 text-muted-foreground">Nothing here yet — check back soon.</p>
        )}
      </section>
    </Layout>
  );
}
