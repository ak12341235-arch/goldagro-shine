export type Product = {
  cat: string;
  label: string;
  name: string;
  img: string;
  description?: string;
  specifications?: [string, string][];
};
export type Cert = {
  icon: string;
  title: string;
  short: string;
  issuer: string;
  issuerShort: string;
  blurb: string;
  regId: string;
  status: string;
  desc: string;
  file: string;
  date: string;
  proprietor: string;
  state: string;
};

export const PHONES = [{ label: "+91 77388 08894", wa: "917738808894" }];
export const EMAIL = "ak12341235@gmail.com";
export const GST = "27HFFPK4882F1Z3";
export const BRAND = "GOLDAGRO Global Export";
// Canonical site origin. Used for canonical links, Open Graph URLs, JSON-LD and the sitemap.
// Override with VITE_SITE_URL in Netlify (no trailing slash) if the primary domain ever changes.
// Keep this value identical to DEFAULT_SITE in scripts/generate-seo-files.mjs.
const DEFAULT_SITE_URL = "https://goldagroglobalexport.com";
const envSiteUrl = (
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.["VITE_SITE_URL"] ??
  ""
).trim();
export const SITE_URL: string = (envSiteUrl || DEFAULT_SITE_URL).replace(/\/+$/, "");
export const ADDRESS_PARTS = {
  street: "Dream House, Shop No. 6, 1st Floor, Naya Nagar",
  locality: "Mira Road (East), Thane",
  region: "Maharashtra",
  postalCode: "401107",
  country: "IN",
};
export const ADDRESS =
  "Dream House, Shop No. 6, 1st Floor, Naya Nagar, Mira Road (East), Thane 401107, Maharashtra, India";

export type FaqItem = { question: string; answer: string };

// Content below follows the supplied GOLDAGRO HTML. Verify commercial terms with the client before publishing.
// Answers lead with the direct answer so search engines and AI assistants can quote them as written.
const FAQ_ABOUT: FaqItem[] = [
  {
    question: "Who is GOLDAGRO Global Export?",
    answer:
      "GOLDAGRO Global Export is an Indian merchant exporter based in Thane (Mira Road East), Maharashtra, run as a proprietorship by Khan Asif Mohd Arif. It supplies Indian spices, fresh fruits and vegetables, and imitation jewellery to international B2B buyers from Nhava Sheva (JNPT), Mumbai.",
  },
  {
    question: "How can I verify GOLDAGRO's registrations?",
    answer:
      "GOLDAGRO's GST registration, Importer-Exporter Code (IEC) and FIEO RCMC are listed under Corporate Credentials with their numbers. Check them on the issuing portals (GST portal, DGFT, FIEO), or request a verified copy by email. The Legal Notice page lists all registration details.",
  },
];

const FAQ_TERMS: FaqItem[] = [
  {
    question: "What is the minimum order?",
    answer: "Usually one 20ft container. Smaller trial orders may be possible, ask us.",
  },
  {
    question: "Can I get a sample?",
    answer: "Yes. Samples are sent by courier; the buyer pays courier charges.",
  },
  {
    question: "What payment terms do you accept?",
    answer: "T/T (advance + balance against documents) or L/C at sight.",
  },
  {
    question: "Which Incoterms do you offer?",
    answer: "FOB Mumbai (JNPT) and CIF to major ports.",
  },
  {
    question: "How long is delivery?",
    answer:
      "Loading time is confirmed in your quotation and depends on the product, quantity and season. Sea transit time depends on your destination port.",
  },
];

const FAQ_HOW_TO: FaqItem = {
  question: "How do I send an inquiry?",
  answer:
    "Fill in the inquiry form on this page. It prepares a message with your product, quantity and destination port that opens in WhatsApp or Gmail for you to send. You can also email or WhatsApp GOLDAGRO directly. Specifications, grades and availability are confirmed per lot before order.",
};

