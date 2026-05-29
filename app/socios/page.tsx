"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Star, Trophy, Heart } from "lucide-react"
import Link from "next/link"
import { FadeIn, StaggerContainer, ScaleIn } from "@/components/motion"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Simpatizante",
    price: "30",
    description: "Apoya al club desde cualquier lugar",
    features: [
      "Carnet de socio digital",
      "Newsletter exclusiva mensual",
      "10% descuento en tienda oficial",
      "Acceso a contenido exclusivo",
    ],
    icon: Heart,
  },
  {
    name: "Adulto",
    price: "60",
    description: "La experiencia completa del club",
    features: [
      "Carnet físico y digital premium",
      "Entrada gratuita a todos los partidos",
      "20% descuento en tienda oficial",
      "Derecho a voto en Asamblea",
      "Descuentos en actividades y campus",
      "Acceso preferente a eventos",
    ],
    highlighted: true,
    icon: Star,
  },
  {
    name: "Juvenil",
    price: "25",
    description: "Para los futuros cracks (< 18 años)",
    features: [
      "Carnet físico y digital",
      "Entrada gratuita a partidos",
      "15% descuento en tienda oficial",
      "Actividades y talleres especiales",
      "Sorteos exclusivos",
    ],
    icon: Trophy,
  },
]

export default function SociosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <StaggerContainer className="text-center max-w-3xl mx-auto">
              <FadeIn>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full mb-6">
                  Hazte Socio
                </span>
              </FadeIn>
              <FadeIn>
                <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight leading-none mb-6">
                  Únete a la
                  <span className="block text-primary">Familia Verde</span>
                </h1>
              </FadeIn>
              <FadeIn>
                <p className="text-xl text-muted-foreground max-w-xl mx-auto">
                  Más que un club, una comunidad. Tu apoyo hace posible que sigamos formando deportistas y creando recuerdos.
                </p>
              </FadeIn>
            </StaggerContainer>
          </div>
        </section>

        {/* Plans */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Elige tu plan
              </h2>
              <p className="text-muted-foreground">
                Selecciona la opción que mejor se adapte a ti
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {plans.map((plan, index) => (
                <ScaleIn key={index} delay={index * 0.1}>
                  <div 
                    className={cn(
                      "relative h-full p-8 rounded-3xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group",
                      plan.highlighted 
                        ? "border-primary bg-gradient-to-b from-primary/10 to-transparent shadow-xl" 
                        : "border-border hover:border-primary/50 bg-card"
                    )}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold tracking-wider uppercase rounded-full">
                        Popular
                      </div>
                    )}

                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <plan.icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      {plan.description}
                    </p>

                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-black text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground font-medium">/año</span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/contacto" className="block">
                      <Button 
                        className={cn(
                          "w-full h-12 rounded-xl font-semibold group/btn transition-all",
                          plan.highlighted 
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25" 
                            : "bg-foreground hover:bg-foreground/90 text-background"
                        )}
                      >
                        Solicitar ahora
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>

        {/* Already member CTA */}
        <section className="py-24 bg-foreground text-background">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Ya eres socio?
              </h2>
              <p className="text-background/70 mb-8 text-lg">
                Accede a tu área personal para gestionar tu membresía, ver tu historial y mucho más.
              </p>
              <Link href="/socios/login">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 rounded-xl border-2 border-background/20 bg-transparent text-background hover:bg-background hover:text-foreground transition-all font-semibold"
                >
                  Acceder a mi cuenta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
