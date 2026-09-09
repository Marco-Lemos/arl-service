import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // en-US is the primary market language; pt-BR and es-US target Philadelphia's
  // Brazilian and Hispanic communities (spec section 8).
  locales: ['en', 'pt', 'es'],
  defaultLocale: 'en',

  // Always prefix, including the default locale, so /en/services and
  // /pt/services are equally explicit — this also keeps canonical/hreflang
  // logic simple (every locale is a real, linkable path).
  localePrefix: 'always'
});

export type AppLocale = (typeof routing.locales)[number];
