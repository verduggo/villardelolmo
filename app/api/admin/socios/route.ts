import { NextResponse } from "next/server"
import { createClient as createServiceClient } from "@supabase/supabase-js"
import { createClient as createServerClient } from "@/lib/supabase/server"

// Genera una contraseña legible y segura: 3 bloques + dígitos. Ej: "Villar-7K3p-Olmo"
function generarPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"
  let mid = ""
  for (let i = 0; i < 4; i++) {
    mid += chars[Math.floor(Math.random() * chars.length)]
  }
  return `Villar-${mid}-${Math.floor(1000 + Math.random() * 9000)}`
}

export async function POST(request: Request) {
  try {
    // 1. Verificar que quien llama es un admin autenticado
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    const rol =
      (user?.app_metadata?.rol as string | undefined) ??
      (user?.app_metadata?.role as string | undefined) ??
      (user?.user_metadata?.rol as string | undefined)

    if (!user || !rol || !["admin", "editor"].includes(rol)) {
      return NextResponse.json(
        { error: "No autorizado. Debes ser administrador." },
        { status: 401 }
      )
    }

    // 2. Validar datos del socio
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: "El email es obligatorio para crear el acceso del socio." },
        { status: 400 }
      )
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) {
      return NextResponse.json(
        { error: "Falta SUPABASE_SERVICE_ROLE_KEY en el servidor." },
        { status: 500 }
      )
    }

    // 3. Cliente con privilegios de administrador (service role)
    const admin = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceKey,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // 4. Crear la cuenta de Auth con contraseña automática
    const password = generarPassword()

    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        nombre: body.nombre ?? null,
        apellidos: body.apellidos ?? null,
        rol: "socio",
      },
      app_metadata: {
        rol: "socio",
      },
    })

    if (authError) {
      // Email ya registrado u otro error de Auth
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    // 5. Generar número de socio
    const { count } = await admin
      .from("socios")
      .select("*", { count: "exact", head: true })

    const numeroSocio = String((count ?? 0) + 1).padStart(4, "0")

    // 6. Crear el registro del socio (con service role, sin bloqueo RLS)
    const { data: socio, error: socioError } = await admin
      .from("socios")
      .insert({
        numero_socio: numeroSocio,
        nombre: body.nombre,
        apellidos: body.apellidos,
        email,
        telefono: body.telefono || null,
        dni: body.dni || null,
        direccion: body.direccion || null,
        codigo_postal: body.codigo_postal || null,
        localidad: body.localidad || null,
        fecha_nacimiento: body.fecha_nacimiento || null,
        tipo: body.tipo_socio,
        estado: "activo",
        fecha_alta: new Date().toISOString().split("T")[0],
        cuota_anual:
          body.tipo_socio === "Infantil" ? 50 :
          body.tipo_socio === "Juvenil" ? 75 :
          body.tipo_socio === "Veterano" ? 80 : 100,
      })
      .select()
      .single()

    if (socioError) {
      // Rollback: si falla la creación del socio, borrar la cuenta de Auth creada
      await admin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: socioError.message },
        { status: 400 }
      )
    }

    // 7. Devolver el socio y las credenciales generadas
    return NextResponse.json({
      socio,
      credenciales: { email, password },
    })
  } catch (err) {
    console.error("[v0] Error creando socio:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error inesperado" },
      { status: 500 }
    )
  }
}
