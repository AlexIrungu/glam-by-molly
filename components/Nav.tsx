'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import { waLink, BOOK_MESSAGE } from '@/lib/data';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#rates', label: 'Rates' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-cream/90 backdrop-blur border-b border-taupe/40' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" aria-label="Glam by Molly home">
          <Logo height={30} />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.8rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
          <a
            href={waLink(BOOK_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-2 text-[0.78rem] uppercase tracking-[0.16em] text-cream transition-transform hover:scale-[1.03]"
          >
            Book on WhatsApp
          </a>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-taupe/40 bg-cream px-5 pb-5 pt-2 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm uppercase tracking-[0.18em] text-muted"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink(BOOK_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded-full bg-ink px-5 py-2.5 text-[0.78rem] uppercase tracking-[0.16em] text-cream"
          >
            Book on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
