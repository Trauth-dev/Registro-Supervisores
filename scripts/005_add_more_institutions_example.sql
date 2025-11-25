-- EJEMPLO: Cómo agregar más instituciones a la base de datos
-- Puede copiar y modificar este archivo para agregar sus propias instituciones

-- Insertar nuevas instituciones
insert into public.institutions (name, supervision_area, eef_program, dp_program) values
  ('Colegio Nacional Ejemplo 1', '00-01', 'EEF 2025', '-'),
  ('Escuela Básica Ejemplo 2', '00-02', '-', 'DP 2025'),
  ('Instituto Ejemplo 3', '00-03', 'EEF 2025', 'DP 2025');

-- NOTA: 
-- - Puede agregar tantas filas como necesite
-- - supervision_area debe coincidir con las áreas existentes o crear nuevas
-- - eef_program puede ser 'EEF 2025' o '-' (sin programa)
-- - dp_program puede ser 'DP 2025' o '-' (sin programa)
