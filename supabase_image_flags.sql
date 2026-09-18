-- Run this in Supabase Dashboard -> SQL Editor -> New query -> Run
-- Adds a has_cover flag so the app can know whether a route has a
-- cover image WITHOUT making a network request to check - it just
-- reads it off the row like any other field. This is what lets us
-- stop firing a real (404) request for every empty image slot on
-- every page view.
-- Safe to run even if you already ran supabase_storage_lockdown.sql
-- separately - this only adds a new column and re-applies the same
-- storage policy fix (harmless if it's already in place).

alter table public.routes add column if not exists has_cover boolean not null default false;

drop policy if exists "anyone can view route images" on storage.objects;
drop policy if exists "authenticated users can list route images" on storage.objects;

create policy "authenticated users can list route images"
  on storage.objects for select
  using (bucket_id = 'route-images' and auth.uid() is not null);
