"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } =
    useCartStore();
  const { format } = useCurrencyStore();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-[440px] bg-background border-l border-border shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-4 w-4 text-primary stroke-[1.4]" />
            <h2 className="text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-foreground">
              Heirloom Box
            </h2>
            {totalItems() > 0 && (
              <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-semibold">
                {totalItems()}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4 stroke-[1.5] text-foreground/70" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center pt-16">
              <div className="h-16 w-16 rounded-full bg-secondary/60 flex items-center justify-center">
                <ShoppingBag className="h-7 w-7 text-foreground/30 stroke-[1.2]" />
              </div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/40 font-sans">
                Your box is empty
              </p>
              <p className="text-xs text-foreground/50 font-sans max-w-[200px]">
                Add heirloom pieces to begin your collection.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 text-[10px] uppercase tracking-[0.2em] font-sans text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.sizePreference}`}
                className="flex gap-4 pb-5 border-b border-border/40 last:border-0"
              >
                {/* Thumbnail */}
                <Link
                  href={`/product/${item.product.id}`}
                  onClick={closeCart}
                  className="flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden bg-secondary/50 border border-border/40"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/product/${item.product.id}`}
                      onClick={closeCart}
                    >
                      <h3 className="text-sm font-display text-foreground leading-snug hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="flex-shrink-0 text-foreground/30 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-sans">
                    {item.sizePreference}
                  </p>

                  <p className="text-[10px] text-foreground/40 font-sans">
                    {item.product.status}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-1.5">
                    {/* Qty Controls */}
                    <div className="flex items-center gap-2 border border-border/60 rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-5 w-5 flex items-center justify-center text-foreground/60 hover:text-primary transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-sans font-semibold w-4 text-center text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-5 w-5 flex items-center justify-center text-foreground/60 hover:text-primary transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-sans font-semibold text-primary">
                      {format(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer — only show when cart has items */}
        {items.length > 0 && (
          <div className="border-t border-border/60 px-6 py-5 space-y-4 bg-background">
            {/* Trust badges */}
            <div className="flex items-center gap-2 text-[10px] text-foreground/50 font-sans bg-secondary/40 rounded-lg px-3 py-2.5">
              <Sparkles className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              <span>All pieces ship in our signature velvet brass box with certificate</span>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] font-sans text-foreground/60">
                Subtotal
              </span>
              <span className="font-display text-xl text-foreground">
                {format(totalPrice())}
              </span>
            </div>
            <p className="text-[10px] text-foreground/40 font-sans -mt-2">
              Taxes &amp; insured shipping calculated at checkout
            </p>

            {/* CTA buttons */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full py-3.5 rounded-full bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.25em] font-sans font-semibold flex items-center justify-center gap-2 hover:bg-[#5C0A19] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Proceed to Checkout <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <a
              href={`https://wa.me/919876543210?text=Hello%20Zevar%20Baksa!%20I%20have%20${totalItems()}%20item(s)%20worth%20${format(totalPrice())}%20in%20my%20cart.%20I'd%20like%20to%20complete%20my%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full border border-primary/30 text-primary text-[11px] uppercase tracking-[0.2em] font-sans font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all duration-300"
            >
              Order via WhatsApp
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
