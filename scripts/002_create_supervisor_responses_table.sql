-- Create supervisor_responses table to store form submissions
create table if not exists public.supervisor_responses (
  id uuid primary key default gen_random_uuid(),
  supervisor_name text not null,
  supervisor_type text not null check (supervisor_type in ('Supervisor', 'Técnico')),
  supervision_area text not null,
  selected_schools jsonb not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS for security
alter table public.supervisor_responses enable row level security;

-- Allow anyone to insert responses (public form)
create policy "responses_insert_all"
  on public.supervisor_responses for insert
  with check (true);

-- Allow anyone to view responses (for admin purposes later)
create policy "responses_select_all"
  on public.supervisor_responses for select
  using (true);

-- Create index for faster filtering by supervision area
create index if not exists idx_responses_supervision_area 
  on public.supervisor_responses(supervision_area);
