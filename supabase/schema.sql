-- ============================================
-- SCHEMA SQL PARA C.D. UNIÓN DEPORTIVA VILLAR DEL OLMO
-- Base de datos Supabase
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: usuarios (autenticación y roles)
-- ============================================
CREATE TABLE public.usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  nombre VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255),
  telefono VARCHAR(20),
  avatar_url TEXT,
  rol VARCHAR(50) DEFAULT 'usuario' CHECK (rol IN ('admin', 'editor', 'usuario')),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: socios
-- ============================================
CREATE TABLE public.socios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
  numero_socio VARCHAR(10) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  dni VARCHAR(20),
  fecha_nacimiento DATE,
  direccion TEXT,
  codigo_postal VARCHAR(10),
  localidad VARCHAR(100),
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Adulto', 'Juvenil', 'Infantil', 'Veterano', 'Honorario')),
  estado VARCHAR(50) DEFAULT 'pendiente' CHECK (estado IN ('activo', 'pendiente', 'inactivo', 'baja')),
  fecha_alta DATE DEFAULT CURRENT_DATE,
  fecha_baja DATE,
  cuota_anual DECIMAL(10, 2),
  forma_pago VARCHAR(50) CHECK (forma_pago IN ('transferencia', 'domiciliacion', 'efectivo')),
  iban VARCHAR(34),
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: categorias_equipo
-- ============================================
CREATE TABLE public.categorias_equipo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(100) NOT NULL UNIQUE,
  orden INT DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar categorías por defecto
INSERT INTO public.categorias_equipo (nombre, orden) VALUES 
  ('Prebenjamín', 1),
  ('Benjamín', 2),
  ('Alevín', 3),
  ('Infantil', 4),
  ('Cadete', 5),
  ('Juvenil', 6),
  ('Femenino', 7),
  ('Sénior', 8),
  ('Veteranos', 9);

-- ============================================
-- TABLA: equipos
-- ============================================
CREATE TABLE public.equipos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  categoria_id UUID NOT NULL REFERENCES public.categorias_equipo(id) ON DELETE RESTRICT,
  nombre VARCHAR(255) NOT NULL,
  temporada VARCHAR(20) NOT NULL, -- Ej: "2026-27"
  descripcion TEXT,
  imagen_url TEXT,
  entrenador VARCHAR(255),
  delegado VARCHAR(255),
  grupo_liga VARCHAR(100),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: jugadores
-- ============================================
CREATE TABLE public.jugadores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  socio_id UUID REFERENCES public.socios(id) ON DELETE SET NULL,
  equipo_id UUID REFERENCES public.equipos(id) ON DELETE SET NULL,
  nombre VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE,
  dorsal INT,
  posicion VARCHAR(50) CHECK (posicion IN ('Portero', 'Defensa', 'Centrocampista', 'Delantero')),
  foto_url TEXT,
  ficha_federativa VARCHAR(50),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: categorias_noticia
