import type { NextConfig } from 'next';

// Static export for GitHub Pages. Project page lives at
// https://<user>.github.io/glam-by-molly/, so we prefix assets with the repo name
// in production. If you later use a custom domain or a <user>.github.io repo,
// set NEXT_PUBLIC_BASE_PATH="" (empty) and the prefix disappears.
const repo = 'glam-by-molly';
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === 'production' ? `/${repo}` : '');

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true }, // required for static export (no image server)
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
