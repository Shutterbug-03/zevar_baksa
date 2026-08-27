/**
 * Supabase clients.
 *
 * - supabaseAnon   → safe for client-side (uses ANON key, RLS-restricted)
 * - supabaseAdmin  → server-side only (uses SERVICE_ROLE key, bypasses RLS)
 *
 * Update NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and
 * SUPABASE_SERVICE_ROLE_KEY in .env.local with your real Supabase project values.
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://PLACEHOLDER.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "PLACEHOLDER_ANON_KEY";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "PLACEHOLDER_SERVICE_ROLE_KEY";

/** Anon client — safe for browser use, respects RLS policies */
export const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

/** Admin client — SERVER SIDE ONLY, never import in client components */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// ─── Database Types ───────────────────────────────────────────────────────────

export type OrderStatus = "pending" | "paid" | "failed" | "cod_pending";

export type Order = {
  id: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  amount: number;            // in paise (₹1 = 100 paise)
  currency: string;
  status: OrderStatus;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  address: Record<string, string>;
  items: OrderItem[];
  payment_method: string;
  created_at: string;
};

export type OrderItem = {
  product_id: string;
  name: string;
  image: string;
  price: number;             // in INR
  quantity: number;
  size_preference: string;
};
