import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import { LOOKS, waLink, BOOK_MESSAGE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Portfolio — Glam by Molly | Makeup Artist in Nairobi',
  description:
    'The full portfolio of Glam by Molly — soft glam, full glam and bridal makeup looks created in Nairobi, built to photograph beautifully and last all day.',
  openGraph: {
    title: 'Portfolio — Glam by Molly',
    description: 'Soft glam, full glam and bridal looks from Nairobi.',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-32 sm:px-10">
        <p className="reveal text-sm uppercase tracking-[0.25em] text-taupe-deep">The full gallery</p>
        <h1 className="reveal mt-2 font-serif text-5xl font-medium sm:text-6xl">Portfolio</h1>
        <p className="reveal mt-4 max-w-xl text-[0.98rem] leading-relaxed text-muted">
          Every look tells a story — soft glam, full glam and bridal, all built to photograph beautifully
          and last all day and night. Tap any look to view it up close.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <Gallery looks={LOOKS} />
      </section>

      <section className="bg-sand py-20">
        <div className="reveal mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">Love a look? Let&apos;s recreate it.</h2>
          <a
            href={waLink(BOOK_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-ink px-8 py-3.5 text-[0.82rem] uppercase tracking-[0.16em] text-cream transition-transform hover:scale-[1.03]"
          >
            Book on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
