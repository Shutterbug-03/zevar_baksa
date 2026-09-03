import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, error } = await supabaseAdmin
      .from("carts")
      .select("items")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return NextResponse.json({ items: data?.items || null });
  } catch (error) {
    console.error("[sync-cart] GET error:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { items } = body;

    const { error } = await supabaseAdmin
      .from("carts")
      .upsert({ user_id: userId, items, updated_at: new Date().toISOString() });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[sync-cart] POST error:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}
