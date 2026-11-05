# Zevar Baksa

Jewellery storefront: Next.js 16 on Vercel · Clerk (auth) · Razorpay (payments) · Supabase (orders, carts, wishlists) · BUSY (prices/stock) · Resend (email).

```bash
cp .env.example .env.local   # fill in test keys
npm install && npm run dev
```

## Order flow

`/api/create-order` re-prices the cart from `lib/catalog.ts`, creates a Razorpay order and saves a `pending` row →
customer pays in the Razorpay modal → `/api/verify-payment` (browser) **or** `/api/webhooks/razorpay` (server, backup)
calls `lib/fulfillOrder.ts`, which flips the row to `paid` once, posts a sale voucher to BUSY (live `rzp_live_` keys only —
test payments never touch the books) and sends the emails. If BUSY fails, the admin email says to enter it by hand.

## Go-live checklist

1. **Supabase**: run `supabase/migrations/004_*.sql` and `005_*.sql`. Check
   `select * from pg_policies where tablename in ('orders','carts','wishlists');` returns no rows. Use the Pro plan (free projects pause).
2. **Vercel**: add the domain; set every var from `.env.example` in **Production**; redeploy.
3. **Clerk**: create the production instance, add its DNS records, swap to `pk_live`/`sk_live`, set up Google OAuth credentials.
4. **Resend**: verify the domain (DNS only); set `STORE_EMAIL`, `ADMIN_EMAIL`, `CONTACT_EMAIL`.
5. **Razorpay**: after website approval, swap to `rzp_live_` keys; add a **live-mode** webhook (`payment.captured`, `order.paid`)
   and put its secret in `RAZORPAY_WEBHOOK_SECRET`; confirm auto-capture is on.
6. Place one small real order, check the emails and the `paid` row, then refund it from the Razorpay dashboard.

Admin actions (dispatch / refund / invoice emails): `POST /api/admin/order-update` with header `x-admin-secret` — see the route file.
