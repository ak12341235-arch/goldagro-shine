import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { COMPANY, LEGAL_PAGES, LEGAL_UPDATED } from "@/lib/legal-data";

// A value when it has been supplied, otherwise a blank fill-in line (see FILL_IN in legal-data.ts).
export function Fill({ value, label }: { value?: string; label: string }) {
  const v = value?.trim();
  if (v) return <span className="font-semibold text-sand">{v}</span>;
  return (
    <span
      className="legal-blank"
      data-legal-blank=""
      role="note"
      aria-label={`${label} (to be provided)`}
      title={label}
    />
  );
}

export function Clause({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{title}</h2>
      {children}
    </section>
  );
}

export function FactTable({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="legal-facts">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function LegalPage({
  title,
  intro,
  toc,
  children,
}: {
  title: string;
  intro: string;
  toc: { id: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div className="legal-page theme-agro min-h-screen overflow-x-clip bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:font-semibold focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <header className="legal-noprint border-b bg-card">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo/logo.jpeg"
              alt="GOLDAGRO Global Export"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="leading-tight">
              <span className="block font-display text-lg tracking-[0.2em]">GOLDAGRO</span>
              <span className="block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Global Export
              </span>
            </span>
          </Link>
          <Link to="/" className="btn btn-outline btn-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to website
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          ✦ {COMPANY.tradeName}
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl leading-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {LEGAL_UPDATED}</p>
        <p className="mt-6 text-base leading-relaxed text-foreground/90 sm:text-lg">{intro}</p>

        <nav
          aria-label="On this page"
          className="legal-noprint mt-8 rounded-sm border bg-card p-5 sm:p-6"
        >
          <p className="font-display text-base">On this page</p>
          <ol className="mt-3 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
            {toc.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="inline-flex min-h-8 items-center text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="legal-prose mt-10">{children}</div>
      </main>

      <footer className="legal-noprint border-t px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Legal pages" className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {LEGAL_PAGES.map((p) => (
              <Link
                key={p.path}
                to={p.path}
                className="inline-flex min-h-11 items-center text-muted-foreground hover:text-primary"
              >
                {p.label}
              </Link>
            ))}
          </nav>
          <address className="mt-4 text-sm not-italic text-muted-foreground">
            {COMPANY.tradeName} · {COMPANY.businessAddress}
          </address>
          <p className="mt-2 text-sm text-muted-foreground">
            © 2026 Goldagro Global Export. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
