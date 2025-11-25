-- Seed institutions data from the provided dataset
-- This is sample data based on the structure described

insert into public.institutions (name, supervision_area, eef_program, dp_program) values
  ('Colegio Nacional EMD Dr. Raúl Peña', '00-01', 'EEF 2025', '-'),
  ('Colegio Nacional Asunción Escalada', '00-01', '-', 'DP 2025'),
  ('Escuela Básica N° 123', '00-01', 'EEF 2025', 'DP 2025'),
  ('Instituto Técnico Superior', '00-03', 'EEF 2025', '-'),
  ('Colegio San José', '00-03', '-', 'DP 2025'),
  ('Escuela República Argentina', '00-03', '-', '-'),
  ('Colegio Nacional de la Capital', '00-05', 'EEF 2025', 'DP 2025'),
  ('Instituto Privado Modelo', '00-05', 'EEF 2025', '-'),
  ('Escuela Básica Central', '00-05', '-', 'DP 2025')
on conflict do nothing;
