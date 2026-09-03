/**
 * Product Store — single source of truth for the product catalog.
 *
 * Fetch strategy (in priority order):
 *  1. GET /api/products  — BUSY ERP if credentials are set, else static fallback
 *  2. Static import from @/data/products — last-resort fallback if the API call fails
 *
 * This store is intentionally NOT persisted (no localStorage).
 * Products should always be fresh from the server.
 */

import { create } from "zustand";
import { products as staticProducts, type Product } from "@/data/products";

type LoadStatus = "idle" | "loading" | "ready" | "error";

type ProductStore = {
  products: Product[];
  status: LoadStatus;
  error: string | null;
  /** Fetch products from /api/products (BUSY-first, static fallback). Idempotent — no-ops if already loading or ready. */
  fetchProducts: () => Promise<void>;
  /** Force a fresh fetch regardless of current status. */
  refetch: () => Promise<void>;
  getById: (id: string) => Product | undefined;
  getByCategory: (category: string) => Product[];
  getByCollection: (slug: string) => Product[];
};

async function loadProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", {
      // Next.js will dedupe these during the same render pass
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`/api/products returned ${res.status}`);
    const data = await res.json();
    const prods = data.products as Product[];
    if (!Array.isArray(prods) || prods.length === 0) {
      throw new Error("Empty product list from API — falling back to static");
    }
    return prods;
  } catch (err) {
    console.warn("[productStore] API fetch failed, using static products:", err);
    return staticProducts;
  }
}

export const useProductStore = create<ProductStore>()((set, get) => ({
  products: staticProducts, // Pre-populate with static data so UI never shows empty
  status: "idle",
  error: null,

  fetchProducts: async () => {
    // Idempotent — don't re-fetch if already loading or ready
    if (get().status === "loading" || get().status === "ready") return;
    set({ status: "loading", error: null });
    const products = await loadProducts();
    set({ products, status: "ready" });
  },

  refetch: async () => {
    set({ status: "loading", error: null });
    const products = await loadProducts();
    set({ products, status: "ready" });
  },

  getById: (id) => get().products.find((p) => p.id === id),

  getByCategory: (category) => {
    if (category === "All") return get().products;
    return get().products.filter((p) => p.category === category);
  },

  getByCollection: (slug) =>
    get().products.filter(
      (p) => p.collection?.toLowerCase().replace(/\s+/g, "-") === slug
    ),
}));
