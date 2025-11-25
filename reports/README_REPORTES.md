# 📊 Guía de Reportes de Supervisores

## Cómo Usar los Reportes

### Paso 1: Crear la Vista (Solo una vez)

1. Ve a tu proyecto en [Supabase](https://supabase.com)
2. Abre el **SQL Editor**
3. Ejecuta el script `001_create_supervisor_performance_view.sql`
4. Esto creará una vista que se actualiza automáticamente con tus datos

### Paso 2: Ejecutar las Consultas

Una vez creada la vista, puedes ejecutar cualquiera de estas consultas cuando necesites el reporte:

#### 🏆 Top 5 Áreas por Departamento

**Archivo:** `002_top_5_areas_by_department.sql`

Tienes 3 opciones:
- **Opción 1:** Top 5 de un departamento específico (ej: Capital)
- **Opción 2:** Top 5 de cada departamento
- **Opción 3:** Top 5 global (todos los departamentos)

#### 📋 Reporte Detallado Completo

**Archivo:** `003_detailed_supervisor_report.sql`

Este reporte incluye:
- Ranking de supervisores por departamento
- Todas las métricas de rendimiento
- Estadísticas resumidas por departamento

### Cómo Exportar a Excel

1. Ejecuta la consulta en Supabase SQL Editor
2. Los resultados aparecerán en una tabla
3. Haz clic en el botón **"Download CSV"** en la esquina superior derecha
4. Abre el archivo CSV en Excel

### Métricas Explicadas

- **Total Instituciones:** Cantidad total de instituciones en el área
- **Instituciones EEF:** Instituciones con programa EEF
- **Instituciones OV:** Instituciones con programa OV (Orientación Vocacional)
- **Instituciones con Apoyo:** Instituciones donde el supervisor está brindando apoyo
- **Logrado EEF (%):** Porcentaje de instituciones EEF con apoyo
- **Logrado OV (%):** Porcentaje de instituciones OV con apoyo
- **Alcance Promedio Total (%):** Promedio unificado de EEF y OV (métrica principal de ranking)

### Actualización de Datos

La vista `supervisor_performance` se actualiza automáticamente cada vez que:
- Se registra un nuevo supervisor
- Se agregan instituciones
- Se modifican los datos

No necesitas hacer nada, los reportes siempre mostrarán datos actualizados.

### Ejemplos de Uso

**Ejemplo 1: Ver el top 5 de Capital**
\`\`\`sql
select * from supervisor_performance
where departamento = 'Capital'
order by alcance_promedio_total desc
limit 5;
\`\`\`

**Ejemplo 2: Ver todos los supervisores con más de 50% de alcance**
\`\`\`sql
select * from supervisor_performance
where alcance_promedio_total > 50
order by alcance_promedio_total desc;
\`\`\`

**Ejemplo 3: Comparar departamentos**
\`\`\`sql
select 
  departamento,
  count(*) as total_areas,
  round(avg(alcance_promedio_total), 2) as alcance_promedio
from supervisor_performance
group by departamento
order by alcance_promedio desc;
\`\`\`

## Notas Importantes

- ✅ Estos reportes NO afectan el funcionamiento de tu aplicación
- ✅ Son solo para consulta y análisis
- ✅ Puedes ejecutarlos cuantas veces quieras
- ✅ Los datos siempre están actualizados
- ✅ Puedes exportar a Excel/CSV fácilmente
