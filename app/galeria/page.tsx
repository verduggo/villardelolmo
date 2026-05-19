"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeIn } from "@/components/motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

const photos = [
  {
    src: "/images/galeria-1.jpg",
    alt: "Celebración del equipo",
    caption: "Celebración tras victoria",
  },
  {
    src: "/images/galeria-2.jpg",
    alt: "Partido en el campo",
    caption: "Partido en casa",
  },
  {
    src: "/images/galeria-3.jpg",
    alt: "Entrega de trofeos",
    caption: "Ceremonia de trofeos",
  },
  {
    src: "/images/galeria-4.jpg",
    alt: "Vista del estadio",
    caption: "Nuestro campo",
  },
  {
    src: "/images/galeria-5.jpg",
    alt: "Entrenamiento de cantera",
    caption: "Entrenamiento cantera",
  },
  {
    src: "/images/galeria-6.jpg",
    alt: "Foto oficial del equipo",
    caption: "Foto oficial del equipo",
  },
  {
    src: "/images/equipo-senior.jpg",
    alt: "Equipo sénior",
    caption: "Equipo sénior",
  },
  {
    src: "/images/equipo-juvenil.jpg",
    alt: "Equipo juvenil",
    caption: "Equipo juvenil",
  },
  {
    src: "/images/equipo-cadete.jpg",
    alt: "Equipo cadete",
    caption: "Equipo cadete",
  },
  {
    src: "/images/equipo-infantil.jpg",
    alt: "Equipo infantil",
    caption: "Equipo infantil",
  },
  {
    src: "/images/equipo-femenino.jpg",
    alt: "Equipo femenino",
    caption: "Equipo femenino",
  },
  {
    src: "/images/instalacion-campo.jpg",
    alt: "Instalaciones del club",
    caption: "Instalaciones",
  },
]

export default function GaleriaPage() {
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
                <span className="text-white/40">GALERÍA</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/70 text-lg md:text-xl max-w-xl">
                Momentos, equipos e instalaciones del C.D. Unión Deportiva Villar del Olmo.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <FadeIn key={index} delay={index * 0.05}>
                  <div className="group relative overflow-hidden bg-muted aspect-[4/3]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-white text-sm font-semibold tracking-wide">
                        {photo.caption}
                      </span>
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
