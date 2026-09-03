/**
 * BUSY Accounting & Inventory Software Client (https://busy.in)
 *
 * Connects to BUSY Accounting Software via REST API / BUSY Web API Agent / Middleware.
 * Supports BUSY 18, 21, and 24 editions.
 *
 * Required environment variables (set in .env.local):
 *   BUSY_API_URL        → Base URL (e.g. https://api.busy.in/v1 or http://localhost:8080/api)
 *   BUSY_COMPANY_CODE   → Company code / database identifier in BUSY
 *   BUSY_API_KEY        → API token or auth key
 *   BUSY_USER           → (Optional) API user login
 *   BUSY_PASSWORD       → (Optional) API password
 *   BUSY_WEBHOOK_SECRET → (Optional) Shared secret for webhook inventory sync
 *
 * When live credentials are not set (placeholder mode), all methods log formatted
 * simulation details to the console and return safe mock/static data.
 */

import type { Product } from "@/data/products";

// ─── Config ───────────────────────────────────────────────────────────────────

const BUSY_API_URL = process.env.BUSY_API_URL ?? "https://PLACEHOLDER.busy.in/api";
const BUSY_COMPANY_CODE = process.env.BUSY_COMPANY_CODE ?? "PLACEHOLDER_COMP";
const BUSY_API_KEY = process.env.BUSY_API_KEY ?? "PLACEHOLDER_KEY";
const BUSY_USER = process.env.BUSY_USER ?? "";
const BUSY_PASSWORD = process.env.BUSY_PASSWORD ?? "";

