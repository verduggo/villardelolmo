import { createClient } from "./client"
import type { Database } from "../database.types"

type Galeria = Database["public"]["Tables"]["galeria"]["Row"]
type GaleriaInsert = Database["public"]["Tables"]["galeria"]["Insert"]
type GaleriaUpdate = Database["public"]["Tables"]["galeria"]["Update"]

// ============================================
// OBTENER IMÁGENES
// ============================================

export async function getGaleria(options?: {
  album?: string
  publicada?: boolean
  destacada?: boolean
  limit?: number
}) {
  const supabase = createClient()
  
  let query = supabase
    .from("galeria")
    .select("*")
    .order("orden", { ascending: true })
    .order("created_at", { ascending: false })

  if (options?.album) {
    query = query.eq("album", options.album)
  }
  if (options?.publicada !== undefined) {
    query = query.eq("publicada", options.publicada)
  }
  if (options?.destacada) {
    query = query.eq("destacada", true)
  }
  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching galeria:", error)
    // PGRST205 = la tabla no existe todavía en Supabase
    if (error.code === "PGRST205") {
      throw new Error("TABLE_NOT_FOUND")
    }
    throw new Error(error.message)
  }

  return data as Galeria[]
}

export async function getGaleriaPublicada(limit?: number) {
  return getGaleria({ publicada: true, limit })
}

export async function getGaleriaDestacada(limit?: number) {
  return getGaleria({ publicada: true, destacada: true, limit })
}

export async function getAlbumes() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("galeria")
    .select("album")
    .eq("publicada", true)
    .not("album", "is", null)

  if (error) {
    console.error("Error fetching albums:", error)
    return []
  }

  // Get unique albums
  const albums = [...new Set(data.map(item => item.album).filter(Boolean))]
  return albums as string[]
}

export async function getImagenById(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("galeria")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching imagen:", error)
    return null
  }

  return data as Galeria
}

// ============================================
// CREAR IMAGEN
// ============================================

export async function createImagen(imagen: GaleriaInsert) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("galeria")
    .insert(imagen)
    .select()
    .single()

  if (error) {
    console.error("Error creating imagen:", error)
    throw new Error(error.message)
  }

  return data as Galeria
}

// ============================================
// ACTUALIZAR IMAGEN
// ============================================

export async function updateImagen(id: string, updates: GaleriaUpdate) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from("galeria")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating imagen:", error)
    throw new Error(error.message)
  }

  return data as Galeria
}

// ============================================
// ELIMINAR IMAGEN
// ============================================

export async function deleteImagen(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from("galeria")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting imagen:", error)
    throw new Error(error.message)
  }

  return true
}

// ============================================
// TOGGLE PUBLICADA/DESTACADA
// ============================================

export async function toggleImagenPublicada(id: string, publicada: boolean) {
  return updateImagen(id, { publicada })
}

export async function toggleImagenDestacada(id: string, destacada: boolean) {
  return updateImagen(id, { destacada })
}

// ============================================
// SUBIR ARCHIVO A SUPABASE STORAGE
// ============================================

const BUCKET = "galeria"

export async function uploadImagenFile(file: File): Promise<string> {
  const supabase = createClient()

  // Generar nombre único para evitar colisiones
  const ext = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (uploadError) {
    console.error("Error uploading file:", uploadError)
    throw new Error(
      uploadError.message.includes("Bucket not found")
        ? "El bucket 'galeria' no existe. Créalo en Supabase Storage (público)."
        : uploadError.message
    )
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
  return data.publicUrl
}
