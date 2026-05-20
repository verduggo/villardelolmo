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
    alt: "Equipo celebrando",
    caption: "Equipo celebrando",
  },
  {
    src: "/images/galeria-2.jpg",
    alt: "Partido en el campo",
    caption: "Acción en el partido",
  },
  {
    src: "/images/galeria-3.jpg",
    alt: "Celebración de victoria",
    caption: "Entrenamiento intenso",
  },
  {
    src: "/images/galeria-4.jpg",
    alt: "Cantera en entrenamiento",
    caption: "Formando futbolistas",
  },
  {
    src: "/images/galeria-5.jpg",
    alt: "Estadio con público",
    caption: "En casa",
  },
  {
    src: "/images/galeria-6.jpg",
    alt: "Equipo en el campo",
    caption: "En tierra",
  },
  {
    src: "/images/galeria-7.jpg",
    alt: "Gesto del club",
    caption: "Orgullo de vestir verde",
  },
  {
    src: "/images/galeria-8.jpg",
    alt: "Equipo sénior",
    caption: "Equipo sénior",
  },
  {
    src: "/images/galeria-9.jpg",
    alt: "Equipo femenino",
    caption: "Equipo femenino",
  },
  {
    src: "/images/galeria-10.jpg",
    alt: "Instalaciones del club",
    caption: "Nuestro campo",
  },
  {
    src: "/images/galeria-11.jpg",
    alt: "Entrenamiento en el campo",
    caption: "Entrenamiento",
  },
  {
    src: "/images/galeria-12.jpg",
    alt: "Trofeos del club sobre el césped",
    caption: "Trofeos ganados",
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
                <FadeIn key={index} delay={index * 0.03}>
                  <div className="group relative overflow-hidden bg-muted aspect-[4/3]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index < 6 ? "eager" : "lazy"}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
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
