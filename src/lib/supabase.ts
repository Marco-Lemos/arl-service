import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. ' +
      'Copy .env.local.example to .env.local and fill in the values from ' +
      'Project Settings > API in the Supabase dashboard.'
  );
}

/**
 * Browser client — use inside Client Components ("use client"), e.g. the
 * multi-step LeadForm if it submits client-side.
 *
 * Safe to ship to the browser: it only ever holds the public "publishable"
 * key, and every table it can reach is governed by Row Level Security
 * (leads: anonymous INSERT only; portfolio: public SELECT only).
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(supabaseUrl!, supabasePublishableKey!);
}

/**
 * Server client — use inside Server Components, Server Actions and Route
 * Handlers (e.g. the action that inserts a lead and then triggers the
 * notification email/webhook from spec section 3).
 *
 * Reads/writes the Supabase auth cookie so session state stays in sync
 * between server and client. Not strictly needed yet (no user-facing auth
 * today), but this is what a future authenticated /admin area — for working
 * the `status` field on `leads` — will build on, so it's set up correctly
 * from day one instead of retrofitted later.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl!, supabasePublishableKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // `setAll` was called from a Server Component during render,
          // where cookies can't be mutated — safe to ignore as long as
          // `proxy.ts` also refreshes the session on every request.
        }
      }
    }
  });
}

/**
 * Public-data read client — use in Server Components that only ever read
 * public, non-personalized rows (e.g. the `portfolio` gallery).
 *
 * Deliberately skips @supabase/ssr's cookies() plumbing: calling cookies()
 * forces the whole route to render dynamically on every request, which is
 * wasted cost for data that's the same for every visitor. This client keeps
 * those pages eligible for static rendering + ISR (`export const revalidate`).
 */
export function createSupabasePublicClient() {
  return createClient<Database>(supabaseUrl!, supabasePublishableKey!);
}

/**
 * NOT included here on purpose: a service_role client. That key bypasses
 * Row Level Security entirely and must never reach the browser bundle. When
 * the admin dashboard is built, add it as its own server-only module (e.g.
 * `src/lib/supabase-admin.ts`, guarded by the `server-only` package) instead
 * of adding an unused code path to this file today.
 */
