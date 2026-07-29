import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
  sizePreference: string;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, sizePreference?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, sizePreference = "Standard Atelier Fit") => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.sizePreference === sizePreference
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.sizePreference === sizePreference
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { product, quantity: 1, sizePreference }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity: qty } : i
                ),
        })),

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: "zevar-cart", // persists in localStorage
    }
  )
);
