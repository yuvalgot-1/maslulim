-- Run in Supabase Dashboard -> SQL Editor, after supabase_reactions.sql.
-- Removes the SECURITY DEFINER view warning and the "RLS enabled, no policy"
-- notice, without exposing device ids to visitors.

-- Visitors may read only the non-identifying columns of the table.
revoke all on public.route_reactions from anon, authenticated;
grant select (route_id, rating, liked) on public.route_reactions to anon, authenticated;

create policy "anyone can read reaction values"
  on public.route_reactions for select
  using (true);

-- The view now runs with the caller's permissions instead of the owner's.
alter view public.route_stats set (security_invoker = true);
