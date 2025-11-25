-- Create institutions table to store school data
create table if not exists public.institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  supervision_area text not null,
  eef_program text,
  dp_program text,
  created_at timestamp with time zone default now()
);

-- Enable RLS for security
alter table public.institutions enable row level security;

-- Allow public read access to institutions (supervisors need to see all schools)
create policy "institutions_select_all"
  on public.institutions for select
  using (true);

-- Create index for faster filtering by supervision area
create index if not exists idx_institutions_supervision_area 
  on public.institutions(supervision_area);
