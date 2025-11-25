-- INSTRUCCIONES PARA CARGAR TUS DATOS DEL CSV
-- ============================================
-- 
-- 1. Abre tu archivo CSV "Aux en buen formato final3.csv"
-- 2. Para cada fila (ignorando la primera columna auxiliar), crea un INSERT como el ejemplo abajo
-- 3. Reemplaza los valores de ejemplo con tus datos reales
-- 4. Ejecuta este script desde v0
--
-- MAPEO DE COLUMNAS:
-- - Área Educativa → area_educativa
-- - DEPARTAMENTO → departamento  
-- - DISTRITO → distrito
-- - COD. INSTITUCIÓN → cod_institucion
-- - NOMBRE DE INSTITUCION → nombre_institucion
-- - SECTOR → sector
-- - CI Supervisor → ci_supervisor
-- - Supervisor a Cargo → supervisor_a_cargo
-- - Contacto → contacto
-- - Supervisión Educativa → supervision_educativa
-- - Determina si tiene EEF 2025 → eef_program ('EEF 2025' o '-')
-- - Determina si tiene DP 2025 → dp_program ('DP 2025' o '-')

-- EJEMPLO DE FORMATO (reemplaza con tus datos reales):

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
  ('00-01', 'Capital', 'Asunción', '2123', 'Colegio Nacional de la Capital', 'Público', '1234567', 'Juan Pérez', '0981234567', 'Supervisión Educativa 1', 'EEF 2025', 'DP 2025'),
  ('00-01', 'Capital', 'Asunción', '3456', 'Escuela Básica San José', 'Público', '1234567', 'Juan Pérez', '0981234567', 'Supervisión Educativa 1', 'EEF 2025', '-'),
  ('00-01', 'Capital', 'Asunción', '4789', 'Instituto Técnico Industrial', 'Público', '1234567', 'Juan Pérez', '0981234567', 'Supervisión Educativa 1', '-', 'DP 2025'),
  ('00-02', 'Capital', 'Fernando de la Mora', '5012', 'Colegio Nacional Fernando', 'Público', '2345678', 'María González', '0982345678', 'Supervisión Educativa 2', 'EEF 2025', 'DP 2025');

-- CONTINÚA AGREGANDO TODAS TUS FILAS AQUÍ...
-- Recuerda:
-- - Solo incluir instituciones del departamento Capital (área_educativa empieza con '00-')
-- - Usar comillas simples para los textos
-- - Separar cada fila con coma
-- - La última fila NO lleva coma al final
