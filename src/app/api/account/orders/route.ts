/**
 * GET /api/account/orders
 *
 * Returns the signed-in customer's orders. Auth is Clerk, but Supabase RLS keys
 * off a Supabase JWT email that Clerk users don't have, so the browser can't
 * query `orders` directly. We authenticate with Clerk here and read with the
 * service-role client, scoped to the user's Clerk id and verified email.
 */

import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

const PENDING_VISIBLE_MS = 2 * 60 * 60_000;

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase();

  const columns = "id, razorpay_order_id, amount, currency, status, items, payment_method, created_at";

  // Orders placed while signed in (any checkout email) + orders placed as a guest
  // with the login email. ilike = case-insensitive; escape wildcards so it's literal.
  const [byUser, byEmail] = await Promise.all([
    supabaseAdmin.from("orders").select(columns).eq("clerk_user_id", userId),
    email
      ? supabaseAdmin.from("orders").select(columns).ilike("customer_email", email.replace(/[\\%_]/g, "\\$&"))
      : Promise.resolve({ data: [], error: null }),
  ]);

  const error = byUser.error ?? byEmail.error;
  if (error) {
    console.error("[account/orders] Supabase error:", error);
    return NextResponse.json({ error: "Could not load orders" }, { status: 500 });
  }

  const merged = new Map<string, { id: string; created_at: string; status: string }>();
  for (const o of [...(byUser.data ?? []), ...(byEmail.data ?? [])]) merged.set(o.id, o);
  // A "pending" row is just an opened checkout. Show it only while the customer may still be
  // paying; older ones are abandoned (the expire-pending-orders cron later marks them failed).
  const pendingCutoff = Date.now() - PENDING_VISIBLE_MS;
  const orders = [...merged.values()]
    .filter((o) => o.status !== "pending" || new Date(o.created_at).getTime() > pendingCutoff)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

  return NextResponse.json({ orders });
}
