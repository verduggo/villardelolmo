"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ClubLogo } from "@/components/club-logo"
import { useSocio } from "@/hooks/use-socio"
import { 
  Download, 
  Share2, 
  QrCode,
  Shield,
  Calendar,
  User,
  Smartphone,
  CheckCircle,
  Loader2,
  AlertCircle
} from "lucide-react"

export default function CarnetSocioPage() {
  const { socio, isLoading, error } = useSocio()
  const [isFlipped, setIsFlipped] = useState(false)
  const [showQR, setShowQR] = useState(false)

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
        <h2 className="text-xl font-bold">No pudimos cargar tu carnet</h2>
        <p className="text-muted-foreground">
          {error?.message || "No se encontró ningún socio asociado a tu cuenta."}
        </p>
      </div>
    )
  }

  // Validez: 30 de junio del año siguiente al alta (o del próximo curso)
  const anioActual = new Date().getFullYear()
  const mesActual = new Date().getMonth()
  const validoHasta = new Date(mesActual >= 6 ? anioActual + 1 : anioActual, 5, 30).toISOString()

  const usuario = {
    nombre: socio.nombre,
    apellidos: socio.apellidos,
    numeroSocio: socio.numero_socio,
    tipoSocio: socio.tipo,
    fechaAlta: socio.fecha_alta ?? new Date().toISOString(),
    validoHasta,
    dni: socio.dni ?? "—",
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-heading font-bold text-foreground">Carnet Digital</h1>
        <p className="text-muted-foreground mt-1">Tu identificación como socio del club</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Carnet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div 
            className="relative w-full max-w-md cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative w-full aspect-[1.6/1] preserve-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Frontal */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 flex flex-col justify-between">
                  {/* Header del carnet */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <ClubLogo className="w-12 h-12 text-white" variant="white" />
                      <div>
                        <p className="text-white/80 text-xs uppercase tracking-wider">C.D. Unión Deportiva</p>
                        <p className="text-white font-heading font-bold text-lg">Villar del Olmo</p>
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <p className="text-white text-xs font-medium">SOCIO</p>
                    </div>
                  </div>

                  {/* Datos del socio */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Nombre</p>
                      <p className="text-white font-heading font-bold text-xl">
                        {usuario.nombre} {usuario.apellidos}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div>
                          <p className="text-white/70 text-xs uppercase tracking-wider">N° Socio</p>
                          <p className="text-white font-bold">{usuario.numeroSocio}</p>
                        </div>
                        <div>
                          <p className="text-white/70 text-xs uppercase tracking-wider">Tipo</p>
                          <p className="text-white font-bold">{usuario.tipoSocio}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-16 h-20 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <User className="w-8 h-8 text-white/60" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trasera */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl backface-hidden"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 flex flex-col justify-between">
                  {/* Banda magnética simulada */}
                  <div className="w-full h-10 bg-zinc-700 -mx-6 -mt-6 mb-4" style={{ width: "calc(100% + 3rem)" }} />
                  
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white rounded-xl p-2 mx-auto">
                        {/* QR Code simulado */}
                        <div className="w-full h-full bg-zinc-100 rounded grid grid-cols-8 gap-0.5 p-1">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`aspect-square ${Math.random() > 0.5 ? 'bg-zinc-900' : 'bg-white'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/60 text-xs mt-3">Escanea para verificar</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-white/60 text-xs">
                    <span>Válido hasta: {new Date(usuario.validoHasta).toLocaleDateString("es-ES")}</span>
                    <span>DNI: {usuario.dni}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Toca el carnet para ver el código QR
          </p>

          {/* Acciones */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Descargar
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Compartir
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => setShowQR(!showQR)}>
              <QrCode className="w-4 h-4" />
              Mostrar QR
            </Button>
          </div>
        </motion.div>

        {/* Información */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Estado del carnet */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-lg font-heading font-bold mb-4">Estado del Carnet</h3>
            
            <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-primary">Carnet Activo</p>
                <p className="text-sm text-muted-foreground">
                  Válido hasta el {new Date(usuario.validoHasta).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Datos del carnet */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-lg font-heading font-bold mb-4">Datos del Carnet</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Titular</span>
                </div>
                <span className="font-medium">{usuario.nombre} {usuario.apellidos}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Número de socio</span>
                </div>
                <span className="font-medium font-mono">{usuario.numeroSocio}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Socio desde</span>
                </div>
                <span className="font-medium">
                  {new Date(usuario.fechaAlta).toLocaleDateString("es-ES", {
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Categoría</span>
                </div>
                <span className="font-medium">Socio {usuario.tipoSocio}</span>
              </div>
            </div>
          </div>

          {/* Añadir a wallet */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-lg font-heading font-bold mb-4">Añadir a tu móvil</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Añade tu carnet a Apple Wallet o Google Pay para tenerlo siempre a mano.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2">
                <Smartphone className="w-4 h-4" />
                Apple Wallet
              </Button>
              <Button variant="outline" className="gap-2">
                <Smartphone className="w-4 h-4" />
                Google Pay
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowQR(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-48 h-48 bg-zinc-100 rounded-xl p-3 mx-auto">
              <div className="w-full h-full grid grid-cols-12 gap-0.5">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square ${Math.random() > 0.5 ? 'bg-zinc-900' : 'bg-white'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-lg font-heading font-bold mt-4">Socio #{usuario.numeroSocio}</p>
            <p className="text-muted-foreground text-sm">{usuario.nombre} {usuario.apellidos}</p>
            <Button 
              className="mt-6 w-full bg-primary hover:bg-primary/90"
              onClick={() => setShowQR(false)}
            >
              Cerrar
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
