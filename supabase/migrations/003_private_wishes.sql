-- Wishes the visitor chose NOT to show. Anyone can add one; nobody can read them through the public API.
-- You (project owner) can read them in the Supabase dashboard (Table Editor), which bypasses RLS.
create table if not exists public.private_wishes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  diya_id uuid,
  message text check (message is null or char_length(message) <= 280),
  country_code text check (country_code is null or country_code ~ '^[A-Z]{2}$'),
  anonymous_session_id text not null check (char_length(anonymous_session_id) between 8 and 64)
);
alter table public.private_wishes enable row level security;
create policy "anyone can save a private wish" on public.private_wishes for insert to anon, authenticated with check (true);
-- Deliberately no SELECT policy.

create or replace function public.private_wishes_rate_limit() returns trigger language plpgsql as $$
begin
  new.message := nullif(btrim(new.message), '');
  if (select count(*) from public.private_wishes where anonymous_session_id = new.anonymous_session_id and created_at > now() - interval '10 minutes') >= 3
    then raise exception 'rate_limit_session' using errcode = 'P0001'; end if;
  return new;
end $$;
drop trigger if exists private_wishes_rate_limit on public.private_wishes;
create trigger private_wishes_rate_limit before insert on public.private_wishes for each row execute function public.private_wishes_rate_limit();