const FAQ_AGRO: FaqItem[] = [
  {
    question: "Which agro products does GOLDAGRO export?",
    answer:
      "Spices (dry red chilli, red chilli powder, green cardamom, nutmeg and mace, sesame seeds), vegetables (Nashik red onions, spinach, lemons, green peas, sweet corn) and fruits (mosambi, G-9 Cavendish bananas, oranges, pineapple, apples). Availability is seasonal and confirmed per lot.",
  },
  {
    question: "Which documents do you provide for agro shipments?",
    answer:
      "Commercial invoice, packing list, bill of lading, certificate of origin and a phytosanitary certificate issued per shipment. Lab reports are available on request.",
  },
  {
    question: "Where do the products come from?",
    answer:
      "Origin depends on the product, for example Guntur (Andhra Pradesh) for red chilli, Idukki (Kerala) for green cardamom and Nashik (Maharashtra) for red onions. The origin is shown in each product's specification panel.",
  },
  {
    question: "How are fresh fruits shipped?",
    answer:
      "In containerised sea freight from Nhava Sheva (JNPT), in temperature-managed shipments where the product needs it. Packing, size grade and maturity are confirmed per shipment.",
  },
];

const FAQ_JEWEL: FaqItem[] = [
  {
    question: "What jewellery does GOLDAGRO export?",
    answer:
      "Imitation (fashion) jewellery: necklaces, bridal sets, bangles and earrings, supplied in bulk, with custom designs on request.",
  },
  {
    question: "Is the jewellery made of real gold or silver?",
    answer:
      "No. These are imitation pieces. Materials, plating and finish differ by design and are confirmed in your quotation.",
  },
  {
    question: "Which documents do you provide for jewellery shipments?",
    answer:
      "Commercial invoice, packing list, bill of lading and certificate of origin. Tell us about any test reports or compliance documents your destination market requires before you order.",
  },
];

export function getFaq(key: "agro" | "jewel"): FaqItem[] {
  return [
    ...FAQ_ABOUT,
    ...FAQ_TERMS,
    ...(key === "agro" ? FAQ_AGRO : FAQ_JEWEL),
    FAQ_HOW_TO,
  ];
}

export const ORDER_STEPS = [
  { title: "Inquiry", body: "Tell us product, quantity and destination port." },
  { title: "Specs & quote", body: "We send specifications and an FOB / CIF price." },
  { title: "Sample", body: "Approve a sample before ordering (courier charges apply)." },
  { title: "Contract & payment", body: "Proforma invoice and agreed payment terms (T/T or L/C)." },
  {
    title: "Packing & inspection",
    body: "Packing to your requirements, third-party inspection on request.",
  },
  { title: "Shipping", body: "Container loading at Mumbai, documents sent for customs clearance." },
];

export const TRUST_HIGHLIGHTS = [
  {
    title: "24-hour reply",
    body: "Every inquiry gets specs and price terms from our team.",
    icon: "⏱️",
  },
  {
    title: "Samples available",
    body: "Pre-shipment samples can be arranged by courier before you commit.",
    icon: "📦",
  },
  {
    title: "Documents handled",
    body: "Commercial invoice, packing list, bill of lading and certificates required for your destination.",
    icon: "📄",
  },
  {
    title: "Port of loading",
    body: "Nhava Sheva (JNPT), Mumbai — containerized sea freight.",
    icon: "🚢",
  },
];

