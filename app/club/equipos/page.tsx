"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeIn } from "@/components/motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const equipos = [
  {
    nombre: "Infantil",
    temporada: "Temporada 26-27",
    descripcion: "Nuestros jugadores de categoría infantil, formando los futbolistas del mañana con dedicación y pasión.",
    imagen: "/images/equipo-infantil.jpg",
  },
  {
    nombre: "Cadete",
    temporada: "Temporada 26-27",
    descripcion: "El equipo cadete trabaja cada día para consolidar los valores del club sobre el terreno de juego.",
    imagen: "/images/equipo-cadete.jpg",
  },
  {
    nombre: "Juvenil",
    temporada: "Temporada 26-27",
    descripcion: "Los juveniles representan la cantera más competitiva del club, con miras a dar el salto al fútbol senior.",
    imagen: "/images/equipo-juvenil.jpg",
  },
  {
    nombre: "Femenino",
    temporada: "Temporada 26-27",
    descripcion: "Nuestro equipo femenino, referente del fútbol femenino en la comarca este de Madrid.",
    imagen: "/images/equipo-femenino.jpg",
  },
  {
    nombre: "Sénior",
    temporada: "Temporada 26-27",
    descripcion: "El primer equipo del club, el buque insignia de la U.D. Villar del Olmo en la competición federada.",
    imagen: "/images/equipo-senior.jpg",
  },
]

export default function EquiposPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ x: [0, -500] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="whitespace-nowrap absolute bottom-0"
            >
              <span className="text-[20rem] font-bold text-white tracking-tighter">
                EQUIPOS &nbsp; EQUIPOS &nbsp; EQUIPOS
              </span>
            </motion.div>
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative">
            <FadeIn>
              <Link
                href="/club"
                className="inline-flex items-center text-white/60 hover:text-white mb-8 text-sm transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                <span className="tracking-[0.1em] uppercase">El Club</span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-display text-5xl md:text-7xl lg:text-8xl text-white mb-6">
                NUESTROS
                <br />
                <span className="text-white/40">EQUIPOS</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/70 text-lg md:text-xl max-w-xl">
                Cinco equipos federados que representan los colores del club cada fin de semana.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Equipos Grid */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {equipos.map((equipo, i) => (
                <FadeIn key={equipo.nombre} delay={i * 0.1}>
                  <div className="group flex flex-col bg-background border border-border overflow-hidden hover:border-primary transition-colors duration-300">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={equipo.imagen}
                        alt={`Equipo ${equipo.nombre} ${equipo.temporada}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                          {equipo.temporada}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-3">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase">
                        {equipo.nombre}
                      </h2>
                      <p className="text-foreground/60 text-sm leading-relaxed">
                        {equipo.descripcion}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
