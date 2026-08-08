import Nav from '@/components/Nav';
import ScrollAnimations from '@/components/ScrollAnimations';
import { asset } from '@/lib/asset';
import { SERVICES, RATES, WHY, LOOKS, CONTACT, waLink, BOOK_MESSAGE } from '@/lib/data';

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
    <main id="top" className="font-sans">
      <Nav />
      <ScrollAnimations />

      {/* HERO */}
      <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <div className="hero-copy flex flex-col justify-center bg-sand px-6 py-24 sm:px-12 lg:px-16">
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
        <div className="relative min-h-[60vh] md:min-h-screen">
          <img src={asset('/hero.jpg')} alt="Glam by Molly makeup look" className="hero-img absolute inset-0 h-full w-full object-cover object-top" />
        </div>
      </section>

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
            <img src={asset('/about.jpg')} alt="Molly, makeup artist" className="h-[30rem] w-full object-cover object-center" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-sand py-24">
        <div className="mx-auto flex max-w-6xl gap-10 px-6 sm:px-10">
          <VLabel>Services</VLabel>
          <div className="flex-1">
            <h2 className="reveal font-serif text-4xl font-medium sm:text-5xl">Services</h2>
            <p className="reveal mt-3 text-sm uppercase tracking-[0.2em] text-muted">What I create</p>
            <div className="stagger mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <div key={s.name} className="stagger-item group overflow-hidden rounded-2xl bg-cream shadow-sm">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={asset(s.img)}
                      alt={s.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-2xl">{s.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORK / PORTFOLIO */}
      <section id="work" className="mx-auto flex max-w-6xl gap-10 px-6 py-24 sm:px-10">
        <VLabel>Portfolio</VLabel>
        <div className="flex-1">
          <h2 className="reveal font-serif text-4xl font-medium sm:text-5xl">The Work</h2>
          <p className="reveal mt-3 text-sm uppercase tracking-[0.2em] text-muted">A few recent looks</p>
          <div className="stagger mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {LOOKS.map((src, i) => (
              <div key={src} className="stagger-item overflow-hidden rounded-xl break-inside-avoid">
                <img
                  src={asset(src)}
                  alt={`Makeup look ${i + 1}`}
                  loading="lazy"
                  className="w-full transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
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
        <div className="reveal mx-auto max-w-3xl px-6 text-center sm:px-10">
          <span className="font-script text-3xl text-taupe-deep">Let&apos;s create</span>
          <h2 className="mt-1 font-serif text-4xl font-medium sm:text-5xl">Book your glam</h2>
          <p className="mx-auto mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted">
            Weddings, shoots, events or just because — let&apos;s make you feel your most beautiful.
          </p>
          <a
            href={waLink(BOOK_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-ink px-8 py-3.5 text-[0.82rem] uppercase tracking-[0.16em] text-cream transition-transform hover:scale-[1.03]"
          >
            Message on WhatsApp
          </a>
          <div className="mt-10 flex flex-col items-center gap-2 text-sm text-muted">
            <a href={`tel:${CONTACT.waNumber}`} className="hover:text-ink">📞 {CONTACT.phone}</a>
            <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink">📸 @{CONTACT.instagram}</a>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-ink">✉️ {CONTACT.email}</a>
            <span>📍 {CONTACT.location}</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-taupe/40 bg-cream py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <span className="font-serif text-sm uppercase tracking-[0.22em] text-muted">Glam by Molly</span>
          <span className="text-xs text-muted">© {new Date().getFullYear()} Glam by Molly · Nairobi</span>
        </div>
      </footer>
    </main>
  );
}
