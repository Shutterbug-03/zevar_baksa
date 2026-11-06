# GEO Audit Report: Zevar Baksa

**Audit Date:** 6 November 2026
**URL:** https://www.zevarbaksa.com
**Business Type:** E-commerce (handcrafted jewellery, single brand, Jaipur)
**Pages Analyzed:** 34 (every unique URL in the sitemap: 10 site pages, 23 products, 1 collection)
**Method:** Live HTML fetched without running JavaScript (the way most AI crawlers read a page), plus a read of the source code to find the cause of each issue.

---

## Executive Summary

**Overall GEO Score: 30/100 (Critical)**

The site is fast, server-rendered, open to every AI crawler, and has good raw material: a real founder story, a clear name meaning ("Zevar" = jewellery, "Baksa" = box), detailed product specs and a useful FAQ. But three technical faults hide most of it. Eight of the ten main pages tell search engines "I am a copy of the homepage". None of the structured data the code writes reaches crawlers. And the sitemap lists every product five times. Off-site, the brand doesn't exist yet for AI systems, and several older jewellers called "Zevar" crowd the name. The site launched days ago, so the off-site score is expected. The on-site faults are cheap to fix, and fixing them would lift the score to roughly 50 within a week.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 40/100 | 25% | 10.0 |
| Brand Authority | 5/100 | 20% | 1.0 |
| Content E-E-A-T | 45/100 | 20% | 9.0 |
| Technical GEO | 50/100 | 15% | 7.5 |
| Schema & Structured Data | 10/100 | 10% | 1.0 |
| Platform Optimization | 10/100 | 10% | 1.0 |
| **Overall GEO Score** | | | **29.5 → 30/100** |

---

## Critical Issues (Fix Immediately)

### 1. Eight main pages point their canonical URL at the homepage
- **Pages:** /about, /shop, /contact, /wishlist, /shipping-policy, /exchange-policy, /privacy-policy, /terms-conditions. All carry `<link rel="canonical" href="https://zevarbaksa.com">`.
- **Effect:** A canonical tag tells Google and AI crawlers "the real version of this page is over there". These pages are treated as duplicates of the homepage and dropped from the index. The About page, the best brand-story page, will not be cited.
- **Cause:** `src/app/layout.tsx` sets `alternates: { canonical: "/" }` for the whole site. Pages without their own metadata inherit it.
- **Fix:** Remove `canonical` from the root layout and set it per page (`alternates: { canonical: "/about" }` and so on). /shop, /contact and /wishlist are client components, so give each a small `layout.tsx` with its own `metadata`.

### 2. No structured data reaches crawlers on any page
- **Pages:** All 34. The fetched HTML contains zero `<script type="application/ld+json">` tags.
- **Effect:** AI systems and Google see no Organization, WebSite, Product, Offer or FAQPage data. This is the biggest single loss for an e-commerce site: price, availability, material and brand identity never become machine-readable facts.
- **Cause:** The JSON-LD exists in code (`layout.tsx`, `FaqSection.tsx`, `product/[id]/ProductClient.tsx`), but it is added with Next's `<Script>` component. That component inserts it with JavaScript after the page loads, and most AI crawlers don't run JavaScript.
- **Fix:** Render it as a plain `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` in server components: the root layout for Organization and WebSite, the product page's server shell (`product/[id]/page.tsx`) for Product. Small change, three places.

## High Priority Issues

### 3. Sitemap lists every product five times and uses the wrong host
- **Effect:** 130 URLs for 34 real pages. The sitemap uses `https://zevarbaksa.com/...`, but every apex URL redirects (308) to `www.zevarbaksa.com`. Canonicals, sitemap and Open Graph URLs all point at a redirect.
- **Cause:** `src/app/sitemap.ts` reads `getCatalog().values()`. That lookup map stores each product under five keys (id, lower, upper, name, slug).
- **Fix:** Use `getProductList()` from `lib/catalog.ts`. For the host, either make the apex domain primary in Vercel (no code change), or set `NEXT_PUBLIC_SITE_URL=https://www.zevarbaksa.com` and redeploy. Drop `/wishlist` from the sitemap, since it has no content for crawlers.

