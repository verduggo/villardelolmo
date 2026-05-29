import { createClient } from './server'
import type { Database } from '../database.types'

type Socio = Database['public']['Tables']['socios']['Row']
type SocioInsert = Database['public']['Tables']['socios']['Insert']
type SocioUpdate = Database['public']['Tables']['socios']['Update']

// Obtener todos los socios (admin)
export async function getSocios() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('socios')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Obtener socios activos
export async function getSociosActivos() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('socios')
    .select('*')
    .eq('estado', 'activo')
    .order('apellidos')
  
  if (error) throw error
  return data
}

// Obtener socio por ID
export async function getSocioById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('socios')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Obtener socio por número de socio
export async function getSocioByNumero(numeroSocio: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('socios')
    .select('*')
    .eq('numero_socio', numeroSocio)
    .single()
  
  if (error) throw error
  return data
}

// Obtener socio por email
export async function getSocioByEmail(email: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('socios')
    .select('*')
    .eq('email', email)
    .single()
  
  if (error) throw error
  return data
}

// Obtener socios por tipo
export async function getSociosByTipo(tipo: Socio['tipo']) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('socios')
    .select('*')
    .eq('tipo', tipo)
    .eq('estado', 'activo')
    .order('apellidos')
  
  if (error) throw error
  return data
}

// Crear socio
export async function createSocio(socio: SocioInsert) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('socios')
    .insert(socio)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar socio
export async function updateSocio(id: string, socio: SocioUpdate) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('socios')
    .update(socio)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar socio
export async function deleteSocio(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('socios')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// Estadísticas de socios (admin)
export async function getEstadisticasSocios() {
  const supabase = await createClient()
  
  const { data: total, error: errorTotal } = await supabase
    .from('socios')
    .select('id', { count: 'exact' })
  
  const { data: activos, error: errorActivos } = await supabase
    .from('socios')
    .select('id', { count: 'exact' })
    .eq('estado', 'activo')
  
  const { data: porTipo, error: errorTipo } = await supabase
    .from('socios')
    .select('tipo')
    .eq('estado', 'activo')
  
  if (errorTotal || errorActivos || errorTipo) {
    throw errorTotal || errorActivos || errorTipo
  }
  
  const tiposCount = porTipo?.reduce((acc, s) => {
    acc[s.tipo] = (acc[s.tipo] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    total: total?.length || 0,
    activos: activos?.length || 0,
    porTipo: tiposCount || {}
  }
}

// Generar número de socio
export async function generarNumeroSocio(): Promise<string> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('socios')
    .select('numero_socio')
    .order('numero_socio', { ascending: false })
    .limit(1)
  
  if (error) throw error
  
  const ultimoNumero = data?.[0]?.numero_socio
  if (ultimoNumero) {
    const numero = parseInt(ultimoNumero.replace('SOC-', '')) + 1
    return `SOC-${numero.toString().padStart(5, '0')}`
  }
  
  return 'SOC-00001'
}
