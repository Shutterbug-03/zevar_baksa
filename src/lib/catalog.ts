/**
 * Server-side price source for checkout. The browser's prices are never trusted:
 * create-order re-prices every cart line from here.
 *
 * Mirrors what /api/products serves (BUSY when configured, else static), so the
 * customer is charged what the storefront showed. If BUSY is configured but
 * unreachable we reuse the last good catalog for up to an hour, then fall back
 * to the static catalog (which /api/products also serves, so prices still match).
 */

import { products as staticProducts, type Product } from "@/data/products";
import { isBusyConfigured, getBusyItems, mapBusyToProduct } from "@/lib/busy";

const FRESH_MS = 5 * 60_000;
const STALE_OK_MS = 60 * 60_000;

let cache: { at: number; list: Product[] } | null = null;

function buildCatalogMap(products: Product[]): Map<string, Product> {
  const map = new Map<string, Product>();
  for (const p of products) {
    map.set(p.id, p);
    map.set(p.id.toLowerCase(), p);
    map.set(p.id.toUpperCase(), p);
    map.set(p.name.toLowerCase(), p);
    map.set(p.name.toLowerCase().replace(/\s+/g, "-"), p);
    if (p.specs?.code) {
      map.set(p.specs.code.toLowerCase(), p);
      const sku = p.specs.code.split(" ")[0].toLowerCase();
      map.set(sku, p);
    }
  }
  return map;
}

function mergeCatalogs(live: Product[], fallback: Product[]): Product[] {
  const liveMap = new Map(live.map((p) => [p.id.toLowerCase(), p]));
  const merged = fallback.map((sp) => {
    const l = liveMap.get(sp.id.toLowerCase());
    if (!l) return sp;
    return {
      ...sp,
      price: l.price > 0 ? l.price : sp.price,
      status: l.status,
    };
  });

  for (const p of live) {
    if (!fallback.some((sp) => sp.id.toLowerCase() === p.id.toLowerCase())) {
      merged.push(p);
    }
  }

  return merged;
}

/** The storefront catalog: static curated list enriched with live BUSY price + stock. */
export async function getProductList(): Promise<Product[]> {
  if (!isBusyConfigured()) return staticProducts;

  if (cache && Date.now() - cache.at < FRESH_MS) return cache.list;

  try {
    const list = mergeCatalogs((await getBusyItems()).map(mapBusyToProduct), staticProducts);
    cache = { at: Date.now(), list };
    return list;
  } catch (err) {
    if (cache && Date.now() - cache.at < STALE_OK_MS) {
      console.warn("[catalog] BUSY unreachable — using cached prices", err);
      return cache.list;
    }
    console.warn("[catalog] BUSY failed, serving static catalog fallback:", err);
    return staticProducts;
  }
}

export async function getCatalog(): Promise<Map<string, Product>> {
  return buildCatalogMap(await getProductList());
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
