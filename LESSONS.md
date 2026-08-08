# Lessons — Glam by Molly

## Deploying Next.js to GitHub Pages (2026-08-08) — the gotchas that cost us ~30 min
Getting a Next.js static site live on GitHub Pages tripped on **three** things, in order:

1. **Private repo → Pages 404.** GitHub Pages on a **private** repo requires a **paid plan** (Pro/Team). On free, the repo **must be public**. Symptom: everything looks fine but the URL 404s.
2. **The workflow can't enable Pages itself.** `actions/configure-pages@v5` with `enablement: true` failed with:
   `Create Pages site failed. Error: Resource not accessible by integration`.
   The default `GITHUB_TOKEN` **cannot create the Pages site**. **Fix: enable it once manually** — repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**. After that, `configure-pages` *finds* the site and deploys forever. `enablement: true` is then harmless (Get succeeds, no create attempted).
3. **Node 20 deprecation warning** on the runner (Node 24 is now default). Not fatal, but set `actions/setup-node` `node-version: 22` to silence it.

**Correct first-time sequence:** create repo **public** → push (workflow runs, build ✓, `configure-pages` ✗) → **Settings → Pages → Source: GitHub Actions** → **Re-run** the job (or push again) → green + live.

**Debugging without `gh`:** the unauthenticated GitHub API is IP-rate-limited fast, so `curl .../actions/runs` often returns "rate limit exceeded." Fastest signal is the repo's **Actions tab** (which step is red) or reproducing locally with `npm run build` (the build itself was always fine here — the failure was purely the Pages step).

## Static-export specifics that bit / would bite
- **`output: 'export'`** ⇒ `images.unoptimized: true` (no image server) and **all asset URLs must include `basePath`** — hence `lib/asset.ts`. A raw `/hero.jpg` works in dev but 404s on Pages under `/glam-by-molly/`.
- `basePath` is hard-coded to the **repo name** for production. Rename repo / add custom domain ⇒ update it, or assets break.
- `.nojekyll` is required so Pages serves the `_next/` dir (the workflow `touch`es it).

## GSAP + Next static export
- GSAP + ScrollTrigger must run in a **`'use client'`** component (`ScrollAnimations.tsx`) via `useEffect`. Register the plugin inside the effect. Use **class hooks** (`.reveal`, `.stagger`) so server-rendered sections stay clean and JS-optional (progressive enhancement — no JS ⇒ static site still fine).
- Call `ScrollTrigger.refresh()` after images load, or triggers fire at the wrong scroll positions once photos change layout.
- Always gate on `prefers-reduced-motion`.
