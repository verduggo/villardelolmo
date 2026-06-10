import { NextResponse } from "next/server"
import { createClient as createServiceClient } from "@supabase/supabase-js"
import { createClient as createServerClient } from "@/lib/supabase/server"

// Devuelve los datos del socio correspondiente al usuario autenticado
export async function GET() {
  try {
    // 1. Verificar sesión
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || !user.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) {
      return NextResponse.json(
        { error: "Falta SUPABASE_SERVICE_ROLE_KEY en el servidor." },
        { status: 500 }
      )
    }

    // 2. Buscar el socio por email (service role evita bloqueo RLS)
    const admin = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { data: socio, error } = await admin
      .from("socios")
      .select("*")
      .eq("email", user.email)
      .single()

    if (error || !socio) {
      return NextResponse.json(
        { error: "No se encontró ningún socio asociado a esta cuenta." },
        { status: 404 }
      )
    }

    return NextResponse.json({ socio })
  } catch (err) {
    console.error("[v0] Error obteniendo socio:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error inesperado" },
      { status: 500 }
    )
  }
}

// Permite al socio actualizar sus propios datos de contacto
export async function PATCH(request: Request) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || !user.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) {
      return NextResponse.json(
        { error: "Falta SUPABASE_SERVICE_ROLE_KEY en el servidor." },
        { status: 500 }
      )
    }

    const body = await request.json()

    // Solo se permiten estos campos editables por el propio socio
    const updates: Record<string, string | null> = {}
    if (body.nombre !== undefined) updates.nombre = body.nombre
    if (body.apellidos !== undefined) updates.apellidos = body.apellidos
    if (body.telefono !== undefined) updates.telefono = body.telefono || null
    if (body.direccion !== undefined) updates.direccion = body.direccion || null
    if (body.fecha_nacimiento !== undefined) updates.fecha_nacimiento = body.fecha_nacimiento || null

    const admin = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { data: socio, error } = await admin
      .from("socios")
      .update(updates)
      .eq("email", user.email)
      .select()
      .single()

    if (error || !socio) {
      return NextResponse.json(
        { error: error?.message || "No se pudo actualizar el perfil." },
        { status: 400 }
      )
    }

    return NextResponse.json({ socio })
  } catch (err) {
    console.error("[v0] Error actualizando socio:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error inesperado" },
      { status: 500 }
    )
  }
}
