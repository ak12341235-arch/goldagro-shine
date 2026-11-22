# GOLDAGRO Global Export — Security, Compliance and SEO Audit

Date: 21 November 2026 · Site: https://goldagroglobalexport.com · Stack: TanStack Start (SSR) on Netlify

## What was and was not verified

| Verified here | Not verified (sandbox has no internet) |
|---|---|
| Full read of all source, config, public files | `bun install`, `bun run lint`, `bun run test`, `bun run build` |
| Strict TypeScript check of the new/changed logic (third-party modules stubbed) | Live response headers, real-browser rendering, Lighthouse |
| Text and raw-stream inspection of every certificate PDF; secret and risky-API scan | `bun audit` / dependency CVE scan |
| Scripts (`generate-seo-files`, `check-legal-blanks`) executed | Netlify build and DNS (I cannot reach your site or registrar) |

**Before you rely on it:** push to GitHub, let Netlify build, then run the checks in section 5.

---

## 1. Fixed in this zip

| # | Severity | Finding | Fix |
|---|---|---|---|
| 1 | **High** | **Security headers never reached your HTML pages.** `public/_headers` only applies to static files. Netlify's docs state custom headers are not applied to function/SSR responses, and your `netlify.toml` rewrites every URL to the SSR function. So the old `X-Frame-Options`, `nosniff`, etc. protected images only. | New `src/lib/security-headers.ts`, applied to every response in `src/server.ts`: CSP, HSTS, `X-Frame-Options`, `nosniff`, Referrer-Policy, Permissions-Policy, COOP. Static-file headers moved to `netlify.toml`. `_headers` removed. |
| 2 | **High** | **Date of birth published** in `fieo_rcmc.pdf` (next to name, PAN and address) at a guessable public URL. For a proprietorship this is the proprietor's DOB: enough for identity fraud with the PAN. | Removed from the PDF content stream (not covered with a box), verified at text-layer and raw-stream level. The now-invalid digital signature was removed so viewers don't show a "tampered" banner. See open item B1 about git history. |
| 3 | Medium | No Content-Security-Policy; site could be framed or have scripts injected from other origins. | CSP added (see below). Emergency switch: set `CSP_REPORT_ONLY=1` in Netlify to log instead of block, no code change. |
| 4 | Medium | The "security shield" blocked Ctrl+P/S and **F12/DevTools on the whole site**. It cannot protect public files, and it blocks normal visitors (printing a spec, accessibility tools). | Now active only while a certificate is open in the viewer, and no longer blocks DevTools. |
| 5 | Medium | The inquiry form collected personal data with no privacy notice or consent. | Consent checkbox linked to Terms and Privacy Policy (required before sending). |
| 6 | Medium | `VITE_SITE_URL` was probably unset, so **no canonical, no `og:url`, no sitemap, no absolute JSON-LD URLs** were being emitted. | Defaults to `https://goldagroglobalexport.com` (from your Bing property); env var still overrides. |
| 7 | Low | Images and certificate PDFs cached for 1 year `immutable` under unchanging names, so a renewed certificate would not reach returning visitors. | 7 days + stale-while-revalidate; only fingerprinted `/assets/*` stay immutable. |
| 8 | Low | No `security.txt`. | Added `/.well-known/security.txt` (RFC 9116; expires 2027-11-20, renew yearly). |
| 9 | Low | No automated dependency or build checks. | `.github/dependabot.yml` and `.github/workflows/ci.yml` (tests + build gate; lint, typecheck and `bun audit` informational). |
| 10 | Low | Jewellery page FAQ talked about phytosanitary certificates. | FAQ is now per division. |

**CSP as shipped:** `default-src 'self'`; scripts `'self' 'unsafe-inline'`; styles `'self' 'unsafe-inline'` + Google Fonts; fonts Google Fonts; images `'self' data: blob:`; `connect-src 'self'`; `frame-src 'self'` (certificate PDFs); `object-src 'none'`; `base-uri`, `form-action`, `frame-ancestors` `'self'`; `upgrade-insecure-requests`.
*Residual risk:* `'unsafe-inline'` is needed for the framework's inline hydration script and your JSON-LD, so the CSP stops foreign-origin scripts, framing, plugin and base-tag attacks but does not stop an injected inline script. The site has no user-generated content and React escapes output, so exposure is low.

