-- Drop existing table and recreate with complete schema
drop table if exists public.institutions cascade;

-- Create institutions table with all required fields from CSV
create table if not exists public.institutions (
  id uuid primary key default gen_random_uuid(),
  area_educativa text not null,
  departamento text not null,
  distrito text,
  cod_institucion text not null,
  nombre_institucion text not null,
  sector text,
  ci_supervisor text,
  supervisor_a_cargo text not null,
  contacto text,
  supervision_educativa text,
  eef_program text,
  dp_program text,
  created_at timestamp with time zone default now()
);

-- Enable RLS for security
alter table public.institutions enable row level security;

-- Allow public read access to institutions
create policy "institutions_select_all"
  on public.institutions for select
  using (true);

-- Create indexes for faster filtering
create index if not exists idx_institutions_area_educativa 
  on public.institutions(area_educativa);

create index if not exists idx_institutions_departamento 
  on public.institutions(departamento);

create index if not exists idx_institutions_cod_institucion 
  on public.institutions(cod_institucion);

-- Create a view for Capital department only (areas starting with 00-)
create or replace view public.institutions_capital as
select * from public.institutions
where area_educativa like '00-%'
order by area_educativa, nombre_institucion;

-- Grant access to the view
grant select on public.institutions_capital to anon, authenticated;
