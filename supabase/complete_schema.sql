-- ─────────────────────────────────────────────────────────────────────────────
-- Zevar Baksa — Complete Consolidated Supabase Schema
-- Run this in your Supabase SQL Editor:
--   Dashboard -> SQL Editor (left sidebar '>_' icon) -> New Query -> Paste & Run
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Orders table
create table if not exists orders (
  id                  uuid default gen_random_uuid() primary key,
  razorpay_order_id   text unique,
  razorpay_payment_id text,
  razorpay_signature  text,
  amount              integer not null,      -- in paise (₹1 = 100 paise)
  currency            text default 'INR',
  status              text default 'pending' check (
                        status in ('pending','paid','failed','shipped','delivered','refunded','cancelled')
                      ),
  customer_email      text not null,
  customer_name       text default '',
  customer_phone      text default '',
  address             jsonb default '{}',    -- { address1, city, state, pincode, country }
  items               jsonb default '[]',    -- [{ product_id, name, price, quantity, ... }]
  payment_method      text default 'upi',    -- upi | card | netbanking
  clerk_user_id       text,
  courier             text,
  tracking_number     text,
  tracking_url        text,
  shipped_at          timestamptz,
  invoice_number      text,
  refunded_amount     integer,               -- in paise
  refunded_at         timestamptz,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

create index if not exists orders_clerk_user_id_idx on orders (clerk_user_id);
create index if not exists orders_created_at_idx on orders (created_at desc);

-- 2. Carts table (keyed by Clerk user_id)
create table if not exists carts (
  user_id    text primary key,
  items      jsonb default '[]',
  updated_at timestamptz default now()
);

-- 3. Wishlists table (keyed by Clerk user_id)
create table if not exists wishlists (
  user_id    text primary key,
  items      jsonb default '[]',
  updated_at timestamptz default now()
);

-- 4. Auto-update updated_at on row changes
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists orders_updated_at on orders;
create trigger orders_updated_at
  before update on orders
  for each row execute function update_updated_at();

drop trigger if exists carts_updated_at on carts;
create trigger carts_updated_at
  before update on carts
  for each row execute function update_updated_at();

drop trigger if exists wishlists_updated_at on wishlists;
create trigger wishlists_updated_at
  before update on wishlists
  for each row execute function update_updated_at();

-- 5. Row Level Security (Lockdown)
-- The app connects server-side via Supabase Service Role key (supabaseAdmin),
-- which bypasses RLS. We enable RLS and revoke public access so anon keys cannot
-- manipulate orders, carts, or wishlists directly.
alter table orders    enable row level security;
alter table carts     enable row level security;
alter table wishlists enable row level security;

-- Revoke direct table privileges from public roles
revoke all on orders, carts, wishlists from anon, authenticated;
