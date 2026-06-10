"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeIn } from "@/components/motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ImageOff, Loader2 } from "lucide-react"
import { getGaleriaPublicada } from "@/lib/supabase/galeria"

type Foto = {
  id: string
  src: string
  alt: string
  caption: string
  album: string | null
}

// Fotos de respaldo si la base de datos está vacía
const fallbackPhotos: Foto[] = [
  { id: "fb-1", src: "/images/galeria-1.jpg", alt: "Equipo celebrando", caption: "Equipo celebrando", album: null },
  { id: "fb-2", src: "/images/galeria-2.jpg", alt: "Partido en el campo", caption: "Acción en el partido", album: null },
  { id: "fb-3", src: "/images/galeria-3.jpg", alt: "Celebración de victoria", caption: "Entrenamiento intenso", album: null },
  { id: "fb-4", src: "/images/galeria-4.jpg", alt: "Cantera en entrenamiento", caption: "Formando futbolistas", album: null },
  { id: "fb-5", src: "/images/galeria-5.jpg", alt: "Estadio con público", caption: "En casa", album: null },
  { id: "fb-6", src: "/images/galeria-6.jpg", alt: "Equipo en el campo", caption: "En tierra", album: null },
]

export default function GaleriaPage() {
  const [photos, setPhotos] = useState<Foto[]>([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [activeAlbum, setActiveAlbum] = useState<string>("Todas")

  useEffect(() => {
    async function loadGaleria() {
      try {
        const data = await getGaleriaPublicada()
        if (data && data.length > 0) {
          const mapped: Foto[] = data.map((item) => ({
            id: item.id,
            src: item.imagen_url,
            alt: item.titulo,
            caption: item.titulo,
            album: item.album,
          }))
          setPhotos(mapped)
          setUsingFallback(false)
        } else {
          // Base de datos vacía: usar fotos de respaldo
          setPhotos(fallbackPhotos)
          setUsingFallback(true)
        }
      } catch (error) {
        console.error("[v0] Error cargando galería:", error)
        setPhotos(fallbackPhotos)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }
    loadGaleria()
  }, [])

  // Calcular álbumes disponibles
  const albums = ["Todas", ...Array.from(new Set(photos.map((p) => p.album).filter(Boolean) as string[]))]

  // Filtrar fotos por álbum activo
  const filteredPhotos = activeAlbum === "Todas" ? photos : photos.filter((p) => p.album === activeAlbum)

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
            {/* Filtros de álbum */}
            {!loading && albums.length > 1 && (
              <FadeIn>
                <div className="flex flex-wrap gap-3 mb-12">
                  {albums.map((album) => (
                    <button
                      key={album}
                      onClick={() => setActiveAlbum(album)}
                      className={`px-5 py-2 text-sm font-semibold tracking-wide transition-colors ${
                        activeAlbum === album
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/70"
                      }`}
                    >
                      {album}
                    </button>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Estado de carga */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin mb-4" />
                <p className="text-sm tracking-wide">Cargando galería...</p>
              </div>
            ) : filteredPhotos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
                <ImageOff className="h-10 w-10 mb-4" />
                <p className="text-sm tracking-wide">No hay fotos en este álbum todavía.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo, index) => (
                  <FadeIn key={photo.id} delay={index * 0.03}>
                    <div className="group relative overflow-hidden bg-muted aspect-[4/3]">
                      <Image
                        src={photo.src || "/placeholder.svg"}
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
            )}

            {/* Aviso de fallback */}
            {!loading && usingFallback && (
              <p className="text-center text-xs text-muted-foreground mt-12 tracking-wide">
                Mostrando imágenes de ejemplo. Sube fotos desde el panel de administración para verlas aquí.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
