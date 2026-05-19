"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { FadeIn } from "@/components/motion"

const stats = [
  { value: 1970, label: "Año de fundación", suffix: "" },
  { value: 5, label: "Equipos activos", suffix: "" },
  { value: 50, label: "Años de historia", suffix: "+" },
  { value: 1, label: "Misma pasión", suffix: "" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    
    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export function AboutSection() {
  return (
    <section className="py-24 md:py-40 bg-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <FadeIn direction="right">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-6 block">
                Sobre nosotros
              </span>
              <h2 className="text-headline text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
                Pasión por el Fútbol
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Un club de pueblo, una cantera con valores y una forma de entender el fútbol desde el compromiso, el esfuerzo y el sentimiento de equipo.
                </p>
                <p>
                  El C.D. Unión Deportiva Villar del Olmo forma parte de la vida deportiva del municipio desde hace décadas. Un club cercano, construido alrededor del fútbol base, el esfuerzo diario y el compromiso de familias, jugadores y entrenadores.
                </p>
                <p>
                  Más que competir, el objetivo siempre ha sido formar. Formar futbolistas, pero sobre todo personas que entiendan el valor del compañerismo, el respeto y la pertenencia a un equipo.
                </p>
              </div>
              <Link 
                href="/club"
                className="group inline-flex items-center gap-4 mt-10"
              >
                <span className="text-sm font-semibold text-foreground tracking-[0.1em] uppercase group-hover:text-primary transition-colors">
                  Conoce nuestra historia
                </span>
                <span className="w-12 h-12 flex items-center justify-center border border-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
          </FadeIn>

          {/* Stats Grid */}
          <FadeIn direction="left" delay={0.2}>
            <div className="grid grid-cols-2 gap-1">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-background p-8 md:p-10 group hover:bg-primary transition-colors duration-500"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary group-hover:text-white transition-colors mb-3 tracking-tight">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground group-hover:text-white/70 transition-colors tracking-wide font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>


      </div>
    </section>
  )
}