const PRODUCT_DETAILS: Record<string, { description: string; specifications: [string, string][] }> =
  {
    "Premium Dry Red Chilli (Guntur/Teja Export Grade)": {
      description:
        "Premium dry red chilli for export. Exact grade and lot specifications should be confirmed before order.",
      specifications: [
        ["Origin", "Guntur, Andhra Pradesh"],
        ["Stem", "With stem or stemless (both available)"],
        ["Moisture", "Max 10–11%"],
        ["Pungency", "50,000–60,000 SHU (Teja S17)"],
        ["Packaging", "25 kg PP / jute bags"],
        ["MOQ", "1 x 20ft FCL (approx. 9–10 MT)"],
        ["HS Code", "0904.21"],
      ],
    },
    "Premium Red Chilli Powder (High Pungency & Color)": {
      description:
        "Ground red chilli powder available in export grades. Final grade and lab values must be confirmed for each lot.",
      specifications: [
        ["Origin", "Guntur, Andhra Pradesh / Byadgi, Karnataka"],
        ["Moisture", "Max 10%"],
        ["Pungency", "30,000–50,000 SHU (as per grade)"],
        ["Packaging", "25 kg lined PP bags or 10 kg cartons"],
        ["MOQ", "1 x 20ft FCL (approx. 10 MT)"],
        ["HS Code", "0904.22"],
      ],
    },
    "Premium Green Cardamom (7mm - 8mm+ Bold Grade)": {
      description: "Bold green cardamom pods graded by size and colour for wholesale export.",
      specifications: [
        ["Origin", "Idukki, Kerala"],
        ["Moisture", "Max 10%"],
        ["Grade", "7–8mm+ bold; volatile oil min 5% as supplied"],
        ["Packaging", "5 / 10 / 25 kg cartons or bags"],
        ["MOQ", "500 kg (trial); FCL on request"],
        ["HS Code", "0908.31"],
      ],
    },
    "Premium Whole Nutmeg & Mace (With Essential Oils)": {
      description: "Whole nutmeg and mace sourced from southern India for bulk export.",
      specifications: [
        ["Origin", "Kerala / Tamil Nadu"],
        ["Moisture", "Max 10%"],
        ["Quality", "Volatile oil min 6% in nutmeg (as supplied)"],
        ["Packaging", "25 kg PP / jute bags"],
        ["MOQ", "1 MT"],
        ["HS Code", "Nutmeg 0908.11 / Mace 0908.21"],
      ],
    },
    "Premium Sesame Seeds (Pure Sorting Export Quality)": {
      description:
        "Sorted sesame seeds for bulk export; purity and oil-content claims should be confirmed with the lot report.",
      specifications: [
        ["Origin", "Gujarat / Rajasthan / Madhya Pradesh"],
        ["Moisture", "Max 6%"],
        ["Purity / Oil", "99.9% purity; oil content min 50% (as supplied)"],
        ["Packaging", "25 / 50 kg PP bags"],
        ["MOQ", "1 x 20ft FCL (approx. 18 MT)"],
        ["HS Code", "1207.40"],
      ],
    },
    "Nashik Red Onions (45mm - 55mm+)": {
      description:
        "Nashik red onions prepared for bulk export with size grading and mesh-bag packing.",
      specifications: [
        ["Origin", "Nashik, Maharashtra"],
        ["Preparation", "Topped, clean-cut neck"],
        ["Size", "40–60 mm / 55 mm+"],
        ["Packaging", "25 / 50 kg mesh bags"],
        ["MOQ", "1 x 20ft FCL (approx. 18–20 MT)"],
        ["HS Code", "0703.10"],
      ],
    },
    "Table Potatoes": {
      description:
        "Fresh table potatoes for wholesale export, subject to seasonal availability and agreed grade.",
      specifications: [
        ["Origin", "Uttar Pradesh / Gujarat / Punjab"],
        ["Size", "40–80 mm"],
        ["Packaging", "25 / 50 kg mesh bags"],
        ["MOQ", "1 x 20ft FCL (approx. 20 MT)"],
        ["HS Code", "0701.90"],
      ],
    },
    "Fresh Pineapple": {
      description:
        "Fresh pineapples packed for export. Final size, maturity, and packing are confirmed per shipment.",
      specifications: [
        ["Origin", "Kerala / West Bengal / Assam"],
        ["Crown", "Crown on (crown off on request)"],
        ["Weight", "1.2–2.0 kg per fruit"],
        ["Packaging", "Cartons, 6–8 kg"],
        ["MOQ", "1 x 20ft reefer"],
        ["HS Code", "0804.30"],
      ],
    },
    "Fresh Juicy Mosambi (Premium Indian Sweet Lime)": {
      description:
        "Fresh mosambi (sweet lime) for export, graded by size. Final maturity, size grade and packing are confirmed per shipment.",
      specifications: [
        ["Origin", "Maharashtra / Andhra Pradesh (confirm per season)"],
        ["Size", "Graded by diameter (confirm per lot)"],
        ["Packaging", "Cartons (confirm weight per lot)"],
        ["MOQ", "1 x 20ft reefer"],
        ["HS Code", "0805.90"],
      ],
    },
    "G-9 Cavendish Bananas (Strict Calibration)": {
      description:
        "G-9 Cavendish bananas for export, calibrated by size in temperature-managed shipments.",
      specifications: [
        ["Origin", "Jalgaon, Maharashtra / Gujarat"],
        ["Preparation", "Cut hands / clusters"],
        ["Packaging", "13 kg cartons"],
        ["MOQ", "1 x 20ft reefer"],
        ["HS Code", "0803.90"],
      ],
    },
    "Fresh Banana (Cavendish)": {
      description: "Fresh Cavendish bananas for export in temperature-managed shipments.",
      specifications: [
        ["Origin", "Jalgaon, Maharashtra / Gujarat"],
        ["Preparation", "Cut hands / clusters"],
        ["Packaging", "13 kg cartons"],
        ["MOQ", "1 x 20ft reefer"],
        ["HS Code", "0803.90"],
      ],
    },
    "Fresh Pomegranate (Bhagwa)": {
      description: "Bhagwa pomegranates sourced from Maharashtra for graded fresh-fruit export.",
      specifications: [
        ["Origin", "Solapur / Nashik, Maharashtra"],
        ["Weight", "250–400 g per fruit (size grades)"],
        ["Packaging", "Cartons, 3.5–5 kg"],
        ["MOQ", "1 x 20ft reefer"],
        ["HS Code", "0810.90"],
      ],
    },
    "Exquisite Necklace 1": {
      description:
        "Imitation necklace design from the GOLDAGRO jewellery collection. Confirm design, finish, materials, and minimum quantity with the export team.",
      specifications: [
        ["Material", "Brass / copper alloy base (confirm per design)"],
        ["Plating", "Gold, rose gold, rhodium or antique finish (available options to confirm)"],
        ["Stones", "CZ / American diamond / kundan / glass (confirm per design)"],
        ["Packaging", "Individual poly bag or box, master carton"],
        ["MOQ", "50–100 pcs per design (confirm)"],
      ],
    },
  };

