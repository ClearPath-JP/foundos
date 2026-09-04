/**
 * Server-side Supabase client, lazily created.
 *
 * ⚠️ SERVER ONLY. This module reads the service role key, which bypasses every
 * row-level-security policy in the database. `server-only` is not installed and
 * we are not adding a dependency for it, so nothing mechanically stops a client
 * component from importing this file — the guard is this comment and code
 * review. If you ever find `getSupabase` imported from a file with 'use client'
 * at the top, that is a credential leak, not a style problem. (Next would in
 * practice inline `undefined` for a non-NEXT_PUBLIC_ env var in the browser
 * bundle, so the key wouldn't actually ship — but do not rely on that.)
 *
 * The important behaviour here is that **there is no Supabase project yet**.
 * That is the documented state of phase 1, not a misconfiguration. So:
 *
 *   - Missing env vars return `null`. They never throw.
 *   - A `null` client means the caller skips the insert and carries on.
 *
 * A visitor who hands over their phone number must never see an error because
 * a database Josh hasn't created yet isn't answering. The Telegram alert is the
 * system of record until it exists; `/api/lead` says so in the message when the
 * insert was skipped, so a lost row is visible rather than silent.
 *
 * When Josh creates the project and sets SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY in Vercel, the insert starts working with no code
 * change. Run `supabase/leads.sql` first.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * `undefined` = not resolved yet. `null` = resolved, and there is no config.
 * Both are memoised, so an unconfigured deployment reads process.env once and
 * warns once rather than on every capture.
 */
let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn(
      '[supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set — lead inserts are being skipped. This is expected until the project exists.'
    );
    cached = null;
    return cached;
  }

  try {
    cached = createClient(url, key, {
      auth: {
        // Service role on a stateless server. There is no user session to
        // persist and no token to refresh; leaving these on makes the client
        // try to write to storage that isn't there.
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  } catch (err) {
    // Malformed URL is the realistic case. Same rule as everywhere else: log
    // it, degrade, never take the visitor's request down with us.
    console.error('[supabase] client creation failed:', err);
    cached = null;
  }

  return cached;
}
