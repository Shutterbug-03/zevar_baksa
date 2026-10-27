/**
 * BUSY Accounting & Inventory Software Client — NeoInfotech API V2
 *
 * Connects via https://neoinfotech.in/api/v2 middleware.
 * Uses JWT authentication (login → accessToken + refreshToken).
 *
 * Required environment variables (set in .env.local):
 *   BUSY_API_URL        → Base URL (e.g. https://neoinfotech.in/api/v2)
 *   BUSY_COMPANY_CODE   → Company code / database identifier (e.g. "guptastore")
 *   BUSY_API_KEY        → Static x-api-key gateway header
 *   BUSY_USER           → Login username (e.g. "admin")
 *   BUSY_PASSWORD       → Login password
 *   BUSY_WEBHOOK_SECRET → (Optional) Shared secret for webhook inventory sync
 *
 * When live credentials are not set (placeholder mode), all methods log formatted
 * simulation details to the console and return safe mock/static data.
 */

import { products as staticProducts, type Product } from "@/data/products";

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

// ─── JWT Token Management ─────────────────────────────────────────────────────

let cachedAccessToken: string | null = null;
let cachedRefreshToken: string | null = null;
let tokenExpiresAt = 0; // Unix ms

/** Decode JWT payload to read exp claim (no verification — server does that) */
function decodeJwtExp(token: string): number {
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    return (payload.exp ?? 0) * 1000; // convert to ms
  } catch {
    return 0;
  }
}

/** Login with companyCode + username + password → JWT tokens */
async function busyLogin(): Promise<{ accessToken: string; refreshToken: string }> {
  const url = `${BUSY_API_URL.replace(/\/$/, "")}/auth/login`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": BUSY_API_KEY,
    },
    body: JSON.stringify({
      companyCode: BUSY_COMPANY_CODE,
      username: BUSY_USER,
      password: BUSY_PASSWORD,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "No response body");
    throw new Error(`BUSY login failed: [${res.status}] ${errorBody}`);
  }

  const data = await res.json();

  if (!data.success || !data.accessToken) {
    throw new Error(`BUSY login failed: ${data.message ?? "Unknown error"}`);
  }

  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
}

/** Refresh an expired access token using the refresh token */
async function busyRefreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
  if (!cachedRefreshToken) {
    // No refresh token — do a full login
    return busyLogin();
  }

  const url = `${BUSY_API_URL.replace(/\/$/, "")}/auth/refresh-token`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": BUSY_API_KEY,
      Authorization: `Bearer ${cachedAccessToken ?? ""}`,
    },
    body: JSON.stringify({ refreshToken: cachedRefreshToken }),
  });

  if (!res.ok) {
    // Refresh failed — fall back to full login
    console.warn("[BUSY] Token refresh failed, re-logging in...");
    return busyLogin();
  }

  const data = await res.json();

  if (!data.success || !data.accessToken) {
    return busyLogin();
  }

  return { accessToken: data.accessToken, refreshToken: data.refreshToken ?? cachedRefreshToken };
}

/** Get a valid access token, logging in or refreshing as needed */
async function getAccessToken(): Promise<string> {
  const now = Date.now();

  // If token exists and isn't expiring within 60 seconds, reuse it
  if (cachedAccessToken && tokenExpiresAt > now + 60_000) {
    return cachedAccessToken;
  }

  // Try refresh first, fall back to login
  const tokens = cachedRefreshToken ? await busyRefreshToken() : await busyLogin();

  cachedAccessToken = tokens.accessToken;
  cachedRefreshToken = tokens.refreshToken;
  tokenExpiresAt = decodeJwtExp(tokens.accessToken);

  return cachedAccessToken;
}

// ─── Types ────────────────────────────────────────────────────────────────────

/** Raw item shape from /masters/items */
export type BusyRawItem = {
  code: number;
  name: string;
  alias: string | null;
  printName: string | null;
  parentGroup: string | null;
  groupCode: number;
  mainUnit: string | null;
  altUnit: string | null;
  taxCategory: string | null;
  conversionFactor: number;
  conversionType: string | null;
  taxPercent: number;
  hsnCode: string | null;
  salePrice: number;
  purchasePrice: number;
  mrp: number;
  minSalePrice: number;
  selfValuePrice: number;
  saleDiscount: number;
  purchaseDiscount: number;
  minLevel: number;
  reorderLevel: number;
  maxLevel: number;
  category: string | null;
  favourite: string | null;
  customField1: string | null;
  customField2: string | null;
  customField3: string | null;
  customField4: string | null;
  customField5: string | null;
  customField6: string | null;
  customField7: string | null;
  customField8: string | null;
  customField9: string | null;
  customField10: string | null;
  imageUrl: string | null;
  blockedNotes: string | null;
  isBlocked: boolean;
  isActive: boolean;
};

