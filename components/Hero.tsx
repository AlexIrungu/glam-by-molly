'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { asset } from '@/lib/asset';
import { HERO_LOOKS, waLink, BOOK_MESSAGE } from '@/lib/data';

/* eslint-disable @next/next/no-img-element */

// Cinematic hero: full-bleed looks crossfade with a slow Ken Burns drift behind
// a left cream scrim that keeps the copy readable. Reduced-motion shows a single
// still frame. Copy keeps the `.hero-copy` hook so Motion animates it in.
const DUR = 5; // seconds each look holds

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !root.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const imgs = Array.from(root.current.querySelectorAll<HTMLElement>('[data-hero-img]'));
    if (imgs.length === 0) return;

    let id: number | undefined;
    const ctx = gsap.context(() => {
      gsap.set(imgs, { opacity: 0, scale: 1.03 });
      gsap.set(imgs[0], { opacity: 1 });

      if (reduce) {
        gsap.set(imgs[0], { scale: 1 });
        return;
      }

      const zoom = (el: HTMLElement) => gsap.fromTo(el, { scale: 1.03 }, { scale: 1.13, duration: DUR + 2.5, ease: 'none' });
      zoom(imgs[0]);

      let cur = 0;
      id = window.setInterval(() => {
        const next = (cur + 1) % imgs.length;
        gsap.to(imgs[cur], { opacity: 0, duration: 1.3, ease: 'power2.inOut' });
        gsap.set(imgs[next], { scale: 1.03 });
        gsap.to(imgs[next], { opacity: 1, duration: 1.3, ease: 'power2.inOut' });
        zoom(imgs[next]);
        cur = next;
      }, DUR * 1000);
    }, root);

    return () => {
      if (id) window.clearInterval(id);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden bg-sand">
      {/* rotating looks */}
      <div className="absolute inset-0">
        {HERO_LOOKS.map((src) => (
          <img
            key={src}
            data-hero-img
            src={asset(src)}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ))}
      </div>

      {/* cream scrim — readable copy on the left, image breathing on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/85 to-cream/20 md:via-cream/75 md:to-transparent" />
      {/* faint top scrim keeps the nav legible across darker slides */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cream/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-cream/80 via-transparent to-transparent md:hidden" />

      {/* copy */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 sm:px-10">
        <div className="hero-copy max-w-xl">
          <span className="font-script text-3xl text-taupe-deep">Glam by</span>
          <h1 className="mt-1 font-serif text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            GLAM<br />BY MOLLY
          </h1>
          <div className="my-6 h-px w-24 bg-ink/30" />
          <p className="text-sm uppercase tracking-[0.25em] text-muted">Soft Glam · Bridal · Full Glam</p>
          <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted">
            Professional makeup that enhances your natural beauty — flawless, long-lasting looks that
            photograph beautifully and last all day and night. Based in Nairobi.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink(BOOK_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-7 py-3 text-[0.8rem] uppercase tracking-[0.16em] text-cream transition-transform hover:scale-[1.03]"
            >
              Book on WhatsApp
            </a>
            <a
              href="#work"
              className="rounded-full border border-ink/25 px-7 py-3 text-[0.8rem] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              View Work
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.35em] text-muted">
        Scroll
      </span>
    </section>
  );
}
