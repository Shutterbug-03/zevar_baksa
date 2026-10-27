/**
 * Server-side price source for checkout. The browser's prices are never trusted:
 * create-order re-prices every cart line from here.
 *
 * Mirrors what /api/products serves (BUSY when configured, else static), so the
 * customer is charged what the storefront showed. If BUSY is configured but
 * unreachable we reuse the last good catalog for up to an hour and otherwise
 * refuse the order rather than guess a price.
 */

import { products as staticProducts, type Product } from "@/data/products";
import { isBusyConfigured, getBusyItems, mapBusyToProduct } from "@/lib/busy";

const FRESH_MS = 5 * 60_000;
const STALE_OK_MS = 60 * 60_000;

let cache: { at: number; byId: Map<string, Product> } | null = null;

const toMap = (list: Product[]) => new Map(list.map((p) => [p.id, p]));

export async function getCatalog(): Promise<Map<string, Product>> {
  if (!isBusyConfigured()) return toMap(staticProducts);

  if (cache && Date.now() - cache.at < FRESH_MS) return cache.byId;

  try {
    const mapped = (await getBusyItems()).map(mapBusyToProduct);
    const byId = toMap(mapped.length > 0 ? mapped : staticProducts);
    cache = { at: Date.now(), byId };
    return byId;
  } catch (err) {
    if (cache && Date.now() - cache.at < STALE_OK_MS) {
      console.warn("[catalog] BUSY unreachable — using cached prices", err);
      return cache.byId;
    }
    throw new Error("CATALOG_UNAVAILABLE");
  }
}

export type PricedLine = {
  product_id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size_preference: string;
};

/** A cart line points at a product explicitly marked "Out of Stock" (made-to-order stays sellable). */
export class OutOfStockError extends Error {}

/** Re-prices raw cart lines. Throws Error with a customer-safe message on bad input. */
export async function priceCart(rawItems: unknown): Promise<{ lines: PricedLine[]; totalINR: number }> {
  if (!Array.isArray(rawItems) || rawItems.length === 0 || rawItems.length > 50) {
    throw new Error("Your cart is empty or invalid.");
  }
  const catalog = await getCatalog();

  const lines = rawItems.map((raw: { product_id?: unknown; quantity?: unknown; size_preference?: unknown }) => {
    const product = catalog.get(String(raw.product_id));
    const quantity = Number(raw.quantity);
    if (!product || !(product.price > 0)) {
      throw new Error("One of the items in your cart is no longer available.");
    }
    if (product.status === "Out of Stock") {
      throw new OutOfStockError(`Sorry, ${product.name} is currently out of stock. Please remove it from your bag to continue.`);
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new Error("Invalid item quantity.");
    }
    return {
      product_id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity,
      size_preference: typeof raw.size_preference === "string" ? raw.size_preference.slice(0, 100) : "Standard",
    };
  });

  return { lines, totalINR: lines.reduce((sum, l) => sum + l.price * l.quantity, 0) };
}