export function isBusyConfigured(): boolean {
  return (
    !!process.env.BUSY_API_URL &&
    !process.env.BUSY_API_URL.includes("PLACEHOLDER") &&
    !!process.env.BUSY_API_KEY &&
    !process.env.BUSY_API_KEY.includes("PLACEHOLDER")
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type BusyItemCustomSpecs = {
  metal?: string;
  gemstones?: string;
  craftsmanship?: string;
  weight?: string;
  dimensions?: string;
  certification?: string;
};

export type BusyItem = {
  itemCode: string;
  name: string;
  printName?: string;
  alias?: string;
  salePrice: number;
  mrp?: number;
  qtyInStock: number;
  unit?: string;
  parentGroup?: string;
  category?: string;
  hsnCode?: string;
  taxRate?: number;
  isActive?: boolean;
  imageUrl?: string;
  galleryUrls?: string[];
  description?: string;
  story?: string;
  dispatchTime?: string;
  status?: "Made to Order" | "Ready to Ship" | "Out of Stock";
  collection?: string;
  customSpecs?: BusyItemCustomSpecs;
};

export type BusyOrderLine = {
  itemCode: string;
  name: string;
  quantity: number;
  priceUnit: number;
  hsnCode?: string;
  taxRate?: number;
};

export type CreateBusySaleOrderParams = {
  partnerEmail: string;
  partnerName: string;
  partnerPhone: string;
  lines: BusyOrderLine[];
  razorpayOrderId: string;
  razorpayPaymentId: string;
  address: {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  paymentMethod: string;
};

export type BusySaleOrderRecord = {
  vchNo: string;
  vchDate: string;
  partyName: string;
  partyEmail?: string;
  clientOrderRef: string;
  amountTotal: number;
  status: string;
  items: {
    itemCode: string;
    name: string;
    quantity: number;
    price: number;
  }[];
};

export type BusyStockLevel = {
  itemCode: string;
  name: string;
  qtyInStock: number;
  category?: string;
};

// ─── HTTP Client Helper ───────────────────────────────────────────────────────

async function busyFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BUSY_API_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Company-Code": BUSY_COMPANY_CODE,
    Authorization: `Bearer ${BUSY_API_KEY}`,
    ...(options.headers as Record<string, string>),
  };

  if (BUSY_USER && BUSY_PASSWORD) {
    const basicAuth = Buffer.from(`${BUSY_USER}:${BUSY_PASSWORD}`).toString("base64");
    headers["X-BUSY-Auth"] = `Basic ${basicAuth}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "No response body");
    throw new Error(
      `BUSY API error: [${res.status} ${res.statusText}] from ${endpoint} - ${errorBody}`
    );
  }

  return (await res.json()) as T;
}

// ─── Product / Item Helpers ───────────────────────────────────────────────────

/** Map a BUSY Item record to Zevar Baksa's internal Product type */
export function mapBusyToProduct(item: BusyItem): Product {
  const str = (v: unknown): string =>
    typeof v === "string" && v.length > 0 ? v : "";

  // Derive status
  const validStatuses = ["Made to Order", "Ready to Ship", "Out of Stock"] as const;
  const status: Product["status"] =
    item.status && validStatuses.includes(item.status)
      ? item.status
      : item.qtyInStock > 0
      ? "Ready to Ship"
      : "Made to Order";

  // Derive category
  const rawCat = item.category || item.parentGroup || "";
  let category: Product["category"] = "Necklaces";
  if (/earring/i.test(rawCat)) category = "Earrings";
  else if (/bracelet|bangle|cuff/i.test(rawCat)) category = "Bracelets";
  else if (/bridal|wedding/i.test(rawCat)) category = "Bridal";
  else if (/necklace|choker|collar|pendant/i.test(rawCat)) category = "Necklaces";

  const img = item.imageUrl || `https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media/images/products/${item.itemCode}.jpg`;
  const gallery = item.galleryUrls && item.galleryUrls.length > 0 ? item.galleryUrls : [img];

  return {
    id: item.itemCode,
    name: item.name,
    subtitle: str(item.printName) || str(item.alias) || "Handcrafted Regal Jewelry",
    price: Math.round(item.salePrice || item.mrp || 0),
    status,
    image: img,
    gallery,
    category,
    collection: str(item.collection) || undefined,
    description: str(item.description) || item.name,
    story: str(item.story) || "Handcrafted by master artisans with traditional heritage techniques.",
    specs: {
      metal: str(item.customSpecs?.metal) || "22k Yellow Gold (BIS Hallmarked)",
      gemstones: str(item.customSpecs?.gemstones) || "Natural Gemstones & Polki",
      craftsmanship: str(item.customSpecs?.craftsmanship) || "Handcrafted Jadau",
      weight: str(item.customSpecs?.weight) || undefined,
      dimensions: str(item.customSpecs?.dimensions) || undefined,
      certification: str(item.customSpecs?.certification) || "BIS Hallmarked & Certified",
    },
    dispatchTime: str(item.dispatchTime) || (status === "Ready to Ship" ? "Ships in 2–3 business days" : "Ships in 2–3 weeks"),
  };
}

/** Fetch all active products/items from BUSY */
export async function getBusyItems(): Promise<BusyItem[]> {
  if (!isBusyConfigured()) {
    return [];
  }

  const response = await busyFetch<{ items: BusyItem[] } | BusyItem[]>("items");
  if (Array.isArray(response)) {
    return response;
  }
  return response.items ?? [];
}

/** Fetch a single item by item code from BUSY */
export async function getBusyItem(itemCode: string): Promise<BusyItem | null> {
  if (!isBusyConfigured()) {
    return null;
  }

  try {
    return await busyFetch<BusyItem>(`items/${encodeURIComponent(itemCode)}`);
  } catch (err) {
    console.error(`[BUSY] Failed to fetch item ${itemCode}:`, err);
    return null;
  }
}

/** Update an item's stock quantity or status in BUSY */
export async function updateBusyItemStock(
  itemCode: string,
  qtyInStock: number
): Promise<boolean> {
  if (!isBusyConfigured()) {
    console.log(`[BUSY Placeholder] Stock update for ${itemCode} -> ${qtyInStock}`);
    return true;
  }

  await busyFetch(`items/${encodeURIComponent(itemCode)}/stock`, {
    method: "POST",
    body: JSON.stringify({ qtyInStock }),
  });
  return true;
}

// ─── Sales Voucher / Order Sync ───────────────────────────────────────────────

/**
 * Create a confirmed Sales Order / Sales Voucher in BUSY after payment confirmation.
 * Returns the BUSY Voucher ID / Voucher Number.
 */
export async function createSalesOrder({
  partnerEmail,
  partnerName,
  partnerPhone,
  lines,
  razorpayOrderId,
  razorpayPaymentId,
  address,
  paymentMethod,
}: CreateBusySaleOrderParams): Promise<string> {
  if (!isBusyConfigured()) {
    const fakeVchNo = `BUSY_VCH_${Date.now()}`;
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🧪 BUSY ERP: Simulation Mode (Order Sync)");
    console.log(`👤 Party/Customer : ${partnerName} <${partnerEmail}> | Phone: ${partnerPhone || "N/A"}`);
    console.log(`🧾 Razorpay Order : ${razorpayOrderId}`);
    console.log(`💳 Payment ID     : ${razorpayPaymentId} (${paymentMethod.toUpperCase()})`);
    console.log(`📦 Items Count    : ${lines.length}`);
    lines.forEach((l, i) => {
      console.log(`   ${i + 1}. [${l.itemCode}] ${l.name} x ${l.quantity} @ ₹${l.priceUnit}`);
    });
    console.log(`🏠 Shipping Addr  : ${[address.address1, address.address2, address.city, address.state, address.pincode].filter(Boolean).join(", ")}`);
    console.log(`✅ Generated Mock BUSY Voucher No: ${fakeVchNo}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    return fakeVchNo;
  }

  const payload = {
    vchType: "Sales Order",
    vchSeries: "Main",
    vchDate: new Date().toISOString().split("T")[0],
    partyDetails: {
      name: partnerName,
      email: partnerEmail,
      mobile: partnerPhone,
      addressLine1: address.address1 ?? "",
      addressLine2: address.address2 ?? "",
      city: address.city ?? "",
      state: address.state ?? "",
      pincode: address.pincode ?? "",
      country: address.country ?? "India",
    },
    referenceDetails: {
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      paymentMethod,
    },
    itemEntries: lines.map((line) => ({
      itemCode: line.itemCode,
      itemName: line.name,
      qty: line.quantity,
      price: line.priceUnit,
      amount: line.quantity * line.priceUnit,
      hsnCode: line.hsnCode || "711319",
      taxPercent: line.taxRate || 3, // Standard 3% GST on jewelry in India
    })),
    narration: `Zevar Baksa Online Order | RZP: ${razorpayOrderId} | PayID: ${razorpayPaymentId}`,
  };

  const res = await busyFetch<{ success: boolean; vchNo: string; message?: string }>(
    "vouchers/sales-order",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

  return res.vchNo;
}

/** Get recent sale orders from BUSY */
export async function getBusySalesOrders(limit = 50): Promise<BusySaleOrderRecord[]> {
  if (!isBusyConfigured()) {
    return [];
  }

  const res = await busyFetch<{ vouchers: BusySaleOrderRecord[] } | BusySaleOrderRecord[]>(
    `vouchers/sales-order?limit=${limit}`
  );

  if (Array.isArray(res)) return res;
  return res.vouchers ?? [];
}

// ─── Stock Levels & Inventory Query ───────────────────────────────────────────

/** Get current stock levels from BUSY Item Master */
export async function getBusyStockLevels(): Promise<BusyStockLevel[]> {
  if (!isBusyConfigured()) {
    return [];
  }

  const res = await busyFetch<{ stock: BusyStockLevel[] } | BusyStockLevel[]>("inventory/stock");
  if (Array.isArray(res)) return res;
  return res.stock ?? [];
}
