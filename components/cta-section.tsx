"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Phone } from "lucide-react"
import { FadeIn } from "@/components/motion"

export function CTASection() {
  return (
    <section className="relative py-32 md:py-48 bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute border border-white/20 rounded-full"
              style={{
                width: `${(i + 1) * 300}px`,
                height: `${(i + 1) * 300}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <FadeIn direction="right">
            <div>
              <span className="text-xs font-semibold text-white/60 uppercase tracking-[0.25em] mb-6 block">
                Inscripciones abiertas
              </span>
              <h2 className="text-headline text-4xl md:text-5xl lg:text-6xl text-white mb-8">
                ÚNETE A LA
                <br />
                <span className="text-white/50">FAMILIA</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl max-w-md leading-relaxed mb-10">
                Inscripciones abiertas para todas las categorías. 
                Ven a conocernos y forma parte de nuestro proyecto deportivo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/socios">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-white/95 text-sm font-semibold tracking-[0.1em] px-8 py-6 h-auto w-full sm:w-auto group"
                    >
                      HAZTE SOCIO
                      <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/contacto">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="bg-[oklch(0.22_0.05_145)] text-white hover:bg-[oklch(0.18_0.05_145)] border border-white/20 text-sm font-semibold tracking-[0.1em] px-8 py-6 h-auto w-full sm:w-auto"
                    >
                      CONTÁCTANOS
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Contact Cards */}
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-4">
              <motion.a
                href="mailto:info@udvillardelolmo.es"
                className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group"
                whileHover={{ x: 10 }}
              >
                <div className="w-14 h-14 flex items-center justify-center bg-white/10">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-[0.15em] mb-1">Email</div>
                  <div className="text-white font-medium group-hover:text-white/80 transition-colors">
                    info@udvillardelolmo.es
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-white/50 ml-auto group-hover:text-white transition-colors" />
              </motion.a>

              <motion.a
                href="tel:+34600000000"
                className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors group"
                whileHover={{ x: 10 }}
              >
                <div className="w-14 h-14 flex items-center justify-center bg-white/10">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-[0.15em] mb-1">Teléfono</div>
                  <div className="text-white font-medium group-hover:text-white/80 transition-colors">
                    +34 600 000 000
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-white/50 ml-auto group-hover:text-white transition-colors" />
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
