import { createClient } from './server'
import type { Database } from '../database.types'

type Evento = Database['public']['Tables']['eventos']['Row']
type EventoInsert = Database['public']['Tables']['eventos']['Insert']
type EventoUpdate = Database['public']['Tables']['eventos']['Update']

// Obtener próximos eventos
export async function getProximosEventos(limit = 5) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('publicado', true)
    .gte('fecha_inicio', new Date().toISOString())
    .order('fecha_inicio', { ascending: true })
    .limit(limit)
  
  if (error) throw error
  return data
}

// Obtener todos los eventos publicados
export async function getEventos() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('publicado', true)
    .order('fecha_inicio', { ascending: false })
  
  if (error) throw error
  return data
}

// Obtener evento por ID
export async function getEventoById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Obtener evento por slug
export async function getEventoBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('slug', slug)
    .eq('publicado', true)
    .single()
  
  if (error) throw error
  return data
}

// Crear evento (admin)
export async function createEvento(evento: EventoInsert) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('eventos')
    .insert(evento)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar evento (admin)
export async function updateEvento(id: string, evento: EventoUpdate) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('eventos')
    .update(evento)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar evento (admin)
export async function deleteEvento(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('eventos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}
