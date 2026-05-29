import { createClient } from './server'
import type { Database } from '../database.types'

type Partido = Database['public']['Tables']['partidos']['Row']
type PartidoInsert = Database['public']['Tables']['partidos']['Insert']
type PartidoUpdate = Database['public']['Tables']['partidos']['Update']

// Obtener próximos partidos
export async function getProximosPartidos(limit = 5) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('partidos')
    .select(`
      *,
      equipo:equipos(id, nombre, foto)
    `)
    .gte('fecha', new Date().toISOString())
    .order('fecha', { ascending: true })
    .limit(limit)
  
  if (error) throw error
  return data
}

// Obtener últimos resultados
export async function getUltimosResultados(limit = 5) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('partidos')
    .select(`
      *,
      equipo:equipos(id, nombre, foto)
    `)
    .lt('fecha', new Date().toISOString())
    .not('goles_favor', 'is', null)
    .order('fecha', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

// Obtener partidos por equipo
export async function getPartidosByEquipo(equipoId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('partidos')
    .select('*')
    .eq('equipo_id', equipoId)
    .order('fecha', { ascending: false })
  
  if (error) throw error
  return data
}

// Obtener partidos por temporada
export async function getPartidosByTemporada(temporada: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('partidos')
    .select(`
      *,
      equipo:equipos(id, nombre, foto)
    `)
    .eq('temporada', temporada)
    .order('fecha', { ascending: false })
  
  if (error) throw error
  return data
}

// Obtener partido por ID
export async function getPartidoById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('partidos')
    .select(`
      *,
      equipo:equipos(id, nombre, foto)
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Crear partido (admin)
export async function createPartido(partido: PartidoInsert) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('partidos')
    .insert(partido)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar partido (admin)
export async function updatePartido(id: string, partido: PartidoUpdate) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('partidos')
    .update(partido)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar resultado (admin)
export async function actualizarResultado(id: string, golesFavor: number, golesContra: number) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('partidos')
    .update({ 
      goles_favor: golesFavor, 
      goles_contra: golesContra 
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar partido (admin)
export async function deletePartido(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('partidos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}
