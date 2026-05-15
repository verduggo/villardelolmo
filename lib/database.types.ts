export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          email: string
          nombre: string | null
          apellidos: string | null
          avatar_url: string | null
          rol: 'admin' | 'editor' | 'usuario'
          activo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          nombre?: string | null
          apellidos?: string | null
          avatar_url?: string | null
          rol?: 'admin' | 'editor' | 'usuario'
          activo?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          nombre?: string | null
          apellidos?: string | null
          avatar_url?: string | null
          rol?: 'admin' | 'editor' | 'usuario'
          activo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      socios: {
        Row: {
          id: string
          numero_socio: string | null
          nombre: string
          apellidos: string
          email: string | null
          telefono: string | null
          fecha_nacimiento: string | null
          direccion: string | null
          codigo_postal: string | null
          ciudad: string | null
          dni: string | null
          tipo_socio: 'adulto' | 'juvenil' | 'infantil' | 'familiar' | 'honorario'
          estado: 'activo' | 'inactivo' | 'pendiente' | 'baja'
          fecha_alta: string
          fecha_baja: string | null
          cuota_anual: number | null
          ultimo_pago: string | null
          notas: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          numero_socio?: string | null
          nombre: string
          apellidos: string
          email?: string | null
          telefono?: string | null
          fecha_nacimiento?: string | null
          direccion?: string | null
          codigo_postal?: string | null
          ciudad?: string | null
          dni?: string | null
          tipo_socio?: 'adulto' | 'juvenil' | 'infantil' | 'familiar' | 'honorario'
          estado?: 'activo' | 'inactivo' | 'pendiente' | 'baja'
          fecha_alta?: string
          fecha_baja?: string | null
          cuota_anual?: number | null
          ultimo_pago?: string | null
          notas?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          numero_socio?: string | null
          nombre?: string
          apellidos?: string
          email?: string | null
          telefono?: string | null
          fecha_nacimiento?: string | null
          direccion?: string | null
          codigo_postal?: string | null
          ciudad?: string | null
          dni?: string | null
          tipo_socio?: 'adulto' | 'juvenil' | 'infantil' | 'familiar' | 'honorario'
          estado?: 'activo' | 'inactivo' | 'pendiente' | 'baja'
          fecha_alta?: string
          fecha_baja?: string | null
          cuota_anual?: number | null
          ultimo_pago?: string | null
          notas?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categorias_equipo: {
        Row: {
          id: string
          nombre: string
          orden: number
          descripcion: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          orden?: number
          descripcion?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          orden?: number
          descripcion?: string | null
          created_at?: string
        }
      }
      equipos: {
        Row: {
          id: string
          nombre: string
          categoria_id: string | null
          temporada: string
          descripcion: string | null
          entrenador: string | null
          segundo_entrenador: string | null
          delegado: string | null
          imagen_url: string | null
          activo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          categoria_id?: string | null
          temporada: string
          descripcion?: string | null
          entrenador?: string | null
          segundo_entrenador?: string | null
          delegado?: string | null
          imagen_url?: string | null
          activo?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          categoria_id?: string | null
          temporada?: string
          descripcion?: string | null
          entrenador?: string | null
          segundo_entrenador?: string | null
          delegado?: string | null
          imagen_url?: string | null
          activo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      jugadores: {
        Row: {
          id: string
          equipo_id: string | null
          socio_id: string | null
          nombre: string
          apellidos: string
          fecha_nacimiento: string | null
          posicion: string | null
          dorsal: number | null
          foto_url: string | null
          activo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          equipo_id?: string | null
          socio_id?: string | null
          nombre: string
          apellidos: string
          fecha_nacimiento?: string | null
          posicion?: string | null
          dorsal?: number | null
          foto_url?: string | null
          activo?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          equipo_id?: string | null
          socio_id?: string | null
          nombre?: string
          apellidos?: string
          fecha_nacimiento?: string | null
          posicion?: string | null
          dorsal?: number | null
          foto_url?: string | null
          activo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categorias_noticia: {
        Row: {
          id: string
          nombre: string
          slug: string
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          slug: string
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          slug?: string
          color?: string | null
          created_at?: string
        }
      }
      noticias: {
        Row: {
          id: string
          titulo: string
          slug: string
          extracto: string | null
          contenido: string | null
          imagen_url: string | null
          imagen_alt: string | null
          galeria: string[] | null
          categoria_id: string | null
          autor_id: string | null
          publicado: boolean
          destacado: boolean
          fecha_publicacion: string | null
          meta_titulo: string | null
          meta_descripcion: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titulo: string
          slug: string
          extracto?: string | null
          contenido?: string | null
          imagen_url?: string | null
          imagen_alt?: string | null
          galeria?: string[] | null
          categoria_id?: string | null
          autor_id?: string | null
          publicado?: boolean
          destacado?: boolean
          fecha_publicacion?: string | null
          meta_titulo?: string | null
          meta_descripcion?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          slug?: string
          extracto?: string | null
          contenido?: string | null
          imagen_url?: string | null
          imagen_alt?: string | null
          galeria?: string[] | null
          categoria_id?: string | null
          autor_id?: string | null
          publicado?: boolean
          destacado?: boolean
          fecha_publicacion?: string | null
          meta_titulo?: string | null
          meta_descripcion?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      instalaciones: {
        Row: {
          id: string
          nombre: string
          descripcion: string | null
          imagen_url: string | null
          caracteristicas: string[] | null
          orden: number
          activo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          descripcion?: string | null
          imagen_url?: string | null
          caracteristicas?: string[] | null
          orden?: number
          activo?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string | null
          imagen_url?: string | null
          caracteristicas?: string[] | null
          orden?: number
          activo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contacto_mensajes: {
        Row: {
          id: string
          nombre: string
          email: string
          telefono: string | null
          asunto: string | null
          mensaje: string
          leido: boolean
          respondido: boolean
          fecha_respuesta: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          email: string
          telefono?: string | null
          asunto?: string | null
          mensaje: string
          leido?: boolean
          respondido?: boolean
          fecha_respuesta?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          email?: string
          telefono?: string | null
          asunto?: string | null
          mensaje?: string
          leido?: boolean
          respondido?: boolean
          fecha_respuesta?: string | null
          created_at?: string
        }
      }
      inscripciones: {
        Row: {
          id: string
          tipo: 'socio' | 'jugador'
          nombre: string
          apellidos: string
          email: string
          telefono: string | null
          fecha_nacimiento: string | null
          categoria_interes: string | null
          mensaje: string | null
          estado: 'pendiente' | 'contactado' | 'completado' | 'rechazado'
          notas_internas: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tipo: 'socio' | 'jugador'
          nombre: string
          apellidos: string
          email: string
          telefono?: string | null
          fecha_nacimiento?: string | null
          categoria_interes?: string | null
          mensaje?: string | null
          estado?: 'pendiente' | 'contactado' | 'completado' | 'rechazado'
          notas_internas?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tipo?: 'socio' | 'jugador'
          nombre?: string
          apellidos?: string
          email?: string
          telefono?: string | null
          fecha_nacimiento?: string | null
          categoria_interes?: string | null
          mensaje?: string | null
          estado?: 'pendiente' | 'contactado' | 'completado' | 'rechazado'
          notas_internas?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      partidos: {
        Row: {
          id: string
          equipo_id: string | null
          rival: string
          es_local: boolean
          fecha: string | null
          hora: string | null
          lugar: string | null
          goles_favor: number | null
          goles_contra: number | null
          cronica: string | null
          estado: 'programado' | 'jugado' | 'aplazado' | 'cancelado'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          equipo_id?: string | null
          rival: string
          es_local?: boolean
          fecha?: string | null
          hora?: string | null
          lugar?: string | null
          goles_favor?: number | null
          goles_contra?: number | null
          cronica?: string | null
          estado?: 'programado' | 'jugado' | 'aplazado' | 'cancelado'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          equipo_id?: string | null
          rival?: string
          es_local?: boolean
          fecha?: string | null
          hora?: string | null
          lugar?: string | null
          goles_favor?: number | null
          goles_contra?: number | null
          cronica?: string | null
          estado?: 'programado' | 'jugado' | 'aplazado' | 'cancelado'
          created_at?: string
          updated_at?: string
        }
      }
      eventos: {
        Row: {
          id: string
          titulo: string
          descripcion: string | null
          fecha_inicio: string
          fecha_fin: string | null
          lugar: string | null
          imagen_url: string | null
          publicado: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descripcion?: string | null
          fecha_inicio: string
          fecha_fin?: string | null
          lugar?: string | null
          imagen_url?: string | null
          publicado?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descripcion?: string | null
          fecha_inicio?: string
          fecha_fin?: string | null
          lugar?: string | null
          imagen_url?: string | null
          publicado?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      patrocinadores: {
        Row: {
          id: string
          nombre: string
          logo_url: string | null
          web_url: string | null
          nivel: 'oro' | 'plata' | 'bronce' | 'colaborador'
          orden: number
          activo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          logo_url?: string | null
          web_url?: string | null
          nivel?: 'oro' | 'plata' | 'bronce' | 'colaborador'
          orden?: number
          activo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          logo_url?: string | null
          web_url?: string | null
          nivel?: 'oro' | 'plata' | 'bronce' | 'colaborador'
          orden?: number
          activo?: boolean
          created_at?: string
        }
      }
      configuracion_web: {
        Row: {
          id: string
          clave: string
          valor: Json | null
          descripcion: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          clave: string
          valor?: Json | null
          descripcion?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          clave?: string
          valor?: Json | null
          descripcion?: string | null
          updated_at?: string
        }
      }
    }
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Convenience types
export type Usuario = Tables<'usuarios'>
export type Socio = Tables<'socios'>
export type CategoriaEquipo = Tables<'categorias_equipo'>
export type Equipo = Tables<'equipos'>
export type Jugador = Tables<'jugadores'>
export type CategoriaNoticia = Tables<'categorias_noticia'>
export type Noticia = Tables<'noticias'>
export type Instalacion = Tables<'instalaciones'>
export type ContactoMensaje = Tables<'contacto_mensajes'>
export type Inscripcion = Tables<'inscripciones'>
export type Partido = Tables<'partidos'>
export type Evento = Tables<'eventos'>
export type Patrocinador = Tables<'patrocinadores'>
export type ConfiguracionWeb = Tables<'configuracion_web'>
