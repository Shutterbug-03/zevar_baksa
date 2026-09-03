import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

type WishlistStore = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggle: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  count: () => number;
  setItems: (items: Product[]) => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isWishlisted(product.id)) {
          set((state) => ({ items: [...state.items, product] }));
        }
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        })),

      toggle: (product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isWishlisted: (productId) =>
        get().items.some((p) => p.id === productId),

      count: () => get().items.length,
      setItems: (items) => set({ items }),
    }),
    {
      name: "zevar-wishlist",
    }
  )
);
