// Runs before `build`. Writes public/sitemap.xml and adds a Sitemap line to public/robots.txt,
// but only when VITE_SITE_URL is set, so we never publish a sitemap that points at a wrong domain.
import { readFileSync, writeFileSync } from "node:fs";

const site = (process.env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, "");
if (!site) {
  console.warn(
    "[seo] VITE_SITE_URL is not set — skipping sitemap.xml, canonical and og:url. " +
      "Set it in Netlify (Site settings → Environment variables), e.g. https://www.yourdomain.com",
  );
  process.exit(0);
}
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${site}/`, priority: "1.0" },
  { loc: `${site}/jewellery`, priority: "0.9" },
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
writeFileSync("public/sitemap.xml", xml);

const robotsPath = "public/robots.txt";
let robots = readFileSync(robotsPath, "utf8")
  .replace(/^Sitemap:.*\n?/gm, "")
  .trimEnd();
robots += `\n\nSitemap: ${site}/sitemap.xml\n`;
writeFileSync(robotsPath, robots);
console.log(`[seo] wrote sitemap.xml and robots.txt for ${site}`);
