'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Subtle, editorial motion: hero entrance on load, reveal-on-scroll for section
// blocks, and staggered reveals for grids/galleries. Honors reduced-motion.
export default function ScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero — stagger the left-panel copy up, ease the photo in.
      gsap.from('.hero-copy > *', {
        y: 26, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.09, delay: 0.1,
      });
      gsap.from('.hero-img', { scale: 1.08, opacity: 0, duration: 1.3, ease: 'power2.out' });

      // Reveal-on-scroll for tagged blocks.
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 32, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // Staggered groups (grids / gallery) — animate their .stagger-item children.
      gsap.utils.toArray<HTMLElement>('.stagger').forEach((group) => {
        const items = group.querySelectorAll('.stagger-item');
        gsap.from(items, {
          y: 34, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 80%', once: true },
        });
      });
    });

    // Images shift layout as they load — recompute trigger positions.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      window.removeEventListener('load', onLoad);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return null;
}
