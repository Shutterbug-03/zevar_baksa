import { NextResponse } from "next/server";
import { getProductList } from "@/lib/catalog";

// Same source checkout prices from (lib/catalog.ts), so shown price = charged price.
export async function GET() {
  return NextResponse.json(
    { products: await getProductList() },
    { headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30" } }
  );
}
