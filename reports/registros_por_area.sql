-- ============================================
-- REGISTROS POR ÁREA
-- ============================================
-- Esta consulta agrupa los registros por área de supervisión

SELECT 
  supervision_area as "Área de Supervisión",
  COUNT(*) as "Cantidad de Registros",
  STRING_AGG(DISTINCT supervisor_name, ', ') as "Supervisores"
FROM supervisor_responses
GROUP BY supervision_area
ORDER BY supervision_area;
