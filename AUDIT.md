# GOLDAGRO Shine — Audit & Change Log (16 Nov 2026)

**Verified here:** strict TypeScript check of `site-data.ts` and `seo.ts` (clean); all edited `.tsx` files parse with
zero syntax errors; WCAG contrast ratios computed from the theme tokens.
**Not verified (no network in my sandbox):** `bun install`, `lint`, `test`, `build`, and real-browser rendering.
Run `bun install && bun run lint && bun run test && bun run build`, then check at 360 / 768 / 1280 px.

## 1. What was changed (your requests)

| Request | Done |
|---|---|
| Mobile + desktop responsive | Mobile-first spacing, wrapping category tabs (no hidden horizontal scroll), full-width stacked buttons on phones, stronger hero overlay on mobile, iOS-safe 16px form inputs, safe-area aware floating WhatsApp button, footer padding so it never hides text. |
| Fonts visible | No text below 13px any more (theme `text-xs` 12→13px, `text-sm` 14→15px; all `10px/11px` removed). Body copy raised to 16–18px. Display fonts load heavier weights (Cormorant 600, Raleway 700). |
| Standard buttons / colours / contrast | One button system in `styles.css`: `.btn` (48px min height, same radius, type and padding) with 3 variants — **gold primary** (8.4:1), **outline** (17:1), **WhatsApp green** (white on `#0b6b3a` = 6.6:1). Tabs and icon buttons standardised to 44px touch targets. |
| Remove 2 phone numbers | `+91 98677 01349` and `+91 98675 05450` deleted from the whole project (verified by grep). Contact card now shows the one remaining number as a tap-to-call link. |
| SEO / GEO / AEO | See section 3. |
| Add 2 photos | `mosambi.jpeg` and `banana.jpeg` added to `public/images/agro/fruits/` (re-encoded, q82 progressive) and wired to **Fresh Juicy Mosambi** and **G-9 Cavendish Bananas**; old `sweet_lime.jpeg` / `bananas.jpeg` removed. Both products now have proper spec panels (Mosambi previously showed the generic "contact us" panel). |
| Full audit | This file. |

## 2. Bugs found and fixed
1. **WhatsApp button failed contrast** — white on `#25D366` is 1.98:1 (WCAG needs 4.5:1). Fixed (6.6:1).
2. **Sticky header never stuck** — `overflow-x-hidden` on the page wrapper breaks `position: sticky`; changed to `overflow-x-clip`.
3. **Invalid HTML** — headings (`h3`) and `div`s nested inside `<button>` for product and certificate cards. Rebuilt as `article` + real buttons.
4. **Heading order** — jewellery cross-division block jumped h2→h3→h4; fixed. Removed `tabIndex=0` from non-interactive cards.
5. **Inquiry form** — two redundant country selects (calling-code select + Country select) merged into one Country field with a read-only dial code; input borders were ~1.3:1 contrast, now ≥4:1.
6. **Content placeholders** — FAQ said "Loading is typically `__` days"; replaced with honest wording. Order steps started lowercase; fixed.
7. **Modals** — no scroll lock, no `role="dialog"`; mobile menu was still tabbable when closed (now `inert`), had no Escape key. All fixed.
8. **Jewellery products 2–5 of each Necklace group** showed the generic "contact team" panel; now use the necklace spec.
9. `package.json` name was the template `tanstack_start_ts`; README pointed at another repo. Fixed.
10. Reduced-motion users no longer get the marquee or hover movement; focus rings are now visible everywhere.