### 4. The site description says kundan, polki and jadau, but the catalogue is silver meenakari
- **Where:** The homepage, /shop, /contact and /wishlist meta descriptions: "kundan, polki, and jadau pieces, made to order". The site's search box also suggests "Bridal Set", "Kundan Polki" and "Bracelet", none of which exist.
- **Effect:** AI systems build their summary of a brand from its descriptions. Today they would describe Zevar Baksa as a kundan/polki bridal house, which is wrong. That causes missed matches for "silver meenakari pendant Jaipur" and wrong matches for bridal queries.
- **Fix:** Rewrite the default description around what is sold: *"Zevar Baksa is a Jaipur jewellery house making handcrafted 925 silver pendants, earrings and necklaces with kiln-fired meenakari enamel and 22K kundan accents. The Meena Bagh collection, ₹16,000–₹1,50,000."* Update the popular-search suggestions in `SearchModal`.

### 5. No llms.txt
- **Effect:** /llms.txt returns 404. AI assistants have no short, curated guide to what the brand is, what it sells and which pages matter.
- **Fix:** Add `public/llms.txt` (template in Quick Wins).

### 6. Brand name collides with existing jewellers
- **Effect:** Searching "Zevar Baksa" returns Zevar Emporium (Jaipur), Zevar The Jewellery World, Zevar by Geeta and Zevar Jewellery. No result is this brand. Without strong identity signals, AI models will merge or confuse it with these.
- **Fix:** Organization schema with `sameAs` links to every official profile (critical issue 2 must ship first). Use the full name "Zevar Baksa" consistently and never "Zevar" alone. Build the off-site profiles in the 30-day plan.

## Medium Priority Issues

7. **Page titles repeat the brand.** "Our Story — Zevar Baksa | Zevar Baksa", "Privacy Policy — Zevar Baksa | Zevar Baksa". Pages add "— Zevar Baksa" and the layout template adds "| Zevar Baksa" again. Drop the suffix from each page title.
8. **/shop, /contact and /wishlist have no title or description of their own.** All three show the homepage title. /shop also has no H1.
9. **Product pages are thin in server HTML.** About 310 words, most of it navigation and footer. The product story (for example "A delicate bird-shaped pendant…") is only in the meta description, not in the visible page body. The specs are there and are good. /product/e7 (Aabha) has 151 words and no section headings: check that this product page is complete.
10. **The FAQ has no FAQPage markup reaching crawlers** (fixed together with critical issue 2). The FAQ itself is good citable content.
11. **The About page H1 is "BRAND STORY".** A heading that names the subject would be quoted more often, for example "The Story of Zevar Baksa, Jaipur".
12. **The homepage repeats the About story word for word.** Duplicate passages split citations between the two pages. Keep a two-line teaser on the homepage linking to /about.

## Low Priority Issues

13. The homepage marquee repeats "Meena Bagh • New Releases" twelve times in the HTML. Mark it `aria-hidden` or render it once.
14. Product specs still say "925 Silver BIS Hallmarked". The badges were removed elsewhere, so confirm the claim or remove it here too.
15. The footer shows only Instagram as a social profile. Add the others once they exist.
16. No author or date on any content page. This only matters once there is a journal or blog.

---

## Category Deep Dives

### AI Citability (40/100)
**Strengths**
- The brand story is distinctive and quotable: "Zevar means jewellery, Baksa means box; a jewellery box…" is a one-sentence definition an assistant can lift as-is.
- The FAQ answers real buyer questions: materials, hypoallergenic, care.
- Product specs carry hard facts: 925 sterling silver, 22K gold kundan setting, gross weight 5.754 g, pendant length 3.5 cm.

**Gaps**
- No page answers "what is meenakari?", "how is a Zevar Baksa piece made?" or "how do I care for enamel jewellery?" in a self-contained block. These are the questions buyers ask AI assistants.
- Product pages have no visible paragraph describing the piece. The best sentence ("A delicate bird-shaped pendant, handcrafted in 925 silver…") lives only in metadata.
- The core principles on About ("Story first, not trend first", "Named, not anonymous") lack specifics. Naming the artisans and designers credited for Meena Bagh would make them verifiable facts.

