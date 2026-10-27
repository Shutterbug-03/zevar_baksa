-- Order lifecycle after payment: dispatch, delivery, refund, invoice.
-- Run in the Supabase SQL Editor after 001–004.

alter table orders drop constraint if exists orders_status_check;
alter table orders add constraint orders_status_check check (
  status in ('pending','paid','failed','shipped','delivered','refunded','cancelled')
);

alter table orders add column if not exists courier         text;
alter table orders add column if not exists tracking_number  text;
alter table orders add column if not exists tracking_url     text;
alter table orders add column if not exists shipped_at       timestamptz;
alter table orders add column if not exists invoice_number   text;
alter table orders add column if not exists refunded_amount  integer;      -- in paise
alter table orders add column if not exists refunded_at      timestamptz;
