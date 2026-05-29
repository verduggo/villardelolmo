import { createClient } from './server'
import type { Database } from '../database.types'

type Noticia = Database['public']['Tables']['noticias']['Row']
type NoticiaInsert = Database['public']['Tables']['noticias']['Insert']
type NoticiaUpdate = Database['public']['Tables']['noticias']['Update']

// Obtener todas las noticias publicadas
export async function getNoticias(limit?: number) {
  const supabase = await createClient()
  
  let query = supabase
    .from('noticias')
    .select(`
      *,
      categoria:categorias_noticia(id, nombre, slug)
    `)
    .eq('publicado', true)
    .order('fecha_publicacion', { ascending: false })
  
  if (limit) {
    query = query.limit(limit)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

// Obtener noticia por slug
export async function getNoticiaBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('noticias')
    .select(`
      *,
      categoria:categorias_noticia(id, nombre, slug)
    `)
    .eq('slug', slug)
    .eq('publicado', true)
    .single()
  
  if (error) throw error
  return data
}

// Obtener noticia por ID
export async function getNoticiaById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('noticias')
    .select(`
      *,
      categoria:categorias_noticia(id, nombre, slug)
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Obtener noticias por categoría
export async function getNoticiasByCategoria(categoriaSlug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('noticias')
    .select(`
      *,
      categoria:categorias_noticia!inner(id, nombre, slug)
    `)
    .eq('categorias_noticia.slug', categoriaSlug)
    .eq('publicado', true)
    .order('fecha_publicacion', { ascending: false })
  
  if (error) throw error
  return data
}

// Obtener noticias destacadas
export async function getNoticiasDestacadas(limit = 3) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('noticias')
    .select(`
      *,
      categoria:categorias_noticia(id, nombre, slug)
    `)
    .eq('publicado', true)
    .eq('destacado', true)
    .order('fecha_publicacion', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

// Crear noticia (admin)
export async function createNoticia(noticia: NoticiaInsert) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('noticias')
    .insert(noticia)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Actualizar noticia (admin)
export async function updateNoticia(id: string, noticia: NoticiaUpdate) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('noticias')
    .update(noticia)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar noticia (admin)
export async function deleteNoticia(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('noticias')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// Obtener categorías de noticias
export async function getCategoriasNoticia() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categorias_noticia')
    .select('*')
    .order('nombre')
  
  if (error) throw error
  return data
}
