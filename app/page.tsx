import Link from 'next/link';
import PageShell from '@/components/PageShell';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import RangeCarousel from '@/components/RangeCarousel';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { asset } from '@/lib/asset';
import { RATES, WHY, LOOKS, CONTACT, waLink, BOOK_MESSAGE } from '@/lib/data';

/* eslint-disable @next/next/no-img-element */

function VLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="vlabel hidden shrink-0 text-[2.4rem] font-bold uppercase text-ink/90 lg:block">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <PageShell>
      {/* HERO — cinematic rotating looks */}
      <Hero />

      {/* ABOUT */}
      <section id="about" className="mx-auto flex max-w-6xl items-center gap-10 px-6 py-24 sm:px-10">
        <VLabel>About</VLabel>
        <div className="grid flex-1 grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="reveal order-2 md:order-1">
            <h2 className="font-serif text-4xl font-medium sm:text-5xl">Enhancing your natural beauty</h2>
            <div className="my-5 h-px w-16 bg-taupe-deep" />
            <p className="text-[0.98rem] leading-relaxed text-muted">
              Glam by Molly is a professional makeup brand dedicated to enhancing natural beauty while
              delivering flawless, long-lasting glam. I specialize in soft glam, bridal makeup and
              special-occasion looks tailored to each client&apos;s unique features and preferences.
            </p>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">
              With a keen eye for detail and a passion for beauty, I create looks that photograph
              beautifully and last throughout the day and night.
            </p>
          </div>
          <div className="reveal order-1 overflow-hidden rounded-2xl md:order-2">
            <img data-speed="1.06" src={asset('/about.jpg')} alt="Molly, makeup artist" className="h-[30rem] w-full scale-105 object-cover object-center" />
          </div>
        </div>
      </section>

      {/* THE RANGE — draggable carousel */}
      <RangeCarousel />

      {/* THE PROMISE — editorial split with overlapping parallax images */}
      <section className="relative overflow-hidden py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 sm:px-10 md:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img
                data-speed="0.94"
                src={asset('/looks/look-05.jpg')}
                alt="Bridal makeup by Glam by Molly"
                className="h-[30rem] w-full scale-110 object-cover sm:h-[36rem]"
              />
            </div>
            <div className="absolute -bottom-8 left-4 w-2/5 overflow-hidden rounded-xl border-[6px] border-cream shadow-xl sm:-left-8">
              <img
                data-speed="1.1"
                src={asset('/looks/look-09.jpg')}
                alt=""
                className="h-40 w-full scale-110 object-cover sm:h-56"
              />
            </div>
          </div>

          <div>
            <p className="reveal font-script text-3xl text-taupe-deep">The promise</p>
            <h2 className="reveal-lines mt-2 font-serif text-4xl font-medium leading-[1.05] sm:text-5xl">
              <span className="line block overflow-hidden"><span className="block">Looks that last —</span></span>
              <span className="line block overflow-hidden"><span className="block">from vows to</span></span>
              <span className="line block overflow-hidden"><span className="block">the last dance.</span></span>
            </h2>
            <p className="reveal mt-6 max-w-md text-[0.98rem] leading-relaxed text-muted">
              Every look is built on prepped, glowing skin and long-wear products chosen for Nairobi
              heat and all-night celebrations — so you photograph beautifully and still look flawless
              when the music stops.
            </p>
            <Link href="/bridal" className="reveal group mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-ink">
              <span className="border-b border-ink/40 pb-1 transition-colors group-hover:border-ink">Explore bridal</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WORK / PORTFOLIO (curated) */}
      <section id="work" className="mx-auto flex max-w-6xl gap-10 px-6 py-24 sm:px-10">
        <VLabel>Portfolio</VLabel>
        <div className="flex-1">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="reveal font-serif text-4xl font-medium sm:text-5xl">The Work</h2>
              <p className="reveal mt-3 text-sm uppercase tracking-[0.2em] text-muted">A few recent looks</p>
            </div>
            <Link href="/portfolio" className="reveal text-sm uppercase tracking-[0.16em] text-ink underline decoration-taupe-deep underline-offset-4 hover:decoration-ink">
              View full portfolio →
            </Link>
          </div>
          <Gallery looks={LOOKS.slice(0, 9)} />
        </div>
      </section>

      {/* RATES */}
      <section id="rates" className="bg-ink py-24 text-cream">
        <div className="mx-auto flex max-w-4xl gap-10 px-6 sm:px-10">
          <span className="vlabel hidden shrink-0 text-[2.4rem] font-bold uppercase text-cream/90 lg:block">Rate&nbsp;Card</span>
          <div className="flex-1">
            <h2 className="reveal font-serif text-4xl font-medium sm:text-5xl">Rate Card</h2>
            <p className="reveal mt-3 text-sm uppercase tracking-[0.2em] text-cream/60">Transparent pricing</p>
            <ul className="stagger mt-10 divide-y divide-cream/15">
              {RATES.map((r) => (
                <li key={r.name} className="stagger-item flex items-center justify-between py-4">
                  <span className="text-lg">{r.name}</span>
                  <span className="font-serif text-2xl text-taupe">{r.price}</span>
                </li>
              ))}
            </ul>
            <a
              href={waLink(`Hi Molly! I'd like to book — could you share your availability?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-full bg-cream px-7 py-3 text-[0.8rem] uppercase tracking-[0.16em] text-ink transition-transform hover:scale-[1.03]"
            >
              Book your slot
            </a>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto flex max-w-6xl gap-10 px-6 py-24 sm:px-10">
        <VLabel>Why&nbsp;Me</VLabel>
        <div className="flex-1">
          <h2 className="reveal font-serif text-4xl font-medium sm:text-5xl">Why book with me</h2>
          <div className="stagger mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <div key={w.title} className="stagger-item flex gap-4">
                <span className="font-serif text-3xl text-taupe-deep">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-lg font-semibold">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-sand py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="reveal text-center">
            <span className="font-script text-3xl text-taupe-deep">Let&apos;s create</span>
            <h2 className="mt-1 font-serif text-4xl font-medium sm:text-5xl">Book your glam</h2>
            <p className="mx-auto mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted">
              Weddings, shoots, events or just because — share your details and I&apos;ll confirm on WhatsApp.
            </p>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <ContactForm />
            <div className="flex flex-col justify-center gap-5">
              <p className="font-serif text-2xl">Or reach me directly</p>
              <div className="flex flex-col gap-2.5 text-sm text-muted">
                <a href={`tel:${CONTACT.waNumber}`} className="hover:text-ink">📞 {CONTACT.phone}</a>
                <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">📸 @{CONTACT.instagram}</a>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-ink">✉️ {CONTACT.email}</a>
                <span>📍 {CONTACT.location}</span>
              </div>
              <a
                href={waLink(BOOK_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block w-fit rounded-full bg-ink px-7 py-3 text-[0.8rem] uppercase tracking-[0.16em] text-cream transition-transform hover:scale-[1.03]"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
