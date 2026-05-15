import { createClient } from './server'
import { createBrowserClient } from './client'
import type { Database } from '../database.types'

type Usuario = Database['public']['Tables']['usuarios']['Row']

// Login con email y password
export async function signIn(email: string, password: string) {
  const supabase = createBrowserClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

// Registro de usuario
export async function signUp(email: string, password: string, nombre: string) {
  const supabase = createBrowserClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nombre,
      }
    }
  })
  
  if (error) throw error
  return data
}

// Cerrar sesión
export async function signOut() {
  const supabase = createBrowserClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) throw error
  return true
}

// Obtener sesión actual (server)
export async function getSession() {
  const supabase = await createClient()
  
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) throw error
  return session
}

// Obtener usuario actual (server)
export async function getCurrentUser() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) throw error
  return user
}

// Obtener perfil de usuario
export async function getUserProfile() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) return null
  
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (error) return null
  return data
}

// Verificar si es admin
export async function isAdmin() {
  const profile = await getUserProfile()
  return profile?.rol === 'admin'
}

// Verificar si es editor
export async function isEditor() {
  const profile = await getUserProfile()
  return profile?.rol === 'admin' || profile?.rol === 'editor'
}

// Actualizar perfil de usuario
export async function updateUserProfile(userId: string, data: Partial<Usuario>) {
  const supabase = await createClient()
  
  const { data: updated, error } = await supabase
    .from('usuarios')
    .update(data)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return updated
}

// Recuperar contraseña
export async function resetPassword(email: string) {
  const supabase = createBrowserClient()
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  
  if (error) throw error
  return true
}

// Actualizar contraseña
export async function updatePassword(newPassword: string) {
  const supabase = createBrowserClient()
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })
  
  if (error) throw error
  return true
}
