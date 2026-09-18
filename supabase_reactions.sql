-- Run this in Supabase Dashboard -> SQL Editor -> New query -> Run
-- Adds likes + 1-5 star ratings for routes. Visitors don't log in, so each
-- browser gets a random device id and can have one reaction per route.

create table if not exists public.route_reactions (
  route_id text not null references public.routes(id) on delete cascade,
  device_id text not null check (char_length(device_id) between 8 and 64),
  rating smallint check (rating between 1 and 5),
  liked boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (route_id, device_id)
);

-- No policies on purpose: nobody touches the table directly, only through
-- the function below (writes) and the view below (aggregated reads).
alter table public.route_reactions enable row level security;

create or replace function public.set_reaction(
  p_route_id text,
  p_device_id text,
  p_rating smallint,
  p_liked boolean
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from routes where id = p_route_id and published) then
    raise exception 'route not found';
  end if;
  insert into route_reactions (route_id, device_id, rating, liked, updated_at)
  values (p_route_id, p_device_id, p_rating, coalesce(p_liked, false), now())
  on conflict (route_id, device_id) do update
    set rating = excluded.rating,
        liked = excluded.liked,
        updated_at = now();
end;
$$;

create or replace view public.route_stats as
select
  route_id,
  count(rating)::int as rating_count,
  round(avg(rating), 1)::float as rating_avg,
  count(*) filter (where liked)::int as likes
from public.route_reactions
group by route_id;

grant select on public.route_stats to anon, authenticated;
grant execute on function public.set_reaction(text, text, smallint, boolean) to anon, authenticated;
