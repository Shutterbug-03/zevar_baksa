# Zevar Baksa — E-Commerce Roadmap
> Last updated: August 2026 — fully audited after Pillar 3 completion.

---

## ✅ PILLAR 1 — Discovery & Planning — 100% Done

| Task | Status |
|------|--------|
| Requirement Gathering | ✅ Done |
| Customer Journey Mapping | ✅ Done |
| Website Architecture (Next.js App Router) | ✅ Done |
| Information Hierarchy (all pages exist) | ✅ Done |
| Functional Planning | ✅ Done (this document) |

---

## ✅ PILLAR 2 — UI/UX Design — 100% Done

| Page / Component | Status |
|------------------|--------|
| Homepage (`/`) | ✅ Done — Hero, New Releases Carousel, Marquee, FAQ, Footer |
| Shop Page (`/shop`) | ✅ Done — Product grid, category filters |
| Product Detail (`/product/[id]`) | ✅ Done — Image gallery, specs accordion, Add to Bag |
| Collection Pages (`/collection/[slug]`) | ✅ Done — Collection hero + product listing |
| About Page (`/about`) | ✅ Done |
| Contact / Retail Store (`/contact`) | ✅ Done |
| Checkout Page (`/checkout`) | ✅ Done — Full 3-step flow: Delivery → Payment → Confirm |
| Wishlist Page (`/wishlist`) | ✅ Done — Grid, remove, add-to-cart from wishlist |
| Account Page (`/account`) | ✅ Done — Order history, sign out |
| Cart Drawer | ✅ Done — Slide-out panel, qty controls, totals |
| Search Modal | ✅ Done — Live product search, keyboard shortcuts, popular tags |
| Login / Signup Modal | ✅ Done — Email magic link (passwordless) |
| "Check Your Email" Page (`/auth/verify`) | ✅ Done |
| Navigation | ✅ Done — Hamburger, currency switcher, bag icon, search, wishlist |
| Design System | ✅ Done — Maroon/gold theme, CSS variables, typography |

---

## ✅ PILLAR 3 — Website Development — 100% Done

| Task | Status | Notes |
|------|--------|-------|
| Frontend | ✅ Done | All pages, components, stores built |
| Zustand State (Cart, Wishlist, Currency, UI) | ✅ Done | All persisted via localStorage |
| Currency Conversion | ✅ Done | Real math for INR / USD / GBP / AED |
| Backend / API Routes | ✅ Done | `/api/create-order`, `/api/verify-payment`, `/api/auth/[...nextauth]` |
| Payment Integration | ✅ Done | Razorpay SDK wired — placeholder keys, swap when live |
| Auth (NextAuth.js) | ✅ Done | Email magic link — dev mode logs link to terminal |
| Customer Accounts | ✅ Done | `/account` page with order history from Supabase |
| Order Confirmation Email | ✅ Done | Resend in `verify-payment` route — dev mode logs to terminal |
| Database Schema | ✅ Done | `supabase/migrations/001_orders.sql` ready to run |
| Route Protection | ✅ Done | `middleware.ts` guards `/account` |
| Environment Secrets | ✅ Done | `.env.local` + `.env.example` with all keys as placeholders |
| Responsive Layout | ✅ Done | Mobile-first throughout |

**⚡ To activate real payments/auth, update `.env.local` with:**
- `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` → dashboard.razorpay.com
- `NEXTAUTH_SECRET` → `openssl rand -base64 32`
- `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` → app.supabase.com (after running migration)
- `RESEND_API_KEY` → resend.com

---

## ✅ PILLAR 4 — E-Commerce Backend — 90% Done

