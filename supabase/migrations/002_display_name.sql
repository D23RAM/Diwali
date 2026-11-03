-- Optional first name shown with a public wish. NULL = anonymous.
alter table public.diyas add column if not exists display_name text
  check (display_name is null or char_length(display_name) <= 40);
