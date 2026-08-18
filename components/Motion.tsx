'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Single source of truth for page motion so init order is deterministic:
//   1. ScrollSmoother (buttery weighted scroll + data-speed parallax)
//   2. hero entrance, reveal-on-scroll, staggered grids, line-masked headings
// Requires #smooth-wrapper > #smooth-content in the DOM. Fully disabled under
// prefers-reduced-motion (content renders in its natural, visible state).
export default function Motion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    let smoother: ScrollSmoother | undefined;
    const ctx = gsap.context(() => {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.15,
        effects: true, // enables data-speed / data-lag parallax attributes
      });

      // Hero — copy rises, photo eases in.
      gsap.from('.hero-copy > *', {
        y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, delay: 0.15,
      });
      const heroImg = gsap.utils.toArray<HTMLElement>('.hero-img');
      if (heroImg.length) gsap.from(heroImg, { scale: 1.1, opacity: 0, duration: 1.4, ease: 'power2.out' });

      // Reveal-on-scroll blocks.
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 34, opacity: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // Staggered groups (grids / gallery).
      gsap.utils.toArray<HTMLElement>('.stagger').forEach((group) => {
        const items = group.querySelectorAll('.stagger-item');
        gsap.from(items, {
          y: 36, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 80%', once: true },
        });
      });

      // Line-masked headings: .reveal-lines with .line > * children slide up
      // out of their overflow-hidden mask.
      gsap.utils.toArray<HTMLElement>('.reveal-lines').forEach((el) => {
        const lines = el.querySelectorAll('.line > *');
        gsap.from(lines, {
          yPercent: 120, duration: 1, ease: 'power4.out', stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
      });
    });

    // In-page anchor links must go through ScrollSmoother (native #hash jumps
    // break against the transformed content). Offset for the fixed nav.
    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || !smoother) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id) as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      const y = Math.max(0, smoother.offset(target, 'top top') - 72);
      smoother.scrollTo(y, true);
    };
    document.addEventListener('click', onAnchorClick);

    // Arriving with a hash (e.g. navigating "/#about" from another route):
    // jump to that section once the smoother exists.
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el && smoother) {
        requestAnimationFrame(() => {
          const y = Math.max(0, smoother!.offset(el as HTMLElement, 'top top') - 72);
          smoother!.scrollTo(y, false);
        });
      }
    }

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener('click', onAnchorClick);
      ctx.revert();
      smoother?.kill();
    };
  }, []);

  return null;
}
