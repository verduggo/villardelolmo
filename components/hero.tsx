"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-primary">
      {/* Image Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/noticias-bg.jpg"
          alt="Campo de fútbol Villar del Olmo"
          fill
          sizes="100vw"
          className="object-cover scale-105"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
      </div>

      {/* Main Content */}
      <div className="relative h-full flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20 w-full">
          <div className="max-w-4xl">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-8"
            >
              <span className="block font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-none">
                Pasión
              </span>
              <span className="block font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none" style={{ color: '#F5C518' }}>
                por el
              </span>
              <span className="block font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-none">
                Fútbol
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="text-white/70 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light"
            >
              Más de 50 años formando futbolistas y personas. 
              El club de referencia del fútbol base en la comarca.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/club">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/95 text-sm font-semibold tracking-[0.1em] px-8 py-6 h-auto group"
                  >
                    CONOCE EL CLUB
                    <ArrowDown className="ml-3 h-4 w-4 rotate-[-90deg] transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/socios">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 text-sm font-semibold tracking-[0.1em] px-8 py-6 h-auto"
                  >
                    ÚNETE AL CLUB
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors cursor-pointer group"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.45 }}
        className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-xl border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { number: "1970", label: "Año fundación" },
              { number: "500+", label: "Jugadores formados" },
              { number: "12", label: "Equipos activos" },
              { number: "50+", label: "Años de historia" },
            ].map((stat, i) => (
              <div key={i} className="py-6 px-4 md:px-8 text-center">
                <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs text-white/50 tracking-[0.1em] uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
