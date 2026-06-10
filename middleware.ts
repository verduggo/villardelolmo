import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: refrescar la sesión (no eliminar)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Leer el rol desde los metadatos del usuario de Supabase Auth
  const appRol = user?.app_metadata?.rol ?? user?.app_metadata?.role
  const userRol = user?.user_metadata?.rol ?? user?.user_metadata?.role
  const rol = (appRol ?? userRol ?? null) as string | null
  const isAdmin = rol !== null && ["admin", "editor"].includes(rol)

  // Proteger rutas /admin (excepto la propia página de login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }

    if (!isAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      url.searchParams.set("error", "unauthorized")
      return NextResponse.redirect(url)
    }
  }

  // Si ya está logueado como admin y va al login, redirigir al panel
  if (pathname === "/admin/login" && user && isAdmin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    return NextResponse.redirect(url)
  }

  // Proteger el área de socios (requiere sesión)
  if (pathname.startsWith("/socios/dashboard")) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = "/socios/login"
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  // Si el socio ya tiene sesión y va al login, llevarlo al dashboard
  if (pathname === "/socios/login" && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/socios/dashboard"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * - _next/static, _next/image, favicon
     * - archivos de imagen/estáticos
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
