-- Run this in Supabase SQL Editor after creating your project.
-- Enable Email auth in Authentication > Providers.

-- Experiences (work, roles)
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  meta text not null,
  body text not null,
  sort_order int not null default 0
);

-- Education
create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  meta text not null,
  body text not null,
  sort_order int not null default 0
);

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text,
  subtitle text,
  "desc" text not null,
  img text,
  link text,
  cta text,
  cta_href text,
  sort_order int not null default 0
);

-- Awards
create table if not exists public.awards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  sub text,
  img text,
  alt text,
  sort_order int not null default 0
);

-- Certifications
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  meta text,
  img text,
  alt text,
  skills text,
  sort_order int not null default 0
);

-- Camps
create table if not exists public.camps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  meta text,
  body text not null,
  img text,
  alt text,
  flip boolean default false,
  sort_order int not null default 0
);

-- Languages
create table if not exists public.languages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level text not null,
  fill int not null default 50,
  sort_order int not null default 0
);

-- RLS: anyone can read, only authenticated users can write
alter table public.experiences enable row level security;
alter table public.education enable row level security;
alter table public.projects enable row level security;
alter table public.awards enable row level security;
alter table public.certifications enable row level security;
alter table public.camps enable row level security;
alter table public.languages enable row level security;

create policy "Public read experiences" on public.experiences for select using (true);
create policy "Auth write experiences" on public.experiences for all using (auth.role() = 'authenticated');

create policy "Public read education" on public.education for select using (true);
create policy "Auth write education" on public.education for all using (auth.role() = 'authenticated');

create policy "Public read projects" on public.projects for select using (true);
create policy "Auth write projects" on public.projects for all using (auth.role() = 'authenticated');

create policy "Public read awards" on public.awards for select using (true);
create policy "Auth write awards" on public.awards for all using (auth.role() = 'authenticated');

create policy "Public read certifications" on public.certifications for select using (true);
create policy "Auth write certifications" on public.certifications for all using (auth.role() = 'authenticated');

create policy "Public read camps" on public.camps for select using (true);
create policy "Auth write camps" on public.camps for all using (auth.role() = 'authenticated');

create policy "Public read languages" on public.languages for select using (true);
create policy "Auth write languages" on public.languages for all using (auth.role() = 'authenticated');
