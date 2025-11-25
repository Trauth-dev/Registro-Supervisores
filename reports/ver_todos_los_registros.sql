-- ============================================
-- CONSULTA SIMPLE: VER TODOS LOS REGISTROS
-- ============================================
-- Esta consulta te muestra TODOS los registros que se han cargado
-- Copia y pega esto en el SQL Editor de Supabase y ejecuta

SELECT 
  id,
  created_at as "Fecha de Registro",
  supervisor_name as "Nombre del Supervisor",
  supervisor_ci as "CI del Supervisor",
  supervisor_type as "Tipo",
  supervision_area as "Área de Supervisión",
  
  -- Colegio 1
  school_1_name as "Colegio 1",
  school_1_code as "Código 1",
  school_1_director_name as "Director 1",
  school_1_director_phone as "Teléfono 1",
  
  -- Colegio 2
  school_2_name as "Colegio 2",
  school_2_code as "Código 2",
  school_2_director_name as "Director 2",
  school_2_director_phone as "Teléfono 2",
  
  -- Colegio 3
  school_3_name as "Colegio 3",
  school_3_code as "Código 3",
  school_3_director_name as "Director 3",
  school_3_director_phone as "Teléfono 3",
  
  -- Colegio 4
  school_4_name as "Colegio 4",
  school_4_code as "Código 4",
  school_4_director_name as "Director 4",
  school_4_director_phone as "Teléfono 4",
  
  -- Colegio 5
  school_5_name as "Colegio 5",
  school_5_code as "Código 5",
  school_5_director_name as "Director 5",
  school_5_director_phone as "Teléfono 5"

FROM supervisor_responses
ORDER BY created_at DESC;

-- NOTA: Esta consulta muestra hasta 5 colegios. 
-- Si necesitas ver más colegios (6-10), usa la consulta completa abajo.
