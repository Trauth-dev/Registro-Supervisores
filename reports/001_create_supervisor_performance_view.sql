-- =====================================================
-- VISTA: Rendimiento de Supervisores por Área
-- =====================================================
-- Esta vista calcula automáticamente el rendimiento de cada supervisor
-- basado en las instituciones de su área y los registros de apoyo

create or replace view supervisor_performance as
with area_stats as (
  -- Calcular estadísticas por área educativa
  select 
    i.area_educativa,
    i.departamento,
    i.supervisor_a_cargo as supervisor_name,
    i.ci_supervisor,
    count(*) as total_instituciones,
    count(case when i.eef_program != '-' and i.eef_program is not null then 1 end) as instituciones_eef,
    count(case when i.dp_program != '-' and i.dp_program is not null then 1 end) as instituciones_ov
  from institutions i
  group by i.area_educativa, i.departamento, i.supervisor_a_cargo, i.ci_supervisor
),
support_stats as (
  -- Calcular cuántas instituciones están siendo apoyadas por área
  select 
    sr.supervision_area,
    count(distinct sr.school_1_name) + 
    count(distinct sr.school_2_name) + 
    count(distinct sr.school_3_name) +
    count(distinct sr.school_4_name) +
    count(distinct sr.school_5_name) +
    count(distinct sr.school_6_name) +
    count(distinct sr.school_7_name) +
    count(distinct sr.school_8_name) +
    count(distinct sr.school_9_name) +
    count(distinct sr.school_10_name) as instituciones_con_apoyo
  from supervisor_responses sr
  group by sr.supervision_area
)
select 
  a.departamento,
  a.area_educativa,
  a.supervisor_name,
  a.ci_supervisor,
  a.total_instituciones,
  a.instituciones_eef,
  a.instituciones_ov,
  coalesce(s.instituciones_con_apoyo, 0) as instituciones_con_apoyo,
  -- Calcular porcentaje de logro EEF
  case 
    when a.instituciones_eef > 0 then 
      round((coalesce(s.instituciones_con_apoyo, 0)::numeric / a.instituciones_eef::numeric) * 100, 2)
    else 0 
  end as logrado_eef_porcentaje,
  -- Calcular porcentaje de logro OV
  case 
    when a.instituciones_ov > 0 then 
      round((coalesce(s.instituciones_con_apoyo, 0)::numeric / a.instituciones_ov::numeric) * 100, 2)
    else 0 
  end as logrado_ov_porcentaje,
  -- Calcular promedio unificado de logro (EEF + OV) / 2
  case 
    when (a.instituciones_eef + a.instituciones_ov) > 0 then
      round(
        (
          (case when a.instituciones_eef > 0 then (coalesce(s.instituciones_con_apoyo, 0)::numeric / a.instituciones_eef::numeric) * 100 else 0 end) +
          (case when a.instituciones_ov > 0 then (coalesce(s.instituciones_con_apoyo, 0)::numeric / a.instituciones_ov::numeric) * 100 else 0 end)
        ) / 2, 2
      )
    else 0
  end as alcance_promedio_total
from area_stats a
left join support_stats s on a.area_educativa = s.supervision_area
order by a.departamento, alcance_promedio_total desc;

-- Comentario: Esta vista se actualiza automáticamente con los datos más recientes
