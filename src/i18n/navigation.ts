import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware drop-in replacements for next/link and next/navigation.
// Use these everywhere instead of the plain Next.js APIs so links and
// redirects automatically keep (or switch) the current locale prefix —
// this is what LanguageSwitcher and every internal <Link> should import.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