export function getProductDetails(name: string) {
  const exact = PRODUCT_DETAILS[name];
  if (exact) return exact;
  if (/Onion/i.test(name))
    return {
      description:
        "Nashik red onions prepared for bulk export with size grading and mesh-bag packing.",
      specifications: [
        ["Origin", "Nashik, Maharashtra"],
        ["Preparation", "Topped, clean-cut neck"],
        ["Size", "40–60 mm / 55 mm+"],
        ["Packaging", "25 / 50 kg mesh bags"],
        ["MOQ", "1 x 20ft FCL (approx. 18–20 MT)"],
        ["HS Code", "0703.10"],
      ] as [string, string][],
    };
  if (/Mosambi|Sweet Lime/i.test(name))
    return PRODUCT_DETAILS["Fresh Juicy Mosambi (Premium Indian Sweet Lime)"]!;
  if (/Banana|Cavendish/i.test(name))
    return {
      description: "Fresh Cavendish bananas for export in temperature-managed shipments.",
      specifications: [
        ["Origin", "Jalgaon, Maharashtra / Gujarat"],
        ["Preparation", "Cut hands / clusters"],
        ["Packaging", "13 kg cartons"],
        ["MOQ", "1 x 20ft reefer"],
        ["HS Code", "0803.90"],
      ] as [string, string][],
    };
  if (/Pineapple/i.test(name))
    return {
      description:
        "Fresh pineapples packed for export. Final size, maturity, and packing are confirmed per shipment.",
      specifications: [
        ["Origin", "Kerala / West Bengal / Assam"],
        ["Crown", "Crown on (crown off on request)"],
        ["Weight", "1.2–2.0 kg per fruit"],
        ["Packaging", "Cartons, 6–8 kg"],
        ["MOQ", "1 x 20ft reefer"],
        ["HS Code", "0804.30"],
      ] as [string, string][],
    };
  if (/Pomegranate/i.test(name))
    return {
      description: "Bhagwa pomegranates sourced from Maharashtra for graded fresh-fruit export.",
      specifications: [
        ["Origin", "Solapur / Nashik, Maharashtra"],
        ["Weight", "250–400 g per fruit (size grades)"],
        ["Packaging", "Cartons, 3.5–5 kg"],
        ["MOQ", "1 x 20ft reefer"],
        ["HS Code", "0810.90"],
      ] as [string, string][],
    };
  if (/Necklace/i.test(name)) return PRODUCT_DETAILS["Exquisite Necklace 1"]!;
  if (/Earrings/i.test(name))
    return {
      description:
        "Imitation earrings from the GOLDAGRO jewellery range. Confirm the selected design, finish, and available quantity with the export team.",
      specifications: [
        ["Material", "Brass / copper / alloy base (confirm per design)"],
        ["Plating", "Gold, silver or oxidised finish (confirm per design)"],
        ["Stones", "CZ / pearl / glass / kundan (confirm per design)"],
        ["Packaging", "Card + poly bag, master carton"],
        ["MOQ", "100 pairs per design (confirm)"],
      ] as [string, string][],
    };
  if (/Bangles|Bracelets/i.test(name))
    return {
      description:
        "Imitation bangles and bracelets in assorted designs. Confirm sizing, finish, packing, and quantity with the export team.",
      specifications: [
        ["Material", "Brass / alloy / metal base (confirm per design)"],
        ["Plating", "Gold or antique finish (confirm per design)"],
        ["Stones", "CZ / glass / meena enamel (confirm per design)"],
        ["Packaging", "Box or poly bag, master carton"],
        ["MOQ", "100 pcs (sets of 2 or 4; confirm)"],
      ] as [string, string][],
    };
  if (/Ring/i.test(name))
    return {
      description:
        "Imitation rings from the GOLDAGRO jewellery range. Confirm the selected design, sizing, finish, and quantity with the export team.",
      specifications: [
        ["Material", "Brass / alloy base (confirm per design)"],
        ["Plating", "Gold or rhodium (confirm per design)"],
        ["Stones", "CZ / American diamond (confirm per design)"],
        ["Packaging", "Ring box or poly bag, master carton"],
        ["MOQ", "100 pcs per design (confirm)"],
      ] as [string, string][],
    };
  if (/Bridal/i.test(name))
    return {
      description:
        "Imitation bridal jewellery set from the GOLDAGRO collection. Exact materials, contents, and finish vary by design and must be confirmed.",
      specifications: [
        ["Material", "Brass / copper alloy base (confirm per design)"],
        ["Plating", "Gold, rose gold, rhodium or antique finish (confirm per design)"],
        ["Stones", "CZ / American diamond / kundan / glass (confirm per design)"],
        ["Packaging", "Individual box or protective packing (confirm)"],
        ["MOQ", "Confirm for selected design"],
      ] as [string, string][],
    };
  return {
    description:
      "Please contact our export team to confirm this product's current specifications, packaging, and minimum order quantity.",
    specifications: [
      ["Specifications", "Confirm for selected product / design"],
      ["Packaging", "Confirm with export team"],
      ["MOQ", "Confirm with export team"],
    ] as [string, string][],
  };
}

