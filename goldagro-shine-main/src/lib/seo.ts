import {
  ADDRESS_PARTS,
  AGRO,
  BRAND,
  EMAIL,
  GST,
  JEWEL,
  PHONES,
  SITE_URL,
  getFaq,
  type Division,
} from "@/lib/site-data";
import { COMPANY, LEGAL_UPDATED_ISO } from "@/lib/legal-data";

// 1200x630 share image used when a page has no better one (legal pages, 404).
const DEFAULT_OG_IMAGE = "/images/og/og-default.jpg";

type PageKey = "agro" | "jewel";

const PAGES: Record<
  PageKey,
  {
    path: "/" | "/jewellery";
    title: string;
    description: string;
    keywords: string;
    image: string;
    division: Division;
  }
> = {
  agro: {
    path: "/",
    title: "GOLDAGRO Global Export | Indian Agro Exporter",
    description:
      "GOLDAGRO Global Export supplies spices, mosambi, banana, pineapple, pomegranate and vegetables. FOB/CIF Nhava Sheva (JNPT), Mumbai. Samples on request.",
    keywords:
      "Indian spices exporter, fresh fruit exporter India, vegetable exporter Mumbai, Guntur red chilli, green cardamom, Nashik onion, mosambi, Cavendish banana, agro exporter Thane",
    image: "/images/agro/spices/dried_red_chillies.jpeg",
    division: AGRO,
  },
  jewel: {
    path: "/jewellery",
    title: "GOLDAGRO Global Export | Imitation Jewellery Exporter",
    description:
      "Bulk imitation jewellery exporter in Thane, India: necklaces, bridal sets, bangles and earrings. Wholesale and custom designs shipped worldwide from Mumbai. Request a quotation from GOLDAGRO Global Export.",
    keywords:
      "imitation jewellery exporter India, artificial jewellery wholesale, bridal jewellery sets bulk, bangles exporter, earrings wholesale, Thane jewellery exporter",
    image: "/images/bangles/bangles_3.jpeg",
    division: JEWEL,
  },
};

const abs = (path: string) => (SITE_URL ? `${SITE_URL}${path}` : undefined);
const jsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");

const orgId = () => (abs("/") ? `${abs("/")}#organization` : "#organization");

