import { createClient } from './server'
import type { Database } from '../database.types'

type ContactoMensaje = Database['public']['Tables']['contacto_mensajes']['Row']
type ContactoMensajeInsert = Database['public']['Tables']['contacto_mensajes']['Insert']

// Enviar mensaje de contacto
export async function enviarMensajeContacto(mensaje: ContactoMensajeInsert) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('contacto_mensajes')
    .insert(mensaje)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Obtener todos los mensajes (admin)
export async function getMensajesContacto() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('contacto_mensajes')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Obtener mensajes no leídos (admin)
export async function getMensajesNoLeidos() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('contacto_mensajes')
    .select('*')
    .eq('leido', false)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Marcar mensaje como leído (admin)
export async function marcarMensajeLeido(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('contacto_mensajes')
    .update({ leido: true })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Responder mensaje (admin)
export async function responderMensaje(id: string, respuesta: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('contacto_mensajes')
    .update({ 
      respondido: true, 
      respuesta,
      fecha_respuesta: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Eliminar mensaje (admin)
export async function deleteMensajeContacto(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('contacto_mensajes')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// Contar mensajes no leídos (admin)
export async function contarMensajesNoLeidos() {
  const supabase = await createClient()
  
  const { count, error } = await supabase
    .from('contacto_mensajes')
    .select('*', { count: 'exact', head: true })
    .eq('leido', false)
  
  if (error) throw error
  return count || 0
}