export const CERTS: Cert[] = [
  {
    icon: "🏛️",
    short: "GST Certificate",
    issuerShort: "Government of India",
    blurb: "Tax registration verification confirming active status under the Indian GST system.",
    title: "GST Registration Certificate",
    issuer: "Goods and Services Tax Network, Govt. of India",
    regId: GST,
    status: "Active Taxpayer (Regular)",
    desc: "Official verification under Form GST REG-06 confirming business legality and legal tax status.",
    file: "/images/certificates/gst_certificate.pdf",
    date: "31/03/2026",
    proprietor: "Khan Asif Mohd Arif",
    state: "Thane, Maharashtra",
  },
  {
    icon: "✈️",
    short: "Import Export Code",
    issuerShort: "DGFT, Govt. of India",
    blurb: "Official operational license enabling global border trade from Indian custom ports.",
    title: "Importer-Exporter Code (IEC)",
    issuer: "Directorate General of Foreign Trade (DGFT)",
    regId: "HFFPK4882F",
    status: "Authorized Proprietorship License",
    desc: "System-generated license issued by Ministry of Commerce and Industry enabling global product distribution.",
    file: "/images/certificates/iec_licence.pdf",
    date: "22/04/2026",
    proprietor: "Khan Asif Mohd Arif",
    state: "Thane, Maharashtra",
  },
  {
    icon: "📦",
    short: "FIEO RCMC",
    issuerShort: "FIEO (export promotion body)",
    blurb:
      "RCMC merchant registration specializing in export of Imitation Jewellery and Allied Products.",
    title: "Registration cum Membership Certificate",
    issuer: "Federation of Indian Export Organisations (FIEO)",
    regId: "RCMC/FIEO/16660/2026-2027",
    status: "Active Merchant Exporter",
    desc: "Membership verification with India's premier apex body of export promotion organizations.",
    file: "/images/certificates/fieo_rcmc.pdf",
    date: "08/05/2026",
    proprietor: "Khan Asif Mohd Arif",
    state: "Valid upto 31/03/2027",
  },
  {
    icon: "🎓",
    short: "Export Training",
    issuerShort: "IIIEM Training Academy",
    blurb: "Course completion certificate: Program in Import-Export Management (online).",
    title: "Program in Import - Export Management",
    issuer: "International Institute of Import and Export Management (IIIEM)",
    regId: "ST-ZOOM-10-2526-4595",
    status: "Course Completed",
    desc: "Training certificate from a private institute, shown for background. It is not a government licence or registration.",
    file: "/images/certificates/iiiem_certificate.jpeg",
    date: "25/11/2025",
    proprietor: "Asif Mohd Arif Khan",
    state: "Ahmedabad, Gujarat",
  },
];