**Rewrite example.** On /collection/meena-bagh, open with a 40–60 word answer block: *"Meena Bagh is Zevar Baksa's first collection: 23 handcrafted pieces in 925 sterling silver with kiln-fired meenakari enamel and 22K gold kundan accents, made in Jaipur. It includes bird and floral pendants, earrings and statement necklaces, priced from ₹16,000 to ₹1,50,000."*

### Brand Authority (5/100)
- No third-party mentions of "Zevar Baksa" or zevarbaksa.com in web search.
- Several established "Zevar" jewellery brands occupy the name space.
- Instagram (`instagram.com/zevarbaksa`) is the only owned profile linked from the site.
- This is normal for a brand that launched days ago. The plan below builds it deliberately.

### Content E-E-A-T (45/100)
- **Experience and expertise:** a real founder origin story and a clear craft focus. But the founder is unnamed and the "credited" artisans are not named anywhere. Naming them is the brand's own promise and the strongest E-E-A-T signal available.
- **Trust:** strong. Full postal address, phone, WhatsApp, detailed shipping, exchange, privacy and terms pages (650–2,100 words each), prices including tax.
- **Gaps:** no reviews or testimonials, no press, no Grievance Officer name shown yet, unverified BIS claim (low issue 14).

### Technical GEO (50/100)
- ✅ robots.txt allows every crawler, including GPTBot, ClaudeBot and PerplexityBot, and blocks only /account, /checkout and /api.
- ✅ Server-rendered HTML. All 34 pages returned 200. Every image has alt text. Open Graph and Twitter cards are on every page.
- ❌ Canonical tags point at the homepage (critical issue 1).
- ❌ Sitemap duplication and apex/www mismatch (high issue 3).
- ❌ No llms.txt (high issue 5).

### Schema & Structured Data (10/100)
- **In code, not reaching crawlers:** Organization, WebSite with SearchAction, FAQPage, Product.
- **In fetched HTML:** none.
- **Once fixed, add:**
  - `Offer` (price, INR, availability) and `brand` inside each Product;
  - `BreadcrumbList` on product and collection pages;
  - `JewelryStore` (a LocalBusiness subtype) with the Vaishali Nagar address and phone;
  - `sameAs` on Organization.

### Platform Optimization (10/100)
| Platform | Status |
|---|---|
| Instagram | Present (linked from footer) |
| Google Business Profile | Not found |
| YouTube | Not found |
| Pinterest | Not found (high-value for jewellery discovery) |
| Reddit / Quora | No mentions |
| Wikipedia / Wikidata | None (not yet eligible; Wikidata possible after press coverage) |
| Marketplaces (e.g. Etsy, Amazon Karigar) | None |

---

## Quick Wins (Implement This Week)

1. **Fix canonical tags** (critical issue 1). This puts About, Shop, Contact and the policies back into the index. About 30 minutes.
2. **Render JSON-LD on the server** (critical issue 2). Organization, Product and FAQ become visible to every crawler. About 1 hour.
3. **Fix the sitemap and pick one host** (high issue 3). Use `getProductList()` and make apex or www primary everywhere. About 15 minutes.
4. **Correct the brand description** to silver meenakari (high issue 4). About 15 minutes.
5. **Publish `/llms.txt`.** About 10 minutes:
   ```
   # Zevar Baksa
   > Jaipur jewellery house making handcrafted 925 sterling silver jewellery with kiln-fired meenakari enamel and 22K gold kundan accents. "Zevar" means jewellery, "Baksa" means box.

   ## Shop
   - [Meena Bagh collection](https://www.zevarbaksa.com/collection/meena-bagh): first collection, pendants, earrings and necklaces, ₹16,000–₹1,50,000
   - [All jewellery](https://www.zevarbaksa.com/shop)

   ## About
   - [Our story](https://www.zevarbaksa.com/about): founder story and the artisans behind each collection
   - [Contact](https://www.zevarbaksa.com/contact): B-21 Bhan Nagar, Queens Road, Vaishali Nagar, Jaipur 302021 · +91 92160 48928

   ## Policies
   - [Shipping](https://www.zevarbaksa.com/shipping-policy) · [Exchange & repair](https://www.zevarbaksa.com/exchange-policy)
   ```