**Checked and clean:** no secrets or keys in the repo; no `dangerouslySetInnerHTML`, `eval`, `innerHTML`, `document.write`; JSON-LD is escaped (`<`, `>`); form data is only URL-encoded into `wa.me` / Gmail links and opened with `noopener,noreferrer`; external links use `rel="noreferrer"`; the error handler returns a generic page (no stack traces); CSRF middleware is present for server functions; no cookies, no analytics, no trackers.

## 2. Open items that need YOUR decision (I did not change these)

### High

**B1. The original RCMC PDF is still in your git history.** If the GitHub repo is public (or was ever public), the DOB remains downloadable from old commits. Make the repository private now. To scrub it, use `git filter-repo --path public/images/certificates/fieo_rcmc.pdf --invert-paths`, re-add the redacted file, and force-push. (Lovable warns that rewriting history can disconnect its sync, so do this only if you no longer need Lovable.) Also consider that the DOB + PAN are already out there and treat them as exposed.

**B2. Your address on the government certificates does not match your website.**
Certificates (GST, IEC, RCMC): *301 Wing B, Garden View, Opp S Garden, Off Kashimira Road 60 Ft, Mira Road East, Thane **401101***.
Website: *Dream House, Shop No. 6, 1st Floor, Naya Nagar, Mira Road (East), Thane **401107***.
Buyers, banks and customs compare these. The GST certificate lists **0 additional places of business**, so operating from the Naya Nagar shop may require adding it as an additional place of business on the GST portal (check with your CA). The Legal Notice page currently shows both addresses, labelled honestly. Align them and then simplify that page.

