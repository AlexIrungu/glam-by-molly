export const CONTACT = {
  phone: '+254 796 119 979',
  waNumber: '254796119979',
  instagram: 'glam_bymolly',
  instagramUrl: 'https://instagram.com/glam_bymolly',
  email: 'glambymolly54@gmail.com',
  location: 'Nairobi, Kenya',
};

export const waLink = (message: string) =>
  `https://wa.me/${CONTACT.waNumber}?text=${encodeURIComponent(message)}`;

export const BOOK_MESSAGE =
  "Hi Molly! I'd love to book a makeup appointment with Glam by Molly.";

export const SERVICES: { name: string; blurb: string; img: string }[] = [
  { name: 'Soft Glam', blurb: 'Natural, radiant everyday beauty that still turns heads.', img: '/looks/look-01.jpg' },
  { name: 'Full Glam', blurb: 'Bold, camera-ready glam for the nights you want to shine.', img: '/looks/look-02.jpg' },
  { name: 'Bridal Makeup', blurb: 'Flawless, long-wear looks made for your big day.', img: '/looks/look-03.jpg' },
  { name: 'Bridal Party', blurb: 'Coordinated glam for the whole squad — on time, on point.', img: '/looks/look-07.jpg' },
  { name: 'Photoshoots & Events', blurb: 'Looks built to photograph beautifully under any light.', img: '/looks/look-11.jpg' },
  { name: 'Touch-ups', blurb: 'Quick refreshes to keep you flawless through the day.', img: '/looks/look-15.jpg' },
];

// "The Range" — the draggable showcase carousel. Merges each look with its
// price (where fixed) so cards read like a menu you can throw through.
export const RANGE: { name: string; blurb: string; img: string; price: string }[] = [
  { name: 'Soft Glam', blurb: 'Natural, radiant everyday beauty that still turns heads.', img: '/looks/look-01.jpg', price: 'KSh 3,000' },
  { name: 'Full Glam', blurb: 'Bold, camera-ready glam for the nights you want to shine.', img: '/looks/look-02.jpg', price: 'KSh 3,500' },
  { name: 'Bridal Makeup', blurb: 'Flawless, long-wear looks made for your big day.', img: '/looks/look-03.jpg', price: 'KSh 4,500' },
  { name: 'Bridal Party', blurb: 'Coordinated glam for the whole squad — on time, on point.', img: '/looks/look-07.jpg', price: 'KSh 3,000' },
  { name: 'Photoshoots & Events', blurb: 'Looks built to photograph beautifully under any light.', img: '/looks/look-11.jpg', price: 'On request' },
  { name: 'Touch-ups', blurb: 'Quick refreshes to keep you flawless through the day.', img: '/looks/look-15.jpg', price: 'On request' },
];

export const RATES: { name: string; price: string }[] = [
  { name: 'Soft Glam', price: 'KSh 3,000' },
  { name: 'Full Glam', price: 'KSh 3,500' },
  { name: 'Bridal', price: 'KSh 4,500' },
  { name: 'Bridal Trial', price: 'KSh 3,500' },
  { name: 'Bridal Party', price: 'KSh 3,000' },
];

// Rotating hero looks (cinematic crossfade). Curated for composition — swap in
// the strongest hi-res shots when Molly's batch lands.
export const HERO_LOOKS = ['/looks/look-05.jpg', '/looks/look-09.jpg', '/looks/look-03.jpg', '/hero.jpg'];

// Service options for the contact / inquiry form.
export const SERVICE_OPTIONS = ['Soft Glam', 'Full Glam', 'Bridal Makeup', 'Bridal Party', 'Photoshoot / Event', 'Other'];

// /bridal landing content.
export const BRIDAL = {
  packages: [
    { name: 'Bridal Makeup', price: 'KSh 4,500', desc: 'Your wedding-day look — long-wear, camera-ready, and dialed in during your trial.' },
    { name: 'Bridal Trial', price: 'KSh 3,500', desc: 'A pre-wedding run-through so your look is locked in before the morning.' },
    { name: 'Bridal Party', price: 'KSh 3,000', desc: 'Per face — coordinated glam for bridesmaids, mums and the whole crew.' },
  ],
  steps: [
    { title: 'Consultation', desc: 'We talk theme, dress, skin and the mood you want — over WhatsApp or in person.' },
    { title: 'The trial', desc: 'A full run-through of your look, so nothing is a surprise on the day.' },
    { title: 'Wedding morning', desc: 'I come to you, on time, and get you and your party camera-ready.' },
    { title: 'Touch-ups', desc: 'An optional touch-up so you stay flawless from the vows to the last dance.' },
  ],
  faqs: [
    { q: 'Do you travel to my venue?', a: 'Yes — I come to you anywhere in and around Nairobi. Travel further afield is quoted per location.' },
    { q: 'How far in advance should I book?', a: 'Wedding dates fill up fast — 2–3 months ahead is ideal, with the trial a few weeks before the day.' },
    { q: 'Do you do the bridal party too?', a: 'Absolutely. Bridal party makeup is per face and scheduled so everyone is ready on time.' },
    { q: 'Will my makeup last all day?', a: 'Every bridal look is built on prepped skin with long-wear products chosen for Nairobi heat — made to last all day and night.' },
  ],
  looks: ['/looks/look-03.jpg', '/looks/look-05.jpg', '/looks/look-07.jpg', '/looks/look-09.jpg', '/looks/look-12.jpg', '/looks/look-14.jpg'],
};

export const WHY: { title: string; desc: string }[] = [
  { title: 'Personalized experience', desc: 'Every look is tailored to your features, tone and occasion.' },
  { title: 'Long-lasting makeup', desc: 'Looks that hold up through the day and into the night.' },
  { title: 'Attention to detail', desc: 'A keen eye that photographs beautifully, up close and far.' },
  { title: 'Professional service', desc: 'Punctual, hygienic, and a genuinely lovely chair to sit in.' },
];

// 18 curated looks extracted from the portfolio.
export const LOOKS: string[] = Array.from(
  { length: 18 },
  (_, i) => `/looks/look-${String(i + 1).padStart(2, '0')}.jpg`,
);
