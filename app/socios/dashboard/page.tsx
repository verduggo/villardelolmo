"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CreditCard, 
  Calendar, 
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  Bell
} from "lucide-react"

const stats = [
  { 
    label: "Socio desde", 
    value: "2019", 
    icon: Calendar, 
    color: "bg-blue-500" 
  },
  { 
    label: "Años como socio", 
    value: "6", 
    icon: TrendingUp, 
    color: "bg-primary" 
  },
  { 
    label: "Estado", 
    value: "Activo", 
    icon: CheckCircle2, 
    color: "bg-emerald-500" 
  },
]

const notifications = [
  {
    id: 1,
    title: "Nuevo partido programado",
    description: "El próximo partido será el domingo a las 12:00h",
    time: "Hace 2 horas",
    unread: true
  },
  {
    id: 2,
    title: "Descuento disponible",
    description: "20% de descuento en equipación oficial",
    time: "Hace 1 día",
    unread: true
  },
  {
    id: 3,
    title: "Cuota renovada",
    description: "Tu cuota de socio ha sido renovada correctamente",
    time: "Hace 3 días",
    unread: false
  }
]

const quickActions = [
  { 
    title: "Ver carnet", 
    description: "Accede a tu carnet digital",
    href: "/socios/dashboard/carnet",
    icon: CreditCard
  }
]

export default function SociosDashboardPage() {
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
              Bienvenido, Juan
            </h1>
            <p className="text-muted-foreground mt-1">
              Socio #1234 | Categoría Adulto
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
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
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
        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-4"
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
          <Card className="border-none shadow-sm overflow-hidden mt-6">
            <div className="bg-gradient-to-br from-primary via-primary to-accent p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/70 text-sm">Carnet de Socio</p>
                  <h3 className="text-xl font-bold mt-1">Juan García López</h3>
                  <p className="text-white/70 text-sm mt-4">N° Socio</p>
                  <p className="text-2xl font-bold tracking-wider">1234</p>
                </div>
                <div className="text-right">
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    JG
                  </div>
                  <p className="text-white/70 text-xs mt-3">Válido hasta</p>
                  <p className="font-semibold">06/2026</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Cuota al día
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

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Notificaciones</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              Ver todas
            </Button>
          </div>
          <Card className="border-none shadow-sm">
            <CardContent className="p-0 divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                    notification.unread ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.unread ? "bg-primary" : "bg-transparent"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