-- ============================================
CREATE TABLE public.categorias_noticia (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  color VARCHAR(7), -- Hex color
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar categorías por defecto
INSERT INTO public.categorias_noticia (nombre, slug, color) VALUES 
  ('Primer Equipo', 'primer-equipo', '#2A5D3C'),
  ('Cantera', 'cantera', '#4A7C59'),
  ('Club', 'club', '#1A1A1A'),
  ('Femenino', 'femenino', '#8B4513'),
  ('Eventos', 'eventos', '#DAA520');

-- ============================================
-- TABLA: noticias
-- ============================================
CREATE TABLE public.noticias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  categoria_id UUID REFERENCES public.categorias_noticia(id) ON DELETE SET NULL,
  autor_id UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
  titulo VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  extracto TEXT,
  contenido TEXT NOT NULL,
  imagen_principal TEXT,
  galeria_imagenes TEXT[], -- Array de URLs
  destacada BOOLEAN DEFAULT false,
  publicada BOOLEAN DEFAULT false,
  fecha_publicacion TIMESTAMPTZ,
  vistas INT DEFAULT 0,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: instalaciones
-- ============================================
CREATE TABLE public.instalaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  descripcion TEXT,
  descripcion_larga TEXT,
  imagen_principal TEXT,
  galeria_imagenes TEXT[],
  caracteristicas TEXT[], -- Array de características
  horario TEXT,
  activo BOOLEAN DEFAULT true,
  orden INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar instalaciones por defecto
INSERT INTO public.instalaciones (nombre, slug, descripcion, orden) VALUES 
  ('Vestuarios', 'vestuarios', 'Vestuarios completamente renovados con todas las comodidades para los jugadores y cuerpo técnico del club.', 1),
  ('Campo de Juego', 'campo', 'Césped artificial de última generación homologado para competición federada, con medidas reglamentarias.', 2),
  ('Iluminación', 'iluminacion', 'Iluminación LED de alta potencia que permite entrenamientos y partidos en horario nocturno con total visibilidad.', 3),
  ('Gradas', 'gradas', 'Gradas con capacidad para cientos de aficionados, cubierta para protegerse de la lluvia y sol en los partidos de local.', 4);

-- ============================================
-- TABLA: contacto_mensajes
-- ============================================
CREATE TABLE public.contacto_mensajes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  asunto VARCHAR(500) NOT NULL,
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT false,
  respondido BOOLEAN DEFAULT false,
  fecha_respuesta TIMESTAMPTZ,
  notas_internas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: inscripciones (formulario de inscripción de nuevos socios/jugadores)
-- ============================================
CREATE TABLE public.inscripciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('socio', 'jugador')),
  nombre VARCHAR(255) NOT NULL,
  apellidos VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  fecha_nacimiento DATE,
  categoria_interes UUID REFERENCES public.categorias_equipo(id),
  tutor_nombre VARCHAR(255), -- Para menores
  tutor_dni VARCHAR(20),
  tutor_telefono VARCHAR(20),
  mensaje TEXT,
  estado VARCHAR(50) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'contactado', 'inscrito', 'rechazado')),
  notas_internas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: partidos
-- ============================================
CREATE TABLE public.partidos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  equipo_id UUID NOT NULL REFERENCES public.equipos(id) ON DELETE CASCADE,
  rival VARCHAR(255) NOT NULL,
  es_local BOOLEAN DEFAULT true,
  fecha TIMESTAMPTZ NOT NULL,
  lugar VARCHAR(255),
  competicion VARCHAR(255), -- Liga, Copa, Amistoso
  jornada INT,
  goles_favor INT,
  goles_contra INT,
  resultado VARCHAR(20) CHECK (resultado IN ('victoria', 'empate', 'derrota', 'pendiente')),
  cronica TEXT,
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: eventos
-- ============================================
CREATE TABLE public.eventos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  descripcion TEXT,
  descripcion_larga TEXT,
  imagen_url TEXT,
  fecha_inicio TIMESTAMPTZ NOT NULL,
  fecha_fin TIMESTAMPTZ,
  lugar VARCHAR(255),
  precio DECIMAL(10, 2),
  capacidad INT,
  inscripcion_requerida BOOLEAN DEFAULT false,
  url_inscripcion TEXT,
  publicado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: patrocinadores
-- ============================================
CREATE TABLE public.patrocinadores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(255) NOT NULL,
  logo_url TEXT,
  sitio_web TEXT,
  descripcion TEXT,
  tipo VARCHAR(50) CHECK (tipo IN ('principal', 'oficial', 'colaborador')),
  activo BOOLEAN DEFAULT true,
  orden INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: documentos (para archivos del club)
-- ============================================
CREATE TABLE public.documentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  archivo_url TEXT NOT NULL,
  tipo VARCHAR(50) CHECK (tipo IN ('estatutos', 'reglamento', 'acta', 'memoria', 'otro')),
  publico BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLA: galeria (fotos y videos del club)
