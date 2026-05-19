"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { FadeIn } from "@/components/motion"

const stats = [
  { value: 1970, label: "AÑO DE FUNDACIÓN", suffix: "" },
  { value: 300, label: "JUGADORES FORMADOS", suffix: "+" },
  { value: 12, label: "EQUIPOS FEDERADOS", suffix: "" },
  { value: 50, label: "AÑOS DE HISTORIA", suffix: "+" },
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
                MÁS QUE UN CLUB,
                <br />
                <span className="text-primary">UNA FAMILIA</span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  El C.D. Unión Deportiva Villar del Olmo nació en 1970 con un objetivo claro: 
                  fomentar el deporte y los valores entre los jóvenes de nuestro municipio.
                </p>
                <p>
                  Más de cinco décadas después, seguimos fieles a ese compromiso. 
                  Nuestra cantera es el corazón del club, donde formamos futbolistas 
                  pero, sobre todo, personas.
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
                  <div className="text-[10px] md:text-xs text-muted-foreground group-hover:text-white/70 transition-colors tracking-[0.15em]">
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
