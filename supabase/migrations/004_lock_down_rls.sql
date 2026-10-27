-- ─────────────────────────────────────────────────────────────────────────────
-- Zevar Baksa — Lock down Row Level Security (SECURITY FIX — run before launch)
-- Run this in your Supabase SQL Editor:
--   https://app.supabase.com/project/_/sql
-- ─────────────────────────────────────────────────────────────────────────────
--
-- Why: migrations 001 and 002 created policies that were open to EVERY role,
-- including `anon` (whoever holds the public NEXT_PUBLIC_SUPABASE_ANON_KEY, which
-- ships in the browser bundle):
--   orders    : INSERT with check (true)         -> anyone could insert fake 'paid' orders
--   carts     : SELECT/INSERT/UPDATE/DELETE true -> anyone could read/overwrite all carts
--   wishlists : SELECT/INSERT/UPDATE/DELETE true -> same
--
-- The service-role key BYPASSES RLS, and the app only touches these tables
-- through supabaseAdmin (server-side API routes), so those policies were never
-- needed. With RLS enabled and NO policies, anon/authenticated roles are denied
-- everything (deny by default) while the server keeps working unchanged.
--
-- "Customers read own orders" is dropped too: it matched on a Supabase-Auth JWT
-- email, but this app authenticates with Clerk (not Supabase Auth) and the account
-- page reads orders via /api/account/orders with the service role. Nothing uses it.
--
-- Safe to re-run (idempotent).

-- ─── orders ───────────────────────────────────────────────────────────────────
drop policy if exists "Allow insert from server"   on orders;
drop policy if exists "Customers read own orders"  on orders;

-- ─── carts ────────────────────────────────────────────────────────────────────
drop policy if exists "Allow insert from server"   on carts;
drop policy if exists "Allow select from server"   on carts;
drop policy if exists "Allow update from server"   on carts;
drop policy if exists "Allow delete from server"   on carts;

-- ─── wishlists ────────────────────────────────────────────────────────────────
drop policy if exists "Allow insert from server"   on wishlists;
drop policy if exists "Allow select from server"   on wishlists;
drop policy if exists "Allow update from server"   on wishlists;
drop policy if exists "Allow delete from server"   on wishlists;

-- Make sure RLS stays ON (with zero policies = no access except service role).
alter table orders    enable row level security;
alter table carts     enable row level security;
alter table wishlists enable row level security;

-- Belt and braces: also revoke direct table privileges from the public API roles.
revoke all on orders, carts, wishlists from anon, authenticated;
