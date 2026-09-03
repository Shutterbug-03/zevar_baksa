"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

/**
 * A silent background component that syncs local Zustand stores (Cart, Wishlist)
 * with Supabase for authenticated users.
 */
export function CloudSync() {
  const { user, isLoaded } = useUser();
  const { items: cartItems, setItems: setCartItems } = useCartStore();
  const { items: wishlistItems, setItems: setWishlistItems } = useWishlistStore();

  const [hasInitialSyncCompleted, setHasInitialSyncCompleted] = useState(false);
  const lastSyncedCart = useRef<string>("");
  const lastSyncedWishlist = useRef<string>("");
  
  // ── 1. Initial Pull on Login ──────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    
    // If user signs out, reset sync state
    if (!user) {
      setHasInitialSyncCompleted(false);
      lastSyncedCart.current = "";
      lastSyncedWishlist.current = "";
      return;
    }
    
    // If user is signed in but we haven't synced yet, do initial pull
    if (user && !hasInitialSyncCompleted) {
      const doInitialSync = async () => {
        try {
          // Fetch Cart
          const cartRes = await fetch("/api/sync-cart");
          if (cartRes.ok) {
            const data = await cartRes.json();
            if (data.items && data.items.length > 0) {
              setCartItems(data.items);
              lastSyncedCart.current = JSON.stringify(data.items);
            }
          }
          
          // Fetch Wishlist
          const wlRes = await fetch("/api/sync-wishlist");
          if (wlRes.ok) {
            const data = await wlRes.json();
            if (data.items && data.items.length > 0) {
              setWishlistItems(data.items);
              lastSyncedWishlist.current = JSON.stringify(data.items);
            }
          }
        } catch (error) {
          console.error("[CloudSync] Initial pull failed:", error);
        } finally {
          setHasInitialSyncCompleted(true);
        }
      };
      
      doInitialSync();
    }
  }, [user, isLoaded, hasInitialSyncCompleted, setCartItems, setWishlistItems]);

  // ── 2. Push Cart Changes ──────────────────────────────────────────────────
  useEffect(() => {
    if (!user || !hasInitialSyncCompleted) return;
    
    const currentCartStr = JSON.stringify(cartItems);
    if (currentCartStr === lastSyncedCart.current) return;
    
    const pushCart = async () => {
      try {
        await fetch("/api/sync-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: currentCartStr,
        });
        lastSyncedCart.current = currentCartStr;
      } catch (error) {
        console.error("[CloudSync] Failed to push cart:", error);
      }
    };
    
    // Simple debounce
    const timeout = setTimeout(pushCart, 1000);
    return () => clearTimeout(timeout);
  }, [cartItems, user, hasInitialSyncCompleted]);

  // ── 3. Push Wishlist Changes ──────────────────────────────────────────────
  useEffect(() => {
    if (!user || !hasInitialSyncCompleted) return;
    
    const currentWlStr = JSON.stringify(wishlistItems);
    if (currentWlStr === lastSyncedWishlist.current) return;
    
    const pushWishlist = async () => {
      try {
        await fetch("/api/sync-wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: currentWlStr,
        });
        lastSyncedWishlist.current = currentWlStr;
      } catch (error) {
        console.error("[CloudSync] Failed to push wishlist:", error);
      }
    };
    
    const timeout = setTimeout(pushWishlist, 1000);
    return () => clearTimeout(timeout);
  }, [wishlistItems, user, hasInitialSyncCompleted]);

  return null; // Silent component
}
