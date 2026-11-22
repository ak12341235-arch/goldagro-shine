# Compliance checklist: Indian exporter (spices, fresh produce, imitation jewellery)

Status as of 21 Nov 2026, based on the documents published on your website. **Not legal advice:**
confirm each line with your CA / advocate. Rules and portals change.

Where a row says *Legal Notice*, type the number into `src/lib/legal-data.ts` (field name in brackets), then run
`bun run check:legal`. The blank line on the website disappears automatically.

## A. Registrations

| Document | Issuer | Needed for | On your site now | Action |
|---|---|---|---|---|
| GST registration | GST Council / GSTN | All business | Yes (27HFFPK4882F1Z3, from 31/03/2026) | Address on certificate differs from website, see audit B2 |
| Importer-Exporter Code (IEC) | DGFT | All exports | Yes (HFFPK4882F; IEC = PAN) | None |
| RCMC, FIEO (merchant exporter) | FIEO | Imitation jewellery & allied products | Yes (valid to 31/03/2027) | **Renew before 31 March 2027.** Covers jewellery only |
| **Spices Board CRES** | Spices Board of India | **Exporting spices** (mandatory in addition to IEC, per Spices Board FAQ) | **No** | Apply; then fill `spicesBoardCres` |
| **APEDA RCMC** | APEDA (e-RCMC portal) | **Fresh fruits & vegetables** (APEDA scheduled products) | **No** | Apply; then fill `apedaRcmc` |
| FSSAI licence / registration | FSSAI | Food business operators; also used as proof for the APEDA application | **No** | Confirm category with your CA; fill `fssai` |
| Udyam (MSME) | Ministry of MSME | Optional; accepted as supporting proof | No | Fill `udyam` if you hold one |
| Shops & Establishment | Maharashtra Labour Dept | Commercial premises in Maharashtra | No | Confirm applicability; fill `shopsEstablishment` |
| AD code registration | Your bank, with Customs | Shipping bills and export-proceeds realisation | No | Fill `adCode` |
| GST LUT (Form RFD-11) | GST portal | Exporting without paying IGST | No | Renew each financial year; fill `lutArn` |

## B. Per-shipment documents (not published on the website)

Commercial invoice, packing list, bill of lading, certificate of origin, **phytosanitary certificate** (Plant Quarantine, agro),
fumigation certificate if required, lab / quality reports, shipping bill. These are listed in the Terms (B7).

## C. Website legal pages (done in this zip)

| Page | Why an exporter's site needs it |
|---|---|
| `/terms` | Website terms + export terms of sale (Incoterms, payment, documents, risk, claims, governing law) |
| `/privacy-policy` | Required for entities collecting personal data (IT Act, SPDI Rules 2011) with a named **Grievance Officer**; ready for the DPDP Act 2023 (core duties start May 2027) and UK/EU visitors |
| `/shipping-and-claims` | Shipping, cancellation, claims, returns, refunds |
| `/disclaimer` | Indicative specs, illustrative images, imitation (not precious-metal) jewellery |
| `/legal-notice` | Legal identity, registrations, verification links, Grievance Officer |

### Blanks to fill in `src/lib/legal-data.ts` → `FILL_IN`
`udyam`, `fssai`, `spicesBoardCres`, `apedaRcmc`, `shopsEstablishment`, `adCode`, `lutArn` ·
`grievanceOfficerName`, `grievanceOfficerDesignation` (email and phone are pre-filled from the website) ·
`claimNoticePerishableHours`, `claimNoticeOtherDays`, `refundWorkingDays`, `enquiryRetentionMonths`.

**Do not publish bank account numbers.** Share them only on a proforma invoice, confirmed by phone.

### Choices made for you: confirm with your advocate
- Courts of **Thane, Maharashtra** have jurisdiction (derived from your address); arbitration is allowed if the sales contract says so.
- Title passes on **full payment**; risk passes at loading (FOB/CIF, Incoterms 2020).
- Quotations valid for the period stated in them; force majeure cancellation after 60 days.
- Grievance response: acknowledge within 7 days, resolve within one month (the SPDI Rules say one month; the DPDP Rules allow up to 90 days).

## D. Keep current

- Renew `security.txt` before 2027-11-20.
- Update the Privacy Policy **before** adding analytics, a form backend, chat widgets or ads.
- Update `LEGAL_UPDATED` / `LEGAL_UPDATED_ISO` in `legal-data.ts` whenever a policy changes.
- `llms.txt` repeats key facts (addresses, numbers); update it if they change.
- Optional: trademark registration for GOLDAGRO; Google Business Profile for the business address.
