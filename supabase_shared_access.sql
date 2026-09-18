-- Run this in Supabase Dashboard -> SQL Editor -> New query -> Run
-- Opens up full read/write access to ANY authenticated (logged-in) user,
-- instead of only the specific user who owns each row.
-- Public (anonymous) visitors are unaffected - they still only ever see
-- published routes, via the separate policy that already exists.

drop policy if exists "owner can read all own routes (incl. drafts)" on public.routes;
drop policy if exists "owner can insert routes" on public.routes;
drop policy if exists "owner can update own routes" on public.routes;
drop policy if exists "owner can delete own routes" on public.routes;

create policy "authenticated users can read all routes"
  on public.routes for select
  using (auth.uid() is not null);

create policy "authenticated users can insert routes"
  on public.routes for insert
  with check (auth.uid() is not null);

create policy "authenticated users can update routes"
  on public.routes for update
  using (auth.uid() is not null);

create policy "authenticated users can delete routes"
  on public.routes for delete
  using (auth.uid() is not null);

-- Storage (route images) already allows any authenticated user to
-- upload/update/delete - no change needed there.
