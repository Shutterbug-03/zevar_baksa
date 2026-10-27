-- Link orders to the signed-in Clerk user so /account shows them even when the
-- email typed at checkout differs from the login email.
-- Run in the Supabase SQL Editor after 001_orders.sql.

alter table orders add column if not exists clerk_user_id text;

create index if not exists orders_clerk_user_id_idx on orders (clerk_user_id);
