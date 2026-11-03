# DEEPOTSAV — One World. A Thousand Lights.
React + Vite + TypeScript + Tailwind + Framer Motion + Supabase (Postgres + Realtime).

## Run (demo mode, no setup)
    npm install && npm run dev
Without credentials the app shows a **DEMO MODE** banner, 80 sample diyas, and local-only submissions.

## Go live
1. Create a project at supabase.com.
2. SQL Editor → run `supabase/migrations/001_diyas.sql` (table, RLS, rate limits, stats function, Realtime publication).
3. `cp .env.example .env`, fill `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Project Settings → API → anon key). Never use the service-role key.
4. `npm run dev`. Open two windows: a diya lit in one appears in the other instantly.

## Security notes
RLS allows public read and validated insert only (no update/delete). A DB trigger enforces 3 diyas per session per 10 min and 120/min globally. Messages are ≤280 chars, sanitised client-side and rendered as plain text. Session limits can be bypassed by clearing storage; for stronger protection add Cloudflare Turnstile via an Edge Function.

## Structure
`src/hooks/useDiyas.ts` data + realtime · `src/components/` Diya, Installation, LightModal · `src/lib/` client + helpers.