| Task | Status | Notes |
|------|--------|-------|
| Cart (persistent) | ✅ Done | Zustand + localStorage — survives refresh |
| Wishlist (persistent) | ✅ Done | Zustand + localStorage |
| Checkout Flow | ✅ Done | 3-step: address → payment → confirm |
| Real Payment Processing | ✅ Done | Razorpay wired — placeholder keys, ready for live |
| Order Confirmation Email | ✅ Done | Resend wired — placeholder key, ready for live |
| Customer Auth | ✅ Done | NextAuth email magic link |
| Order Persistence | ✅ Done | Supabase orders table + RLS (schema ready, needs DB created) |
| Product Catalog from DB | ❌ Pending | Still static `.ts` files — needs BUSY (Phase 6) |
| Inventory / Stock Tracking | ❌ Pending | Status hardcoded per product — needs BUSY (Phase 6) |
| Search | ⚠️ Client-side | Works well on static data — upgrade to Algolia post-BUSY |

---

## ❌ PILLAR 5 — Backend Operations — 0% Done

| Task | Status | Recommended Tech |
|------|--------|--------------------|
| Admin Dashboard | ❌ Missing | BUSY Accounting Software (busy.in) |
| Inventory & Orders | ❌ Missing | BUSY + Next.js API sync |
| Customer Management | ❌ Missing | BUSY Sundry Debtors / Parties |
| GST Invoicing | ❌ Missing | BUSY GST Invoicing module |
| Analytics | ❌ Missing | Google Analytics 4 |

---

## 🟡 PILLAR 6 — BUSY Software Integration — 90% Code Ready (Awaiting Live Credentials)

