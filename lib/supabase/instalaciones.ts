import { createClient } from './server'
import type { Database } from '../database.types'

type Instalacion = Database['public']['Tables']['instalaciones']['Row']
type InstalacionInsert = Database['public']['Tables']['instalaciones']['Insert']
type InstalacionUpdate = Database['public']['Tables']['instalaciones']['Update']

// Obtener todas las instalaciones activas
export async function getInstalaciones() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('instalaciones')
    .select('*')
    .eq('activo', true)
    .order('orden')
  
  if (error) throw error
  return data
}

// Obtener instalación por ID
export async function getInstalacionById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('instalaciones')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Obtener instalación por slug
export async function getInstalacionBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('instalaciones')
    .select('*')
    .eq('slug', slug)
    .eq('activo', true)
    .single()
  
  if (error) throw error
  return data
}

// Crear instalación (admin)
export async function createInstalacion(instalacion: InstalacionInsert) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('instalaciones')
    .insert(instalacion)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar instalación (admin)
export async function updateInstalacion(id: string, instalacion: InstalacionUpdate) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('instalaciones')
    .update(instalacion)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar instalación (admin)
export async function deleteInstalacion(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('instalaciones')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}
