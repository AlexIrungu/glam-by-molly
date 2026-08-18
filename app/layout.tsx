import type { Metadata } from 'next';
import { Montserrat, Cormorant_Garamond, Sacramento } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-cormorant', display: 'swap',
});
const sacramento = Sacramento({ subsets: ['latin'], weight: '400', variable: '--font-sacramento', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://alexirungu.github.io'),
  title: 'Glam by Molly — Makeup Artist in Nairobi',
  description:
    'Glam by Molly — professional makeup artist in Nairobi. Soft glam, bridal and full glam that enhances your natural beauty and lasts all day and night.',
  keywords: ['makeup artist Nairobi', 'bridal makeup Nairobi', 'soft glam', 'full glam', 'Glam by Molly'],
  openGraph: {
    title: 'Glam by Molly — Makeup Artist in Nairobi',
    description: 'Soft glam · Bridal · Full glam. Flawless, long-lasting looks in Nairobi.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable} ${sacramento.variable}`}>
      <body>{children}</body>
    </html>
  );
}
