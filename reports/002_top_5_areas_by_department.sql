-- =====================================================
-- CONSULTA: Top 5 Áreas con Mayor Alcance por Departamento
-- =====================================================
-- Ejecuta esta consulta para obtener el reporte de las 5 mejores áreas por departamento

-- OPCIÓN 1: Top 5 áreas de un departamento específico (ejemplo: Capital)
select 
  departamento,
  area_educativa as "Área",
  supervisor_name as "Supervisor",
  ci_supervisor as "CI",
  total_instituciones as "Total Instituciones",
  instituciones_con_apoyo as "Instituciones con Apoyo",
  logrado_eef_porcentaje as "Logrado EEF (%)",
  logrado_ov_porcentaje as "Logrado OV (%)",
  alcance_promedio_total as "Alcance Promedio Total (%)"
from supervisor_performance
where departamento = 'Capital'  -- Cambia 'Capital' por el departamento que necesites
order by alcance_promedio_total desc
limit 5;

-- OPCIÓN 2: Top 5 áreas de TODOS los departamentos
select 
  departamento as "Departamento",
  area_educativa as "Área",
  supervisor_name as "Supervisor",
  ci_supervisor as "CI",
  total_instituciones as "Total Instituciones",
  instituciones_con_apoyo as "Instituciones con Apoyo",
  logrado_eef_porcentaje as "Logrado EEF (%)",
  logrado_ov_porcentaje as "Logrado OV (%)",
  alcance_promedio_total as "Alcance Promedio Total (%)"
from supervisor_performance
order by departamento, alcance_promedio_total desc;

-- OPCIÓN 3: Top 5 áreas globales (sin importar departamento)
select 
  departamento as "Departamento",
  area_educativa as "Área",
  supervisor_name as "Supervisor",
  ci_supervisor as "CI",
  total_instituciones as "Total Instituciones",
  instituciones_con_apoyo as "Instituciones con Apoyo",
  logrado_eef_porcentaje as "Logrado EEF (%)",
  logrado_ov_porcentaje as "Logrado OV (%)",
  alcance_promedio_total as "Alcance Promedio Total (%)"
from supervisor_performance
order by alcance_promedio_total desc
limit 5;
