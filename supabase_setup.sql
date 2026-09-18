-- Run this in Supabase Dashboard -> SQL Editor -> New query -> Run
-- IMPORTANT: create your login user FIRST (Authentication -> Add user),
-- before running this script, so the seed data below can be linked to it.

-- 1. Table
create table public.routes (
  id text primary key,
  title text not null,
  area text not null,
  author text not null default 'יואב',
  distance text not null default 'לא צוין',
  duration text not null default 'לא צוין',
  collections text[] not null default '{}',
  blurb text not null default '',
  stops jsonb not null default '[]',
  published boolean not null default false,
  owner_id uuid not null references auth.users(id) default auth.uid(),
  created_at timestamptz not null default now()
);

alter table public.routes enable row level security;

-- 2. Who can read what
create policy "anyone can read published routes"
  on public.routes for select
  using (published = true);

create policy "owner can read all own routes (incl. drafts)"
  on public.routes for select
  using (auth.uid() = owner_id);

-- 3. Who can write (only the authenticated owner - there is no public signup,
-- so "authenticated" effectively means "you")
create policy "owner can insert routes"
  on public.routes for insert
  with check (auth.uid() = owner_id);

create policy "owner can update own routes"
  on public.routes for update
  using (auth.uid() = owner_id);

create policy "owner can delete own routes"
  on public.routes for delete
  using (auth.uid() = owner_id);

-- 4. Storage bucket for route/stop cover images
insert into storage.buckets (id, name, public)
values ('route-images', 'route-images', true)
on conflict (id) do nothing;

create policy "anyone can view route images"
  on storage.objects for select
  using (bucket_id = 'route-images');

create policy "owner can upload route images"
  on storage.objects for insert
  with check (bucket_id = 'route-images' and auth.uid() is not null);

create policy "owner can update route images"
  on storage.objects for update
  using (bucket_id = 'route-images' and auth.uid() is not null);

create policy "owner can delete route images"
  on storage.objects for delete
  using (bucket_id = 'route-images' and auth.uid() is not null);

-- 5. Seed data - migrates the 4 existing demo routes.
-- Requires your auth user to already exist (step above).
insert into public.routes (id, title, area, distance, duration, collections, blurb, stops, published, owner_id)
values
(
  'kinneret',
  'בוקר בכנרת, קפה בגליל וארוחה בשקיעה',
  'גליל תחתון',
  '18 ק״מ ממך',
  'יום שלם · 6–7 שעות',
  array['day','water'],
  'מתחילים על המים כשעוד קריר, ממשיכים לקפה קטן בין המטעים, ומסיימים במסעדה עם נוף לעמק. מסלול רגוע, מתאים גם למי שלא אוהב ללכת הרבה.',
  '[
    {"name":"חוף דוגית","cat":"nature","spend":"שעתיים","hours":"07:00–19:00","travel":"14 דק׳ נסיעה","note":"חוף שקט בצד המזרחי. בואו לפני 9:00 ותקבלו אותו כמעט לעצמכם."},
    {"name":"קפה במטע – כורסי","cat":"cafe","spend":"45 דק׳","hours":"08:00–17:00","travel":"25 דק׳ נסיעה","note":"מרפסת מוצלת, קפה טוב ומאפה שקדים. יש פינת מים לכלבים."},
    {"name":"מסעדת ארבל","cat":"food","spend":"שעה וחצי","hours":"12:00–22:30","travel":"","note":"להזמין מקום ליד החלון בשעה שלפני השקיעה. המנות לשיתוף הן העיקר."}
  ]'::jsonb,
  true,
  (select id from auth.users limit 1)
),
(
  'golan',
  'מעיינות הגולן, יקב ומרפסת נוף',
  'רמת הגולן',
  '42 ק״מ ממך',
  'יום שלם · 5 שעות',
  array['day','water'],
  'מסלול מים קצר שמסתיים בטעימות ובנוף לחרמון. אפשר לעשות את הכל ברכב אחד, בלי הליכות ארוכות.',
  '[
    {"name":"נחל זוויתן התחתון","cat":"nature","spend":"שעה וחצי","hours":"08:00–16:00","travel":"20 דק׳ נסיעה","note":"ירידה קלה למים, נעליים שנרטבות. בקיץ המים נעימים."},
    {"name":"יקב אודם","cat":"cafe","spend":"שעה","hours":"10:00–18:00","travel":"12 דק׳ נסיעה","note":"טעימות בלי הזמנה מראש בימי חול. גם מי שלא שותה יקבל שם קפה מעולה."},
    {"name":"מרפסת נוף בנמרוד","cat":"view","spend":"40 דק׳","hours":"תמיד פתוח","travel":"","note":"עצירה אחרונה לפני החזרה, בעיקר בשעה הזהובה."}
  ]'::jsonb,
  true,
  (select id from auth.users limit 1)
),
(
  'benshemen',
  'יער בן שמן עם ילדים ופיצה בדרך חזרה',
  'מרכז',
  '9 ק״מ ממך',
  'חצי יום · 3–4 שעות',
  array['kids','day'],
  'מסלול קצר ושטוח שעובד גם עם עגלה, עם מתקנים באמצע וסיום שכולם מסכימים עליו.',
  '[
    {"name":"חניון המעגלים","cat":"nature","spend":"שעה","hours":"תמיד פתוח","travel":"7 דק׳ נסיעה","note":"שולחנות פיקניק בצל ומסלול מעגלי קצר. יש שירותים בחניון."},
    {"name":"פינת חי בבן שמן","cat":"nature","spend":"45 דק׳","hours":"09:00–16:00","travel":"15 דק׳ נסיעה","note":"קטן אבל מספיק. אפשר להאכיל, כדאי להביא גזר."},
    {"name":"פיצה בשוהם","cat":"food","spend":"שעה","hours":"11:00–23:00","travel":"","note":"יושבים בחוץ, הילדים רצים בכיכר וההורים סוף סוף יושבים."}
  ]'::jsonb,
  true,
  (select id from auth.users limit 1)
),
(
  'alexander',
  'שקיעה בנחל אלכסנדר ודגים בחוף',
  'שרון',
  '23 ק״מ ממך',
  'אחר הצהריים · 3 שעות',
  array['water'],
  'מסלול קצר לאחר הצהריים: צבי מים, שקיעה ודגים על הגריל. עובד מעולה גם ביום חורף בהיר.',
  '[
    {"name":"גשר הצבים","cat":"nature","spend":"שעה","hours":"תמיד פתוח","travel":"18 דק׳ נסיעה","note":"הצבים יוצאים לרוב אחרי הצהריים. שביל נוח לגמרי."},
    {"name":"חוף בית ינאי","cat":"view","spend":"שעה","hours":"תמיד פתוח","travel":"5 דק׳ נסיעה","note":"נשארים לשקיעה מעל המצוק, לא על החוף עצמו."},
    {"name":"מסעדת דגים בחוף","cat":"food","spend":"שעה וחצי","hours":"12:00–22:00","travel":"","note":"סלטים, דג שלם ולחם חם. שווה להזמין מראש בסופ״ש."}
  ]'::jsonb,
  false,
  (select id from auth.users limit 1)
);
