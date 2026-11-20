import { Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import {
  ADDRESS,
  ABOUT_FACTS,
  BUYER_FAQ,
  CERTS,
  EMAIL,
  GST,
  ORDER_STEPS,
  PHONES,
  TRUST_HIGHLIGHTS,
  getProductDetails,
  type Cert,
  type Division,
  type Product,
} from "@/lib/site-data";

function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

const SECURITY_MSG =
  "Security Protocol: Direct archiving, local printing, or devtools inspection of official enterprise credentials is fully restricted.";

function useSecurityShield() {
  useEffect(() => {
    const warn = () => toast.error("Restricted", { description: SECURITY_MSG, id: "security" });
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;
      if (
        e.key === "F12" ||
        (mod && (k === "p" || k === "s")) ||
        (mod && e.shiftKey && ["i", "j", "c"].includes(k))
      ) {
        e.preventDefault();
        e.stopPropagation();
        warn();
      }
    };
    const onPrint = () => warn();
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("beforeprint", onPrint);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("beforeprint", onPrint);
    };
  }, []);
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm sm:tracking-[0.25em]">
      ✦ {children}
    </p>
  );
}

function Header({ d }: { d: Division }) {
  const [open, setOpen] = useState(false);
  useScrollLock(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:font-semibold focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <div className="border-b bg-card px-4 py-2 text-xs tracking-[0.1em] sm:tracking-[0.15em]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <span className="min-w-0 uppercase leading-snug text-muted-foreground">✦ {d.strip}</span>
          <Link
            to={d.switchTo}
            className="inline-flex min-h-8 shrink-0 items-center gap-1 font-semibold text-primary underline-offset-4 hover:text-primary-glow hover:underline"
          >
            {d.switchLabel} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 lg:flex lg:justify-between">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center">
              <img
                src="/images/logo/logo.jpeg"
                alt="GOLDAGRO Global Export"
                className="h-10 w-10 object-contain"
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-lg tracking-[0.2em]">GOLDAGRO</span>
              <span className="block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Global Export
              </span>
            </span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {d.nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="py-2 text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${PHONES[0]!.wa}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp btn-sm hidden sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Us
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="icon-btn lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`fixed inset-0 z-50 overflow-y-auto bg-overlay backdrop-blur-xl transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="icon-btn absolute right-4 top-4"
        >
          <X className="h-5 w-5" />
        </button>
        <nav
          aria-label="Mobile"
          className="flex min-h-full flex-col items-center justify-center gap-5 px-6 py-20"
        >
          {d.nav.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`py-1 font-display text-2xl tracking-[0.12em] transition-all duration-300 hover:text-primary ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {n.label}
            </a>
          ))}
          <a
            href={`https://wa.me/${PHONES[0]!.wa}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp mt-4 w-full max-w-xs"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp Us
          </a>
          <Link
            to={d.switchTo}
            onClick={() => setOpen(false)}
            className="btn btn-outline w-full max-w-xs"
          >
            {d.switchLabel} ↗
          </Link>
        </nav>
      </div>
    </>
  );
}

function Hero({ d }: { d: Division }) {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <img
  src={d.hero.img}
  alt={
    d.key === "agro"
      ? "Premium dried red chillies for export by GOLDAGRO Global Export"
      : "GOLDAGRO imitation jewellery collection for wholesale export"
  }
  fetchPriority="high"
  decoding="async"
  className="absolute inset-0 -z-20 h-full w-full object-cover"/>
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-28 lg:py-40">
        <p className="mb-5 text-xs uppercase tracking-[0.2em] text-sand sm:text-sm sm:tracking-[0.25em]">
          {d.hero.eyebrow}
        </p>
        <h1 className="max-w-3xl text-balance font-display text-[2rem] leading-[1.15] sm:text-6xl lg:text-7xl">
          {d.hero.lines[0]}
          <br />
          <span className="font-serif italic text-gradient-gold">{d.hero.lines[1]}</span>{" "}
          {d.hero.lines[2]}
        </h1>
        <p className="mt-6 font-serif text-xl font-semibold tracking-[0.12em] text-primary sm:text-2xl sm:tracking-[0.2em]">
          ✦ {d.hero.tag} ✦
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg">
          {d.hero.body}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <a href="#inquiry" className="btn btn-primary">
            {d.key === "agro" ? "Submit B2B Inquiry" : "Inquire Now"}
          </a>
          <a href="#collections" className="btn btn-outline">
            {d.key === "agro" ? "View Specifications" : "View Collections"}
          </a>
        </div>
        <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t pt-8 sm:mt-14 sm:gap-6">
          {d.hero.stats.map(([v, l]) => (
            <div key={l}>
              <dt className="font-display text-2xl text-primary sm:text-3xl">{v}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
                {l}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="overflow-hidden border-y bg-card py-4">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap" aria-hidden="true">
          {[...d.marquee, ...d.marquee, ...d.marquee, ...d.marquee].map((m, i) => (
            <span key={i} className="font-serif text-lg font-semibold tracking-widest text-sand">
              ✦ {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ d }: { d: Division }) {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <img
            src={d.about.img}
            alt={
              d.key === "agro"
                ? "Fresh pineapples sourced from Indian farms for export"
                : "Bridal imitation jewellery set from the GOLDAGRO collection"
            }
            className="aspect-4/5 w-full rounded-sm object-cover"
            loading="lazy"
          />
          <div className="absolute -bottom-6 right-4 rounded-sm bg-primary px-5 py-4 text-primary-foreground shadow-glow sm:-right-6 sm:px-6 sm:py-5">
            <p className="font-display text-3xl sm:text-4xl">1+</p>
            <p className="text-xs font-semibold uppercase tracking-wider">{d.about.years}</p>
          </div>
        </div>
        <div className="min-w-0">
          <Eyebrow>{d.about.eyebrow}</Eyebrow>
          <h2 className="text-balance font-display text-3xl leading-tight sm:text-5xl">
            {d.about.title[0]}{" "}
            <span className="font-serif italic text-gradient-gold">{d.about.title[1]}</span>{" "}
            {d.about.title[2]}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {d.about.body}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {d.about.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-base">
                <span className="text-primary" aria-hidden="true">
                  ◆
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 inline-flex flex-wrap items-center gap-3 rounded-sm border px-5 py-3 text-sm tracking-wider">
            <span className="text-muted-foreground">GST REGISTRATION</span>
            <span className="font-semibold text-primary">{GST}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CertModal({ cert, onClose }: { cert: Cert | null; onClose: () => void }) {
  useEffect(() => {
    if (!cert) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [cert, onClose]);
  useScrollLock(!!cert);
  if (!cert) return null;
  const isPdf = cert.file.endsWith(".pdf");
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} — view only`}
      className="secure-zone fixed inset-0 z-50 grid place-items-center bg-overlay p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-sm border bg-card select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b px-5 py-3">
          <span className="flex min-w-0 items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <ShieldCheck className="h-4 w-4 shrink-0" />{" "}
            <span className="truncate">Secured Corporate Record (View Only)</span>
          </span>
          <button type="button" aria-label="Close" onClick={onClose} className="icon-btn shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[1.3fr_1fr]">
          <div className="relative min-h-[50vh] bg-muted">
            {isPdf ? (
              <iframe
                title={cert.title}
                src={`${cert.file}#toolbar=0&navpanes=0&view=FitH`}
                className="secure-media absolute inset-0 h-full w-full"
              />
            ) : (
              <img
                src={cert.file}
                alt={cert.title}
                draggable={false}
                className="secure-media absolute inset-0 h-full w-full object-contain p-4"
              />
            )}
            <div className="absolute inset-0" onContextMenu={(e) => e.preventDefault()} />
          </div>
          <div className="space-y-4 p-6 text-sm">
            <h3 className="font-display text-xl">{cert.title}</h3>
            <p className="text-muted-foreground">{cert.issuer}</p>
            {[
              ["License Number", cert.regId],
              ["Status", cert.status],
              ["Authorized Signatory", cert.proprietor],
              ["Registered", cert.state],
              ["Date of Issue", cert.date],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-wrap justify-between gap-2 border-b pb-2">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-semibold text-sand">{v}</span>
              </div>
            ))}
            <p className="leading-relaxed text-muted-foreground">{cert.desc}</p>
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent("Verified copy request: " + cert.title)}`}
              className="btn btn-primary btn-block"
            >
              Request verified copy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Credentials({ d }: { d: Division }) {
  const [cert, setCert] = useState<Cert | null>(null);
  return (
    <section aria-labelledby="credentials-heading" className="border-y bg-card py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{d.key === "agro" ? "Fully Compliant Exporter" : "Trust & Legality"}</Eyebrow>
          <h2 id="credentials-heading" className="text-balance font-display text-3xl sm:text-5xl">
            Corporate <span className="font-serif italic text-gradient-gold">Credentials</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{d.credBody}</p>
        </div>
        <div className="mt-12 grid gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          {CERTS.map((c) => (
            <article
              key={c.title}
              className="lift flex flex-col rounded-sm border bg-background p-6"
            >
              <span className="text-3xl" aria-hidden="true">
                {c.icon}
              </span>
              <h3 className="mt-4 font-display text-lg">{c.short}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {c.issuerShort}
              </p>
              <p className="mt-2 wrap-break-word text-sm font-semibold text-sand">
                {c.short === "GST Certificate"
                  ? "GSTIN"
                  : c.short === "Import Export Code"
                    ? "IEC No."
                    : c.short === "FIEO RCMC"
                      ? "RCMC No."
                      : "Certificate No."}
                : {c.regId}
              </p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{c.blurb}</p>
              <button
                type="button"
                onClick={() => setCert(c)}
                aria-haspopup="dialog"
                className="btn btn-outline btn-sm btn-block mt-5"
              >
                Verify Credentials <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
      <CertModal cert={cert} onClose={() => setCert(null)} />
    </section>
  );
}

function ProductDetailsModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);
  useScrollLock(!!product);
  if (!product) return null;
  const details = getProductDetails(product.name);
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-sm border bg-background shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="icon-btn absolute right-3 top-3 z-10"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="min-h-64 bg-muted sm:min-h-96">
            <img
              src={product.img}
              alt={product.name}
              className="h-full max-h-[55vh] w-full object-cover md:max-h-none"
            />
          </div>
          <div className="p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {product.label}
            </p>
            <h3 className="mt-2 pr-12 font-display text-2xl sm:text-3xl">{product.name}</h3>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{details.description}</p>
            <div className="mt-5 divide-y rounded-sm border">
              {details.specifications.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[minmax(6rem,0.8fr)_1.2fr] gap-3 px-3 py-2.5 text-sm sm:px-4"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="wrap-break-word font-medium">{value}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Specifications and availability should be confirmed for the selected lot/design before
              ordering.
            </p>
            <a
              href="#inquiry"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("goldagro:product-selected", { detail: product.name }),
                );
                onClose();
              }}
              className="btn btn-primary btn-block mt-6"
            >
              Inquire About This Product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Collections({ d }: { d: Division }) {
  const [tab, setTab] = useState(d.tabs[0]!.id);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const items = d.products.filter((p) => p.cat === tab);
  return (
    <section id="collections" className="mx-auto max-w-7xl px-4 py-16 sm:py-28">
      <div className="text-center">
        <Eyebrow>{d.key === "agro" ? "Global Food Standard" : "Exclusive Range"}</Eyebrow>
        <h2 className="text-balance font-display text-3xl sm:text-5xl">
          Our {d.collectionsTitle[0]}{" "}
          <span className="font-serif italic text-gradient-gold">{d.collectionsTitle[1]}</span>
        </h2>
      </div>
      <div
        role="group"
        aria-label="Product categories"
        className="mt-10 flex flex-wrap justify-center gap-3"
      >
        {d.tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
            className="tab-btn"
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-6">
        {items.map((product) => (
          <article
            key={product.img}
            className="lift group flex flex-col overflow-hidden rounded-sm border bg-card"
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(product)}
              aria-label={`View details: ${product.name}`}
              aria-haspopup="dialog"
              className="block aspect-square overflow-hidden bg-muted"
            >
              <img
                src={product.img}
                alt={product.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {product.label}
              </p>
              <h3 className="mt-2 flex-1 font-serif text-xl font-semibold leading-snug">
                {product.name}
              </h3>
              <p className="mt-3 text-xs italic text-muted-foreground">
                *This image is for illustration purpose only
              </p>
              <button
                type="button"
                onClick={() => setSelectedProduct(product)}
                aria-haspopup="dialog"
                className="btn btn-outline btn-sm btn-block mt-4"
              >
                View details
              </button>
            </div>
          </article>
        ))}
      </div>
      <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}

function BuyerHighlights() {
  return (
    <section aria-label="Buyer highlights" className="border-y bg-card py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_HIGHLIGHTS.map((item) => (
          <div key={item.title} className="lift rounded-sm border bg-background p-5 sm:p-6">
            <span className="text-3xl" aria-hidden="true">
              {item.icon}
            </span>
            <h3 className="mt-3 font-display text-lg">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function OrderProcess() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-16 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>From Inquiry to Shipment</Eyebrow>
        <h2 className="font-display text-3xl sm:text-5xl">
          How an <span className="font-serif italic text-gradient-gold">Order Works</span>
        </h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Simple steps from inquiry to delivery.
        </p>
      </div>
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ORDER_STEPS.map((step, index) => (
          <li key={step.title} className="lift rounded-sm border bg-card p-5 sm:p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
              {index + 1}
            </span>
            <h3 className="mt-4 font-display text-lg">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BuyerFAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="border-y bg-card py-16 sm:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <Eyebrow>Buyer Information</Eyebrow>
          <h2 id="faq-heading" className="font-display text-3xl sm:text-5xl">
            Buyer <span className="font-serif italic text-gradient-gold">FAQ</span>
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {BUYER_FAQ.map((item) => (
            <details
              key={item.question}
              className="group rounded-sm border bg-background p-4 sm:p-5"
            >
              <summary className="min-h-6 cursor-pointer list-none pr-2 text-base font-semibold marker:hidden">
                <span className="flex items-center justify-between gap-3">
                  {item.question}
                  <span
                    className="text-primary transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    ＋
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why({ d }: { d: Division }) {
  return (
    <section id="why" className="border-y bg-card py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <Eyebrow>{d.key === "agro" ? "Global Supply Standard" : "Our Promise"}</Eyebrow>
          <h2 className="font-display text-3xl sm:text-5xl">
            Why Choose <span className="text-gradient-gold">GOLDAGRO</span>?
          </h2>
        </div>
        <div className="mt-12 grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {d.why.map((w) => (
            <div
              key={w.title}
              className="lift rounded-sm border bg-background p-6 text-center sm:p-8"
            >
              <span className="text-4xl" aria-hidden="true">
                {w.icon}
              </span>
              <h3 className="mt-4 font-display text-xl">{w.title}</h3>
              <p className="mt-3 text-base text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CrossDivision() {
  return (
    <section
      aria-labelledby="agro-division-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:py-20"
    >
      <div className="grid gap-10 rounded-sm border bg-card p-6 sm:p-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Corporate Extension</Eyebrow>
          <h2 id="agro-division-heading" className="font-display text-3xl">
            GOLDAGRO <span className="font-serif italic text-gradient-gold">Agro-Exports</span>{" "}
            Division
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Beyond imitation jewellery, GOLDAGRO exports premium agro commodities directly from
            harvesting points across India, under strictly regulated phytosanitary standards.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/" className="btn btn-primary">
              View Agro Portfolio
            </Link>
            <a
              href={`https://wa.me/${PHONES[0]!.wa}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp Agro Dept.
            </a>
          </div>
        </div>
        <div className="grid gap-4">
          {[
            [
              "🌶️",
              "Premium Spices",
              "High-grade Turmeric, Cardamom, and Black Pepper from Indian estates.",
            ],
            ["🥭", "Exotic Fruits", "Mangoes, pomegranates, and grapes in cold-chain packs."],
            [
              "🧅",
              "Fresh Vegetables",
              "Wholesale onions, potatoes, and daily fresh crops for global docks.",
            ],
          ].map(([i, t, b]) => (
            <div key={t} className="lift flex gap-4 rounded-sm border bg-background p-4">
              <span className="text-2xl" aria-hidden="true">
                {i}
              </span>
              <div>
                <h3 className="text-base font-semibold">{t}</h3>
                <p className="text-sm text-muted-foreground">{b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const field =
  "min-h-12 w-full min-w-0 rounded-md border-2 border-muted-foreground/60 bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40";

const COUNTRY_OPTIONS = [
  { name: "India", dial: "+91", postal: "^[1-9][0-9]{5}$", phoneMin: 10, phoneMax: 10 },
  {
    name: "United States",
    dial: "+1",
    postal: "^[0-9]{5}(-[0-9]{4})?$",
    phoneMin: 10,
    phoneMax: 10,
  },
  {
    name: "Canada",
    dial: "+1",
    postal: "^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]$",
    phoneMin: 10,
    phoneMax: 10,
  },
  {
    name: "United Kingdom",
    dial: "+44",
    postal: "^[A-Za-z]{1,2}[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}$",
    phoneMin: 9,
    phoneMax: 10,
  },
  { name: "United Arab Emirates", dial: "+971", postal: "^.{0,20}$", phoneMin: 9, phoneMax: 9 },
  { name: "Saudi Arabia", dial: "+966", postal: "^[0-9]{5}$", phoneMin: 9, phoneMax: 9 },
  { name: "Australia", dial: "+61", postal: "^[0-9]{4}$", phoneMin: 9, phoneMax: 9 },
  { name: "Singapore", dial: "+65", postal: "^[0-9]{6}$", phoneMin: 8, phoneMax: 8 },
  { name: "Germany", dial: "+49", postal: "^[0-9]{5}$", phoneMin: 7, phoneMax: 12 },
  { name: "France", dial: "+33", postal: "^[0-9]{5}$", phoneMin: 9, phoneMax: 9 },
  { name: "Japan", dial: "+81", postal: "^[0-9]{3}-?[0-9]{4}$", phoneMin: 9, phoneMax: 10 },
  { name: "China", dial: "+86", postal: "^[0-9]{6}$", phoneMin: 11, phoneMax: 11 },
  { name: "South Africa", dial: "+27", postal: "^[0-9]{4}$", phoneMin: 9, phoneMax: 9 },
  { name: "Other country", dial: "+", postal: "^.{2,20}$", phoneMin: 7, phoneMax: 15 },
];

function Inquiry({ d }: { d: Division }) {
  const [f, setF] = useState({
    name: "",
    company: "",
    email: "",
    dial: "+91",
    phone: "",
    country: "India",
    postalCode: "",
    port: "",
    cat: d.inquiry.categories[0]!,
    quantity: "",
    msg: "",
  });
  const selectedCountry = COUNTRY_OPTIONS.find((c) => c.name === f.country) ?? COUNTRY_OPTIONS[0]!;
  useEffect(() => {
    const onProductSelected = (event: Event) => {
      const productName = (event as CustomEvent<string>).detail;
      if (productName) setF((prev) => ({ ...prev, cat: productName }));
    };
    window.addEventListener("goldagro:product-selected", onProductSelected);
    return () => window.removeEventListener("goldagro:product-selected", onProductSelected);
  }, []);
  const body = () =>
    `GOLDAGRO GLOBAL EXPORT — BUSINESS INQUIRY\n\nFull name: ${f.name.trim()}\nCompany: ${f.company.trim() || "Not provided"}\nEmail: ${f.email.trim()}\nPhone / WhatsApp: ${f.dial} ${f.phone.trim()}\nCountry: ${f.country}\nPostal / PIN code: ${f.postalCode.trim()}\nDestination port: ${f.port.trim()}\nProduct: ${f.cat}\nQuantity: ${f.quantity.trim() || "Please advise"}\nAdditional requirements: ${f.msg.trim() || "None provided"}\n\nPlease share the relevant specifications and quotation.\nThank you.`;
  const validate = () => {
    const email = f.email.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email);
    const digits = f.phone.replace(/\D/g, "");
    const phoneValid =
      digits.length >= selectedCountry.phoneMin &&
      digits.length <= selectedCountry.phoneMax &&
      !/^([0-9])\1+$/.test(digits) &&
      !/^0+$/.test(digits);
    let postalValid = true;
    if (selectedCountry.name !== "United Arab Emirates" && selectedCountry.name !== "Other country")
      postalValid = new RegExp(selectedCountry.postal, "i").test(f.postalCode.trim());
    else if (selectedCountry.name === "Other country")
      postalValid = f.postalCode.trim().length >= 2 && !/^([0-9])\1+$/.test(f.postalCode.trim());
    if (!f.name.trim() || !emailValid || !phoneValid || !postalValid || !f.port.trim() || !f.cat) {
      toast.error("Please check the required fields.", {
        description: !f.name.trim()
          ? "Enter your full name."
          : !emailValid
            ? "Enter a valid email address (for example, name@company.com)."
            : !phoneValid
              ? `Enter a valid ${selectedCountry.name} phone number without repeated placeholder digits.`
              : !postalValid
                ? `Enter a valid postal / PIN code for ${selectedCountry.name}.`
                : "Enter your destination port and select a product.",
      });
      return false;
    }
    return true;
  };
  const viaWa = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const wa = PHONES[0]!.wa;
    const url = `https://wa.me/${wa}?text=${encodeURIComponent(body())}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  };
  const viaGmail = () => {
    if (!validate()) return;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(`${d.inquiry.title} — ${f.cat}`)}&body=${encodeURIComponent(body())}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  };
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));
  return (
    <section
      id="inquiry"
      aria-labelledby="inquiry-heading"
      className="mx-auto max-w-4xl px-4 py-16 sm:py-28"
    >
      <div className="text-center">
        <Eyebrow>{d.key === "agro" ? "Global Trade Request" : "Business Proposal"}</Eyebrow>
        <h2 id="inquiry-heading" className="text-balance font-display text-3xl sm:text-5xl">
          {d.inquiry.title}
        </h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{d.inquiry.body}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Complete the form, then review and send your inquiry through WhatsApp or Gmail.
        </p>
      </div>
      <form
        onSubmit={viaWa}
        className="mt-10 grid min-w-0 gap-5 rounded-sm border bg-card p-4 sm:grid-cols-2 sm:p-10"
        noValidate
      >
        <label className="grid gap-2 text-sm font-medium">
          Full name{" "}
          <input
            className={field}
            autoComplete="name"
            placeholder="Your full name"
            value={f.name}
            onChange={set("name")}
            maxLength={100}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Company name (optional){" "}
          <input
            className={field}
            autoComplete="organization"
            placeholder="Company name"
            value={f.company}
            onChange={set("company")}
            maxLength={120}
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Business email{" "}
          <input
            className={field}
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            value={f.email}
            onChange={set("email")}
            maxLength={254}
            required
          />
        </label>
        <div className="grid gap-2 text-sm font-medium">
          <label htmlFor="inquiry-phone">Phone / WhatsApp</label>
          <div className="flex gap-2">
            <span
              className="inline-flex min-h-12 min-w-16 shrink-0 items-center justify-center rounded-md border-2 border-muted-foreground/60 bg-muted px-3 text-base font-semibold"
              title="Country calling code (set by the Country field)"
            >
              {f.dial}
            </span>
            <input
              id="inquiry-phone"
              className={field}
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="Phone number"
              value={f.phone}
              onChange={set("phone")}
              maxLength={20}
              required
            />
          </div>
          <p className="text-xs font-normal text-muted-foreground">
            Enter the national number without the country code. The calling code follows the Country
            you select.
          </p>
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Country{" "}
          <select
            className={field}
            value={f.country}
            onChange={(e) => {
              const c = COUNTRY_OPTIONS.find((x) => x.name === e.target.value)!;
              setF((prev) => ({ ...prev, country: c.name, dial: c.dial }));
            }}
            required
          >
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          PIN / postal code{" "}
          <input
            className={field}
            autoComplete="postal-code"
            placeholder="Postal / PIN code"
            value={f.postalCode}
            onChange={set("postalCode")}
            maxLength={20}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Destination port{" "}
          <input
            className={field}
            placeholder="Destination port"
            value={f.port}
            onChange={set("port")}
            maxLength={120}
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Product / category{" "}
          <select className={field} value={f.cat} onChange={set("cat")} required>
            {d.inquiry.categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            {d.products.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Quantity / order size{" "}
          <input
            className={field}
            placeholder="e.g. 1 x 20ft container or required quantity"
            value={f.quantity}
            onChange={set("quantity")}
            maxLength={150}
          />
        </label>
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Additional requirements{" "}
          <textarea
            className={`${field} min-h-32 resize-y`}
            placeholder={
              d.key === "agro"
                ? "Specifications, grade, packaging, quantity or other details"
                : "Designs, material, finish, quantity or other requirements"
            }
            value={f.msg}
            onChange={set("msg")}
            maxLength={1500}
          />
        </label>
        <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-2">
          Your details are used to prepare this inquiry message. WhatsApp and Gmail will open with
          the message filled in; you must press Send in that app. Format checks cannot confirm that
          a phone number or postal code is active or belongs to you.
        </p>
        <button type="submit" className="btn btn-whatsapp btn-block min-w-0">
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          Send Inquiry via WhatsApp
        </button>
        <button type="button" onClick={viaGmail} className="btn btn-outline btn-block min-w-0">
          <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
          Send Inquiry via Gmail
        </button>
      </form>
    </section>
  );
}

function Contact({ d }: { d: Division }) {
  const phone = PHONES[0]!;
  const tel = `+${phone.wa}`;
  const items = [
    {
      icon: MapPin,
      t: "Corporate Office",
      body: <address className="not-italic text-base text-muted-foreground">{ADDRESS}</address>,
    },
    {
      icon: Phone,
      t: "Phone / WhatsApp",
      body: (
        <a
          href={`tel:${tel}`}
          className="inline-flex min-h-11 items-center text-base font-semibold text-primary underline-offset-4 hover:underline"
        >
          {phone.label}
        </a>
      ),
    },
    {
      icon: Mail,
      t: "Email Us",
      body: (
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex min-h-11 items-center break-all text-base font-semibold text-primary underline-offset-4 hover:underline"
        >
          {EMAIL}
        </a>
      ),
    },
    {
      icon: Globe,
      t: "Global Export Services",
      body: (
        <p className="text-base text-muted-foreground">
          Direct maritime dispatch from Mumbai customs ports
        </p>
      ),
    },
  ];
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t bg-card py-16 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <Eyebrow>HQ Coordinate</Eyebrow>
          <h2 id="contact-heading" className="text-balance font-display text-3xl sm:text-5xl">
            {d.contactTitle}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))]">
          {items.map(({ icon: I, t, body }) => (
            <div key={t} className="rounded-sm border bg-background p-6">
              <I className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg">{t}</h3>
              <div className="mt-2 wrap-break-word">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ d }: { d: Division }) {
  return (
    <footer className="border-t px-4 pb-28 pt-12 sm:pb-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl tracking-[0.2em]">GOLDAGRO</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{d.footerBlurb}</p>
          <address className="mt-4 max-w-sm text-sm not-italic text-muted-foreground">
            {ADDRESS}
          </address>
          <ul className="mt-3 grid gap-1 text-sm text-muted-foreground">
            {ABOUT_FACTS.slice(3).map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-1 text-sm">
          {d.nav.slice(0, 4).map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="inline-flex min-h-11 items-center text-muted-foreground hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="grid content-start gap-1 text-sm">
          <Link
            to={d.switchTo}
            className="inline-flex min-h-11 items-center font-semibold text-primary"
          >
            {d.key === "agro" ? "Jewellery Portfolio ↗" : "Agro Exports ↗"}
          </Link>
          <a
            href={`https://wa.me/${PHONES[0]!.wa}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center text-muted-foreground hover:text-primary"
          >
            WhatsApp Desk
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t pt-6 text-sm text-muted-foreground">
        © 2026 Goldagro Global Export. All Rights Reserved.
      </p>
    </footer>
  );
}

export function DivisionPage({ d }: { d: Division }) {
  useSecurityShield();
  return (
    <div className={`${d.theme} min-h-screen overflow-x-clip bg-background text-foreground`}>
      <Header d={d} />
      <main id="main">
        <Hero d={d} />
        <About d={d} />
        <Credentials d={d} />
        <BuyerHighlights />
        <Collections d={d} />
        <OrderProcess />
        <BuyerFAQ />
        <Why d={d} />
        {d.key === "jewel" && <CrossDivision />}
        <Inquiry d={d} />
        <Contact d={d} />
      </main>
      <Footer d={d} />
      <a
        href={`https://wa.me/${PHONES[0]!.wa}?text=${encodeURIComponent("Hello GOLDAGRO, I would like to make a business inquiry.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with GOLDAGRO on WhatsApp"
        className="btn btn-whatsapp fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 h-14 w-14 rounded-full p-0 shadow-xl sm:right-6 sm:w-auto sm:px-5"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <Toaster position="top-center" theme="dark" richColors />
    </div>
  );
}
