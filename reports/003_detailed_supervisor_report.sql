-- =====================================================
-- CONSULTA: Reporte Detallado de Supervisores
-- =====================================================
-- Esta consulta te da un reporte completo con todos los detalles

-- Reporte completo ordenado por departamento y alcance
select 
  row_number() over (partition by departamento order by alcance_promedio_total desc) as "Ranking en Depto",
  departamento as "Departamento",
  area_educativa as "Área Educativa",
  supervisor_name as "Nombre del Supervisor",
  ci_supervisor as "CI del Supervisor",
  total_instituciones as "Total Instituciones",
  instituciones_eef as "Instituciones EEF",
  instituciones_ov as "Instituciones OV",
  instituciones_con_apoyo as "Instituciones con Apoyo",
  logrado_eef_porcentaje || '%' as "Logrado EEF",
  logrado_ov_porcentaje || '%' as "Logrado OV",
  alcance_promedio_total || '%' as "Alcance Promedio Total"
from supervisor_performance
order by departamento, alcance_promedio_total desc;

-- Reporte resumido por departamento (estadísticas generales)
select 
  departamento as "Departamento",
  count(*) as "Total Áreas",
  sum(total_instituciones) as "Total Instituciones",
  sum(instituciones_con_apoyo) as "Total con Apoyo",
  round(avg(alcance_promedio_total), 2) || '%' as "Alcance Promedio del Depto"
from supervisor_performance
group by departamento
order by avg(alcance_promedio_total) desc;
