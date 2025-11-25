-- Template for inserting institutions data from CSV
-- Replace this with your actual CSV data

-- Example format (you'll need to replace with your actual data):
insert into public.institutions (
  area_educativa,
  departamento,
  distrito,
  cod_institucion,
  nombre_institucion,
  sector,
  ci_supervisor,
  supervisor_a_cargo,
  contacto,
  supervision_educativa,
  eef_program,
  dp_program
) values
  -- Capital - Área 00-01
  ('00-01', 'Capital', 'Asunción', '2123', 'Colegio Nacional de la Capital', 'Público', '1234567', 'Juan Pérez', '0981234567', 'Supervisión 1', 'EEF 2025', 'DP 2025'),
  ('00-01', 'Capital', 'Asunción', '3456', 'Escuela Básica San José', 'Público', '1234567', 'Juan Pérez', '0981234567', 'Supervisión 1', 'EEF 2025', '-'),
  ('00-01', 'Capital', 'Asunción', '4789', 'Instituto Técnico Industrial', 'Público', '1234567', 'Juan Pérez', '0981234567', 'Supervisión 1', '-', 'DP 2025'),
  ('00-01', 'Capital', 'Asunción', '5012', 'Colegio Privado Santa María', 'Privado', '1234567', 'Juan Pérez', '0981234567', 'Supervisión 1', '-', '-'),
  
  -- Capital - Área 00-02
  ('00-02', 'Capital', 'Fernando de la Mora', '6234', 'Colegio Nacional Fernando', 'Público', '2345678', 'María González', '0982345678', 'Supervisión 2', 'EEF 2025', 'DP 2025'),
  ('00-02', 'Capital', 'Fernando de la Mora', '7456', 'Escuela Básica República', 'Público', '2345678', 'María González', '0982345678', 'Supervisión 2', 'EEF 2025', '-'),
  
  -- Capital - Área 00-03
  ('00-03', 'Capital', 'Lambaré', '8678', 'Colegio Nacional Lambaré', 'Público', '3456789', 'Carlos Rodríguez', '0983456789', 'Supervisión 3', '-', 'DP 2025'),
  ('00-03', 'Capital', 'Lambaré', '9890', 'Instituto Privado San Juan', 'Privado', '3456789', 'Carlos Rodríguez', '0983456789', 'Supervisión 3', 'EEF 2025', 'DP 2025');

-- NOTE: Replace the above data with your actual CSV data
-- Make sure to:
-- 1. Use the correct area_educativa codes
-- 2. Include all institutions from Capital department (00- prefix)
-- 3. Set eef_program to 'EEF 2025' or '-'
-- 4. Set dp_program to 'DP 2025' or '-'
