import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { asset } from '@/lib/asset';
import { BRIDAL, waLink } from '@/lib/data';

/* eslint-disable @next/next/no-img-element */

const BRIDAL_BOOK = "Hi Molly! I'd love to enquire about bridal makeup for my wedding.";

export const metadata: Metadata = {
  title: 'Bridal Makeup in Nairobi — Glam by Molly',
  description:
    'Bridal makeup in Nairobi by Glam by Molly. Soft, timeless, long-wear looks for your wedding day, plus trials and bridal party glam — made to last from the vows to the last dance.',
  keywords: ['bridal makeup Nairobi', 'wedding makeup artist Nairobi', 'bridal trial', 'bridal party makeup', 'Glam by Molly'],
  openGraph: {
    title: 'Bridal Makeup in Nairobi — Glam by Molly',
    description: 'Soft, timeless, long-wear bridal makeup for your wedding day. Trials, bridal party glam, on-location in Nairobi.',
    type: 'website',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: BRIDAL.faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function BridalPage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="grid min-h-[88vh] grid-cols-1 md:grid-cols-2">
        <div className="hero-copy flex flex-col justify-center bg-sand px-6 py-28 sm:px-12 lg:px-16">
          <span className="font-script text-3xl text-taupe-deep">The bridal experience</span>
          <h1 className="mt-2 font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl">
            Bridal makeup,<br />made for your morning
          </h1>
          <div className="my-6 h-px w-24 bg-ink/30" />
          <p className="max-w-md text-[0.98rem] leading-relaxed text-muted">
            Soft, timeless and long-wear — bridal looks built on prepped, glowing skin and dialed in at your
            trial, so you photograph beautifully and stay flawless from the vows to the last dance. On-location
            across Nairobi.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink(BRIDAL_BOOK)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-7 py-3 text-[0.8rem] uppercase tracking-[0.16em] text-cream transition-transform hover:scale-[1.03]"
            >
              Enquire on WhatsApp
            </a>
            <a
              href="#bridal-looks"
              className="rounded-full border border-ink/25 px-7 py-3 text-[0.8rem] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              See bridal looks
            </a>
          </div>
        </div>
        <div className="relative min-h-[52vh] overflow-hidden md:min-h-[88vh]">
          <img src={asset('/looks/look-05.jpg')} alt="Bridal makeup look by Glam by Molly" className="hero-img absolute inset-0 h-full w-full object-cover object-center" />
        </div>
      </section>

      {/* PACKAGES */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <p className="reveal text-sm uppercase tracking-[0.25em] text-taupe-deep">What&apos;s included</p>
        <h2 className="reveal mt-2 font-serif text-4xl font-medium sm:text-5xl">Bridal packages</h2>
        <div className="stagger mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {BRIDAL.packages.map((p) => (
            <div key={p.name} className="stagger-item flex flex-col rounded-2xl border border-taupe/40 bg-cream p-7">
              <h3 className="font-serif text-2xl">{p.name}</h3>
              <span className="mt-1 font-serif text-2xl text-taupe-deep">{p.price}</span>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="reveal mt-5 text-xs uppercase tracking-[0.14em] text-muted">Bridal party charged per face · travel beyond Nairobi quoted per location</p>
      </section>

      {/* PROCESS */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <p className="reveal text-sm uppercase tracking-[0.25em] text-taupe-deep">From first message to last dance</p>
          <h2 className="reveal mt-2 font-serif text-4xl font-medium sm:text-5xl">How it works</h2>
          <div className="stagger mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {BRIDAL.steps.map((s, i) => (
              <div key={s.title} className="stagger-item">
                <span className="font-serif text-3xl text-taupe-deep">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRIDAL LOOKS */}
      <section id="bridal-looks" className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="reveal text-sm uppercase tracking-[0.25em] text-taupe-deep">Recent brides</p>
            <h2 className="reveal mt-2 font-serif text-4xl font-medium sm:text-5xl">Bridal looks</h2>
          </div>
          <Link href="/portfolio" className="reveal text-sm uppercase tracking-[0.16em] text-ink underline decoration-taupe-deep underline-offset-4 hover:decoration-ink">
            View full portfolio →
          </Link>
        </div>
        <div className="mt-10">
          <Gallery looks={BRIDAL.looks} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <h2 className="reveal font-serif text-4xl font-medium sm:text-5xl">Bridal FAQ</h2>
          <dl className="stagger mt-10 divide-y divide-taupe/40">
            {BRIDAL.faqs.map((f) => (
              <div key={f.q} className="stagger-item py-6">
                <dt className="font-serif text-xl">{f.q}</dt>
                <dd className="mt-2 text-[0.98rem] leading-relaxed text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* INQUIRY */}
      <section id="bridal-contact" className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <span className="font-script text-3xl text-taupe-deep">Let&apos;s talk dates</span>
            <h2 className="mt-1 font-serif text-4xl font-medium sm:text-5xl">Enquire about your day</h2>
            <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted">
              Share a few details and I&apos;ll come straight back on WhatsApp to confirm availability, talk
              through your look, and book your trial. Dates go fast — the earlier the better.
            </p>
          </div>
          <ContactForm bridal />
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
