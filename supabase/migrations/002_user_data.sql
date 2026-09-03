-- ─────────────────────────────────────────────────────────────────────────────
-- Zevar Baksa — Clerk User Data Schema
-- Run this in your Supabase SQL Editor:
--   https://app.supabase.com/project/_/sql
-- ─────────────────────────────────────────────────────────────────────────────

-- Carts table (keyed by Clerk user_id)
create table if not exists carts (
  user_id text primary key,
  items jsonb default '[]',
  updated_at timestamptz default now()
);

-- Wishlists table (keyed by Clerk user_id)
create table if not exists wishlists (
  user_id text primary key,
  items jsonb default '[]',
  updated_at timestamptz default now()
);

-- Auto-update updated_at on row changes
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists carts_updated_at on carts;
create trigger carts_updated_at
  before update on carts
  for each row execute function update_updated_at();

drop trigger if exists wishlists_updated_at on wishlists;
create trigger wishlists_updated_at
  before update on wishlists
  for each row execute function update_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Allow the server to bypass RLS (using SERVICE_ROLE key) for all syncing
-- For extra safety, you can optionally configure RLS for Clerk JWTs, but for now 
-- our API routes use supabaseAdmin (service role) to read/write securely.

alter table carts enable row level security;
alter table wishlists enable row level security;

-- Policies to allow the server (Service Role) to do everything
create policy "Allow insert from server" on carts for insert with check (true);
create policy "Allow select from server" on carts for select using (true);
create policy "Allow update from server" on carts for update using (true);
create policy "Allow delete from server" on carts for delete using (true);

create policy "Allow insert from server" on wishlists for insert with check (true);
create policy "Allow select from server" on wishlists for select using (true);
create policy "Allow update from server" on wishlists for update using (true);
create policy "Allow delete from server" on wishlists for delete using (true);
