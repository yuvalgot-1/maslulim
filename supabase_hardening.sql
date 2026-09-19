-- Run this in Supabase Dashboard -> SQL Editor -> New query -> Run
-- Server-side limits that don't depend on the app's own checks.

-- 1. Route images: only small images, only image types.
-- (The app already shrinks photos to ~1600px before upload; this stops anyone
-- who talks to the API directly from filling the bucket with other files.)
update storage.buckets
set file_size_limit = 5 * 1024 * 1024,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'route-images';

-- 2. Route content limits, so a route row can't be used to store huge payloads.
alter table public.routes
  add constraint routes_title_len check (char_length(title) between 1 and 200),
  add constraint routes_area_len check (char_length(area) <= 100),
  add constraint routes_blurb_len check (char_length(blurb) <= 2000),
  add constraint routes_stops_size check (jsonb_typeof(stops) = 'array' and jsonb_array_length(stops) <= 50 and pg_column_size(stops) <= 100000);
