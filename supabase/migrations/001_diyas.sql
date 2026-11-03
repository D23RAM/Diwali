create table if not exists public.diyas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  message text check (message is null or char_length(message) <= 280),
  country_code text check (country_code is null or country_code ~ '^[A-Z]{2}$'),
  anonymous_session_id text not null check (char_length(anonymous_session_id) between 8 and 64),
  visual_style smallint not null default 0 check (visual_style between 0 and 5)
);
create index if not exists diyas_created_idx on public.diyas (created_at desc);
alter table public.diyas enable row level security;
create policy "anyone can read diyas" on public.diyas for select to anon, authenticated using (true);
create policy "anyone can light a diya" on public.diyas for insert to anon, authenticated
  with check (char_length(anonymous_session_id) >= 8 and (message is null or char_length(message) <= 280));
-- no update/delete policies: diyas are immutable from the client.

-- Spam protection: max 3 diyas per session per 10 min, max 120 globally per minute.
create or replace function public.diyas_rate_limit() returns trigger language plpgsql as $$
begin
  new.message := nullif(btrim(new.message), '');
  if (select count(*) from public.diyas where anonymous_session_id = new.anonymous_session_id and created_at > now() - interval '10 minutes') >= 3
    then raise exception 'rate_limit_session' using errcode = 'P0001'; end if;
  if (select count(*) from public.diyas where created_at > now() - interval '1 minute') >= 120
    then raise exception 'rate_limit_global' using errcode = 'P0001'; end if;
  return new;
end $$;
drop trigger if exists diyas_rate_limit on public.diyas;
create trigger diyas_rate_limit before insert on public.diyas for each row execute function public.diyas_rate_limit();

create or replace function public.diya_stats() returns json language sql stable security definer as $$
  select json_build_object('total', (select count(*) from public.diyas),
    'countries', coalesce((select json_agg(distinct country_code) from public.diyas where country_code is not null), '[]'::json));
$$;
grant execute on function public.diya_stats() to anon, authenticated;
alter publication supabase_realtime add table public.diyas;
