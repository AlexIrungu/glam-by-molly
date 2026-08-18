'use client';

import { useState } from 'react';
import { CONTACT, SERVICE_OPTIONS } from '@/lib/data';

// Booking / inquiry form. Static-export friendly: with no backend it composes
// the details into a WhatsApp message (Molly's booking channel) and hands off.
// When the domain + a serverless endpoint exist, set NEXT_PUBLIC_CONTACT_ENDPOINT
// and it POSTs JSON there instead (Resend-ready) — no other change needed.
export default function ContactForm({ bridal = false }: { bridal?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const text = [
      `Hi Molly! I'd like to book Glam by Molly.`,
      '',
      `Name: ${d.name}`,
      d.service ? `Service: ${d.service}` : '',
      d.date ? `Date: ${d.date}` : '',
      bridal && d.venue ? `Venue: ${d.venue}` : '',
      bridal && d.party ? `Bridal party size: ${d.party}` : '',
      d.message ? `Details: ${d.message}` : '',
    ].filter(Boolean).join('\n');

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    if (endpoint) {
      try {
        setStatus('sending');
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...d, bridal, composed: text }),
        });
        if (!res.ok) throw new Error();
        setStatus('sent');
        form.reset();
        return;
      } catch {
        setStatus('error');
        return;
      }
    }

    // No backend yet → open WhatsApp prefilled.
    window.open(`https://wa.me/${CONTACT.waNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setStatus('sent');
    form.reset();
  }

  const field = 'w-full rounded-lg border border-taupe/60 bg-cream px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-taupe-deep focus:outline-none focus:ring-1 focus:ring-taupe-deep';
  const label = 'mb-1.5 block text-xs uppercase tracking-[0.16em] text-muted';

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-taupe/50 bg-cream p-8 text-center">
        <p className="font-serif text-2xl">Thank you — almost there!</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          I&apos;ve opened WhatsApp with your details ready to send. If it didn&apos;t open, message me directly on{' '}
          <a href={`https://wa.me/${CONTACT.waNumber}`} target="_blank" rel="noopener noreferrer" className="text-ink underline">
            {CONTACT.phone}
          </a>.
        </p>
        <button onClick={() => setStatus('idle')} className="mt-5 text-xs uppercase tracking-[0.16em] text-taupe-deep underline">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Name *</label>
          <input id="cf-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>Phone / WhatsApp *</label>
          <input id="cf-phone" name="phone" required inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" className={field} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-service" className={label}>Service</label>
          <select id="cf-service" name="service" defaultValue={bridal ? 'Bridal Makeup' : ''} className={field}>
            {!bridal && <option value="">Choose a look…</option>}
            {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="cf-date" className={label}>{bridal ? 'Wedding date' : 'Preferred date'}</label>
          <input id="cf-date" name="date" type="date" className={field} />
        </div>
      </div>

      {bridal && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-venue" className={label}>Venue / location</label>
            <input id="cf-venue" name="venue" placeholder="Where's the celebration?" className={field} />
          </div>
          <div>
            <label htmlFor="cf-party" className={label}>Bridal party size</label>
            <input id="cf-party" name="party" inputMode="numeric" placeholder="e.g. 4 faces" className={field} />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="cf-message" className={label}>Anything else</label>
        <textarea id="cf-message" name="message" rows={4} placeholder="Tell me about the look you have in mind…" className={field} />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-700">Something went wrong — please message me on WhatsApp at {CONTACT.phone}.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full rounded-full bg-ink px-8 py-3.5 text-[0.82rem] uppercase tracking-[0.16em] text-cream transition-transform hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending…' : bridal ? 'Send bridal inquiry' : 'Send booking request'}
      </button>
      <p className="text-xs text-muted">Sends via WhatsApp so we can confirm your date quickly.</p>
    </form>
  );
}
