import { NextResponse } from "next/server";
import { isBusyConfigured, getBusyItems, mapBusyToProduct } from "@/lib/busy";
import { products as staticProducts } from "@/data/products";

export async function GET() {
  try {
    if (!isBusyConfigured()) {
      console.log("[API /api/products] BUSY ERP not configured or using placeholders. Returning static products.");
      return NextResponse.json({
        source: "static",
        products: staticProducts,
      });
    }

    const busyItems = await getBusyItems();
    const mapped = busyItems.map(mapBusyToProduct);

    return NextResponse.json({
      source: "busy",
      products: mapped.length > 0 ? mapped : staticProducts,
    });
  } catch (error) {
    console.error("[API /api/products] Error fetching from BUSY:", error);
    return NextResponse.json(
      {
        source: "static_fallback",
        products: staticProducts,
        error: error instanceof Error ? error.message : "Failed to fetch from BUSY",
      },
      { status: 200 }
    );
  }
}
