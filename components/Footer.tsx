import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-taupe/40 bg-cream py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <Link href="/" className="font-serif text-sm uppercase tracking-[0.22em] text-muted">Glam by Molly</Link>
        <span className="text-xs text-muted">© {new Date().getFullYear()} Glam by Molly · Nairobi</span>
      </div>
    </footer>
  );
}
