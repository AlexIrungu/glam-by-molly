'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { asset } from '@/lib/asset';
import { RANGE } from '@/lib/data';

// "The Range" — a throwable horizontal showcase (SoHo Skin-style). GSAP
// Draggable + inertia for grab/throw/glide/snap, a cursor-following "Drag" hint
// on fine pointers, and a progress bar tracking the throw. Touch drags natively;
// reduced-motion falls back to a plain horizontal scroll track.
export default function RangeCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      // Let it be a native horizontal scroller instead.
      track.style.overflowX = 'auto';
      return;
    }

    gsap.registerPlugin(Draggable, InertiaPlugin);
    const cleanups: (() => void)[] = [];

    const minX = () => Math.min(0, (track.parentElement?.clientWidth ?? 0) - track.scrollWidth);
    const stride = () => {
      const card = track.children[0] as HTMLElement | undefined;
      if (!card) return 1;
      const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
      return card.offsetWidth + gap;
    };

    const setProgress = (x: number) => {
      const min = minX();
      const p = min === 0 ? 0 : gsap.utils.clamp(0, 1, x / min);
      if (progressRef.current) {
        gsap.to(progressRef.current, { scaleX: 0.16 + p * 0.84, duration: 0.3, ease: 'power2.out', overwrite: true });
      }
    };

    const [drag] = Draggable.create(track, {
      type: 'x',
      inertia: true,
      edgeResistance: 0.9,
      bounds: { minX: minX(), maxX: 0 },
      allowNativeTouchScrolling: true,
      onDrag() { setProgress(this.x); },
      onThrowUpdate() { setProgress(this.x); },
      snap: { x: (v: number) => gsap.utils.clamp(minX(), 0, Math.round(v / stride()) * stride()) },
    });
    cleanups.push(() => drag.kill());
    setProgress(0);

    // Cursor-follow "Drag" hint — fine pointers only.
    const fine = window.matchMedia('(pointer: fine)').matches;
    const cursor = cursorRef.current;
    if (fine && cursor) {
      gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
      const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' });
      const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' });
      const onMove = (e: MouseEvent) => {
        const r = section.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      const onEnter = () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
      const onLeave = () => gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
      section.addEventListener('mousemove', onMove);
      section.addEventListener('mouseenter', onEnter);
      section.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        section.removeEventListener('mousemove', onMove);
        section.removeEventListener('mouseenter', onEnter);
        section.removeEventListener('mouseleave', onLeave);
      });
    }

    const onResize = () => { drag.applyBounds({ minX: minX(), maxX: 0 }); };
    window.addEventListener('resize', onResize);
    cleanups.push(() => window.removeEventListener('resize', onResize));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden bg-sand py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="reveal text-sm uppercase tracking-[0.25em] text-taupe-deep">Drag to explore</p>
            <h2 className="reveal mt-2 font-serif text-4xl font-medium sm:text-6xl">The Range</h2>
          </div>
          <p className="reveal hidden max-w-xs text-sm leading-relaxed text-muted sm:block">
            Six ways to feel your most beautiful — from a fresh soft glam to a full bridal transformation.
          </p>
        </div>
      </div>

      <div className="mt-12 overflow-hidden px-6 sm:px-10">
        <div
          ref={trackRef}
          className="flex cursor-grab gap-5 pb-1 will-change-transform active:cursor-grabbing"
        >
          {RANGE.map((r) => (
            <article key={r.name} className="group w-[78vw] shrink-0 select-none sm:w-[23rem]">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(r.img)}
                  alt={r.name}
                  draggable={false}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl">{r.name}</h3>
                <span className="whitespace-nowrap text-sm uppercase tracking-wide text-taupe-deep">{r.price}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{r.blurb}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6 sm:px-10">
        <div className="h-px w-full bg-ink/10">
          <div ref={progressRef} className="h-px w-full origin-left bg-ink/60" style={{ transform: 'scaleX(0.16)' }} />
        </div>
      </div>

      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden h-20 w-20 items-center justify-center rounded-full bg-ink/90 text-cream sm:flex"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Drag</span>
      </div>
    </section>
  );
}
