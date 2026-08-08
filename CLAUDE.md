# Glam by Molly — Claude Code Context

## What this is
One-page portfolio for **Glam by Molly** — Molly's professional makeup brand (Nairobi). **Separate brand** from the *House of Molly* clothing line (same client, different business). Live on GitHub Pages.

- **Live:** https://alexirungu.github.io/glam-by-molly/
- **Repo:** `AlexIrungu/glam-by-molly` (public — required for free GitHub Pages)
- **Stack:** Next.js 16 (App Router, TypeScript) + Tailwind v4 + GSAP. **Static-exported** (`output: 'export'`) for Pages.

## Key constraints (read before editing)
- **Static export only.** No server components with runtime data, no API routes, no `next/image` optimizer. `images.unoptimized = true`. Any new asset path must go through `lib/asset.ts` (`asset('/x.jpg')`) so it resolves under the Pages `basePath`.
- **basePath = `/glam-by-molly`** in production (the repo name), set in `next.config.ts`. If the repo is renamed or a custom domain is added, update `repo`/set `NEXT_PUBLIC_BASE_PATH=""`.
- **Booking = WhatsApp**, no backend. CTAs use `waLink()` → `wa.me/254796119979`. Don't add a server form unless we move off Pages.
- **GSAP is client-only.** Animations live in `components/ScrollAnimations.tsx` (`'use client'`), triggered by classes: `.hero-copy`/`.hero-img` (load), `.reveal` (scroll), `.stagger` + `.stagger-item` (staggered groups). Honors `prefers-reduced-motion`. Add a class, don't hand-write per-element tweens.

## Structure
- `app/page.tsx` — all sections (Hero, About, Services, Portfolio, Rates, Why, Contact, Footer).
- `app/layout.tsx` — metadata + `next/font` (Montserrat / Cormorant / Sacramento).
- `components/` — `Nav.tsx`, `Logo.tsx` (two-tone GM monogram), `ScrollAnimations.tsx`.
- `lib/data.ts` — copy, services, rates, why, contact (single source of truth).
- `lib/asset.ts` — base-path-aware asset helper.
- `public/` — `hero.jpg`, `about.jpg`, `looks/look-01..18.jpg`, `glam-g.svg`/`glam-m.svg` (logo), `logo-original.png` (her original). Raw PDF dump `public/gallery/` is **git-ignored**.

## Deploy
Push to `main` → `.github/workflows/deploy.yml` builds static export → GitHub Pages. **Every push auto-deploys.** See `LESSONS.md` for the first-time Pages setup gotchas (they cost us time — don't repeat).

## Workflow
- **Alex runs installs/builds** normally — but he delegated git + build in THIS repo during setup. Confirm before running installs elsewhere.
- Content/photos are placeholder-grade (extracted from her portfolio PDF). Swap for hi-res when Molly sends them.
- Brand: taupe/black/cream editorial. Palette tokens in `app/globals.css` (`--color-*`).
