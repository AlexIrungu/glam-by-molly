#!/usr/bin/env node
/**
 * Ingest Molly's hi-res photos into web-ready gallery images.
 *
 *   node scripts/ingest-photos.mjs <source-dir> [flags]
 *
 * Flags:
 *   --append          keep existing looks, add the new ones after them
 *                     (default: replace public/looks/ entirely with this batch)
 *   --max <px>        longest-edge cap (default 1600) — portraits stay crisp,
 *                     originals get downscaled so the static-export page stays light
 *   --quality <n>     mozjpeg quality 1-100 (default 80)
 *   --dry-run         report what would happen, write nothing
 *
 * Sharp is already a Next dependency. Auto-rotates via EXIF, strips metadata,
 * writes sequential look-01.jpg… into public/looks/, then rewrites the LOOKS
 * count in lib/data.ts so the gallery matches. Re-run any time a new batch lands.
 */
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, extname } from 'node:path';
import { readdirSync, statSync, rmSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LOOKS_DIR = join(ROOT, 'public', 'looks');
const DATA_FILE = join(ROOT, 'lib', 'data.ts');
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif']);

function parseArgs(argv) {
  const a = { source: null, append: false, max: 1600, quality: 80, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === '--append') a.append = true;
    else if (t === '--dry-run') a.dryRun = true;
    else if (t === '--max') a.max = parseInt(argv[++i], 10);
    else if (t === '--quality') a.quality = parseInt(argv[++i], 10);
    else if (!t.startsWith('--') && !a.source) a.source = t;
  }
  return a;
}

const args = parseArgs(process.argv.slice(2));
if (!args.source) {
  console.error('Usage: node scripts/ingest-photos.mjs <source-dir> [--append] [--max 1600] [--quality 80] [--dry-run]');
  process.exit(1);
}
const SRC = resolve(args.source);
if (!existsSync(SRC) || !statSync(SRC).isDirectory()) {
  console.error(`Source is not a directory: ${SRC}`);
  process.exit(1);
}

const sources = readdirSync(SRC)
  .filter((f) => EXTS.has(extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((f) => join(SRC, f));

if (sources.length === 0) {
  console.error(`No images found in ${SRC}`);
  process.exit(1);
}

const existing = existsSync(LOOKS_DIR)
  ? readdirSync(LOOKS_DIR).filter((f) => /^look-\d+\.jpg$/.test(f)).sort()
  : [];
const startIndex = args.append ? existing.length + 1 : 1;
const total = args.append ? existing.length + sources.length : sources.length;

console.log(`Source:   ${SRC}  (${sources.length} images)`);
console.log(`Mode:     ${args.append ? `append after ${existing.length} existing` : `replace (${existing.length} existing)`}`);
console.log(`Output:   public/looks/look-${String(startIndex).padStart(2, '0')}.jpg … look-${String(total).padStart(2, '0')}.jpg`);
console.log(`Resize:   max ${args.max}px long edge, mozjpeg q${args.quality}\n`);

if (args.dryRun) {
  sources.forEach((s, i) => console.log(`  ${s}  ->  look-${String(startIndex + i).padStart(2, '0')}.jpg`));
  console.log('\n[dry-run] nothing written.');
  process.exit(0);
}

if (!args.append && existsSync(LOOKS_DIR)) rmSync(LOOKS_DIR, { recursive: true, force: true });
mkdirSync(LOOKS_DIR, { recursive: true });

let n = startIndex;
for (const src of sources) {
  const out = join(LOOKS_DIR, `look-${String(n).padStart(2, '0')}.jpg`);
  const meta = await sharp(src)
    .rotate()
    .resize(args.max, args.max, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: args.quality, mozjpeg: true })
    .toFile(out);
  console.log(`  ✓ look-${String(n).padStart(2, '0')}.jpg  ${meta.width}×${meta.height}  ${(meta.size / 1024).toFixed(0)} KB`);
  n++;
}

// Keep lib/data.ts LOOKS count in sync so the gallery renders every file.
let data = readFileSync(DATA_FILE, 'utf8');
const updated = data.replace(/(LOOKS[\s\S]{0,160}?length:\s*)(\d+)/, `$1${total}`);
if (updated !== data) {
  writeFileSync(DATA_FILE, updated);
  console.log(`\n✓ lib/data.ts LOOKS length → ${total}`);
} else {
  console.log(`\n⚠ Could not auto-update LOOKS length in lib/data.ts — set { length: ${total} } manually.`);
}
console.log('Done.');