## 30-Day Action Plan

### Week 1: Make the site readable
- [ ] Quick wins 1–5
- [ ] Unique title and description for /shop, /contact and /wishlist; remove the duplicate "| Zevar Baksa" suffix
- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools (Bing powers ChatGPT search)

### Week 2: Give AI something to quote
- [ ] Show each product's story paragraph in the visible page body
- [ ] Add a 40–60 word answer block at the top of /collection/meena-bagh
- [ ] Write one guide page: "What is meenakari? How Zevar Baksa makes enamel jewellery in Jaipur" (process, materials, care, with real numbers such as firing steps and silver purity)
- [ ] Name the founder and the Meena Bagh artisans and designers on /about, as the brand promises

### Week 3: Establish the entity
- [ ] Create a Google Business Profile for the Vaishali Nagar address (category: jewellery store)
- [ ] Create Pinterest and YouTube profiles; post product and process content
- [ ] Add every profile to Organization `sameAs` and the footer
- [ ] Add `Offer`, `BreadcrumbList` and `JewelryStore` schema

### Week 4: Earn mentions
- [ ] Pitch the "credited artisans" story to Jaipur and Indian craft or lifestyle press (the brand's most quotable angle)
- [ ] Ask the first customers for reviews (Google Business Profile), then add review markup
- [ ] Re-run this audit and compare scores

---

## Appendix: Pages Analyzed

All pages returned HTTP 200. "Issues" counts the on-page issues listed above that apply to that page. Every page is also affected by critical issue 2 (no structured data) and high issue 3 (apex/www host).

| URL | Title | Words | GEO Issues |
|---|---|---|---|
| / | Zevar Baksa — Handcrafted Heirloom Jewellery | 934 | 3 (wrong description, duplicate story, marquee) |
| /about | Our Story — Zevar Baksa \| Zevar Baksa | 986 | 3 (canonical → home, duplicate title, H1) |
| /shop | Zevar Baksa — Handcrafted Heirloom Jewellery | 179 | 4 (canonical → home, no own title, no H1, description) |
| /contact | Zevar Baksa — Handcrafted Heirloom Jewellery | 216 | 3 (canonical → home, no own title, description) |
| /wishlist | Zevar Baksa — Handcrafted Heirloom Jewellery | 202 | 3 (canonical → home, no own title, in sitemap) |
| /shipping-policy | Shipping Policy — Zevar Baksa \| Zevar Baksa | 653 | 2 (canonical → home, duplicate title) |
| /exchange-policy | Exchange, Repair & Cancellation Policy — Zevar Baksa \| Zevar Baksa | 1,374 | 2 (canonical → home, duplicate title) |
| /privacy-policy | Privacy Policy — Zevar Baksa \| Zevar Baksa | 1,734 | 2 (canonical → home, duplicate title) |
| /terms-conditions | Terms and Conditions — Zevar Baksa \| Zevar Baksa | 2,106 | 2 (canonical → home, duplicate title) |
| /collection/meena-bagh | Meena Bagh Collection \| Zevar Baksa | 619 | 1 (no answer block) |
| /product/p1–p9 (Sugga, Rangila, Bulbul, Manik, Kalapi, Boond, Naksh-e-Gul, Sunehri, Parwaaz) | [Name] \| Zevar Baksa | 309–322 | 2 each (story not in body, 5× in sitemap) |
| /product/n1–n4 (Mayuri, Kusum, Kumud, Nilofer) | [Name] \| Zevar Baksa | 350–365 | 2 each |
| /product/e1–e6, e8–e11 (Neel, Darbar, Kanak, Gul, Gulabi, Gulnaar, Pankhuri, Rang, Leher, Neelkamal) | [Name] \| Zevar Baksa | 320–325 | 2 each |
| /product/e7 (Aabha) | Aabha \| Zevar Baksa | 151 | 3 (thin page, no sections, 5× in sitemap) |

**Fetch failures:** none.
