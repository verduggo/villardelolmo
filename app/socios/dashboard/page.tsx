"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSocio, getIniciales } from "@/hooks/use-socio"
import { 
  CreditCard, 
  Calendar, 
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react"

const quickActions = [
  { 
    title: "Ver carnet", 
    description: "Accede a tu carnet digital",
    href: "/socios/dashboard/carnet",
    icon: CreditCard
  },
  {
    title: "Mi perfil",
    description: "Consulta y edita tus datos",
    href: "/socios/dashboard/perfil",
    icon: TrendingUp
  }
]

export default function SociosDashboardPage() {
  const { socio, isLoading, error } = useSocio()

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
        <h2 className="text-xl font-bold">No pudimos cargar tus datos</h2>
        <p className="text-muted-foreground">
          {error?.message || "No se encontró ningún socio asociado a tu cuenta. Contacta con el club."}
        </p>
      </div>
    )
  }

  const anioAlta = socio.fecha_alta ? new Date(socio.fecha_alta).getFullYear() : null
  const aniosComoSocio = anioAlta ? new Date().getFullYear() - anioAlta : null
  const cuotaAlDia = socio.estado === "activo"

  const stats = [
    {
      label: "Socio desde",
      value: anioAlta ? String(anioAlta) : "—",
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      label: "Años como socio",
      value: aniosComoSocio !== null ? String(aniosComoSocio) : "—",
      icon: TrendingUp,
      color: "bg-primary",
    },
    {
      label: "Estado",
      value: socio.estado === "activo" ? "Activo" : "Inactivo",
      icon: CheckCircle2,
      color: cuotaAlDia ? "bg-emerald-500" : "bg-amber-500",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Bienvenido, {socio.nombre}
            </h1>
            <p className="text-muted-foreground mt-1">
              Socio #{socio.numero_socio} | Categoría {socio.tipo}
            </p>
          </div>
          <Link href="/socios/dashboard/carnet">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <CreditCard className="h-4 w-4" />
              Ver mi carnet
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl lg:text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-2.5 rounded-lg`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick actions + carnet preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3 space-y-4"
        >
          <h2 className="text-lg font-semibold">Acciones rápidas</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="border-none shadow-sm hover:shadow-md transition-all group cursor-pointer h-full">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <action.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Member card preview */}
          <Card className="border-none shadow-sm overflow-hidden mt-6 max-w-2xl">
            <div className="bg-gradient-to-br from-primary via-primary to-primary/70 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/70 text-sm">Carnet de Socio</p>
                  <h3 className="text-xl font-bold mt-1">{socio.nombre} {socio.apellidos}</h3>
                  <p className="text-white/70 text-sm mt-4">N° Socio</p>
                  <p className="text-2xl font-bold tracking-wider">{socio.numero_socio}</p>
                </div>
                <div className="text-right">
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    {getIniciales(socio.nombre, socio.apellidos)}
                  </div>
                  <p className="text-white/70 text-xs mt-3">Categoría</p>
                  <p className="font-semibold">{socio.tipo}</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4 bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className={`h-4 w-4 ${cuotaAlDia ? "text-emerald-500" : "text-amber-500"}`} />
                  {cuotaAlDia ? "Cuota al día" : "Revisar estado de cuota"}
                </div>
                <Link href="/socios/dashboard/carnet">
                  <Button variant="ghost" size="sm" className="gap-1 text-primary">
                    Ver carnet completo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