-- ============================================
CREATE TABLE public.galeria (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen_url TEXT NOT NULL,
  miniatura_url TEXT,
  tipo VARCHAR(50) DEFAULT 'imagen' CHECK (tipo IN ('imagen', 'video')),
  album VARCHAR(100),
  fecha DATE,
  destacada BOOLEAN DEFAULT false,
  publicada BOOLEAN DEFAULT true,
  orden INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar álbumes por defecto
INSERT INTO public.galeria (titulo, descripcion, imagen_url, album, publicada, orden) VALUES 
  ('Plantilla 2025-26', 'Foto oficial del primer equipo temporada 2025-26', '/images/historia-equipo-real.jpg', 'Temporada 2025-26', true, 1),
  ('Campo Municipal', 'Vistas del campo de fútbol', '/images/instalacion-campo.jpg', 'Instalaciones', true, 2),
  ('Vestuarios', 'Instalaciones renovadas', '/images/instalacion-vestuarios.jpg', 'Instalaciones', true, 3);

-- ============================================
-- TABLA: configuracion_web
-- ============================================
CREATE TABLE public.configuracion_web (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clave VARCHAR(100) NOT NULL UNIQUE,
  valor TEXT,
  tipo VARCHAR(50) DEFAULT 'text' CHECK (tipo IN ('text', 'number', 'boolean', 'json', 'html')),
  descripcion TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar configuración por defecto
INSERT INTO public.configuracion_web (clave, valor, tipo, descripcion) VALUES 
  ('club_nombre', 'C.D. Unión Deportiva Villar del Olmo', 'text', 'Nombre completo del club'),
  ('club_fundacion', '1970', 'text', 'Año de fundación'),
  ('club_email', 'info@udvillardelolmo.es', 'text', 'Email de contacto'),
  ('club_telefono', '+34 600 000 000', 'text', 'Teléfono de contacto'),
  ('club_direccion', 'Campo Municipal de Fútbol, 28511 Villar del Olmo, Madrid', 'text', 'Dirección'),
  ('redes_instagram', '', 'text', 'URL Instagram'),
  ('redes_facebook', '', 'text', 'URL Facebook'),
  ('redes_twitter', '', 'text', 'URL Twitter/X'),
  ('redes_youtube', '', 'text', 'URL YouTube');

-- ============================================
-- ÍNDICES
-- ============================================

-- Noticias
CREATE INDEX idx_noticias_slug ON public.noticias(slug);
CREATE INDEX idx_noticias_publicada ON public.noticias(publicada, fecha_publicacion DESC);
CREATE INDEX idx_noticias_categoria ON public.noticias(categoria_id);

-- Socios
CREATE INDEX idx_socios_numero ON public.socios(numero_socio);
CREATE INDEX idx_socios_estado ON public.socios(estado);
CREATE INDEX idx_socios_tipo ON public.socios(tipo);

-- Equipos
CREATE INDEX idx_equipos_temporada ON public.equipos(temporada);
CREATE INDEX idx_equipos_categoria ON public.equipos(categoria_id);

-- Jugadores
CREATE INDEX idx_jugadores_equipo ON public.jugadores(equipo_id);

-- Partidos
CREATE INDEX idx_partidos_equipo ON public.partidos(equipo_id);
CREATE INDEX idx_partidos_fecha ON public.partidos(fecha DESC);

-- Contacto
CREATE INDEX idx_contacto_leido ON public.contacto_mensajes(leido, created_at DESC);

-- ============================================
-- TRIGGERS para updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON public.usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_socios_updated_at BEFORE UPDATE ON public.socios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_equipos_updated_at BEFORE UPDATE ON public.equipos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jugadores_updated_at BEFORE UPDATE ON public.jugadores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_noticias_updated_at BEFORE UPDATE ON public.noticias FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_instalaciones_updated_at BEFORE UPDATE ON public.instalaciones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inscripciones_updated_at BEFORE UPDATE ON public.inscripciones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partidos_updated_at BEFORE UPDATE ON public.partidos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON public.eventos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patrocinadores_updated_at BEFORE UPDATE ON public.patrocinadores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.socios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_equipo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jugadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_noticia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instalaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacto_mensajes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patrocinadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion_web ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeria ENABLE ROW LEVEL SECURITY;

-- Políticas públicas de lectura (contenido visible para todos)
CREATE POLICY "Noticias publicadas son públicas" ON public.noticias FOR SELECT USING (publicada = true);
CREATE POLICY "Equipos activos son públicos" ON public.equipos FOR SELECT USING (activo = true);
CREATE POLICY "Categorías de equipo son públicas" ON public.categorias_equipo FOR SELECT USING (activo = true);
CREATE POLICY "Categorías de noticia son públicas" ON public.categorias_noticia FOR SELECT USING (true);
CREATE POLICY "Instalaciones activas son públicas" ON public.instalaciones FOR SELECT USING (activo = true);
CREATE POLICY "Jugadores activos son públicos" ON public.jugadores FOR SELECT USING (activo = true);
CREATE POLICY "Partidos son públicos" ON public.partidos FOR SELECT USING (true);
CREATE POLICY "Eventos publicados son públicos" ON public.eventos FOR SELECT USING (publicado = true);
CREATE POLICY "Patrocinadores activos son públicos" ON public.patrocinadores FOR SELECT USING (activo = true);
CREATE POLICY "Documentos públicos son accesibles" ON public.documentos FOR SELECT USING (publico = true);
CREATE POLICY "Configuración web es pública" ON public.configuracion_web FOR SELECT USING (true);
CREATE POLICY "Galería publicada es pública" ON public.galeria FOR SELECT USING (publicada = true);

-- Políticas de inserción pública (formularios)
CREATE POLICY "Cualquiera puede enviar mensaje de contacto" ON public.contacto_mensajes FOR INSERT WITH CHECK (true);
CREATE POLICY "Cualquiera puede enviar inscripción" ON public.inscripciones FOR INSERT WITH CHECK (true);

-- Políticas de admin (usuarios autenticados con rol admin)
CREATE POLICY "Admins tienen acceso total a usuarios" ON public.usuarios FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins tienen acceso total a socios" ON public.socios FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins tienen acceso total a noticias" ON public.noticias FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol IN ('admin', 'editor'))
);

