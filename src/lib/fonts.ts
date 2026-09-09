import { Libre_Franklin } from 'next/font/google';

// Libre Franklin is a revival of Franklin Gothic — a typeface lineage that
// traces back to Benjamin Franklin, Philadelphia's own printer. One family,
// used across the full weight range (400-900) for both display and body
// text, rather than reaching for a second typeface or a generic default.
export const fontSans = Libre_Franklin({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});