const a = (cat: string, label: string, name: string, img: string): Product => ({
  cat,
  label,
  name,
  img: `/images/agro/${img}`,
});

export const ABOUT_FACTS = [
  "GOLDAGRO Global Export is an Indian merchant exporter based in Thane (Mira Road East), Maharashtra.",
  "Agro division: Indian spices, fresh fruits and vegetables in containerised sea freight.",
  "Jewellery division: imitation jewellery (necklaces, bridal sets, bangles, earrings) in bulk.",
  "Port of loading: Nhava Sheva (JNPT), Mumbai. Terms: FOB / CIF. Payment: T/T or L/C at sight.",
];

export type Division = {
  key: "agro" | "jewel";
  theme: string;
  strip: string;
  switchLabel: string;
  switchTo: "/" | "/jewellery";
  nav: { id: string; label: string }[];
  hero: {
    eyebrow: string;
    lines: [string, string, string];
    tag: string;
    body: string;
    img: string;
    stats: [string, string][];
  };
  marquee: string[];
  about: {
    eyebrow: string;
    title: [string, string, string];
    body: string;
    points: string[];
    badge: string;
    years: string;
    img: string;
  };
  credBody: string;
  collectionsTitle: [string, string];
  tabs: { id: string; label: string }[];
  products: Product[];
  why: { icon: string; title: string; body: string }[];
  inquiry: { title: string; body: string; categories: string[]; reps: string[] };
  contactTitle: string;
  footerBlurb: string;
};

