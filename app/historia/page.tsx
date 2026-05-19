"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeIn } from "@/components/motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function HistoriaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary relative overflow-hidden">
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

        {/* Section 1 — Historia del Club: Imagen izquierda + Texto derecha */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Imagen del equipo */}
              <FadeIn>
                <div className="relative aspect-[4/3] w-full overflow-hidden shadow-lg">
                  <Image
                    src="/images/historia-equipo-real.jpg"
                    alt="Equipo C.D. Unión Deportiva Villar del Olmo"
                    fill
                    className="object-cover"
                  />
                </div>
              </FadeIn>
              
              {/* Texto historia del club */}
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <span className="text-xs font-semibold text-primary uppercase tracking-[0.25em]">
                    Historia del Club
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    Décadas formando futbolistas
                  </h2>
                  <div className="space-y-4 text-foreground/70 leading-relaxed">
                    <p>
                      El C.D. Unión Deportiva Villar del Olmo nació con la idea de acercar el fútbol a los jóvenes del municipio y crear un espacio donde competir, aprender y crecer dentro de un ambiente de equipo.
                    </p>
                    <p>
                      Con el paso de los años, el club se ha convertido en un punto de encuentro para muchas familias de Villar del Olmo y alrededores. Por sus equipos han pasado generaciones de jugadores que han defendido sus colores con ilusión, esfuerzo y respeto por este deporte.
                    </p>
                    <p>
                      Hoy, el club mantiene esa misma esencia: seguir impulsando el fútbol base, cuidar la cantera y representar al pueblo dentro y fuera del campo.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 2 — Historia del Pueblo: Texto izquierda + Imagen derecha */}
        <section className="py-20 md:py-32 bg-foreground">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Texto historia del pueblo */}
              <FadeIn>
                <div className="space-y-6">
                  <span className="text-xs font-semibold text-primary uppercase tracking-[0.25em]">
                    Historia del Pueblo
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Villar del Olmo
                  </h2>
                  <div className="space-y-4 text-white/70 leading-relaxed">
                    <p>
                      Villar del Olmo es un municipio del este de la Comunidad de Madrid, situado en un entorno natural que conserva el carácter tranquilo y cercano de los pueblos de la comarca. Su historia está ligada a la repoblación medieval y al desarrollo de pequeñas comunidades rurales que fueron dando forma a la identidad del municipio.
                    </p>
                    <p>
                      Esa identidad sigue muy presente hoy: un pueblo donde la vida social, las familias y las actividades deportivas tienen un papel importante. En ese contexto, el fútbol se ha convertido en una forma de unión entre generaciones, vecinos y jugadores que comparten algo más que un escudo.
                    </p>
                    <p>
                      El C.D. Unión Deportiva Villar del Olmo representa esa conexión entre pueblo y deporte: competir con orgullo, formar desde la base y mantener vivo el sentimiento de pertenencia.
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              {/* Imagen del ayuntamiento */}
              <FadeIn delay={0.2}>
                <div className="relative aspect-[4/3] w-full overflow-hidden shadow-lg">
                  <Image
                    src="/images/historia-ayuntamiento-real.jpg"
                    alt="Ayuntamiento de Villar del Olmo"
                    fill
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
