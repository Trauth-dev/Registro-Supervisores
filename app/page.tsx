import { SupervisorRegistrationForm } from "@/components/supervisor-registration-form"
import { createClient } from "@/lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()

  const { data: institutions, error } = await supabase
    .from("institutions")
    .select("*")
    .ilike("area_educativa", "05-%")
    .order("area_educativa", { ascending: true })
    .order("nombre_institucion", { ascending: true })

  if (error) {
    console.error("Error fetching institutions:", error)
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error al cargar datos</h1>
          <p className="text-muted-foreground">Por favor, intente nuevamente más tarde.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Registro de Supervisores</h1>
          <p className="text-lg text-slate-600">Ministerio de Educación y Ciencias - Paraguay</p>
        </div>

        <SupervisorRegistrationForm institutions={institutions || []} />
      </div>
    </main>
  )
}
