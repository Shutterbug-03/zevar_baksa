import { NextResponse } from "next/server";
import { isBusyConfigured, getBusyItems, mapBusyToProduct } from "@/lib/busy";
import { products as staticProducts } from "@/data/products";

// Cache headers: short cache so catalog updates reflect promptly
const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
};

export async function GET() {
  try {
    if (!isBusyConfigured()) {
      console.log("[API /api/products] BUSY ERP not configured or using placeholders. Returning static products.");
      return NextResponse.json(
        { source: "static", products: staticProducts },
        { headers: CACHE_HEADERS }
      );
    }

    const busyItems = await getBusyItems();
    const mapped = busyItems.map(mapBusyToProduct);

    // Merge strategy: staticProducts is the definitive curated catalog.
    // Enrich with live ERP pricing and stock availability from BUSY.
    const mappedMap = new Map(mapped.map((p) => [p.id.toLowerCase(), p]));
    const merged = staticProducts.map((sp) => {
      const live = mappedMap.get(sp.id.toLowerCase());
      if (!live) return sp;
      return {
        ...sp,
        price: live.price > 0 ? live.price : sp.price,
        status: live.status,
      };
    });

    // Also include any new items discovered in BUSY that aren't yet in static
    for (const p of mapped) {
      if (!staticProducts.some((sp) => sp.id.toLowerCase() === p.id.toLowerCase())) {
        merged.push(p);
      }
    }

    return NextResponse.json(
      { source: "busy", products: merged },
      { headers: CACHE_HEADERS }
    );
  } catch (error) {
    console.error("[API /api/products] Error fetching from BUSY:", error);
    return NextResponse.json(
      {
        source: "static_fallback",
        products: staticProducts,
        error: error instanceof Error ? error.message : "Failed to fetch from BUSY",
      },
      // Don't cache error responses
      { status: 200 }
    );
  }
}
