# Glam by Molly

One-page portfolio for **Glam by Molly** — professional makeup artist, Nairobi.
Next.js 16 (App Router, TypeScript) + Tailwind v4 + **GSAP** scroll animations,
**static-exported for GitHub Pages**. Booking is a WhatsApp CTA (no backend).

🔗 **Live:** https://alexirungu.github.io/glam-by-molly/
📓 First-time Pages setup gotchas are in **[LESSONS.md](./LESSONS.md)** — read before touching deploy.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → ./out
```

## Content
- Copy/services/rates/contact: `lib/data.ts`
- Photos: `public/hero.jpg`, `public/about.jpg`, `public/looks/look-01..18.jpg` (extracted from her portfolio PDF — swap for hi-res when Molly sends them).
- Logo: two-tone GM monogram — `public/glam-g.svg` (taupe) + `public/glam-m.svg` (ink), composed in `components/Logo.tsx`. Elevated from Libre Bodoni in LogoCraft; her original is `public/logo-original.png`.

## Deploy — GitHub Pages
Pushing to `main` triggers `.github/workflows/deploy.yml` (build → static export → Pages).

**First-time setup (you run git):**
```bash
cd ~/Documents/projects/glam-by-molly
git init && git add -A && git commit -m "Glam by Molly portfolio"
git branch -M main
gh repo create AlexIrungu/glam-by-molly --public --source=. --remote=origin --push
```
Then in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions** (once).
Live at **https://alexirungu.github.io/glam-by-molly/** after the Action runs.

### Notes
- `next.config.ts` sets `basePath = /glam-by-molly` in production (the repo name). **If you rename the repo**, update `repo` there. **Custom domain / `<user>.github.io` repo?** set `NEXT_PUBLIC_BASE_PATH=""`.
- Static export ⇒ `images.unoptimized = true` and all asset paths go through `lib/asset.ts` so they resolve under the base path.
