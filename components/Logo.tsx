import { asset } from '@/lib/asset';

// Two-tone GM monogram (taupe G behind, ink M in front) — elevated in LogoCraft
// from Libre Bodoni outlines. `height` in px controls the whole lockup.
export default function Logo({ height = 34, wordmark = true }: { height?: number; wordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <span className="relative inline-flex items-end" style={{ height }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset('/glam-g.svg')} alt="" style={{ height }} className="block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset('/glam-m.svg')} alt="" style={{ height, marginLeft: -height * 0.34 }} className="block" />
      </span>
      {wordmark && (
        <span className="leading-none">
          <span className="block font-serif text-ink tracking-[0.22em] text-[0.82rem] uppercase">Glam by Molly</span>
        </span>
      )}
      <span className="sr-only">Glam by Molly</span>
    </span>
  );
}
