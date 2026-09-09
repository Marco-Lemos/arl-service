# ARL Service — arlservice.online

General Contractor site for Philadelphia, PA. Next.js (App Router) + TypeScript + Tailwind CSS v4 + next-intl (en/pt/es) + Supabase.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in real Supabase values
npm run dev
```

Open http://localhost:3000 — it redirects to `/en`. Try `/pt` and `/es` too.

## Scripts

- `npm run dev` — local dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`

## What's wired up so far

- Next.js 16 + TypeScript + Tailwind CSS v4
- next-intl locale routing (`/en`, `/pt`, `/es`), always-prefixed, with `src/proxy.ts` handling redirects
- Supabase client factories (`src/lib/supabase.ts`) for both Client and Server Components
- Base `<html lang>` + canonical/hreflang metadata per locale
- Live Supabase project (`us-east-1`, free plan — $0/mo), with `leads` + `portfolio` tables, RLS policies, the `portfolio` storage bucket, and generated `database.types.ts` — see `.env.local.example` for where to plug in the real URL/key
- Design system: brand tokens in `src/app/globals.css` (ink / brick / stone / slate, Libre Franklin), `Button`/`Card`/`Input`/`Label`/`Textarea` in `src/components/ui`, and a responsive `Header` + `Footer` in `src/components/layout` (desktop dropdown nav, mobile Sheet menu, working LanguageSwitcher)
- `src/lib/site-config.ts` centralizes NAP/license/hours — every value is a clearly marked `TODO` placeholder (no invented business facts), swap them in before launch
- `ServiceCard` and `TrustBadges` (`src/components/sections`) — reusable, no hardcoded reviews/ratings
- `LeadForm` (`src/components/forms`) — 3-step "Get a Free Estimate" flow wired to a real Server Action: validates with Zod, inserts into the live `leads` table, and best-effort notifies via Resend (`RESEND_API_KEY`) and/or a webhook (`LEAD_NOTIFICATION_WEBHOOK_URL`) if configured in `.env.local`. `leads` now also has `timeline` and `zip_code` columns (added via migration to match the 3-step form spec)
- **The real Home page** (`src/app/[locale]/page.tsx`): Hero → Trust Badges → Services → Portfolio → Testimonials → Get a Free Estimate, in the spec's order. Portfolio and Testimonials query real data sources and render an honest "coming soon" state since no real projects/reviews exist yet — nothing fabricated. Uses a cookie-free Supabase client (`createSupabasePublicClient`) so the page stays statically generated with hourly ISR instead of fully dynamic. Includes `GeneralContractor` JSON-LD.
- **Services hub + 3 service detail pages** (`/services`, `/services/[slug]`) — real Philadelphia-market cost ranges and FAQ content (`Service` + `FAQPage` JSON-LD), sourced from published 2026 remodeling cost data, not invented. FAQ uses native `<details>/<summary>` (zero JS, fully accessible).
- **Portfolio page** (`/portfolio`) — same real Supabase query + honest empty state as the Home preview, just the full gallery.
- **Contact page** (`/contact`) — NAP, hours, a Philadelphia-centered map embed (no fake precise pin — the street address is still a placeholder), and the LeadForm.
- `testimonials` table added to Supabase (RLS: public can only read rows where `is_published = true`) — nothing lets a site visitor write to it. This is what the planned `/admin` page will manage, along with portfolio photos.

## Not built yet (next checklist steps)

- The `/admin` area (manage leads, portfolio photos, testimonials) — needs its own auth strategy, which is why no `service_role` client exists yet (see the comment in `lib/supabase.ts`)
- Real portfolio photos and client testimonials (content, not code — add via Supabase Storage/dashboard, or through `/admin` once it exists)
- sitemap.xml / robots.txt
- Vercel deploy + domain

## Environment variables

See `.env.local.example` for the full list and where to find each value.