## 3. SEO / GEO / AEO implemented
- **Per-page** titles, descriptions, keywords, robots, canonical, hreflang (`en-IN`), Open Graph, Twitter cards (`src/lib/seo.ts`).
- **Structured data (JSON-LD)**: Organization + LocalBusiness (address, GSTIN, phone, email, area served), WebSite, WebPage, ItemList of products (plain list items, no `Product` type, so Search Console doesn't demand offers/reviews), **FAQPage**, BreadcrumbList.
- **Geo**: `geo.region IN-MH`, `geo.placename`, `en_IN` locale, consistent name/address/phone in header, contact, footer and schema.
- **AEO**: answer-first FAQ now emitted as FAQPage schema; footer carries concise machine-readable business facts.
- **GEO (AI engines)**: new `public/llms.txt` with verified facts; `robots.txt` explicitly allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended. (Remove those blocks if you prefer not to be used by AI engines.)
- **Semantics**: `lang="en-IN"`, skip-link, `main`/`nav`/`address`/`article` landmarks, labelled sections, descriptive image alts (About image previously empty).
- **Crawl files**: `scripts/generate-seo-files.mjs` runs before build and writes `sitemap.xml` + the `Sitemap:` line — **only when `VITE_SITE_URL` is set**, so it never publishes a wrong domain.
- `public/_headers`: security headers + 1-year immutable cache for images/assets.

### ⚠️ Required from you
- **Set `VITE_SITE_URL`** in Netlify (e.g. `https://www.yourdomain.com`). Until then canonical, og:url, og:image, sitemap and schema URLs are intentionally omitted. I did not guess your domain.
- I did not add `geo.position` / latitude-longitude (I won't guess coordinates). Add your exact Mira Road pin, ideally with a Google Business Profile.

## 4. Open findings (need your decision — not changed)
**High**
- **Unverifiable claims on the live site**: "500+ Designs", "20+ Countries/Global Ports", "5K+ Orders", "Trusted by buyers in over 20 countries", "APEDA Quality Standard", "Certified Cold Chain", "Automated Crop Grading", "Fumigated Sea Freight", "100% Farm Sourced". Your certificates are dated Nov 2025 – May 2026 and the badge says "1+ years". Buyers do due diligence on exporters; false claims are a legal and reputation risk (and I deliberately kept them out of the structured data). Replace with facts you can prove.
- **Contradiction**: jewellery page says "Direct Manufacturer / Bulk Manufacturing", but the RCMC is for a *merchant* exporter. Pick one.
- **Certificate PDFs are public files** at guessable URLs. The Ctrl+P/F12 "security shield" does not protect them and hurts normal users (blocks printing, saving, dev tools, and shows a "Restricted" toast). Recommend removing the shield and reviewing each PDF for personal data (I did not open them). Note IEC number = PAN (`HFFPK4882F`) is displayed.
- **Personal Gmail** (`ak12341235@gmail.com`) as the only business email hurts trust and deliverability. Use `sales@yourdomain`.
- **Leads are not captured** — the form only opens WhatsApp/Gmail; if the visitor doesn't press Send, the enquiry is lost. Add Netlify Forms (or similar) alongside.

**Medium**
- 55 images are 1200×1600 JPEG (11 MB total) shown at ~300px. Serve WebP/AVIF with `srcset` (≈60–70% smaller). **20 jewellery images are shipped but never shown** (only 5 of 10 per category are used) — show them or delete them.
- Spec panels for spinach, lemons, peas, corn, oranges, apples, potatoes and the jewellery rings/bridal are generic/missing. I did not invent specs; supply them (origin, grade, packing, MOQ, HS code).
- Jewellery product names ("Exquisite Necklace 1…") are weak for search; use descriptive names (e.g. "Kundan Bridal Necklace Set").
- No privacy policy / terms page although the form collects personal data (needed for EU/UK buyers).
- No 1200×630 social image, no apple-touch-icon (only `favicon.ico`), no analytics / Search Console.
- PDF `<iframe>` viewer is unreliable on iOS Safari; add image previews or an "Open PDF" fallback.
- Both pages share one FAQ; the jewellery page's FAQ talks about phytosanitary certificates (agro-specific).

**Low**
- Test suite is 2 smoke tests; add tests for the inquiry validation and a11y.
- Dependencies include pre-release pins (`nitro 3.0.260603-beta`, `vite 8.1.5`, a `rolldown` override); fine today, review before long-term maintenance.
- `project-blueprint.txt` (3.6 MB) is a Lovable artefact in the repo root; I left it out of the delivered zip.
- README mentions npm but the lockfile is Bun's.

## 5. Windows / VS Code notes
- `bun run lint` includes a Prettier rule; the edited files were written without Prettier available, so run `npx prettier --write src scripts` once. That clears formatting-only warnings.
- After pasting over an existing Windows checkout, git may show untouched files as modified (line endings CRLF vs LF). Run `git config core.autocrlf true`, then `git diff --stat` and commit only real changes.
