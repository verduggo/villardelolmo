"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeIn } from "@/components/motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/database.types"
import { allNews as fallbackNews } from "@/lib/news-data"

type Noticia = Database["public"]["Tables"]["noticias"]["Row"]

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Partial<Noticia>[]>(fallbackNews)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNoticias() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("noticias")
          .select("*")
          .eq("publicada", true)
          .order("fecha_publicacion", { ascending: false })

        if (error) throw error
        if (data && data.length > 0) {
          setNoticias(data)
        }
      } catch (error) {
        console.log("[v0] Using fallback news data")
      } finally {
        setLoading(false)
      }
    }

    fetchNoticias()
  }, [])

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Header */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-field.jpg"
              alt="Campo de fútbol Villar del Olmo"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-primary/75" />
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
                TODAS LAS<br />
                <span className="text-white/40">NOTICIAS</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/70 text-lg md:text-xl max-w-xl">
                Toda la actualidad del club, cantera y actividades del C.D. Unión Deportiva Villar del Olmo.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* News list */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-20">
              <div className="space-y-1">
                {noticias.map((item, index) => (
                  <FadeIn key={item.id} delay={index * 0.08}>
                    <article className="group">
                      <Link 
                        href={`/noticias/${item.slug}`} 
                        className="grid md:grid-cols-12 gap-6 md:gap-8 py-10 border-b border-border items-center"
                      >
                        <div className="md:col-span-4 lg:col-span-3">
                          <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                            <Image
                              src={item.imagen_principal || "/images/hero-stadium.jpg"}
                              alt={item.titulo || ""}
                              fill
                              sizes="(max-width: 768px) 100vw, 25vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <motion.div 
                              className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center"
                            >
                              <motion.div 
                                className="w-12 h-12 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                whileHover={{ scale: 1.1 }}
                              >
                                <ArrowUpRight className="h-5 w-5 text-primary" />
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>
                        <div className="md:col-span-8 lg:col-span-9">
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">
                              Noticia
                            </span>
                            <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                            <span className="text-xs text-muted-foreground tracking-wide">
                              {formatDate(item.fecha_publicacion)}
                            </span>
                          </div>
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors mb-4 tracking-tight">
                            {item.titulo}
                          </h2>
                          <p className="text-muted-foreground leading-relaxed max-w-2xl">
                            {item.extracto}
                          </p>
                        </div>
                      </Link>
                    </article>
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
