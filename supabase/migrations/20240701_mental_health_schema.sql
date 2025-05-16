-- CATEGORIES
create table if not exists public.categories (
  id serial primary key,
  label text unique not null
);

-- PROVIDERS (minimal columns for now)
create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  name text not null
);

-- LINK (many‑to‑many)
create table if not exists public.provider_categories (
  provider_id uuid not null references public.providers(id) on delete cascade,
  category_id int not null references public.categories(id) on delete cascade,
  primary key (provider_id, category_id)
);

-- Seed categories if they don't exist
INSERT INTO public.categories (label)
VALUES 
  ('Anxiety'),
  ('Depression'),
  ('Addiction Recovery'),
  ('Trauma & PTSD'),
  ('Family Counseling'),
  ('Youth Services'),
  ('Crisis Support'),
  ('Wellbeing & Mindfulness')
ON CONFLICT (label) DO NOTHING;

-- Enable realtime for these tables
alter publication supabase_realtime add table categories;
alter publication supabase_realtime add table providers;
alter publication supabase_realtime add table provider_categories;