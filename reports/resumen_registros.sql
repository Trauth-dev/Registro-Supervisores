-- ============================================
-- RESUMEN: ESTADÍSTICAS DE REGISTROS
-- ============================================
-- Esta consulta te da un resumen de cuántos registros hay

SELECT 
  COUNT(*) as "Total de Registros",
  COUNT(DISTINCT supervision_area) as "Áreas Diferentes",
  COUNT(DISTINCT supervisor_ci) as "Supervisores Únicos",
  MIN(created_at) as "Primer Registro",
  MAX(created_at) as "Último Registro"
FROM supervisor_responses;
