import {
  ADDRESS_PARTS,
  AGRO,
  BRAND,
  BUYER_FAQ,
  EMAIL,
  GST,
  JEWEL,
  PHONES,
  SITE_URL,
  type Division,
} from "@/lib/site-data";

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
      "GOLDAGRO Global Export supplies Indian spices, fresh fruits (mosambi, banana, pineapple, pomegranate) and vegetables. FOB/CIF from Nhava Sheva Mumbai.Samples on request.",
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

function organization() {
  const logo = abs("/images/logo/logo.jpeg");
  const url = abs("/");
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": url ? `${url}#organization` : "#organization",
    name: BRAND,
    alternateName: "GOLDAGRO",
    ...(url ? { url } : {}),
    ...(logo ? { logo, image: logo } : {}),
    description:
      "Merchant exporter from Thane, Maharashtra, India: spices, fresh fruits and vegetables, and imitation jewellery for international buyers.",
    email: EMAIL,
    telephone: `+${PHONES[0]!.wa}`,
    taxID: GST,
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
      name: BRAND,
      ...(abs("/") ? { url: abs("/") } : {}),
      inLanguage: "en-IN",
    },
    {
      "@type": "WebPage",
      name: p.title,
      description: p.description,
      ...(url ? { url } : {}),
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      name: key === "agro" ? "Agro export range" : "Imitation jewellery range",
      itemListElement: products,
    },
    {
      "@type": "FAQPage",
      mainEntity: BUYER_FAQ.map((f) => ({
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
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
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