/** Raw stock shape from /reports/item-stock */
export type BusyRawStockItem = {
  itemCode?: number;
  code?: number;
  itemName?: string;
  name?: string;
  itemAlias?: string | null;
  alias?: string | null;
  parentGroup?: string | null;
  closingBal?: number;
  closingMain?: number;
  closingAlt?: number;
  data?: Array<{
    mainUnit?: number;
    altUnit?: number;
    amount?: number;
    mcCode?: number;
    mcName?: string;
  }>;
};

/** Internal normalized item type for the app */
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

export type BusyItemCustomSpecs = {
  metal?: string;
  gemstones?: string;
  craftsmanship?: string;
  weight?: string;
  dimensions?: string;
  certification?: string;
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
  const token = await getAccessToken();
  const url = `${BUSY_API_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": BUSY_API_KEY,
    Authorization: `Bearer ${token}`,
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(url, {
    ...options,
    headers,
    next: { revalidate: 0 },
  });

  // On 401, try one token refresh and retry
  if (res.status === 401) {
    console.warn("[BUSY] 401 received, refreshing token and retrying...");
    cachedAccessToken = null; // force re-auth
    const newToken = await getAccessToken();

    const retryRes = await fetch(url, {
      ...options,
      headers: { ...headers, Authorization: `Bearer ${newToken}` },
      next: { revalidate: 0 },
    });

    if (!retryRes.ok) {
      const errorBody = await retryRes.text().catch(() => "No response body");
      throw new Error(
        `BUSY API error: [${retryRes.status} ${retryRes.statusText}] from ${endpoint} - ${errorBody}`
      );
    }

    return (await retryRes.json()) as T;
  }

  if (!res.ok) {
    const errorBody = await res.text().catch(() => "No response body");
    throw new Error(
      `BUSY API error: [${res.status} ${res.statusText}] from ${endpoint} - ${errorBody}`
    );
  }

  return (await res.json()) as T;
}

// ─── Product / Item Helpers ───────────────────────────────────────────────────

/** Convert a raw API item to the normalized BusyItem shape */
function rawToBusyItem(raw: BusyRawItem, stockQty?: number): BusyItem {
  const qty = stockQty ?? 0;

  // Parse gallery images if stored as comma-separated links in customField9
  const galleryFromCustom = raw.customField9
    ? raw.customField9.split(",").map((s) => s.trim()).filter(Boolean)
    : undefined;

  // In Zevar Baksa's Busy ERP:
  // customField1 is weight in grams (e.g. "6.382", "3.845", "5.648")
  // customField2 is Karigar/Batch/Master ID
  const weightVal = raw.customField1 ? `${raw.customField1} g` : undefined;

  return {
    itemCode: String(raw.code),
    name: raw.name,
    printName: raw.printName ?? undefined,
    alias: raw.alias ?? undefined,
    salePrice: raw.salePrice,
    mrp: raw.mrp,
    qtyInStock: qty,
    unit: raw.mainUnit ?? undefined,
    parentGroup: raw.parentGroup ?? undefined,
    category: raw.category ?? undefined,
    hsnCode: raw.hsnCode ?? undefined,
    taxRate: raw.taxPercent ?? undefined,
    isActive: raw.isActive,
    imageUrl: raw.imageUrl ?? undefined,
    galleryUrls: galleryFromCustom,
    description: raw.customField7 || raw.printName || raw.name,
    story: raw.customField7 ?? undefined,
    collection: raw.customField6 ?? undefined,
    dispatchTime: raw.customField8 ?? undefined,
    customSpecs: {
      metal: raw.customField3 ?? undefined,
      weight: weightVal,
      gemstones: raw.customField4 ?? undefined,
      craftsmanship: raw.customField5 ?? undefined,
      certification: "BIS Hallmarked & Certified",
    },
  };
}

/** Map a BUSY Item record to Zevar Baksa's internal Product type */
export function mapBusyToProduct(item: BusyItem): Product {
  const str = (v: unknown): string =>
    typeof v === "string" && v.length > 0 ? v : "";

  // Find matching static product to enrich with high-res photography and editorial copy
  const matchingStatic = staticProducts.find((p) => {
    // 1. Match by SKU alias e.g. ZB-26-MB-P-0001 -> P1, ZB-26-MB-E-0007 -> E7
    if (item.alias) {
      const match = item.alias.match(/-(P|E)-0*(\d+)/i);
      if (match) {
        const idCode = `${match[1]}${parseInt(match[2], 10)}`.toLowerCase();
        if (p.id.toLowerCase() === idCode || p.specs.code?.toLowerCase() === idCode) {
          return true;
        }
      }
    }
    // 2. Match by base name e.g. "Sugga" in "Sugga Pendant"
    const cleanItemName = (item.printName || item.name).toLowerCase();
    const cleanStaticName = p.name.toLowerCase();
    return cleanItemName.includes(cleanStaticName);
  });

  // Derive status from live stock in BUSY
  const status: Product["status"] =
    item.qtyInStock > 0 ? "Ready to Ship" : "Made to Order";

  // Derive category
  const rawCat = item.category || item.parentGroup || "";
  let category: Product["category"] = "Necklaces";
  if (/earring/i.test(rawCat)) category = "Earrings";
  else if (/bracelet|bangle|cuff/i.test(rawCat)) category = "Bracelets";
  else if (/bridal|wedding/i.test(rawCat)) category = "Bridal";
  else if (/necklace|choker|collar|pendant/i.test(rawCat)) category = "Necklaces";

  // Photography: prefer Busy imageUrl if set, else enrich from high-res local shoot
  const primaryImg =
    item.imageUrl ||
    matchingStatic?.image ||
    `/images/products/${item.itemCode}.jpg`;

  const gallery =
    item.galleryUrls && item.galleryUrls.length > 0
      ? item.galleryUrls
      : matchingStatic?.gallery && matchingStatic.gallery.length > 0
      ? matchingStatic.gallery
      : [primaryImg];

  return {
    id: matchingStatic?.id || item.itemCode,
    name: matchingStatic?.name || item.printName || item.name,
    subtitle:
      matchingStatic?.subtitle ||
      str(item.printName) ||
      str(item.alias) ||
      "Handcrafted Regal Jewelry",
    price: Math.round(item.salePrice || item.mrp || matchingStatic?.price || 0),
    status,
    image: primaryImg,
    gallery,
    category: matchingStatic?.category || category,
    collection: matchingStatic?.collection || str(item.collection) || "Meena Bagh",
    description: matchingStatic?.description || str(item.description) || item.name,
    story:
      matchingStatic?.story ||
      str(item.story) ||
      "Handcrafted by master artisans with traditional heritage techniques.",
    specs: {
      code: item.alias || matchingStatic?.specs.code || item.itemCode,
      metal:
        str(item.customSpecs?.metal) ||
        matchingStatic?.specs.metal ||
        "22k Yellow Gold (BIS Hallmarked)",
      gemstones:
        str(item.customSpecs?.gemstones) ||
        matchingStatic?.specs.gemstones ||
        "Natural Gemstones & Polki",
      craftsmanship:
        str(item.customSpecs?.craftsmanship) ||
        matchingStatic?.specs.craftsmanship ||
        "Handcrafted Jadau",
      weight:
        str(item.customSpecs?.weight) ||
        matchingStatic?.specs.weight ||
        undefined,
      dimensions: matchingStatic?.specs.dimensions || undefined,
      certification:
        str(item.customSpecs?.certification) ||
        matchingStatic?.specs.certification ||
        "BIS Hallmarked & Certified",
    },
    dispatchTime:
      str(item.dispatchTime) ||
      matchingStatic?.dispatchTime ||
      (status === "Ready to Ship" ? "Ships in 2–3 business days" : "Ships in 2–3 weeks"),
  };
}

/** Fetch all active products/items from BUSY */
export async function getBusyItems(options?: {
  page?: number;
  limit?: number;
  search?: string;
  groupname?: string;
  isActive?: boolean;
}): Promise<BusyItem[]> {
  if (!isBusyConfigured()) {
    return [];
  }

  const params = new URLSearchParams();
  params.set("page", String(options?.page ?? 1));
  params.set("limit", String(options?.limit ?? 500));
  if (options?.search) params.set("search", options.search);
  if (options?.groupname) params.set("groupname", options.groupname);
  if (options?.isActive !== undefined) params.set("isactive", String(options.isActive));

  try {
    const [itemsResponse, stockLevels] = await Promise.all([
      busyFetch<{
        success: boolean;
        items: BusyRawItem[];
        pagination: { totalItems: number; totalPages: number };
      }>(`masters/items?${params.toString()}`),
      getBusyStockLevels().catch((err) => {
        console.warn("[BUSY] Stock levels fetch fallback:", err);
        return [];
      }),
    ]);

    const stockMap = new Map<string, number>();
    for (const s of stockLevels) {
      if (s.itemCode) stockMap.set(s.itemCode, s.qtyInStock);
      if (s.name) stockMap.set(s.name, s.qtyInStock);
    }

    return (itemsResponse.items ?? []).map((raw) => {
      const stock =
        stockMap.get(String(raw.code)) ??
        stockMap.get(raw.name) ??
        0;
      return rawToBusyItem(raw, stock);
    });
  } catch (err) {
    console.error("[BUSY] Error fetching items with stock:", err);
    throw err;
  }
}

/** Fetch a single item by item code from BUSY */
export async function getBusyItem(itemCode: string): Promise<BusyItem | null> {
  if (!isBusyConfigured()) {
    return null;
  }

  try {
    const response = await busyFetch<{
      success: boolean;
      items: BusyRawItem[];
    }>(`masters/items?code=${encodeURIComponent(itemCode)}&limit=1`);

    const raw = response.items?.[0];
    if (!raw) return null;
    return rawToBusyItem(raw);
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
  // NOTE: The NeoInfotech API V2 does not have a stock update endpoint.
  // Stock is managed within BUSY desktop software itself.
  // This function logs the intended update for manual reconciliation.
  console.warn(
    `[BUSY] Stock update not supported via API. Item ${itemCode} → ${qtyInStock} (log only)`
  );
  return true;
}

// ─── Sales Voucher / Order Sync ───────────────────────────────────────────────

/**
 * Create a confirmed Sales Order / Sales Voucher in BUSY after payment confirmation.
 *
 * Returns the BUSY voucher number on success, or `null` when the order could NOT
 * be written to BUSY. Callers must treat `null` as "needs manual entry" — the
 * order notification email flags it for the admin (see notifyOrderPlaced).
 *
 * NOTE: The current NeoInfotech API V2 collection has NO write endpoint (every
 * request apart from auth is a GET), so today this always logs and returns null.
 * It never fabricates a voucher number, and stock in BUSY is NOT decremented.
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
}: CreateBusySaleOrderParams): Promise<string | null> {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📋 BUSY ERP: Order NOT synced (no write endpoint yet) — enter manually");
  console.log(`👤 Party/Customer : ${partnerName} <${partnerEmail}> | Phone: ${partnerPhone || "N/A"}`);
  console.log(`🧾 Razorpay Order : ${razorpayOrderId}`);
  console.log(`💳 Payment ID     : ${razorpayPaymentId} (${paymentMethod.toUpperCase()})`);
  console.log(`📦 Items Count    : ${lines.length}`);
  lines.forEach((l, i) => {
    console.log(`   ${i + 1}. [${l.itemCode}] ${l.name} x ${l.quantity} @ ₹${l.priceUnit}`);
  });
  console.log(`🏠 Shipping Addr  : ${[address.address1, address.address2, address.city, address.state, address.pincode].filter(Boolean).join(", ")}`);

  if (isBusyConfigured()) {
    console.log("⚠️  Waiting for ERP vendor to provide a POST /vouchers/create endpoint");
  } else {
    console.log("⚠️  BUSY not configured — simulation mode");
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // ── PLACEHOLDER: replace once the vendor ships a write endpoint ──────────
  // When NeoInfotech provides a POST endpoint for creating vouchers, call it here
  // via busyFetch and return the voucher number it gives back, e.g.:
  //
  //   const res = await busyFetch<{ success: boolean; vchNo: string }>("/vouchers/create", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       vchType: "SALE",
  //       vchDate: new Date().toISOString().slice(0, 10),
  //       partyName: partnerName,
  //       items: lines.map((l) => ({ itemCode: l.itemCode, qty: l.quantity, rate: l.priceUnit })),
  //       narration: `Zevar Baksa Online | ${razorpayOrderId}`,
  //     }),
  //   });
  //   return res.success ? res.vchNo : null;
  //
  // (Endpoint path and payload shape above are guesses based on Busy voucher
  // conventions — confirm against the vendor's docs.) Until then: null.
  return null;
}

/** Get recent sale vouchers from BUSY */
export async function getBusySalesOrders(
  limit = 50,
  year?: number
): Promise<BusySaleOrderRecord[]> {
  if (!isBusyConfigured()) {
    return [];
  }

  const currentYear = year ?? new Date().getFullYear();

  try {
    const res = await busyFetch<{
      success: boolean;
      vouchers: Array<{
        vchNo?: string;
        VchNo?: string;
        vchDate?: string;
        VchDate?: string;
        partyName?: string;
        PartyName?: string;
        amount?: number;
        Amount?: number;
        [key: string]: unknown;
      }>;
    }>(`vouchers/get-vch-inventory?vchType=SALE&year=${currentYear}&page=1&limit=${limit}`);

    if (!res.vouchers?.length) return [];

    return res.vouchers.map((v) => ({
      vchNo: String(v.vchNo ?? v.VchNo ?? ""),
      vchDate: String(v.vchDate ?? v.VchDate ?? ""),
      partyName: String(v.partyName ?? v.PartyName ?? ""),
      clientOrderRef: "",
      amountTotal: Number(v.amount ?? v.Amount ?? 0),
      status: "completed",
      items: [],
    }));
  } catch (err) {
    console.error("[BUSY] Failed to fetch sales orders:", err);
    return [];
  }
}

// ─── Stock Levels & Inventory Query ───────────────────────────────────────────

/** Get current stock levels from BUSY via /reports/item-stock */
export async function getBusyStockLevels(options?: {
  enddate?: string;
  itemname?: string;
  parentgrp?: string;
  page?: number;
  limit?: number;
}): Promise<BusyStockLevel[]> {
  if (!isBusyConfigured()) {
    return [];
  }

  const params = new URLSearchParams();
  params.set("enddate", options?.enddate ?? new Date().toISOString().split("T")[0]);
  params.set("page", String(options?.page ?? 1));
  params.set("limit", String(options?.limit ?? 500));
  if (options?.itemname) params.set("itemname", options.itemname);
  if (options?.parentgrp) params.set("parentgrp", options.parentgrp);

  try {
    const res = await busyFetch<{
      success: boolean;
      itemStocks?: BusyRawStockItem[];
      itemStock?: BusyRawStockItem[];
    }>(`reports/item-stock?${params.toString()}`);

    const stocks = res.itemStocks ?? res.itemStock ?? [];

    return stocks.map((s) => ({
      itemCode: String(s.itemCode ?? s.code ?? ""),
      name: s.itemName ?? s.name ?? "",
      qtyInStock: Number(s.closingBal ?? s.closingMain ?? 0),
      category: s.parentGroup ?? undefined,
    }));
  } catch (err) {
    console.error("[BUSY] Failed to fetch stock levels:", err);
    return [];
  }
}

// ─── Account Helpers (bonus — available from the API) ─────────────────────────

/** Fetch accounts from BUSY Master */
export async function getBusyAccounts(options?: {
  search?: string;
  groupname?: string;
  page?: number;
  limit?: number;
}) {
  if (!isBusyConfigured()) return [];

  const params = new URLSearchParams();
  params.set("page", String(options?.page ?? 1));
  params.set("limit", String(options?.limit ?? 100));
  if (options?.search) params.set("search", options.search);
  if (options?.groupname) params.set("groupname", options.groupname);

  const res = await busyFetch<{
    success: boolean;
    accounts: Array<Record<string, unknown>>;
  }>(`masters/accounts?${params.toString()}`);

  return res.accounts ?? [];
}

/** Get account balance report */
export async function getBusyAccountBalance(options?: {
  enddate?: string;
  parentgroup?: string;
  billtype?: "payable" | "receivable";
  page?: number;
  limit?: number;
}) {
  if (!isBusyConfigured()) return [];

  const params = new URLSearchParams();
  params.set("enddate", options?.enddate ?? new Date().toISOString().split("T")[0]);
  params.set("page", String(options?.page ?? 1));
  params.set("limit", String(options?.limit ?? 100));
  if (options?.parentgroup) params.set("parentgroup", options.parentgroup);
  if (options?.billtype) params.set("billtype", options.billtype);

  const res = await busyFetch<{
    success: boolean;
    data: Array<Record<string, unknown>>;
  }>(`reports/accountbalance?${params.toString()}`);

  return res.data ?? [];
}
