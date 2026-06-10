"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ClubLogo } from "@/components/club-logo"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, ArrowRight, Shield, AlertCircle } from "lucide-react"
import { FadeIn, StaggerContainer, ScaleIn } from "@/components/motion"
import { createClient } from "@/lib/supabase/client"

export default function LoginSociosPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError("Email o contraseña incorrectos. Inténtalo de nuevo.")
        setIsLoading(false)
        return
      }

      router.push("/socios/dashboard")
      router.refresh()
    } catch {
      setError("Ha ocurrido un error. Inténtalo de nuevo.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <div className="min-h-[calc(100vh-80px)] flex">
          {/* Left - Form */}
          <div className="flex-1 flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-md">
              <StaggerContainer>
                <FadeIn>
                  <Link 
                    href="/socios" 
                    className="inline-flex items-center text-muted-foreground hover:text-foreground mb-12 text-sm font-medium transition-colors group"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Volver a planes
                  </Link>
                </FadeIn>

                <FadeIn>
                  <div className="mb-10">
                    <ClubLogo className="h-16 w-16 mb-8" />
                    <h1 className="text-4xl font-black text-foreground tracking-tight mb-3">
                      Bienvenido
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Accede a tu área personal de socio
                    </p>
                  </div>
                </FadeIn>

                <FadeIn>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium">{error}</p>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">
                        Email
                      </Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 rounded-xl border-2 border-border bg-background px-4 text-base placeholder:text-muted-foreground/50 focus:border-primary focus:ring-0 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-semibold">
                          Contraseña
                        </Label>
                        <button
                          type="button"
                          className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          ¿Olvidaste tu contraseña?
                        </button>
                      </div>
                      <div className="relative">
                        <Input 
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Tu contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-14 rounded-xl border-2 border-border bg-background px-4 pr-12 text-base placeholder:text-muted-foreground/50 focus:border-primary focus:ring-0 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-14 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all group"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Accediendo...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Acceder
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </form>
                </FadeIn>

                <FadeIn>
                  <div className="mt-8 pt-8 border-t border-border">
                    <p className="text-center text-muted-foreground">
                      ¿Aún no eres socio?{" "}
                      <Link href="/socios" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                        Únete ahora
                      </Link>
                    </p>
                  </div>
                </FadeIn>

                <FadeIn>
                  <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Conexión segura y encriptada</span>
                  </div>
                </FadeIn>
              </StaggerContainer>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/hero-stadium.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
              <ScaleIn>
                <ClubLogo className="h-32 w-32 mb-8 text-white drop-shadow-2xl" variant="light" />
              </ScaleIn>
              <FadeIn delay={0.2}>
                <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">
                  UD Villar del Olmo
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-white/80 text-lg max-w-sm">
                  Más de 50 años formando deportistas y creando comunidad
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
