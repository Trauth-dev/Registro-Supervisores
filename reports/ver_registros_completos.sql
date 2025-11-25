-- ============================================
-- CONSULTA COMPLETA: TODOS LOS CAMPOS
-- ============================================
-- Esta consulta muestra ABSOLUTAMENTE TODO lo que se cargó
-- Incluye todos los colegios (hasta 10)

SELECT 
  id,
  created_at as "Fecha de Registro",
  supervisor_name as "Nombre del Supervisor",
  supervisor_ci as "CI del Supervisor",
  supervisor_type as "Tipo",
  supervision_area as "Área de Supervisión",
  
  -- Todos los colegios
  school_1_name, school_1_code, school_1_director_name, school_1_director_phone,
  school_2_name, school_2_code, school_2_director_name, school_2_director_phone,
  school_3_name, school_3_code, school_3_director_name, school_3_director_phone,
  school_4_name, school_4_code, school_4_director_name, school_4_director_phone,
  school_5_name, school_5_code, school_5_director_name, school_5_director_phone,
  school_6_name, school_6_code, school_6_director_name, school_6_director_phone,
  school_7_name, school_7_code, school_7_director_name, school_7_director_phone,
  school_8_name, school_8_code, school_8_director_name, school_8_director_phone,
  school_9_name, school_9_code, school_9_director_name, school_9_director_phone,
  school_10_name, school_10_code, school_10_director_name, school_10_director_phone

FROM supervisor_responses
ORDER BY created_at DESC;
