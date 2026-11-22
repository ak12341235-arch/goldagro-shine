# Goldagro Shine

https://github.com/ShaikhAhmed39/goldagro-shine

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploying (GitHub → Netlify)

Netlify is connected to this repository, so every push to `main` builds and deploys automatically
(`bun run build`, see `netlify.toml`). Never commit `.env` files or secrets.

1. Copy these files over your local clone, then `bun install`, `bun run test`, `bun run build`.
2. `git add -A && git commit -m "Security, legal pages, SEO" && git push`
3. Follow the verification list in `SECURITY_AUDIT.md` (section 5).

## Site address and SEO

The canonical domain defaults to `https://goldagroglobalexport.com`. To change it set `VITE_SITE_URL`
in Netlify (no trailing slash) **and** update `DEFAULT_SITE_URL` in `src/lib/site-data.ts` and
`DEFAULT_SITE` in `scripts/generate-seo-files.mjs`. It drives canonical links, Open Graph URLs,
JSON-LD, `sitemap.xml` and the `Sitemap:` line in `robots.txt`.

## Legal pages

Terms, Privacy, Shipping & Claims, Disclaimer and Legal Notice live in `src/components/legal/`.
Business facts come from `src/lib/site-data.ts`; anything missing is a blank line you fill in
`src/lib/legal-data.ts` (`FILL_IN`). Run `bun run check:legal` to list the blanks still open.
See `COMPLIANCE_CHECKLIST.md` and `SECURITY_AUDIT.md`.
