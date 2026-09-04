-- foundos — `leads`, phase 1.
--
-- Run this once in the Supabase SQL editor, then set SUPABASE_URL and
-- SUPABASE_SERVICE_ROLE_KEY in Vercel. Until both exist, /api/lead skips the
-- insert, still alerts Josh on Telegram, and says in that message that the row
-- was not saved. Nothing breaks; the lead just lives in a chat instead of a
-- table.
--
-- ⚠️ THIS IS ONLY WHAT PHASE 1 WRITES, plus the columns needed to read a row
-- back and recognise it. The full model in foundos-system-rulebook.md §1 also
-- carries city, email, instagram, owner_name, score, sample_url,
-- next_action_at, notes and updated_at — those belong to the phases that
-- actually populate them (Prospect, Sample site, Outreach). Adding them now
-- would create a table full of columns nothing writes, which reads as broken
-- rather than unfinished. Phases 3+ extend this table with ALTER TABLE.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),

  -- The business. `name` is never null: /api/lead falls back to the typed
  -- query and then to a placeholder, because a lead with a bad name still
  -- beats a lost lead.
  name text not null,

  -- The VISITOR's number, stored E.164 (+14045550134) so phase 4 can hand it
  -- straight to an SMS provider. Not the business's Google-listed number —
  -- that one is only ever in the Telegram alert, and the two must not be
  -- conflated. Nullable so a phase-3 scrape can insert a lead before it has one.
  phone text,

  -- The findings the visitor actually read when they decided to give us the
  -- number, verbatim: [{ code, headline, consequence, impact }].
  findings jsonb not null default '[]'::jsonb,

  -- ⚠️ The rulebook's enum, and 'audit' is not in it. The brand spec §4 says
  -- source = "audit"; that value would pass silently into the table and then
  -- fall out of every grouping in the phase-3 digest. The constraint makes it
  -- fail here, loudly, at write time instead.
  source text not null default 'audit_box',

  -- Rulebook status flow:
  --   new → scored → sample_built → contacted → replied → call_booked
  --       → closed_won / closed_lost / cold
  status text not null default 'new',

  -- Report context. Enough to recognise the lead and to skip it on a later
  -- scrape without re-running the Places lookup.
  place_id text,
  address text,
  category text,
  rating numeric(2, 1),
  review_count integer,
  website text,

  created_at timestamptz not null default now(),

  constraint leads_source_check
    check (source in ('scrape', 'audit_box', 'walk_in', 'referral', 'ad')),

  constraint leads_status_check
    check (status in (
      'new', 'scored', 'sample_built', 'contacted', 'replied',
      'call_booked', 'closed_won', 'closed_lost', 'cold'
    )),

  constraint leads_rating_check
    check (rating is null or (rating >= 0 and rating <= 5)),

  constraint leads_review_count_check
    check (review_count is null or review_count >= 0)
);

-- The one query phase 1 has: newest first, for the daily digest and for Josh
-- opening the table to see who came in overnight.
create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

-- RLS on, and deliberately NO policy.
--
-- With RLS enabled and no policy, anon and authenticated can do nothing at all
-- — no select, no insert. The service role key bypasses RLS entirely, and that
-- key is only ever read server-side in src/lib/supabase.ts. So the write path
-- is the API route and nothing else.
--
-- If a later phase needs the browser to read a row, add a narrow policy for
-- that specific case. Do not add a public insert policy to `leads`: an open
-- insert on this table is an open door to Josh's pipeline.
alter table public.leads enable row level security;

comment on table public.leads is
  'Prospects. Phase 1 writes audit_box captures from POST /api/lead. Extended by phases 3+.';
comment on column public.leads.phone is
  'The visitor''s number, E.164. Never the business''s Google-listed number.';
comment on column public.leads.findings is
  'The report findings shown to the visitor at the moment they gave us the number.';
