"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { allNews } from "@/components/news-section"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

export default function NoticiasPage() {
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
            <StaggerContainer className="space-y-1" staggerDelay={0.1}>
              {allNews.map((item, index) => (
                <StaggerItem key={item.id}>
                  <article className="group">
                    <Link 
                      href={`/noticias/${item.slug}`} 
                      className="grid md:grid-cols-12 gap-6 md:gap-8 py-10 border-b border-border items-center"
                    >
                      <div className="md:col-span-4 lg:col-span-3">
                        <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
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
                            {item.category}
                          </span>
                          <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                          <span className="text-xs text-muted-foreground tracking-wide">
                            {item.date}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground group-hover:text-primary transition-colors mb-4 tracking-tight">
                          {item.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">
                          {item.excerpt}
                        </p>
                      </div>
                    </Link>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
