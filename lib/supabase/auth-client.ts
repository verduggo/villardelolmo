import { createClient } from './client'

// Login de administrador: autentica y verifica que tenga rol admin/editor
export async function signInAdmin(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  // Verificar el rol del usuario
  const { data: perfil, error: perfilError } = await supabase
    .from('usuarios')
    .select('rol, activo, nombre')
    .eq('auth_id', data.user.id)
    .single()

  if (perfilError || !perfil) {
    await supabase.auth.signOut()
    throw new Error('No tienes un perfil asignado. Contacta con el administrador.')
  }

  if (!perfil.activo) {
    await supabase.auth.signOut()
    throw new Error('Tu cuenta está desactivada.')
  }

  if (!['admin', 'editor'].includes(perfil.rol)) {
    await supabase.auth.signOut()
    throw new Error('No tienes permisos de administrador.')
  }

  return { ...data, perfil }
}

// Cerrar sesión (cliente)
export async function signOutClient() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  return true
}
