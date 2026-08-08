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

export const RATES: { name: string; price: string }[] = [
  { name: 'Soft Glam', price: 'KSh 3,000' },
  { name: 'Full Glam', price: 'KSh 3,500' },
  { name: 'Bridal', price: 'KSh 4,500' },
  { name: 'Bridal Trial', price: 'KSh 3,500' },
  { name: 'Bridal Party', price: 'KSh 3,000' },
];

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
