-- Update supervisor_responses table to store schools in separate columns
-- This allows for easier Excel export and data analysis

-- Drop the old table structure (backup data first if needed!)
drop table if exists public.supervisor_responses cascade;

-- Create new table with separate columns for each school
create table public.supervisor_responses (
  id uuid primary key default gen_random_uuid(),
  supervisor_name text not null,
  supervisor_ci text not null,
  supervisor_type text not null check (supervisor_type in ('Supervisor', 'Técnico')),
  supervision_area text not null,
  
  -- School 1 data
  school_1_name text,
  school_1_code text,
  school_1_director_name text,
  school_1_director_phone text,
  
  -- School 2 data
  school_2_name text,
  school_2_code text,
  school_2_director_name text,
  school_2_director_phone text,
  
  -- School 3 data
  school_3_name text,
  school_3_code text,
  school_3_director_name text,
  school_3_director_phone text,
  
  -- School 4 data (optional)
  school_4_name text,
  school_4_code text,
  school_4_director_name text,
  school_4_director_phone text,
  
  -- School 5 data (optional)
  school_5_name text,
  school_5_code text,
  school_5_director_name text,
  school_5_director_phone text,
  
  -- School 6 data (optional)
  school_6_name text,
  school_6_code text,
  school_6_director_name text,
  school_6_director_phone text,
  
  -- School 7 data (optional)
  school_7_name text,
  school_7_code text,
  school_7_director_name text,
  school_7_director_phone text,
  
  -- School 8 data (optional)
  school_8_name text,
  school_8_code text,
  school_8_director_name text,
  school_8_director_phone text,
  
  -- School 9 data (optional)
  school_9_name text,
  school_9_code text,
  school_9_director_name text,
  school_9_director_phone text,
  
  -- School 10 data (optional)
  school_10_name text,
  school_10_code text,
  school_10_director_name text,
  school_10_director_phone text,
  
  created_at timestamp with time zone default now()
);

-- Enable RLS for security
alter table public.supervisor_responses enable row level security;

-- Allow anyone to insert responses (public form)
create policy "responses_insert_all"
  on public.supervisor_responses for insert
  with check (true);

-- Allow anyone to view responses (for admin purposes)
create policy "responses_select_all"
  on public.supervisor_responses for select
  using (true);

-- Create indexes for faster filtering
create index if not exists idx_responses_supervision_area 
  on public.supervisor_responses(supervision_area);

create index if not exists idx_responses_supervisor_ci 
  on public.supervisor_responses(supervisor_ci);

create index if not exists idx_responses_created_at 
  on public.supervisor_responses(created_at desc);
