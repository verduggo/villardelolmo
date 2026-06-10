"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  User,
  Mail,
  Shield,
  CreditCard,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function NuevoSocioPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    dni: "",
    direccion: "",
    codigo_postal: "",
    localidad: "",
    fecha_nacimiento: "",
    tipo_socio: "Adulto" as "Infantil" | "Juvenil" | "Adulto" | "Veterano",
    metodo_pago: "domiciliacion"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Generate numero_socio
      const { count } = await supabase
        .from("socios")
        .select("*", { count: "exact", head: true })
      
      const numeroSocio = String((count || 0) + 1).padStart(5, "0")

      const { error: insertError } = await supabase
        .from("socios")
        .insert({
          numero_socio: numeroSocio,
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email || "",
          telefono: formData.telefono || null,
          dni: formData.dni || null,
          direccion: formData.direccion || null,
          codigo_postal: formData.codigo_postal || null,
          localidad: formData.localidad || null,
          fecha_nacimiento: formData.fecha_nacimiento || null,
          tipo: formData.tipo_socio,
          estado: "activo",
          fecha_alta: new Date().toISOString().split("T")[0],
          cuota_anual: formData.tipo_socio === "Infantil" ? 50 : 
                       formData.tipo_socio === "Juvenil" ? 75 :
                       formData.tipo_socio === "Veterano" ? 80 : 100
        })

      if (insertError) throw insertError

      setSaved(true)
      setTimeout(() => {
        router.push("/admin/socios")
      }, 1500)
    } catch (err) {
      console.log("[v0] Error creating socio:", err)
      setError(err instanceof Error ? err.message : "Error al registrar el socio")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link href="/admin/socios">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-bold text-zinc-900">Nuevo Socio</h1>
          <p className="text-zinc-600">Registra un nuevo socio en el club</p>
        </div>
      </motion.div>

      {/* Success message */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-medium">Socio registrado correctamente. Redirigiendo...</span>
        </motion.div>
      )}

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-medium">{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos personales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-zinc-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="font-heading font-bold text-lg">Datos Personales</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos *</Label>
              <Input
                id="apellidos"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dni">DNI/NIE</Label>
              <Input
                id="dni"
                value={formData.dni}
                onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
              <Input
                id="fecha_nacimiento"
                type="date"
                value={formData.fecha_nacimiento}
                onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
              />
            </div>
          </div>
        </motion.div>

        {/* Contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-zinc-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="font-heading font-bold text-lg">Contacto</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codigo_postal">Código Postal</Label>
              <Input
                id="codigo_postal"
                value={formData.codigo_postal}
                onChange={(e) => setFormData({ ...formData, codigo_postal: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="localidad">Localidad</Label>
              <Input
                id="localidad"
                value={formData.localidad}
                onChange={(e) => setFormData({ ...formData, localidad: e.target.value })}
              />
            </div>
          </div>
        </motion.div>

        {/* Tipo de socio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-zinc-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="font-heading font-bold text-lg">Tipo de Socio</h2>
          </div>

          <div className="grid sm:grid-cols-4 gap-3">
            {[
              { id: "Infantil", label: "Infantil", desc: "Hasta 12 años", cuota: "50€/año" },
              { id: "Juvenil", label: "Juvenil", desc: "13-17 años", cuota: "75€/año" },
              { id: "Adulto", label: "Adulto", desc: "18-64 años", cuota: "100€/año" },
              { id: "Veterano", label: "Veterano", desc: "65+ años", cuota: "80€/año" }
            ].map((tipo) => (
              <button
                key={tipo.id}
                type="button"
                onClick={() => setFormData({ ...formData, tipo_socio: tipo.id as typeof formData.tipo_socio })}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  formData.tipo_socio === tipo.id
                    ? "border-primary bg-primary/5"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <p className="font-medium">{tipo.label}</p>
                <p className="text-sm text-zinc-500 mt-1">{tipo.desc}</p>
                <p className="text-xs text-primary font-semibold mt-2">{tipo.cuota}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Método de pago */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-zinc-200 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="font-heading font-bold text-lg">Método de Pago</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { id: "domiciliacion", label: "Domiciliación bancaria", desc: "Pago mensual automático" },
              { id: "tarjeta", label: "Tarjeta de crédito", desc: "Pago único anual" },
              { id: "efectivo", label: "Efectivo", desc: "Pago en oficina del club" }
            ].map((metodo) => (
              <button
                key={metodo.id}
                type="button"
                onClick={() => setFormData({ ...formData, metodo_pago: metodo.id })}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.metodo_pago === metodo.id
                    ? "border-primary bg-primary/5"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <p className="font-medium">{metodo.label}</p>
                <p className="text-sm text-zinc-500 mt-1">{metodo.desc}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end gap-3"
        >
          <Link href="/admin/socios">
            <Button variant="outline" disabled={saving}>Cancelar</Button>
          </Link>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 gap-2"
            disabled={saving || saved}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Guardando..." : "Registrar Socio"}
          </Button>
        </motion.div>
      </form>
    </div>
  )
}
