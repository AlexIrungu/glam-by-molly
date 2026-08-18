'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { waLink, BOOK_MESSAGE } from '@/lib/data';

// Section anchors scroll on the home page (Motion intercepts bare #hash links);
// from another route they carry you home first (/#id). Bridal + Portfolio are
// real routes.
type Item = { label: string; hash?: string; route?: string };
const ITEMS: Item[] = [
  { label: 'About', hash: 'about' },
  { label: 'Services', hash: 'services' },
  { label: 'Bridal', route: '/bridal' },
  { label: 'Portfolio', route: '/portfolio' },
  { label: 'Rates', hash: 'rates' },
  { label: 'Contact', hash: 'contact' },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = (pathname?.replace(/\/$/, '') || '/') === '';

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = 'text-[0.8rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink';

  const renderItem = (it: Item, onClick?: () => void, cls = linkClass) => {
    if (it.route) return <Link key={it.label} href={it.route} onClick={onClick} className={cls}>{it.label}</Link>;
    // On home, a bare #hash lets Motion smooth-scroll; elsewhere go home then jump.
    return onHome ? (
      <a key={it.label} href={`#${it.hash}`} onClick={onClick} className={cls}>{it.label}</a>
    ) : (
      <Link key={it.label} href={`/#${it.hash}`} onClick={onClick} className={cls}>{it.label}</Link>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-cream/90 backdrop-blur border-b border-taupe/40' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        {onHome ? (
          <a href="#top" aria-label="Glam by Molly home"><Logo height={30} /></a>
        ) : (
          <Link href="/" aria-label="Glam by Molly home"><Logo height={30} /></Link>
        )}

        <div className="hidden items-center gap-7 md:flex">
          {ITEMS.map((it) => renderItem(it))}
          <a
            href={waLink(BOOK_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-2 text-[0.78rem] uppercase tracking-[0.16em] text-cream transition-transform hover:scale-[1.03]"
          >
            Book on WhatsApp
          </a>
        </div>

        <button aria-label="Menu" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-taupe/40 bg-cream px-5 pb-5 pt-2 md:hidden">
          {ITEMS.map((it) =>
            renderItem(it, () => setOpen(false), 'block py-2.5 text-sm uppercase tracking-[0.18em] text-muted'),
          )}
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
