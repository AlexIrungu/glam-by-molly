'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { asset } from '@/lib/asset';

// Portfolio masonry + lightbox. Grid keeps the GSAP `.stagger`/`.stagger-item`
// hooks so Motion still drives the reveal. Lightbox is portaled to <body> (to
// escape the ScrollSmoother transform) and is keyboard-
// navigable (Esc / ← / →), locks body scroll, and closes on backdrop click.
export default function Gallery({ looks }: { looks: string[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i + looks.length - 1) % looks.length)),
    [looks.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % looks.length)),
    [looks.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className="stagger mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {looks.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open makeup look ${i + 1}`}
            className="stagger-item group block w-full cursor-zoom-in overflow-hidden rounded-xl break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-taupe focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(src)}
              alt={`Makeup look ${i + 1}`}
              loading="lazy"
              className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Makeup look ${index + 1} of ${looks.length}`}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-10"
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            &times;
          </button>

          {looks.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous look"
              className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full text-3xl text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream sm:left-6"
            >
              &#8249;
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(looks[index])}
            alt={`Makeup look ${index + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          />

          {looks.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next look"
              className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full text-3xl text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream sm:right-6"
            >
              &#8250;
            </button>
          )}

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-cream/60">
            {index + 1} / {looks.length}
          </span>
        </div>,
        document.body,
      )}
    </>
  );
}
