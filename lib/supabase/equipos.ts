import { createClient } from './server'
import type { Database } from '../database.types'

type Equipo = Database['public']['Tables']['equipos']['Row']
type EquipoInsert = Database['public']['Tables']['equipos']['Insert']
type EquipoUpdate = Database['public']['Tables']['equipos']['Update']
type Jugador = Database['public']['Tables']['jugadores']['Row']

// Obtener todos los equipos activos
export async function getEquipos() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('equipos')
    .select(`
      *,
      categoria:categorias_equipo(id, nombre, orden)
    `)
    .eq('activo', true)
    .order('categorias_equipo(orden)')
  
  if (error) throw error
  return data
}

// Obtener equipos por temporada
export async function getEquiposByTemporada(temporada: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('equipos')
    .select(`
      *,
      categoria:categorias_equipo(id, nombre, orden)
    `)
    .eq('temporada', temporada)
    .eq('activo', true)
    .order('categorias_equipo(orden)')
  
  if (error) throw error
  return data
}

// Obtener equipo por ID con jugadores
export async function getEquipoById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('equipos')
    .select(`
      *,
      categoria:categorias_equipo(id, nombre, orden),
      jugadores(*)
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Obtener equipo por slug
export async function getEquipoBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('equipos')
    .select(`
      *,
      categoria:categorias_equipo(id, nombre, orden),
      jugadores(*)
    `)
    .eq('slug', slug)
    .eq('activo', true)
    .single()
  
  if (error) throw error
  return data
}

// Obtener jugadores de un equipo
export async function getJugadoresByEquipo(equipoId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('jugadores')
    .select('*')
    .eq('equipo_id', equipoId)
    .eq('activo', true)
    .order('dorsal')
  
  if (error) throw error
  return data
}

// Crear equipo (admin)
export async function createEquipo(equipo: EquipoInsert) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('equipos')
    .insert(equipo)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar equipo (admin)
export async function updateEquipo(id: string, equipo: EquipoUpdate) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('equipos')
    .update(equipo)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar equipo (admin)
export async function deleteEquipo(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('equipos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// Obtener categorías de equipos
export async function getCategoriasEquipo() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categorias_equipo')
    .select('*')
    .order('orden')
  
  if (error) throw error
  return data
}

// Crear jugador
export async function createJugador(jugador: Database['public']['Tables']['jugadores']['Insert']) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('jugadores')
    .insert(jugador)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar jugador
export async function updateJugador(id: string, jugador: Database['public']['Tables']['jugadores']['Update']) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('jugadores')
    .update(jugador)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar jugador
export async function deleteJugador(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('jugadores')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}