**B3. Your registrations do not cover what the agro page claims.**
Your FIEO RCMC is issued for *"Imitation jewellery and allied products"* only. For the agro division:
- Spices need a **Spices Board certificate of registration as exporter (CRES)**, mandatory in addition to the IEC (Spices Board FAQ).
- Fresh fruits and vegetables are **APEDA scheduled products** and need an **APEDA RCMC** (applied for on APEDA's e-RCMC portal).

Yet the agro page says *"We hold full legal export registration with Indian agricultural departments"* and shows *"APEDA/Spices Board Standards"* and *"APEDA Quality Standard"*. Unless you hold these, that is a misrepresentation that could be raised by a buyer, bank or regulator. Either obtain them, or remove those claims. The Legal Notice has blank lines for both numbers.

**B4. Unverifiable marketing claims** (in `src/lib/site-data.ts`). Replace with facts you can prove, or delete:
"500+ Designs", "20+ Countries", "5K+ Orders", "20+ Global Ports", "100% Farm Sourced", "Certified Cold Chain", "Automated Crop Grading", "Fumigated Sea Freight", "Direct Farm Sourcing", "Trusted by buyers in over 20 countries".
Contradiction: the jewellery page says **"Direct Manufacturer / Bulk Manufacturing"** but your RCMC says **Merchant Exporter**. Pick one and make everything consistent.

**B5. Credential wording overstates two documents.**
- The IIIEM item is a *Zoom training course completion certificate*, shown under "Corporate Credentials" as an "elite professional accreditation certifying mastery". Rename it "Training certificate" and drop the "elite / certified professional exporter" wording.
- The FIEO RCMC card lists the issuer as "Ministry of Commerce". FIEO is an export-promotion organisation, not the Ministry.

### Medium

- **Email.** The only business email is a personal Gmail. Use `sales@goldagroglobalexport.com` and set up **SPF, DKIM and DMARC** on the domain. Exporters are a common target of payment-diversion fraud, and DMARC is the main defence against someone spoofing your domain.
- **Google Fonts loads from Google**, which sends visitors' IPs to Google (a known EU GDPR issue). Self-host the fonts (for example `@fontsource/*`) and then remove the Google entries from the CSP and Privacy Policy section 10.
- **Leads can be lost.** The form only opens WhatsApp/Gmail; if the visitor does not press Send, you never see the inquiry. A form backend would fix this, but it also changes the Privacy Policy (you would then store the data).
- **Every page view runs the SSR function** (cost and abuse surface). I added CDN caching of 5 minutes for successful HTML. A longer-term fix is pre-rendering the two main pages.
- **Dependencies were not audited** (no network). `nitro` is pinned to a beta release and `vite` to 8.1.5 with a `rolldown` override. Run `bun audit` after the first CI run and review Dependabot PRs.
- 20 jewellery images are shipped but never shown; 55 product images are 1200×1600 JPEG shown at about 300 px (WebP/AVIF would cut ~60–70%).
- A hand-written `routeTree.gen.ts` is included; it regenerates identically on the next `dev` or `build`.

## 3. Compliance pages added

Five pages at `/terms`, `/privacy-policy`, `/shipping-and-claims`, `/disclaimer`, `/legal-notice`, linked from every footer, in the sitemap, with SEO tags and JSON-LD. Facts come from your existing site data; anything not on your site is a **dotted blank line** you fill in `src/lib/legal-data.ts` (`bun run check:legal` lists the open ones). See `COMPLIANCE_CHECKLIST.md`.

## 4. SEO / GEO / AEO changes

- **Fixed the root cause:** canonical, hreflang, `og:url`, `og:image`, sitemap and absolute JSON-LD URLs now always emit.
- `sitemap.xml` covers all 7 URLs with real `lastmod` (from git, not "today" on every build). `robots.txt` has a static `Sitemap:` line.
- **Structured data:** Organization/LocalBusiness now has GSTIN and IEC identifiers; WebSite, WebPage, Organization are cross-linked by `@id`; FAQPage is per division; legal pages have WebPage + BreadcrumbList.
- **AEO:** FAQ grew from 6 to 12 questions (agro) and 11 (jewellery), answer-first (who you are, how to verify registrations, products, documents, origins, how to inquire).
- **GEO:** `llms.txt` rewritten with verified facts (including both addresses and the RCMC scope) and policy links; all major AI crawlers remain allowed in `robots.txt`.
- Added a 1200×630 social image, apple-touch-icon, 192/512 icons and a web manifest.

### Bing "Discovered but not crawled — DNS failure"
Your screenshots show the **Live URL test passing** (indexable, no SEO/GEO issues), so the DNS failure is historical. The most likely causes, in order: (1) `www.` has no DNS record while the URL Bing tried was the `www` version, (2) a DNS change that was still propagating at the time, (3) DNSSEC mis-set at the registrar. To make it robust: in Netlify → Domain management, set **one primary domain** (apex `goldagroglobalexport.com`, which this code uses as canonical), add `www` as a domain alias so it redirects to the primary, and use Netlify DNS or the exact records Netlify lists. Then in Bing Webmaster Tools click **Request indexing** and **submit the sitemap** (`https://goldagroglobalexport.com/sitemap.xml`). Repeat in Google Search Console.

## 5. After you push: 10-minute verification

1. Netlify deploy log shows a green build and `[seo] wrote sitemap.xml (7 URLs …)`.
2. `curl -sI https://goldagroglobalexport.com/ | grep -i -E "content-security|strict-transport|x-frame"` → three lines.
3. Open the site and each of the 5 legal pages; click through the inquiry form (tick the box) and open a certificate viewer (PDF loads). If anything is blocked, open DevTools → Console for a CSP message, or temporarily set `CSP_REPORT_ONLY=1` in Netlify.
4. https://securityheaders.com should show A or better.
5. Google Rich Results Test on the home page: FAQ detected, no errors.
6. `https://goldagroglobalexport.com/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/.well-known/security.txt` all load.
7. Fill the blanks, push again.

*This audit and the legal text are not legal advice. Have an Indian advocate or CA review the Terms, Privacy Policy and the registration list before you rely on them.*
