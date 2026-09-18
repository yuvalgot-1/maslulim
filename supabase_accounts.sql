-- Run this in Supabase Dashboard -> SQL Editor -> New query -> Run
--
-- IMPORTANT: run this BEFORE turning on public sign-ups
-- (Authentication -> Sign In / Providers -> Email -> "Allow new users to sign up").
-- Right now every logged-in user can write routes and upload/delete images.
-- Once visitors can register, that must be limited to creators only.
--
-- Who is a creator: every account that exists in auth.users at the moment you run this
-- (your 2 existing users). To add or remove a creator later, edit the "creators" table.
-- Keep "Confirm email" ON in the Email provider settings, so nobody can
-- register with an address that isn't theirs.

-- 1. Creators allowlist ------------------------------------------------------
create table if not exists public.creators (
  email text primary key check (email = lower(email)),
  name text not null
);

alter table public.creators enable row level security;

insert into public.creators (email, name)
select lower(email), split_part(email, '@', 1)
from auth.users
where email is not null
on conflict (email) do nothing;

-- A creator can read only their own row (used to show their display name).
drop policy if exists "creators can read own row" on public.creators;
create policy "creators can read own row"
  on public.creators for select
  using (email = lower(auth.jwt() ->> 'email'));

create or replace function public.is_creator()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.creators
    where email = lower(auth.jwt() ->> 'email')
  );
$$;

alter function public.is_creator() set search_path = '';

-- 2. Routes: everyone reads published ones, only creators read/write the rest --
drop policy if exists "authenticated users can read all routes" on public.routes;
drop policy if exists "authenticated users can insert routes" on public.routes;
drop policy if exists "authenticated users can update routes" on public.routes;
drop policy if exists "authenticated users can delete routes" on public.routes;

create policy "creators can read all routes"
  on public.routes for select
  using (public.is_creator());

create policy "creators can insert routes"
  on public.routes for insert
  with check (public.is_creator());

create policy "creators can update routes"
  on public.routes for update
  using (public.is_creator());

create policy "creators can delete routes"
  on public.routes for delete
  using (public.is_creator());

-- 3. Images: only creators upload, replace, delete or list ---------------------
drop policy if exists "owner can upload route images" on storage.objects;
drop policy if exists "owner can update route images" on storage.objects;
drop policy if exists "owner can delete route images" on storage.objects;
drop policy if exists "authenticated users can list route images" on storage.objects;

create policy "creators can upload route images"
  on storage.objects for insert
  with check (bucket_id = 'route-images' and public.is_creator());

create policy "creators can update route images"
  on storage.objects for update
  using (bucket_id = 'route-images' and public.is_creator());

create policy "creators can delete route images"
  on storage.objects for delete
  using (bucket_id = 'route-images' and public.is_creator());

create policy "creators can list route images"
  on storage.objects for select
  using (bucket_id = 'route-images' and public.is_creator());

-- 4. Saved routes for registered visitors (synced across devices) --------------
create table if not exists public.saved_routes (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  route_id text not null references public.routes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, route_id)
);

alter table public.saved_routes enable row level security;

create policy "users read own saved routes"
  on public.saved_routes for select
  using (user_id = auth.uid());

create policy "users save routes for themselves"
  on public.saved_routes for insert
  with check (user_id = auth.uid());

create policy "users remove own saved routes"
  on public.saved_routes for delete
  using (user_id = auth.uid());
