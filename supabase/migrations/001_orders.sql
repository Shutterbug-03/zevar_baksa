-- ─────────────────────────────────────────────────────────────────────────────
-- Zevar Baksa — Supabase Schema
-- Run this in your Supabase SQL Editor:
--   https://app.supabase.com/project/_/sql
-- ─────────────────────────────────────────────────────────────────────────────

-- Orders table
create table if not exists orders (
  id                  uuid default gen_random_uuid() primary key,
  razorpay_order_id   text unique,
  razorpay_payment_id text,
  razorpay_signature  text,
  amount              integer not null,      -- in paise (₹1 = 100 paise)
  currency            text default 'INR',
  status              text default 'pending' check (
                        status in ('pending','paid','failed','cod_pending','refunded')
                      ),
  customer_email      text not null,
  customer_name       text default '',
  customer_phone      text default '',
  address             jsonb default '{}',    -- { address1, city, state, pincode, country }
  items               jsonb default '[]',    -- [{ product_id, name, price, quantity, ... }]
  payment_method      text default 'upi',   -- upi | card | netbanking | cod
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- Auto-update updated_at on row changes
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

-- Index for fast lookup by email (for /account page order history)
create index if not exists orders_customer_email_idx on orders (customer_email);

-- Index for Razorpay order ID lookups
create index if not exists orders_razorpay_order_id_idx on orders (razorpay_order_id);

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Customers can only read their own orders (matched by email)
alter table orders enable row level security;

-- Allow anyone to insert (needed for checkout API which uses service role anyway)
create policy "Allow insert from server" on orders
  for insert with check (true);

-- Customers can read their own orders
create policy "Customers read own orders" on orders
  for select using (
    auth.jwt() ->> 'email' = customer_email
  );

-- Service role can read/update all (used in API routes)
-- (service role bypasses RLS by default — no policy needed)

-- ─── NextAuth adapter tables (if using @auth/supabase-adapter later) ──────────
-- Reference: https://authjs.dev/reference/adapter/supabase
-- Uncomment when ready to use the Supabase adapter instead of JWT sessions:
/*
create table if not exists accounts (
  id                   text primary key,
  user_id              text not null,
  type                 text not null,
  provider             text not null,
  provider_account_id  text not null,
  refresh_token        text,
  access_token         text,
  expires_at           bigint,
  token_type           text,
  scope                text,
  id_token             text,
  session_state        text,
  unique (provider, provider_account_id)
);

create table if not exists sessions (
  id            text primary key,
  user_id       text not null,
  expires       timestamptz not null,
  session_token text unique not null
);

create table if not exists users (
  id             text primary key,
  name           text,
  email          text unique,
  email_verified timestamptz,
  image          text
);

create table if not exists verification_tokens (
  identifier text not null,
  token      text unique not null,
  expires    timestamptz not null,
  primary key (identifier, token)
);
*/
