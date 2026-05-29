import { createClient } from './server'
import type { Database } from '../database.types'

type Inscripcion = Database['public']['Tables']['inscripciones']['Row']
type InscripcionInsert = Database['public']['Tables']['inscripciones']['Insert']
type InscripcionUpdate = Database['public']['Tables']['inscripciones']['Update']

// Crear nueva inscripción (público)
export async function crearInscripcion(inscripcion: InscripcionInsert) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('inscripciones')
    .insert(inscripcion)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Obtener todas las inscripciones (admin)
export async function getInscripciones() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('inscripciones')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Obtener inscripciones pendientes (admin)
export async function getInscripcionesPendientes() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('inscripciones')
    .select('*')
    .eq('estado', 'pendiente')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Obtener inscripción por ID
export async function getInscripcionById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('inscripciones')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Aprobar inscripción (admin)
export async function aprobarInscripcion(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('inscripciones')
    .update({ estado: 'aprobada' })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Rechazar inscripción (admin)
export async function rechazarInscripcion(id: string, motivo?: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('inscripciones')
    .update({ 
      estado: 'rechazada',
      notas: motivo 
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar inscripción (admin)
export async function updateInscripcion(id: string, inscripcion: InscripcionUpdate) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('inscripciones')
    .update(inscripcion)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar inscripción (admin)
export async function deleteInscripcion(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('inscripciones')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// Contar inscripciones pendientes (admin)
export async function contarInscripcionesPendientes() {
  const supabase = await createClient()
  
  const { count, error } = await supabase
    .from('inscripciones')
    .select('*', { count: 'exact', head: true })
    .eq('estado', 'pendiente')
  
  if (error) throw error
  return count || 0
}