CREATE POLICY "Admins tienen acceso total a contacto" ON public.contacto_mensajes FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins tienen acceso total a inscripciones" ON public.inscripciones FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar equipos" ON public.equipos FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar jugadores" ON public.jugadores FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar instalaciones" ON public.instalaciones FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar partidos" ON public.partidos FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar eventos" ON public.eventos FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar patrocinadores" ON public.patrocinadores FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar documentos" ON public.documentos FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar categorías" ON public.categorias_equipo FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar categorías noticia" ON public.categorias_noticia FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar configuración" ON public.configuracion_web FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

CREATE POLICY "Admins pueden gestionar galería" ON public.galeria FOR ALL USING (
  auth.uid() IN (SELECT auth_id FROM public.usuarios WHERE rol = 'admin')
);

-- ============================================
-- VISTAS útiles
-- ============================================

-- Vista de noticias con categoría
CREATE VIEW public.v_noticias_completas AS
SELECT 
  n.*,
  c.nombre as categoria_nombre,
  c.slug as categoria_slug,
  c.color as categoria_color,
  u.nombre as autor_nombre
FROM public.noticias n
LEFT JOIN public.categorias_noticia c ON n.categoria_id = c.id
LEFT JOIN public.usuarios u ON n.autor_id = u.id;

-- Vista de equipos con categoría
CREATE VIEW public.v_equipos_completos AS
SELECT 
  e.*,
  c.nombre as categoria_nombre,
  (SELECT COUNT(*) FROM public.jugadores j WHERE j.equipo_id = e.id AND j.activo = true) as num_jugadores
FROM public.equipos e
LEFT JOIN public.categorias_equipo c ON e.categoria_id = c.id;

-- Vista de próximos partidos
CREATE VIEW public.v_proximos_partidos AS
SELECT 
  p.*,
  e.nombre as equipo_nombre,
  c.nombre as categoria_nombre
FROM public.partidos p
JOIN public.equipos e ON p.equipo_id = e.id
JOIN public.categorias_equipo c ON e.categoria_id = c.id
WHERE p.fecha > NOW() AND p.resultado = 'pendiente'
ORDER BY p.fecha ASC;

-- ============================================
-- FIN DEL SCHEMA
-- ============================================
