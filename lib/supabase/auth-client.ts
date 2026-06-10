import { createClient } from './client'

const ADMIN_ROLES = ['admin', 'editor']

// Obtiene el rol del usuario desde sus metadatos de Supabase Auth.
// Soporta app_metadata (más seguro, no editable por el usuario) y user_metadata.
export function getRolFromUser(user: { app_metadata?: Record<string, unknown>; user_metadata?: Record<string, unknown> } | null): string | null {
  if (!user) return null
  const appRol = user.app_metadata?.rol ?? user.app_metadata?.role
  const userRol = user.user_metadata?.rol ?? user.user_metadata?.role
  return (appRol ?? userRol ?? null) as string | null
}

export function isAdminRol(rol: string | null): boolean {
  return rol !== null && ADMIN_ROLES.includes(rol)
}

// Login de administrador: autentica con Supabase Auth y verifica el rol en los metadatos
export async function signInAdmin(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Email o contraseña incorrectos.')
    }
    throw error
  }

  const rol = getRolFromUser(data.user)

  if (!isAdminRol(rol)) {
    await supabase.auth.signOut()
    throw new Error('No tienes permisos de administrador.')
  }

  return { ...data, rol }
}

// Cerrar sesión (cliente)
export async function signOutClient() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  return true
}
