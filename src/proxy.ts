import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// NOTE: as of Next.js 16, `middleware.ts` was renamed to `proxy.ts`
// (the exported function/behavior is identical — see
// https://nextjs.org/docs/messages/middleware-to-proxy). This file is what
// redirects "/" -> "/en", rewrites "/en/services" -> "/services" internally,
// and negotiates the visitor's preferred locale on first visit.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - /api, /trpc, Next.js internals (_next, _vercel)
  // - anything containing a dot (static files like favicon.ico)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
