# Cómo Exportar Datos a Excel desde Supabase

## Opción 1: Desde el Dashboard de Supabase (Más Fácil)

### Paso 1: Acceder a Supabase
1. Ve a [https://supabase.com](https://supabase.com)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto

### Paso 2: Ir al Editor de Tablas
1. En el menú lateral izquierdo, haz clic en **"Table Editor"**
2. Selecciona la tabla **"supervisor_responses"**

### Paso 3: Exportar los Datos
1. En la parte superior derecha de la tabla, busca el botón de **"Export"** (ícono de descarga)
2. Selecciona **"Export as CSV"**
3. El archivo se descargará automáticamente

### Paso 4: Abrir en Excel
1. Abre Microsoft Excel
2. Ve a **Archivo → Abrir**
3. Selecciona el archivo CSV descargado
4. Excel te preguntará cómo importar los datos:
   - Selecciona **"Delimitado"**
   - Marca **"Coma"** como delimitador
   - Haz clic en **"Finalizar"**

---

## Opción 2: Usando SQL (Para Usuarios Avanzados)

### Desde el SQL Editor de Supabase:

1. Ve a **"SQL Editor"** en el menú lateral
2. Copia y pega esta consulta:

\`\`\`sql
SELECT 
  supervisor_name as "Nombre del Supervisor",
  supervisor_ci as "CI del Supervisor",
  supervisor_type as "Tipo",
  supervision_area as "Área de Supervisión",
  school_1_name as "Colegio 1",
  school_1_code as "Código 1",
  school_1_director_name as "Director 1",
  school_1_director_phone as "Teléfono 1",
  school_2_name as "Colegio 2",
  school_2_code as "Código 2",
  school_2_director_name as "Director 2",
  school_2_director_phone as "Teléfono 2",
  school_3_name as "Colegio 3",
  school_3_code as "Código 3",
  school_3_director_name as "Director 3",
  school_3_director_phone as "Teléfono 3",
  school_4_name as "Colegio 4",
  school_4_code as "Código 4",
  school_4_director_name as "Director 4",
  school_4_director_phone as "Teléfono 4",
  school_5_name as "Colegio 5",
  school_5_code as "Código 5",
  school_5_director_name as "Director 5",
  school_5_director_phone as "Teléfono 5",
  created_at as "Fecha de Registro"
FROM supervisor_responses
ORDER BY created_at DESC;
\`\`\`

3. Haz clic en **"Run"**
4. Los resultados aparecerán abajo
5. Haz clic en el botón **"Download CSV"** en la parte superior de los resultados

---

## Opción 3: Filtrar Datos Antes de Exportar

Si quieres exportar solo ciertos registros (por ejemplo, de un área específica):

\`\`\`sql
SELECT 
  supervisor_name as "Nombre del Supervisor",
  supervisor_ci as "CI del Supervisor",
  supervisor_type as "Tipo",
  supervision_area as "Área de Supervisión",
  school_1_name as "Colegio 1",
  school_1_director_name as "Director 1",
  school_1_director_phone as "Teléfono 1",
  school_2_name as "Colegio 2",
  school_2_director_name as "Director 2",
  school_2_director_phone as "Teléfono 2",
  school_3_name as "Colegio 3",
  school_3_director_name as "Director 3",
  school_3_director_phone as "Teléfono 3",
  created_at as "Fecha de Registro"
FROM supervisor_responses
WHERE supervision_area = '00-01'  -- Cambia esto por el área que necesites
ORDER BY created_at DESC;
\`\`\`

---

## Opción 4: Exportar con Formato Personalizado

Para obtener un reporte más limpio con solo los datos esenciales:

\`\`\`sql
SELECT 
  supervisor_name || ' (CI: ' || supervisor_ci || ')' as "Responsable",
  supervision_area as "Área",
  school_1_name || ' - Director: ' || school_1_director_name as "Colegio 1",
  school_2_name || ' - Director: ' || school_2_director_name as "Colegio 2",
  school_3_name || ' - Director: ' || school_3_director_name as "Colegio 3",
  to_char(created_at, 'DD/MM/YYYY HH24:MI') as "Fecha y Hora"
FROM supervisor_responses
ORDER BY created_at DESC;
\`\`\`

---

## Estructura de las Columnas en Excel

Después de exportar, tu archivo Excel tendrá estas columnas:

| Columna | Descripción |
|---------|-------------|
| supervisor_name | Nombre del supervisor |
| supervisor_ci | Cédula de identidad (sin separadores) |
| supervisor_type | Tipo (Supervisor o Técnico) |
| supervision_area | Área de supervisión (ej: 00-01) |
| school_1_name | Nombre del primer colegio |
| school_1_code | Código institucional del primer colegio |
| school_1_director_name | Nombre del director del primer colegio |
| school_1_director_phone | Teléfono del director del primer colegio |
| school_2_name | Nombre del segundo colegio |
| ... | (y así sucesivamente hasta school_10) |
| created_at | Fecha y hora del registro |

---

## Consejos Adicionales

1. **Actualizar datos regularmente**: Exporta los datos periódicamente para tener respaldos
2. **Filtrar por fecha**: Puedes agregar `WHERE created_at >= '2025-01-01'` para exportar solo registros recientes
3. **Formato de CI**: El CI se guarda sin separadores de miles en la base de datos, pero puedes formatearlo en Excel usando formato de número personalizado
4. **Columnas vacías**: Si un supervisor seleccionó solo 3 colegios, las columnas school_4 a school_10 estarán vacías

---

## Soporte

Si tienes problemas para exportar los datos:
1. Verifica que tengas permisos de lectura en la tabla
2. Asegúrate de estar conectado a internet
3. Intenta refrescar la página de Supabase
4. Si el problema persiste, contacta al administrador del sistema
