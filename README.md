# LUMENDE

Premium editorial photography portfolio for **LUMENDE** — _Photography / Light / Motion_.
Next.js 16 (App Router) · TypeScript · Tailwind v4 · Lenis. Self-hosted fonts (Bodoni Moda + Archivo). All-static output.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Images

Optimized web images live in `public/media/` and are indexed by `src/data/media.json`.
They are generated from the photographer's library with:

```bash
node scripts/build-images.mjs          # incremental
node scripts/build-images.mjs --force  # rebuild all
```

Source folders and the count per section are configured at the top of `scripts/build-images.mjs`.
Edit that mapping and re-run to change which photos appear.

## Content

- `src/data/site.ts` — name, tagline, **email**, **Instagram**, location.
- `src/data/projects.ts` — the Selected Work projects, concepts, descriptions and credits.

## Build

```bash
npm run build   # → all 15 routes prerendered
```

## Deploy to Vercel (lumende.studio)

1. Push this folder to a new GitHub repository.
2. On https://vercel.com → **Add New → Project → Import** the repo. Framework is auto-detected (Next.js); no settings needed.
3. Deploy. Vercel gives a `*.vercel.app` URL.
4. **Domain:** Project → **Settings → Domains → Add** `lumende.studio` (and `www.lumende.studio`). Vercel shows the DNS records to set at your registrar:
   - Apex `lumende.studio` → **A** record `76.76.21.21`, or an **ALIAS/ANAME** to `cname.vercel-dns.com`.
   - `www` → **CNAME** `cname.vercel-dns.com`.
5. Wait for DNS to propagate; Vercel issues HTTPS automatically.

No environment variables are required.
