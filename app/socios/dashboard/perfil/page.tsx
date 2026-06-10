"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSocio, getIniciales } from "@/hooks/use-socio"
import { createClient } from "@/lib/supabase/client"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  Camera,
  Shield,
  CheckCircle,
  Loader2,
  AlertCircle
} from "lucide-react"

export default function PerfilSocioPage() {
  const { socio, isLoading, error, mutate } = useSocio()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    direccion: "",
    fecha_nacimiento: "",
    dni: "",
  })

  // Cargar datos del socio en el formulario
  useEffect(() => {
    if (socio) {
      setFormData({
        nombre: socio.nombre ?? "",
        apellidos: socio.apellidos ?? "",
        email: socio.email ?? "",
        telefono: socio.telefono ?? "",
        direccion: socio.direccion ?? "",
        fecha_nacimiento: socio.fecha_nacimiento ?? "",
        dni: socio.dni ?? "",
      })
    }
  }, [socio])

  const handleSave = async () => {
    setSaving(true)
    setSaveError(null)
    try {
      const res = await fetch("/api/socios/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          telefono: formData.telefono,
          direccion: formData.direccion,
          fecha_nacimiento: formData.fecha_nacimiento,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al guardar")

      await mutate()
      setSaved(true)
      setIsEditing(false)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  const handleResetPassword = async () => {
    if (!socio?.email) return
    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(socio.email, {
      redirectTo: `${window.location.origin}/socios/login`,
    })
    if (resetError) {
      alert("No se pudo enviar el email de cambio de contraseña.")
    } else {
      alert("Te hemos enviado un email para restablecer tu contraseña.")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !socio) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center space-y-4">
        <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <AlertCircle className="h-7 w-7 text-destructive" />
        </div>
        <h2 className="text-xl font-bold">No pudimos cargar tu perfil</h2>
        <p className="text-muted-foreground">
          {error?.message || "No se encontró ningún socio asociado a tu cuenta."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Mi Perfil</h1>
          <p className="text-muted-foreground mt-1">Gestiona tu información personal</p>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Editar perfil
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="bg-primary hover:bg-primary/90"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Guardar cambios
              </Button>
            </>
          )}
        </div>
      </motion.div>

      {/* Success message */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3"
        >
          <CheckCircle className="w-5 h-5 text-primary" />
          <span className="text-primary font-medium">Cambios guardados correctamente</span>
        </motion.div>
      )}

      {/* Error message */}
      {saveError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-destructive" />
          <span className="text-destructive font-medium">{saveError}</span>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Avatar y datos básicos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-card rounded-2xl border border-border p-6 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-4xl font-heading font-bold mx-auto">
                {getIniciales(formData.nombre, formData.apellidos)}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <h2 className="text-xl font-heading font-bold mt-4">
              {formData.nombre} {formData.apellidos}
            </h2>
            <p className="text-muted-foreground">Socio #{socio.numero_socio}</p>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Socio {socio.tipo}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {socio.fecha_alta
                  ? `Miembro desde ${new Date(socio.fecha_alta).toLocaleDateString("es-ES", {
                      month: "long",
                      year: "numeric",
                    })}`
                  : "Miembro del club"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Formulario de datos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <h3 className="text-lg font-heading font-bold mb-6">Información Personal</h3>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  disabled={!isEditing}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apellidos" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Apellidos
                </Label>
                <Input
                  id="apellidos"
                  value={formData.apellidos}
                  onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                  disabled={!isEditing}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="h-12 bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">El email es tu usuario de acceso y no se puede cambiar aquí</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefono" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  disabled={!isEditing}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="direccion" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  Dirección
                </Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  disabled={!isEditing}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fechaNacimiento" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  Fecha de nacimiento
                </Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                  disabled={!isEditing}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dni" className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  DNI
                </Label>
                <Input
                  id="dni"
                  value={formData.dni}
                  disabled
                  className="h-12 bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">El DNI no se puede modificar</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Seguridad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border p-6 md:p-8"
      >
        <h3 className="text-lg font-heading font-bold mb-6">Seguridad</h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/30 rounded-xl">
          <div>
            <p className="font-medium">Contraseña</p>
            <p className="text-sm text-muted-foreground">Recibirás un email para restablecerla de forma segura</p>
          </div>
          <Button variant="outline" onClick={handleResetPassword}>
            Cambiar contraseña
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
