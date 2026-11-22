// Single source of truth for every legal page (Terms, Privacy, Shipping & Claims, Disclaimer,
// Legal Notice).
//
//  * COMPANY    — taken from data already on the website (site-data.ts and the published
//                 GST / IEC / RCMC certificates). Edit the source, the legal pages follow.
//  * FILL_IN    — details that are NOT on the website. An empty string ("") renders as a blank
//                 fill-in line on the page. Type the value between the quotes and the blank
//                 disappears, e.g.  fssai: "10020999000123",
//                 Run `bun run check:legal` to list the blanks that are still open.
import { ADDRESS, BRAND, CERTS, EMAIL, GST, PHONES } from "@/lib/site-data";

export const LEGAL_UPDATED = "21 November 2026";
export const LEGAL_UPDATED_ISO = "2026-11-21";

const certByShort = (short: string) => CERTS.find((c) => c.short === short);
const gstCert = certByShort("GST Certificate");
const iecCert = certByShort("Import Export Code");
const rcmcCert = certByShort("FIEO RCMC");

export const COMPANY = {
  tradeName: BRAND,
  proprietor: gstCert?.proprietor ?? "",
  constitution: "Sole proprietorship (merchant exporter)",
  email: EMAIL,
  phone: PHONES[0]?.label ?? "",
  // Address shown on the website (header, contact section, structured data).
  businessAddress: ADDRESS,
  // Address printed on the GST, IEC and FIEO RCMC certificates published on the website.
  registeredAddress:
    "301 Wing B, Garden View, Opp S Garden, Off Kashimira Road 60 Ft, Near Shiver Garden, Mira Road East, Mira Bhayandar, Thane 401101, Maharashtra, India",
  gstin: GST,
  // The IEC number is the proprietor's PAN, by DGFT design.
  iec: iecCert?.regId ?? "",
  rcmcNumber: rcmcCert?.regId ?? "",
  rcmcValidUpto: "31 March 2027",
  rcmcGoods: "Imitation jewellery and allied products",
  portOfLoading: "Nhava Sheva (JNPT), Mumbai, India",
  // Courts of the place of business (from the address above). Confirm with your advocate.
  jurisdiction: "Thane, Maharashtra",
} as const;

// Details that are not on the website. Leave "" to show a blank line; type a value to fill it in.
export const FILL_IN = {
  // --- Registrations (see COMPLIANCE_CHECKLIST.md for which ones apply to your products) ---
  udyam: "", // Udyam (MSME) registration number
  fssai: "", // FSSAI licence / registration number (food products)
  spicesBoardCres: "", // Spices Board certificate of registration as exporter of spices (CRES)
  apedaRcmc: "", // APEDA RCMC (fresh fruits & vegetables are APEDA scheduled products)
  shopsEstablishment: "", // Maharashtra Shops & Establishment registration number
  adCode: "", // Authorised Dealer (bank) code registered with customs
  lutArn: "", // GST Letter of Undertaking (LUT) ARN for exports without IGST

  // --- Grievance Officer (IT Act SPDI Rules 2011, rule 5(9)); e-mail and phone use site data ---
  grievanceOfficerName: "",
  grievanceOfficerDesignation: "",
  grievanceOfficerEmail: EMAIL,
  grievanceOfficerPhone: PHONES[0]?.label ?? "",

  // --- Policy periods you decide ---
  claimNoticePerishableHours: "", // hours after discharge to report a claim on fresh produce
  claimNoticeOtherDays: "", // days after delivery to report a claim on other goods
  refundWorkingDays: "", // working days to pay an accepted refund
  enquiryRetentionMonths: "", // months an enquiry that did not become an order is kept
} as const;

export const LEGAL_PAGES = [
  { path: "/terms", label: "Terms & Conditions" },
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/shipping-and-claims", label: "Shipping & Claims Policy" },
  { path: "/disclaimer", label: "Disclaimer" },
  { path: "/legal-notice", label: "Legal Notice" },
] as const;

export type LegalPath = (typeof LEGAL_PAGES)[number]["path"];

// Links to the official registers where a buyer can check these registrations themselves.
export const VERIFY_LINKS = [
  { label: "GST taxpayer search (GST Portal)", href: "https://www.gst.gov.in" },
  { label: "IEC details (DGFT)", href: "https://www.dgft.gov.in" },
  { label: "FIEO", href: "https://www.fieo.org" },
  { label: "Spices Board of India", href: "https://indianspices.com" },
  { label: "APEDA", href: "https://apeda.gov.in" },
] as const;
