import { asset } from '@/lib/asset';

// Butterfly-muse mark (bronze line-art) + "Glam by Molly" wordmark.
// The mark is the shared brand motif (sister to House of Molly); `height` in px
// controls the mark, the wordmark scales with the surrounding type. See LogoCraft
// config scripts/logos/glam-butterfly.json for the full lockup.
export default function Logo({ height = 34, wordmark = true }: { height?: number; wordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset('/glam-mark.svg')} alt="" style={{ height }} className="block" />
      {wordmark && (
        <span className="leading-none">
          <span className="block font-serif text-ink tracking-[0.22em] text-[0.82rem] uppercase">Glam by Molly</span>
        </span>
      )}
      <span className="sr-only">Glam by Molly</span>
    </span>
  );
}