function organization() {
  const logo = abs("/images/logo/logo.jpeg");
  const url = abs("/");
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": orgId(),
    name: BRAND,
    alternateName: "GOLDAGRO",
    ...(url ? { url } : {}),
    ...(logo ? { logo, image: logo } : {}),
    description:
      "Merchant exporter from Thane, Maharashtra, India: spices, fresh fruits and vegetables, and imitation jewellery for international buyers.",
    email: EMAIL,
    telephone: `+${PHONES[0]!.wa}`,
    taxID: GST,
    identifier: [
      { "@type": "PropertyValue", propertyID: "GSTIN", value: GST },
      { "@type": "PropertyValue", propertyID: "IEC (DGFT)", value: COMPANY.iec },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_PARTS.street,
      addressLocality: ADDRESS_PARTS.locality,
      addressRegion: ADDRESS_PARTS.region,
      postalCode: ADDRESS_PARTS.postalCode,
      addressCountry: ADDRESS_PARTS.country,
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Indian spice export",
      "Fresh fruit export",
      "Fresh vegetable export",
      "Imitation jewellery export",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${PHONES[0]!.wa}`,
        email: EMAIL,
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
    ],
  };
}

export function buildHead(key: PageKey) {
  const p = PAGES[key];
  const url = abs(p.path);
  const image = abs(p.image);
  const products = p.division.products.map((x, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: x.name,
    ...(abs(x.img) ? { image: abs(x.img) } : {}),
  }));
  const graph: unknown[] = [
    organization(),
    {
      "@type": "WebSite",
      "@id": abs("/") ? `${abs("/")}#website` : "#website",
      name: BRAND,
      ...(abs("/") ? { url: abs("/") } : {}),
      inLanguage: "en-IN",
      publisher: { "@id": orgId() },
    },
    {
      "@type": "WebPage",
      name: p.title,
      description: p.description,
      ...(url ? { url } : {}),
      inLanguage: "en-IN",
      isPartOf: { "@id": abs("/") ? `${abs("/")}#website` : "#website" },
      about: { "@id": orgId() },
      ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
    },
    {
      "@type": "ItemList",
      name: key === "agro" ? "Agro export range" : "Imitation jewellery range",
      itemListElement: products,
    },
    {
      "@type": "FAQPage",
      mainEntity: getFaq(key).map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", ...(abs("/") ? { item: abs("/") } : {}) },
        ...(key === "jewel"
          ? [{ "@type": "ListItem", position: 2, name: "Jewellery", ...(url ? { item: url } : {}) }]
          : []),
      ],
    },
  ];

  return {
    meta: [
      { title: p.title },
      { name: "description", content: p.description },
      { name: "keywords", content: p.keywords },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      // Geo targeting
      { name: "geo.region", content: "IN-MH" },
      { name: "geo.placename", content: "Mira Road, Thane, Maharashtra, India" },
      // Open Graph / Twitter
      { property: "og:site_name", content: BRAND },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: p.title },
      { property: "og:description", content: p.description },
      ...(url ? [{ property: "og:url", content: url }] : []),
      ...(image
        ? [
            { property: "og:image", content: image },
            {
              property: "og:image:alt",
              content: `${BRAND} — ${key === "agro" ? "Indian spices and produce" : "imitation jewellery"}`,
            },
            { name: "twitter:image", content: image },
          ]
        : []),
      { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
      { name: "twitter:title", content: p.title },
      { name: "twitter:description", content: p.description },
    ],
    links: [
      ...(url
        ? [
            { rel: "canonical", href: url },
            { rel: "alternate", hrefLang: "en-IN", href: url },
            { rel: "alternate", hrefLang: "x-default", href: url },
          ]
        : []),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: jsonLd({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}

type LegalKey = "terms" | "privacy" | "shipping" | "disclaimer" | "notice";

const LEGAL_PAGE_SEO: Record<
  LegalKey,
  { path: string; title: string; description: string; name: string }
> = {
  terms: {
    path: "/terms",
    name: "Terms and Conditions",
    title: "Terms and Conditions | GOLDAGRO Global Export",
    description:
      "Website terms and export terms of sale of GOLDAGRO Global Export: quotations, FOB/CIF delivery, payment by T/T or L/C, documents, risk, claims, governing law.",
  },
  privacy: {
    path: "/privacy-policy",
    name: "Privacy Policy",
    title: "Privacy Policy | GOLDAGRO Global Export",
    description:
      "How GOLDAGRO Global Export collects, uses, shares and protects personal information, your rights, and how to contact our Grievance Officer.",
  },
  shipping: {
    path: "/shipping-and-claims",
    name: "Shipping, Cancellation and Claims Policy",
    title: "Shipping, Cancellation and Claims Policy | GOLDAGRO Global Export",
    description:
      "Shipping from Nhava Sheva (JNPT), documents, insurance, order cancellation, quality claims, returns and refunds for GOLDAGRO Global Export orders.",
  },
  disclaimer: {
    path: "/disclaimer",
    name: "Disclaimer",
    title: "Disclaimer | GOLDAGRO Global Export",
    description:
      "Limits of the information on the GOLDAGRO Global Export website: indicative specifications, illustrative images, agricultural variation and imitation jewellery.",
  },
  notice: {
    path: "/legal-notice",
    name: "Legal Notice and Registrations",
    title: "Legal Notice and Registrations | GOLDAGRO Global Export",
    description:
      "Business details and Indian government registrations of GOLDAGRO Global Export (GSTIN, IEC, FIEO RCMC), with links to verify them on official portals.",
  },
};

export function buildLegalHead(key: LegalKey) {
  const p = LEGAL_PAGE_SEO[key];
  const url = abs(p.path);
  const image = abs(DEFAULT_OG_IMAGE);
  const graph: unknown[] = [
    {
      "@type": "WebPage",
      name: p.name,
      description: p.description,
      ...(url ? { url } : {}),
      inLanguage: "en-IN",
      dateModified: LEGAL_UPDATED_ISO,
      isPartOf: { "@id": abs("/") ? `${abs("/")}#website` : "#website" },
      about: { "@id": orgId() },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", ...(abs("/") ? { item: abs("/") } : {}) },
        { "@type": "ListItem", position: 2, name: p.name, ...(url ? { item: url } : {}) },
      ],
    },
  ];
  return {
    meta: [
      { title: p.title },
      { name: "description", content: p.description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:site_name", content: BRAND },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: p.title },
      { property: "og:description", content: p.description },
      ...(url ? [{ property: "og:url", content: url }] : []),
      ...(image ? [{ property: "og:image", content: image }] : []),
      { name: "twitter:card", content: image ? "summary_large_image" : "summary" },
      { name: "twitter:title", content: p.title },
      { name: "twitter:description", content: p.description },
    ],
    links: [
      ...(url
        ? [
            { rel: "canonical", href: url },
            { rel: "alternate", hrefLang: "en-IN", href: url },
          ]
        : []),
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: jsonLd({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}