export const AGRO: Division = {
  key: "agro",
  theme: "theme-agro",
  strip: "GOLDAGRO GROUP: Agriculture Exports Division",
  switchLabel: "Switch to Jewellery Division",
  switchTo: "/jewellery",
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About Sourcing" },
    { id: "collections", label: "Produce Range" },
    { id: "why", label: "Why Us" },
    { id: "inquiry", label: "Inquiry" },
    { id: "contact", label: "Contact" },
  ],
  hero: {
    eyebrow: "Merchant Exporter · Thane, India",
    lines: ["Premium Indian Spices,", "Fresh", "Fruits & Veggies"],
    tag: "Farm-to-Port Export Supply",
    body: "GOLDAGRO Agricultural Commodities Division supplies and exports Indian spices, fresh fruits and vegetables from India's farming regions, with export documentation and containerised sea freight from Mumbai.",
    img: "/images/agro/spices/dried_red_chillies.jpeg",
    stats: [
      ["FOB · CIF", "Incoterms 2020"],
      ["JNPT", "Port of Loading"],
      ["T/T · L/C", "Payment Terms"],
    ],
  },
  marquee: [
    "Phytosanitary Certificate per Shipment",
    "Containerised Sea Freight",
    "Third-Party Inspection on Request",
    "Export Documentation Support",
    "FOB & CIF Terms",
  ],
  about: {
    eyebrow: "Supply Integrity",
    title: ["Farm-to-Port", "Quality", "Logistics"],
    body: "Based in Thane, Maharashtra, GOLDAGRO GLOBAL EXPORT represents excellence in the sourcing and transit of raw Indian crops. Partnering with central farming coordinates, we ensure produce keeps its moisture, clean visual grades, and safe transit temperatures.",
    points: [
      "Phytosanitary Certificate per Shipment",
      "Lot-wise Specifications",
      "Containerized Sea Freight",
      "Export Documentation Support",
    ],
    badge: "IEC",
    years: "DGFT Registered Exporter",
    img: "/images/agro/fruits/pineapple.jpeg",
  },
  credBody:
    "Our GST registration, Importer-Exporter Code and FIEO RCMC are shown below. Registrations and certificates for your specific product and destination are available on request.",
  collectionsTitle: ["Agricultural", "Commodities"],
  tabs: [
    { id: "Spices", label: "Premium Spices" },
    { id: "Vegetables", label: "Fresh Vegetables" },
    { id: "Fruits", label: "Exotic Fruits" },
  ],
  products: [
    // --- SPICES ---
    a(
      "Spices",
      "Spices",
      "Premium Red Chilli Powder (High Pungency & Color)",
      "spices/red_chilli_powder.jpeg",
    ),
    a(
      "Spices",
      "Spices",
      "Premium Dry Red Chilli (Guntur/Teja Export Grade)",
      "spices/dried_red_chillies.jpeg",
    ),
    a("Spices", "Spices", "Premium Green Cardamom (7mm - 8mm+ Bold Grade)", "spices/cardamom.jpeg"),
    a(
      "Spices",
      "Spices",
      "Premium Whole Nutmeg & Mace (With Essential Oils)",
      "spices/nutmeg_mace.jpeg",
    ),
    a(
      "Spices",
      "Spices",
      "Premium Sesame Seeds (Pure Sorting Export Quality)",
      "spices/sesame.jpeg",
    ),

    // --- VEGETABLES ---
    a("Vegetables", "Vegetables", "Nashik Red Onions (45mm - 55mm+)", "vegtables/onion.jpeg"),
    a("Vegetables", "Vegetables", "Fresh Garden Spinach (Nutrient Rich)", "vegtables/spanich.jpeg"),
    a("Vegetables", "Vegetables", "Fresh Juicy Lemons (Premium Sorting)", "vegtables/lemon.jpeg"),
    a(
      "Vegetables",
      "Vegetables",
      "Fresh Green Peas (Premium Export Grade)",
      "vegtables/green_peas.jpeg",
    ),
    a("Vegetables", "Vegetables", "Sweet Tender Corn Ears (Golden Quality)", "vegtables/corn.jpeg"),

    // --- FRUITS ---
    a("Fruits", "Fruits", "Fresh Juicy Mosambi (Premium Indian Sweet Lime)", "fruits/mosambi.jpeg"),
    a("Fruits", "Fruits", "G-9 Cavendish Bananas (Strict Calibration)", "fruits/banana.jpeg"),
    a("Fruits", "Fruits", "Fresh Sweet Oranges (Juicy Citrus)", "fruits/oranges.jpeg"),
    a("Fruits", "Fruits", "Exotic Queen Pineapple (Sweet & Aromatic)", "fruits/pineapple.jpeg"),
    a("Fruits", "Fruits", "Crisp Red Apples (Premium Harvest)", "fruits/apple.jpeg"),
  ],

  why: [
    {
      icon: "🚜",
      title: "Seasonal Sourcing",
      body: "Produce is sourced from Indian farming regions by season, with specifications confirmed per lot.",
    },
    {
      icon: "🌡️",
      title: "Reefer Shipping Option",
      body: "Temperature-managed containers are available for produce that needs them.",
    },
    {
      icon: "📋",
      title: "Export Documents",
      body: "Each shipment goes with a commercial invoice, packing list, bill of lading and certificate of origin, plus a phytosanitary certificate for agro goods.",
    },
  ],
  inquiry: {
    title: "Submit Agro Inquiry",
    body: "Secure container space and pricing directly from Thane headquarters.",
    categories: [
      "Premium Spices",
      "Nashik Red Onions",
      "Table Potatoes",
      "Fresh Exotic Fruits",
      "Bulk Container Mix",
    ],
    reps: ["Primary Agro Representative"],
  },
  contactTitle: "Connect with Agro Desk",
  footerBlurb:
    "Exporter of Indian spices, fresh fruits and vegetables to international B2B buyers.",
};

