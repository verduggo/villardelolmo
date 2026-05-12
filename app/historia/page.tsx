"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeIn } from "@/components/motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function HistoriaPage() {
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
                HISTORIA &nbsp; HISTORIA &nbsp; HISTORIA
              </span>
            </motion.div>
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 relative">
            <FadeIn>
              <Link
                href="/"
                className="inline-flex items-center text-white/60 hover:text-white mb-8 text-sm transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                <span className="tracking-[0.1em] uppercase">Volver</span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-display text-5xl md:text-7xl lg:text-8xl text-white mb-6">
                NUESTRA
                <br />
                <span className="text-white/40">HISTORIA</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/70 text-lg md:text-xl max-w-xl">
                Mas de 50 anos de pasion, esfuerzo y futbol en el corazon de Madrid.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Section 1 — Historia del Club (fondo blanco) */}
        <section className="py-24 md:py-40 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-20 flex flex-col items-center text-center">
            <FadeIn delay={0.1}>
              <div className="w-full max-w-2xl overflow-hidden mb-10 shadow-md">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/historia-equipo.jpg"
                    alt="Historia del equipo C.D. Unión Deportiva Villar del Olmo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="max-w-2xl space-y-4 text-foreground/80 leading-relaxed text-lg">
                <p>
                  El C.D. Union Deportiva Villar del Olmo nacio en 1970 por iniciativa de un grupo de vecinos
                  apasionados por el futbol que querian crear un espacio donde los jovenes del municipio pudieran
                  practicar deporte.
                </p>
                <p>
                  Desde entonces, el club ha crecido hasta convertirse en una referencia del futbol base en la zona
                  este de Madrid. Cientos de jugadores han pasado por nuestras filas, muchos de ellos alcanzando
                  categorias superiores del futbol espanol.
                </p>
                <p>
                  Hoy, con mas de 300 jugadores distribuidos en 12 equipos federados, seguimos fieles a nuestra
                  mision: formar futbolistas y, sobre todo, buenas personas.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Section 2 — Historia del Pueblo (fondo negro) */}
        <section className="py-24 md:py-40 bg-foreground">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 xl:px-20 flex flex-col items-center text-center">
            <FadeIn delay={0.1}>
              <div className="w-full max-w-2xl overflow-hidden mb-10 shadow-md">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/historia-ayuntamiento.jpg"
                    alt="Ayuntamiento de Villar del Olmo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="max-w-2xl space-y-4 text-background/80 leading-relaxed text-lg">
                <p>
                  Villar del Olmo es un municipio situado en la comarca de Las Vegas, al este de la Comunidad de
                  Madrid, con una rica historia que se remonta a la Edad Media.
                </p>
                <p>
                  Su nombre evoca el olmo que durante siglos presidio la plaza del pueblo, simbolo de vida y reunion
                  para sus vecinos. La villa ha conservado a lo largo de los siglos su identidad rural y su fuerte
                  vinculo comunitario.
                </p>
                <p>
                  El futbol llego al pueblo como una extension natural de ese espiritu de union, convirtiendose en
                  el deporte mas querido y en un pilar fundamental de la vida social y cultural de Villar del Olmo.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