BUSY Accounting Software (https://busy.in) is the chosen ERP for inventory, sales vouchers, GST invoicing, and jewelry stock tracking.

### BUSY Code Base & Routes Status
- ✅ `src/lib/busy.ts` — REST API / Agent client (Items, Sales Vouchers, Stock Query, Party master)
- ✅ `src/app/api/products/route.ts` — Fetches active catalog from BUSY (fallback to static)
- ✅ `src/app/api/orders/route.ts` — Creates Sales Orders & syncs vouchers
- ✅ `src/app/api/webhooks/busy/route.ts` — Handles real-time inventory updates
- ✅ `src/app/api/verify-payment/route.ts` — Auto-creates BUSY Sales Voucher upon payment completion
- ✅ `.env.local` & `.env.example` — Added BUSY_API_URL, BUSY_COMPANY_CODE, BUSY_API_KEY placeholders

### Integration Architecture
```
Next.js Frontend
      │
      ▼
Next.js API Routes (/api/*)
      │
      ├── BUSY REST API / Agent ──► BUSY Server (busy.in) ✅ CODE WIRED
      │     - Product & price sync      (Item Master)
      │     - Stock level webhooks      (Inventory)
      │     - Create Sales Voucher      (Vouchers/Orders)
      │
      ├── Razorpay API ──► Payment Gateway ✅ WIRED
      │     - Create payment order
      │     - Verify webhook
      │
      └── Resend ──► Email ✅ WIRED
            - Order confirmations
            - Shipping updates
```

### Next Action once BUSY Instance is Live:
1. Copy instance credentials (`BUSY_API_URL`, `BUSY_COMPANY_CODE`, `BUSY_API_KEY`, `BUSY_USER`, `BUSY_PASSWORD`) to `.env.local`.
2. Seed products in BUSY Item Master.
3. Live transactions will sync to BUSY immediately.

---

## ❌ PILLAR 7 — Hosting & Infrastructure — 0% Done

| Task | Recommendation | Status |
|------|---------------|--------|
| Frontend Hosting | Vercel | ❌ Not deployed |
| Database | Supabase (run migration, add keys) | ❌ Schema ready, DB not created |
| SSL & CDN | Auto via Vercel | ❌ Pending deploy |
| Custom Domain | Namecheap / GoDaddy → Vercel | ❌ Not configured |
| Media / Images | Cloudinary or Vercel Blob | ❌ Using placeholder images |
| SEO | sitemap.xml, robots.txt, OG tags | ❌ Missing |
| Analytics | Google Analytics 4 | ❌ Not set up |
| WhatsApp Concierge | Wire real phone number | ❌ Placeholder |

---

## 📋 Phased Execution Plan

### ✅ Phase 1 — Frontend Shell — COMPLETE
All pages, components, stores, and UI built and working locally.

---

### ✅ Phase 2 — Real Payments — COMPLETE
- [x] `npm install razorpay`
- [x] `src/lib/razorpay.ts` — Razorpay client singleton
- [x] `src/app/api/create-order/route.ts` — creates Razorpay order server-side
- [x] `src/app/api/verify-payment/route.ts` — verifies signature, saves to Supabase
- [x] Wired into `/checkout/page.tsx` — real SDK call, COD path, dev placeholder mode
- [x] Order success screen
- [x] Resend — branded confirmation email on payment success

---

### ✅ Phase 3 — Customer Auth — COMPLETE
- [x] `npm install next-auth`
- [x] Email magic link provider (passwordless)
- [x] `src/lib/auth.ts` — NextAuth config with Resend email + dev terminal fallback
- [x] `src/app/api/auth/[...nextauth]/route.ts` — auth handler
- [x] `middleware.ts` — protects `/account` route
- [x] `src/app/account/page.tsx` — order history, sign out
- [x] `src/app/auth/verify/page.tsx` — "check your email" page
- [x] `src/components/AuthProvider.tsx` + wired into `layout.tsx`
- [x] LoginModal → real `signIn("email", ...)` call

---

### 🔴 Phase 4 — Supabase Setup (Priority #1 — 30 mins) — NEXT

> The schema is written. Just need to create the DB and drop in the keys.

- [ ] Create Supabase project at supabase.com (free tier)
- [ ] Run `supabase/migrations/001_orders.sql` in the SQL editor
- [ ] Copy `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` into `.env.local`
- [ ] Test: place a test order → confirm it appears in the Supabase orders table

---

### 🔴 Phase 5 — Live Keys (Priority #2 — 1 hour)

- [ ] Razorpay: create account → get `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` → update `.env.local`
- [ ] NextAuth: `openssl rand -base64 32` → set `NEXTAUTH_SECRET` in `.env.local`
- [ ] Resend: create account → get `RESEND_API_KEY` → update `.env.local`
- [ ] Test full flow: cart → checkout → real UPI payment → Supabase row → confirmation email

---

### 🟡 Phase 6 — Odoo Backend — ~2–3 weeks

- [ ] Set up Odoo instance (SaaS recommended)
- [ ] Enable: Inventory, Sales, Manufacturing, Invoicing, CRM
- [ ] Migrate `products.ts` data into Odoo product catalog
- [ ] `src/lib/odoo.ts` — JSON-RPC API client
- [ ] `src/app/api/products/route.ts` — fetch products from Odoo instead of static TS
- [ ] `src/app/api/orders/route.ts` — create Sale Order in Odoo on checkout
- [ ] Stock level webhooks: Odoo → Next.js revalidation
- [ ] Test end-to-end full flow

---

### 🟡 Phase 7 — Production Deploy — ~3–4 days

- [ ] Push repo to GitHub
- [ ] Connect to Vercel → auto-deploy on push
- [ ] Add all env vars to Vercel dashboard
- [ ] Configure custom domain
- [ ] Upload real product photography
- [ ] Add `sitemap.xml`, `robots.txt`, OG meta tags
- [ ] Google Analytics 4
- [ ] Lighthouse audit (target ≥ 90)
- [ ] Wire WhatsApp Concierge with real phone number

---

## ⚡ Immediate Next Step — Right Now

**Phase 4: Create the Supabase DB (30 minutes)**

Everything is wired. The only thing standing between you and a fully working store is:
1. Create a free Supabase project at [supabase.com](https://supabase.com)
2. Paste + run `supabase/migrations/001_orders.sql` in the SQL editor
3. Copy the 3 keys into `.env.local`
4. Test a checkout

---

## 🔑 Technology Decisions

| Category | Choice | Status |
|----------|--------|--------|
| Frontend | Next.js 16 App Router | ✅ Built |
| State | Zustand + persist | ✅ Built |
| Payment | Razorpay | ✅ Wired (placeholder keys) |
| Auth | NextAuth.js email magic link | ✅ Wired (placeholder keys) |
| Database | Supabase (Postgres) | ✅ Schema ready — DB not created yet |
| Order Emails | Resend | ✅ Wired (placeholder key) |
| ERP / Backend | Odoo | ❌ Phase 6 |
| Hosting | Vercel | ❌ Phase 7 |
| Media | Cloudinary or Vercel Blob | ❌ Phase 7 |
| Search | Client-side → Algolia post-Odoo | ⚠️ Working on static data |


---

## ✅ PILLAR 1 — Discovery & Planning — 100% Done

| Task | Status |
|------|--------|
| Requirement Gathering | ✅ Done |
| Customer Journey Mapping | ✅ Done |
| Website Architecture (Next.js App Router) | ✅ Done |
| Information Hierarchy (all pages exist) | ✅ Done |
| Functional Planning | ✅ Done (this document) |

---

## ✅ PILLAR 2 — UI/UX Design — 100% Done

| Page / Component | Status |
|------------------|--------|
| Homepage (`/`) | ✅ Done — Hero, New Releases Carousel, Marquee, FAQ, Footer |
| Shop Page (`/shop`) | ✅ Done — Product grid, category filters |
| Product Detail (`/product/[id]`) | ✅ Done — Image gallery, specs accordion, Add to Bag |
| Collection Pages (`/collection/[slug]`) | ✅ Done — Collection hero + product listing |
| About Page (`/about`) | ✅ Done |
| Contact / Retail Store (`/contact`) | ✅ Done |
| Checkout Page (`/checkout`) | ✅ Done — Full 3-step flow: Delivery → Payment → Confirm |
| Wishlist Page (`/wishlist`) | ✅ Done — Grid, remove, add-to-cart from wishlist |
| Cart Drawer | ✅ Done — Slide-out panel, qty controls, totals |
| Search Modal | ✅ Done — Live product search, keyboard shortcuts, popular tags |
| Login / Signup Modal | ✅ Done — Login / Signup / Forgot password UI |
| Navigation | ✅ Done — Hamburger, currency switcher, bag icon, search, wishlist |
| Design System | ✅ Done — Maroon/gold theme, CSS variables, typography |

---

## ✅ PILLAR 3 — Website Development — 100% Done

| Task | Status | Notes |
|------|--------|-------|
| Frontend | ✅ Done | All pages, components, stores built |
| Zustand State (Cart, Wishlist, Currency, UI) | ✅ Done | All persisted via localStorage |
| Currency Conversion | ✅ Done | Real math for INR / USD / GBP / AED |
| Backend / API Routes | ✅ Done | `/api/create-order`, `/api/verify-payment`, `/api/auth/[...nextauth]` |
| Payment Integration | ✅ Done | Razorpay SDK wired (placeholder keys — swap when live) |
| Auth (real, server-side) | ✅ Done | NextAuth.js email magic link — `src/lib/auth.ts` |
| Customer Accounts | ✅ Done | `/account` page with order history |
| Order Emails | ✅ Done | Resend integration in verify-payment route |
| Database Schema | ✅ Done | Supabase `orders` table migration ready — `supabase/migrations/001_orders.sql` |
| Route Protection | ✅ Done | `middleware.ts` protects `/account` |
| Environment Secrets | ✅ Done | `.env.local` + `.env.example` with all required keys |
| Responsive Layout | ✅ Done | Mobile-first |

**⚡ To go live, just swap 3 keys in `.env.local`:**
- `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` → from dashboard.razorpay.com
- `NEXTAUTH_SECRET` → `openssl rand -base64 32`
- Supabase keys → app.supabase.com after running `supabase/migrations/001_orders.sql`
- `RESEND_API_KEY` → resend.com

---

## ❌ PILLAR 4 — E-Commerce Backend — 15% Done

| Task | Status | Notes |
|------|--------|-------|
| Cart UI | ✅ Done | Fully functional with localStorage persistence |
| Checkout Flow UI | ✅ Done | 3-step form: address → payment → confirm |
| Real Payment Processing | ❌ Missing | No Razorpay SDK integrated yet |
| Order Confirmation / Email | ❌ Missing | No Resend/SendGrid connected |
| Customer Accounts (real auth) | ❌ Missing | Frontend UI exists, no backend |
| Product Catalog from DB | ❌ Missing | Static `.ts` files only |
| Inventory / Stock Tracking | ❌ Missing | Status field is hardcoded per product |
| Search | ⚠️ Client-side only | Works on static data — fine for now |

**Priority Build Order:**
1. Razorpay — `src/app/api/create-order/route.ts` + `verify-payment/route.ts`
2. Order Confirmation Email — Resend on successful payment
3. NextAuth.js — Google + email magic link
4. `/account` page — order history, saved addresses
5. Supabase orders table — persist orders on checkout

---

## ❌ PILLAR 5 — Backend Operations — 0% Done

| Task | Status | Recommended Tech |
|------|--------|-----------------|
| Admin Dashboard | ❌ Missing | Odoo Backend |
| Inventory & Orders | ❌ Missing | Odoo + Next.js API sync |
| Customer Management | ❌ Missing | Odoo CRM |
| Analytics | ❌ Missing | Google Analytics 4 |
| GST Invoicing | ❌ Missing | Odoo Invoicing module |

---

## ❌ PILLAR 6 — Odoo Integration — 0% Done

Odoo is the recommended ERP for inventory, orders, GST invoicing, and CRM.

### Odoo Modules to Enable
| Module | Purpose |
|--------|---------|
| Inventory | Stock levels, "Ready to Ship" vs "Made to Order" |
| Sales | Order management, bespoke quotes |
| Manufacturing | Track Made-to-Order crafting timelines |
| Invoicing | GST-compliant auto-invoices |
| CRM | WhatsApp / email enquiry pipeline |
| Email Marketing | Order confirmations, shipping updates |

### Integration Architecture
```
Next.js Frontend
      │
      ▼
Next.js API Routes (/api/*)
      │
      ├── Odoo JSON-RPC API ──► Odoo Server
      │     - Product & price sync      (Inventory)
      │     - Stock level webhooks      (Inventory)
      │     - Create Sale Order         (Sales)
      │
      ├── Razorpay API ──► Payment Gateway
      │     - Create payment order
      │     - Verify webhook
      │
      └── Resend ──► Email
            - Order confirmations
            - Shipping updates
```

### Odoo Setup Steps
1. Install Odoo — Odoo.com SaaS ($11.90/user/mo) or DigitalOcean droplet
2. Enable modules: Inventory, Sales, Manufacturing, Invoicing, CRM
3. Create API key in Odoo Settings → Technical → API Keys
4. Migrate products from `products.ts` into Odoo catalog
5. Build `src/lib/odoo.ts` — Next.js JSON-RPC client
6. Add API routes: `/api/products`, `/api/orders`
7. Add Odoo webhooks for stock changes → Next.js revalidation
8. Test full flow: browse → cart → checkout → payment → Odoo order

---

## ❌ PILLAR 7 — Hosting & Infrastructure — 0% Done

| Task | Recommendation | Status |
|------|---------------|--------|
| Frontend Hosting | Vercel | ❌ Not deployed |
| Database | Supabase (Postgres, free tier) | ❌ Not set up |
| SSL & CDN | Auto via Vercel | ❌ Pending deploy |
| Custom Domain | Namecheap / GoDaddy → Vercel | ❌ Not configured |
| Media / Images | Cloudinary or Vercel Blob | ❌ Using placeholder images |
| SEO | sitemap.xml, robots.txt, OG tags | ❌ Missing |
| Analytics | Google Analytics 4 | ❌ Not set up |
| WhatsApp Concierge | Wire real phone number | ❌ Placeholder |

---

## 📋 Phased Execution Plan — Remaining Work

### ✅ Phase 1 — Frontend Shell — COMPLETE
All pages, components, stores, and UI are built and working locally.

---

### 🔴 Phase 2 — Real Payments (Priority #1) — ~1 week

- [ ] `npm install razorpay`
- [ ] `src/lib/razorpay.ts` — Razorpay client singleton
- [ ] `src/app/api/create-order/route.ts` — POST: creates Razorpay order, returns order_id
- [ ] `src/app/api/verify-payment/route.ts` — POST: verifies signature, saves order
- [ ] Wire into `/checkout/page.tsx` — replace "Place Order" with real Razorpay SDK call
- [ ] Order success page / confirmation toast
- [ ] Resend — send confirmation email on payment success

---

### 🔴 Phase 3 — Customer Auth — ~1 week

- [ ] `npm install next-auth`
- [ ] Google OAuth + email magic link provider
- [ ] Protect `/account` route (middleware)
- [ ] `src/app/account/page.tsx` — order history, saved addresses
- [ ] Link Login Modal to real NextAuth `signIn()`

---

### 🟡 Phase 4 — Odoo Backend — ~2–3 weeks

- [ ] Set up Odoo instance (SaaS recommended)
- [ ] Enable: Inventory, Sales, Manufacturing, Invoicing, CRM
- [ ] Migrate `products.ts` data into Odoo product catalog
- [ ] `src/lib/odoo.ts` — JSON-RPC API client
- [ ] `src/app/api/products/route.ts` — fetch from Odoo
- [ ] `src/app/api/orders/route.ts` — create Sale Order on checkout
- [ ] Stock level webhooks Odoo → Next.js
- [ ] Test end-to-end full flow

---

### 🟡 Phase 5 — Production Deploy — ~3–4 days

- [ ] Push repo to GitHub
- [ ] Connect to Vercel — auto-deploy on push
- [ ] Set up Supabase project + DATABASE_URL in Vercel env
- [ ] Add env vars: `RAZORPAY_KEY_ID`, `RAZORPAY_SECRET`, `RESEND_API_KEY`, `ODOO_URL`, `ODOO_API_KEY`, `NEXTAUTH_SECRET`
- [ ] Configure custom domain in Vercel
- [ ] Upload real product photography
- [ ] Add `sitemap.xml`, `robots.txt`, OG meta tags
- [ ] Google Analytics 4
- [ ] Lighthouse audit (target ≥ 90)
- [ ] Wire WhatsApp Concierge button with real phone number

---

## ⚡ Immediate Next Step — This Week

**Phase 2: Razorpay Integration**

The checkout UI is 100% built. The only thing missing is the real payment call.

```
src/
  app/
    api/
      create-order/
        route.ts     ← POST: creates Razorpay order, returns order_id
      verify-payment/
        route.ts     ← POST: verifies Razorpay signature, saves order to DB
  lib/
    razorpay.ts      ← Razorpay client singleton
```

Wire the "Place Order" button in `/checkout/page.tsx` to call `/api/create-order`
and open the Razorpay checkout modal.

---

## 🔑 Technology Decisions

| Category | Choice | Reason |
|----------|--------|--------|
| Frontend | Next.js 15 App Router | Already built |
| State | Zustand + persist | Already built, works great |
| Payment | Razorpay | Best for India — UPI, cards, EMI, net banking |
| Auth | NextAuth.js | App Router compatible |
| Database | Supabase (Postgres) | Free tier, realtime, auth built-in |
| ERP / Backend | Odoo | Inventory, orders, GST invoicing in one place |
| Odoo Hosting | Odoo.com SaaS | Managed, no DevOps overhead |
| Email | Resend | Developer-friendly |
| Hosting | Vercel | Zero-config Next.js deploy |
| Media | Cloudinary or Vercel Blob | Image optimization for jewellery photos |
| Search | Client-side now → Algolia later | Good enough until catalog grows |
