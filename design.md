# Zevar Baksa — Brand Design Context

> Drop this whole `zevar-baksa-design-kit/` folder into the project (e.g. `/design` or `/brand`).
> This file is the single source of truth for colors, type, and logo usage — reference it for every screen, component, and page of the website.

---

## 1. Brand Essence

Zevar Baksa is a fine-jewellery brand positioned on **precision, craftsmanship, and heritage**. The identity balances two things at once:

- **English wordmark** → refined, minimal, premium-luxury feel
- **Hindi wordmark** → fluid, ornate, culturally rooted

Overall aesthetic: warm cream backgrounds, deep red/maroon ink, elegant high-contrast serif display type with swash details. Think "modern Indian heritage luxury" — not loud, not overly ornamental, confident negative space.

---

## 2. Color Palette

| Token | Hex | Role |
|---|---|---|
| `--zb-red` | `#c82127` | Primary brand red — logo, links, accents, primary buttons |
| `--zb-cream` | `#fffaee` | Primary background — the brand's "paper" tone |
| `--zb-maroon` | `#420002` | Deep contrast red/near-black — headings on dark sections, dark-mode backgrounds, text on cream in place of pure black |

**Usage rules:**
- Cream (`#fffaee`) is the default page background, not pure white.
- Maroon (`#420002`) doubles as both a dark accent color *and* a dark-section background (see guideline cover/section-divider pages, which use a dark maroon background with cream/red type).
- Red (`#c82127`) is the "live" brand color — logo, CTAs, links, highlights, icons.
- Avoid introducing new hues. If a neutral is needed (body copy, borders), derive it from these three (e.g. tints/shades of maroon or warm greys), not generic black/grey.

```css
:root {
  --zb-red: #c82127;
  --zb-cream: #fffaee;
  --zb-maroon: #420002;
}
```

Suggested extended scale (derived, not from the source file — adjust if needed):
```css
--zb-red-hover: #a91b20;   /* darken red ~10% for hover states */
--zb-cream-alt: #f7efd9;   /* slightly deeper cream for card surfaces */
--zb-maroon-tint: #6b1416; /* lighter maroon for muted text on cream */
```

---

## 3. Logo Assets

All logo files are in `logos/`. Each has two versions:
- **transparent** (`*.png`) — use on any background
- **`*-oncream.png`** — pre-flattened onto `#fffaee`, use only when transparency isn't supported

| Asset | File | When to use |
|---|---|---|
| **Primary Logo** (English wordmark, "Zevar Baksa") | `logos/primary-logo.png` | Main site header/nav, footer, default logo lockup, packaging, English-first contexts |
| **Secondary Logo** (Hindi wordmark, "ज़ेवर बक्सा") | `logos/secondary-logo-hindi.png` | Cultural/heritage-emphasis placements — hero sections, About/Story pages, festive campaigns, anywhere the brand wants to foreground its Indian identity |
| **Submark** (ZB monogram in pill frame) | `logos/submark.png` | Favicon, app icon, social avatar, small UI spaces (nav on scroll, loading states), watermark on product photography |

**Logo rules:**
- Logos are red (`#c82127`) line art. Do not recolor arbitrarily — approved variants are: brand red (default), maroon (`#420002`) for dark-on-cream use, and cream/white for reversed use on dark maroon backgrounds.
- Maintain clear space around all logos ≈ the height of the wordmark's cap-height on all sides.
- Never stretch, skew, or add drop shadows/effects to the logos.
- The submark's pill-shaped frame is a deliberate nod to the brand's physical packaging — keep it intact, don't crop it into a circle or square.

---

## 4. Typography

### Display / Headline typeface — **Rayleigh Glamour**
Files: `fonts/RayleighGlamour-Regular.otf` (preferred — fuller glyph set) and `fonts/Myfont-Regular.ttf` (same design, narrower glyph coverage, included as-supplied).

This is the swash serif used for the "Zevar Baksa" wordmark itself and all headline/display text in the brand guide (page titles, section numbers, "Our Logo", "Typography", etc.). Distinctive traits: swash lowercase `a`, tall ascenders, ornamental `g`, high-contrast strokes.

**Use for:** logo, H1/H2 headings, hero statements, section dividers, pull quotes — anything that should feel like "the brand talking," not body copy. Avoid setting long paragraphs in it; it's a display face.

```css
@font-face {
  font-family: 'Rayleigh Glamour';
  src: url('/fonts/RayleighGlamour-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}

h1, h2, .display, .logo-text {
  font-family: 'Rayleigh Glamour', serif;
}
```

### Body typeface — not supplied
The brand guide's paragraph/body text (e.g. "Primary Logo" descriptions, cover credit line) uses a **different, classic transitional serif** — high-contrast, no swashes, closer to something like *Playfair Display* or *EB Garamond*. That font file was not included in this kit.

**Until the real body font is provided, use this fallback stack** and swap it out the moment the actual file is available — don't build the whole site around a guessed substitute:
```css
body, p, .body-copy {
  font-family: 'Playfair Display', 'EB Garamond', Georgia, serif;
}
```
Flag this to the brand owner: *"need the body/paragraph serif used in the brand guideline PDF — the display font alone isn't it."*

### Type pairing in practice
- Headings/logo → Rayleigh Glamour
- Body/UI copy → body serif (fallback above until supplied)
- Numerals in the guide (section numbers "01", "02") are set in the body serif at large scale, not the display font — follow that pattern for any large numeral treatments on the site.

---

## 5. Quick Reference (for AI-assisted build)

```
Primary color:      #c82127  (red)
Background color:   #fffaee  (cream)
Dark/contrast color: #420002 (maroon)

Display font: "Rayleigh Glamour" → fonts/RayleighGlamour-Regular.otf
Body font:    NOT SUPPLIED — using Playfair Display/EB Garamond fallback, replace when available

Primary logo:   logos/primary-logo.png        (English wordmark)
Secondary logo: logos/secondary-logo-hindi.png (Hindi wordmark)
Submark:        logos/submark.png              (ZB monogram, favicon/icon use)
```

**Design mood words:** refined, heritage, precision, craftsmanship, warm minimalism, quiet luxury, Indian-rooted.
