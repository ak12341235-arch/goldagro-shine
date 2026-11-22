// Runs before `build`. Writes public/sitemap.xml and keeps the Sitemap line in public/robots.txt in
// sync. The site address defaults to the production domain and can be overridden with VITE_SITE_URL
// (no trailing slash). Keep DEFAULT_SITE identical to DEFAULT_SITE_URL in src/lib/site-data.ts.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const DEFAULT_SITE = "https://goldagroglobalexport.com";
const site = ((process.env.VITE_SITE_URL ?? "").trim() || DEFAULT_SITE).replace(/\/+$/, "");

// lastmod = date of the latest commit (what actually changed), not "today" on every build.
// Falls back to the date of the last legal-page revision if git history is unavailable.
const FALLBACK_LASTMOD = "2026-11-21";
let lastmod = FALLBACK_LASTMOD;
try {
  const d = execSync("git log -1 --format=%cs", { stdio: ["ignore", "pipe", "ignore"] })
    .toString()
    .trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) lastmod = d;
} catch {
  /* not a git checkout: keep the fallback */
}

const pages = [
  "/",
  "/jewellery",
  "/legal-notice",
  "/terms",
  "/privacy-policy",
  "/shipping-and-claims",
  "/disclaimer",
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${site}${p === "/" ? "/" : p}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync("public/sitemap.xml", xml);

const robotsPath = "public/robots.txt";
const robots = readFileSync(robotsPath, "utf8").replace(/^Sitemap:.*\n?/gm, "").trimEnd();
writeFileSync(robotsPath, `${robots}\n\nSitemap: ${site}/sitemap.xml\n`);
console.log(`[seo] wrote sitemap.xml (${pages.length} URLs, lastmod ${lastmod}) for ${site}`);