const j = (folder: string, label: string, base: string, prefix: string) =>
  Array.from({ length: 5 }, (_, i) => ({
    cat: label,
    label,
    name: `${base} ${i + 1}`,
    img: `/images/${folder}/${prefix}_${i + 1}.jpeg`,
  }));

export const JEWEL: Division = {
  key: "jewel",
  theme: "theme-jewel",
  strip: "GOLDAGRO GROUP: Premium Jewellery Division",
  switchLabel: "Switch to Agro Exports Division",
  switchTo: "/",
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "collections", label: "Collections" },
    { id: "why", label: "Why Us" },
    { id: "inquiry", label: "Inquiry" },
    { id: "contact", label: "Contact" },
  ],
  hero: {
    eyebrow: "Premium Jewellery Exporter · Thane, India",
    lines: ["The Art of", "Timeless", "Elegance & Style"],
    tag: "Luxury Imitation Jewellery",
    body: "GOLDAGRO GLOBAL EXPORT brings stunning collections crafted with premium finishing for discerning global markets. Luxury quality with Indian heritage.",
    img: "/images/bangles/bangles_3.jpeg",
    stats: [
      ["FOB · CIF", "Incoterms 2020"],
      ["JNPT", "Port of Loading"],
      ["T/T · L/C", "Payment Terms"],
    ],
  },
  marquee: [
    "Samples on Request",
    "Export Shipping from Mumbai",
    "Bulk Orders Only",
    "Custom Designs Available",
    "Direct Supplier",
  ],
  about: {
    eyebrow: "Our Story",
    title: ["Crafting", "Elegance", "For Global Buyers"],
    body: "Based in Thane, Maharashtra, GOLDAGRO GLOBAL EXPORT exports imitation jewellery to international B2B buyers. We bridge traditional Indian design and global fashion trends.",
    points: ["Custom Designs on Request", "Export Shipping from Mumbai", "Bulk Supply", "Samples on Request"],
    badge: "RCMC",
    years: "FIEO Merchant Exporter",
    img: "/images/bridal/bridal_3.jpeg",
  },
  credBody:
    "Our GST registration, Importer-Exporter Code and FIEO RCMC for imitation jewellery are shown below and can be verified on the official portals.",
  collectionsTitle: ["Exclusive", "Collections"],
  tabs: [
    { id: "Necklace", label: "Necklaces" },
    { id: "Bridal", label: "Bridal Sets" },
    { id: "Bangles", label: "Bangles" },
    { id: "Earrings", label: "Earrings" },
  ],
  products: [
    ...j("necklaces", "Necklace", "Exquisite Necklace", "necklace"),
    ...j("bridal", "Bridal", "Grand Bridal", "bridal"),
    ...j("bangles", "Bangles", "Royal Bangles", "bangles"),
    ...j("earrings", "Earrings", "Heritage Earrings", "earrings"),
  ],
  why: [
    {
      icon: "🌍",
      title: "Global Export",
      body: "Export documentation and shipping from Nhava Sheva (JNPT), Mumbai, for international B2B buyers.",
    },
    {
      icon: "📦",
      title: "Bulk Capacity",
      body: "Fulfilling large-scale orders with consistent quality and timelines.",
    },
    {
      icon: "🎨",
      title: "Readymade Designs",
      body: "A wide range of ready-to-ship designs to meet your immediate needs.",
    },
  ],
  inquiry: {
    title: "Submit Your Inquiry",
    body: "Choose your preferred method of contact below.",
    categories: ["Necklaces", "Bridal Sets", "Bangles", "Earrings", "Bulk Mixed Inventory"],
    reps: ["Primary Representative"],
  },
  contactTitle: "Get in Touch",
  footerBlurb:
    "Exporter of imitation jewellery and Indian agro products from Thane, India.",
};
