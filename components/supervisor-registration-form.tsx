"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, User, AlertTriangle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type Institution = {
  id: string
  area_educativa: string
  departamento: string
  distrito: string | null
  cod_institucion: string
  nombre_institucion: string
  sector: string | null
  ci_supervisor: string | null
  supervisor_a_cargo: string
  contacto: string | null
  supervision_educativa: string | null
  eef_program: string | null
  dp_program: string | null
}

type SelectedSchoolWithDirector = {
  id: string
  name: string
  code: string
  director_name: string
  director_phone: string
}

type SupervisorRegistrationFormProps = {
  institutions: Institution[]
}

function formatInstitutionCode(code: string): string {
  const num = Number.parseInt(code.replace(/\D/g, ""), 10)
  if (isNaN(num)) return code
  return num.toLocaleString("es-PY")
}

function formatCI(ci: string): string {
  const num = ci.replace(/\D/g, "")
  if (num.length === 0) return ""
  return Number.parseInt(num, 10).toLocaleString("es-PY")
}

function stripCI(ci: string): string {
  return ci.replace(/\D/g, "")
}

export function SupervisorRegistrationForm({ institutions }: SupervisorRegistrationFormProps) {
  const [supervisorName, setSupervisorName] = useState("")
  const [supervisorCI, setSupervisorCI] = useState("")
  const [supervisorType, setSupervisorType] = useState<"Supervisor" | "Técnico" | "">("")
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedSchools, setSelectedSchools] = useState<SelectedSchoolWithDirector[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showValidationErrors, setShowValidationErrors] = useState(false)

  const supervisionAreas = Array.from(new Set(institutions.map((inst) => inst.area_educativa))).sort()

  const selectedAreaSupervisor = selectedArea
    ? institutions.find((inst) => inst.area_educativa === selectedArea)?.supervisor_a_cargo || ""
    : ""

  const filteredInstitutions = selectedArea ? institutions.filter((inst) => inst.area_educativa === selectedArea) : []

  const totalSchools = filteredInstitutions.length

  const eefInstitutions = filteredInstitutions.filter((inst) => inst.eef_program && inst.eef_program !== "-")
  const dpInstitutions = filteredInstitutions.filter((inst) => inst.dp_program && inst.dp_program !== "-")

  const missingInstitutions = filteredInstitutions.filter(
    (inst) => (!inst.eef_program || inst.eef_program === "-") && (!inst.dp_program || inst.dp_program === "-"),
  )

  const eefCount = eefInstitutions.length
  const dpCount = dpInstitutions.length
  const missingCount = missingInstitutions.length
  const eefPercentage = totalSchools > 0 ? Math.round((eefCount / totalSchools) * 100) : 0
  const dpPercentage = totalSchools > 0 ? Math.round((dpCount / totalSchools) * 100) : 0
  const missingPercentage = totalSchools > 0 ? Math.round((missingCount / totalSchools) * 100) : 0

  const isSchoolSelected = (schoolId: string) => {
    return selectedSchools.some((school) => school.id === schoolId)
  }

  const handleSchoolToggle = (schoolId: string, schoolName: string, schoolCode: string) => {
    setSelectedSchools((prev) => {
      const isSelected = prev.some((school) => school.id === schoolId)

      if (isSelected) {
        return prev.filter((school) => school.id !== schoolId)
      } else {
        return [...prev, { id: schoolId, name: schoolName, code: schoolCode, director_name: "", director_phone: "" }]
      }
    })
  }

  const handleDirectorInfoChange = (schoolId: string, field: "director_name" | "director_phone", value: string) => {
    setSelectedSchools((prev) =>
      prev.map((school) => (school.id === schoolId ? { ...school, [field]: value } : school)),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const allDirectorInfoComplete = selectedSchools.every(
      (school) => school.director_name.trim() !== "" && school.director_phone.trim() !== "",
    )

    if (!supervisorName || !supervisorCI || !supervisorType || !selectedArea || selectedSchools.length < 1) {
      alert("Por favor, complete todos los campos y seleccione al menos 1 colegio.")
      return
    }

    if (!allDirectorInfoComplete) {
      alert("Por favor, complete el nombre y teléfono del director para todos los colegios seleccionados.")
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()

      const responseData: any = {
        supervisor_name: supervisorName,
        supervisor_ci: stripCI(supervisorCI), // Remove thousand separator before saving
        supervisor_type: supervisorType,
        supervision_area: selectedArea,
      }

      // Add each school to separate columns
      selectedSchools.forEach((school, index) => {
        const schoolNum = index + 1
        responseData[`school_${schoolNum}_name`] = school.name
        responseData[`school_${schoolNum}_code`] = school.code
        responseData[`school_${schoolNum}_director_name`] = school.director_name
        responseData[`school_${schoolNum}_director_phone`] = school.director_phone
      })

      const { error } = await supabase.from("supervisor_responses").insert(responseData)

      if (error) throw error

      setSubmitSuccess(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Error al enviar el formulario. Por favor, intente nuevamente.")
      setIsSubmitting(false)
    }
  }

  const handleCloseSuccess = () => {
    setSupervisorName("")
    setSupervisorCI("")
    setSupervisorType("")
    setSelectedArea("")
    setSelectedSchools([])
    setSubmitSuccess(false)
    setIsSubmitting(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isSubmitEnabled =
    supervisorName &&
    supervisorCI &&
    supervisorType &&
    selectedArea &&
    selectedSchools.length >= 1 &&
    selectedSchools.every((school) => school.director_name.trim() !== "" && school.director_phone.trim() !== "")

  const isBasicInfoComplete = supervisorName.trim() !== "" && supervisorCI.trim() !== "" && supervisorType !== ""

  const handleAreaSelectClick = () => {
    if (!isBasicInfoComplete) {
      setShowValidationErrors(true)

      const missingFields = []
      if (!supervisorName.trim()) missingFields.push("Nombre")
      if (!supervisorCI.trim()) missingFields.push("Número de CI")
      if (!supervisorType) missingFields.push("Tipo")

      const message = `Por favor, complete los siguientes campos: ${missingFields.join(", ")}`
      toast.error(message, {
        duration: 4000,
      })
    }
  }

  const areaSelectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedArea && areaSelectionRef.current) {
      // Scroll to the area section with smooth behavior
      areaSelectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [selectedArea])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">¡Envío Registrado!</h3>
              <p className="text-slate-600">Su registro ha sido enviado exitosamente.</p>
              <Button
                onClick={handleCloseSuccess}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2"
              >
                Listo
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Información Personal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="supervisor-name">Nombre</Label>
              <Input
                id="supervisor-name"
                placeholder="Ej: Juan Pérez"
                value={supervisorName}
                onChange={(e) => {
                  setSupervisorName(e.target.value)
                  if (showValidationErrors && e.target.value.trim()) {
                    setShowValidationErrors(false)
                  }
                }}
                required
                className={cn(
                  showValidationErrors && !supervisorName.trim() && "border-yellow-400 border-2 ring-2 ring-yellow-200",
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supervisor-ci">Número de CI</Label>
              <Input
                id="supervisor-ci"
                placeholder="Ej: 1.234.567"
                value={supervisorCI}
                onChange={(e) => {
                  const formatted = formatCI(e.target.value)
                  setSupervisorCI(formatted)
                  if (showValidationErrors && formatted.trim()) {
                    setShowValidationErrors(false)
                  }
                }}
                required
                className={cn(
                  showValidationErrors && !supervisorCI.trim() && "border-yellow-400 border-2 ring-2 ring-yellow-200",
                )}
              />
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Label>Tipo</Label>
            <RadioGroup
              value={supervisorType}
              onValueChange={(value) => {
                setSupervisorType(value as "Supervisor" | "Técnico")
                if (showValidationErrors && value) {
                  setShowValidationErrors(false)
                }
              }}
              className={cn(
                "flex flex-row gap-6",
                showValidationErrors &&
                  !supervisorType &&
                  "p-3 border-2 border-yellow-400 ring-2 ring-yellow-200 rounded-md",
              )}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Supervisor" id="supervisor" />
                <Label htmlFor="supervisor" className="font-normal cursor-pointer">
                  Supervisor
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Técnico" id="tecnico" />
                <Label htmlFor="tecnico" className="font-normal cursor-pointer">
                  Técnico
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card ref={areaSelectionRef}>
        <CardHeader>
          <CardTitle className="text-2xl">Seleccionar Área</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="supervision-area">Área de Supervisión</Label>
            <Select
              value={selectedArea}
              onValueChange={(value) => {
                setSelectedArea(value)
                setSelectedSchools([])
              }}
              disabled={!isBasicInfoComplete}
            >
              <SelectTrigger
                id="supervision-area"
                onClick={handleAreaSelectClick}
                className={cn(!isBasicInfoComplete && "opacity-60 cursor-not-allowed")}
              >
                <SelectValue placeholder="Seleccione área" />
              </SelectTrigger>
              <SelectContent>
                {supervisionAreas.map((area) => (
                  <SelectItem key={area} value={area}>
                    Área {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!isBasicInfoComplete && (
              <p className="text-sm text-amber-600 font-medium">
                Complete la información del responsable para seleccionar un área
              </p>
            )}
          </div>

          {selectedArea && selectedAreaSupervisor && (
            <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Supervisor del Área</p>
                <p className="text-lg font-semibold text-blue-900">{selectedAreaSupervisor}</p>
              </div>
            </div>
          )}

          {selectedArea && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-100 rounded-lg p-4 text-center">
                <p className="text-sm text-slate-600 mb-1">Total Colegios</p>
                <p className="text-3xl font-bold text-slate-900">{totalSchools}</p>
              </div>
              <div className="bg-emerald-100 rounded-lg p-4 text-center">
                <p className="text-sm text-emerald-700 mb-1">Logrado EEF</p>
                <p className="text-3xl font-bold text-emerald-900">{eefPercentage}%</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-4 text-center">
                <p className="text-sm text-blue-700 mb-1">Logrado OV</p>
                <p className="text-3xl font-bold text-blue-900">{dpPercentage}%</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedArea && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Instituciones por Programa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-base py-1.5 px-3">
                  Instituciones Financiera (EEF)
                </Badge>
                <span className="text-sm font-medium text-slate-700">
                  {eefCount} de {totalSchools} instituciones
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
                  {eefPercentage}%
                </span>
              </div>
              {eefInstitutions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {eefInstitutions.map((inst) => (
                    <div key={inst.id} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-emerald-900">
                        {inst.nombre_institucion} - {formatInstitutionCode(inst.cod_institucion)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <p className="text-sm text-emerald-700 italic text-center">
                    No hay instituciones con programa EEF en esta área
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Badge className="bg-blue-600 hover:bg-blue-700 text-base py-1.5 px-3">
                  Instituciones Orientación (DP/OV)
                </Badge>
                <span className="text-sm font-medium text-slate-700">
                  {dpCount} de {totalSchools} instituciones
                </span>
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded">
                  {dpPercentage}%
                </span>
              </div>
              {dpInstitutions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dpInstitutions.map((inst) => (
                    <div key={inst.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-900">
                        {inst.nombre_institucion} - {formatInstitutionCode(inst.cod_institucion)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700 italic text-center">
                    No hay instituciones con programa OV en esta área
                  </p>
                </div>
              )}
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center gap-1">
                <div className="w-full border-t-2 border-red-500" />
                <div className="w-full border-t-2 border-red-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <Badge className="bg-red-600 hover:bg-red-700 text-base py-1.5 px-3 shadow-sm">
                  <AlertTriangle className="w-4 h-4 mr-1.5 inline" />
                  Instituciones Faltantes
                </Badge>
                <span className="text-sm font-medium text-slate-700">
                  {missingCount} de {totalSchools} instituciones
                </span>
                <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded">
                  {missingPercentage}%
                </span>
              </div>
              {missingInstitutions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {missingInstitutions.map((inst) => (
                    <div key={inst.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-red-900">
                        {inst.nombre_institucion} - {formatInstitutionCode(inst.cod_institucion)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <p className="text-sm text-emerald-600 font-medium italic text-center">
                    ¡Excelente! Todas las instituciones tienen programa asignado
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedArea && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Seleccione los colegios en los cuales nos apoyará</CardTitle>
            <p className="text-sm text-blue-700 mt-2 font-medium">
              Seleccionados: {selectedSchools.length} {selectedSchools.length >= 1 ? "✓" : `(mínimo 1)`}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInstitutions.map((inst) => {
                const isSelected = isSchoolSelected(inst.id)
                const schoolData = selectedSchools.find((school) => school.id === inst.id)

                return (
                  <div key={inst.id} className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handleSchoolToggle(inst.id, inst.nombre_institucion, inst.cod_institucion)}
                      className={cn(
                        "w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left",
                        isSelected
                          ? "border-green-600 bg-green-50 shadow-sm"
                          : "border-blue-200 bg-white hover:border-blue-300",
                      )}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      )}
                      <span className={cn("text-sm font-medium", isSelected ? "text-green-900" : "text-blue-900")}>
                        {inst.nombre_institucion} - {formatInstitutionCode(inst.cod_institucion)}
                      </span>
                    </button>

                    {isSelected && schoolData && (
                      <div className="ml-8 p-4 bg-green-50 rounded-lg border border-green-200 space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor={`director-name-${inst.id}`} className="text-sm font-medium text-green-900">
                            Nombre y Apellido del Director
                          </Label>
                          <Input
                            id={`director-name-${inst.id}`}
                            placeholder="Ej: Juan Pérez"
                            value={schoolData.director_name}
                            onChange={(e) => handleDirectorInfoChange(inst.id, "director_name", e.target.value)}
                            required
                            className="bg-white border-green-300 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`director-phone-${inst.id}`} className="text-sm font-medium text-green-900">
                            Número de Teléfono
                          </Label>
                          <Input
                            id={`director-phone-${inst.id}`}
                            placeholder="Ej: 0985123456"
                            value={schoolData.director_phone}
                            onChange={(e) => handleDirectorInfoChange(inst.id, "director_phone", e.target.value)}
                            pattern="[0-9]{10}"
                            title="Ingrese un número de 10 dígitos (Ej: 0985123456)"
                            required
                            className="bg-white border-green-300 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedArea && (
        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            disabled={!isSubmitEnabled || isSubmitting}
            className="min-w-[200px] disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Enviar Registro"}
          </Button>
        </div>
      )}
    </form>
  )
}
