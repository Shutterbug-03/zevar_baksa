import type { Product } from "@/data/products";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
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
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl md:text-2xl leading-none text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <span className="text-sm font-body text-foreground/75 font-medium">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-[0.24em] font-body text-muted-foreground">
        {product.category}
      </p>
    </Link>
  );
}
