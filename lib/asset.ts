// Prefix a /public path with the GitHub Pages base path (empty in dev).
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (p: string) => `${base}${p}`;
