-- ============================================================
-- FIX: Recursión infinita en políticas RLS (error 42P17)
-- ============================================================
-- Las políticas antiguas comprobaban el rol consultando la tabla
-- public.usuarios, y la propia política de usuarios se consultaba
-- a sí misma -> recursión infinita.
--
-- Ahora el rol vive en los metadatos del usuario de Supabase Auth
-- (app_metadata.rol), así que leemos el rol directamente del JWT.
-- Esto elimina la recursión por completo.
--
-- Ejecuta TODO este archivo en: Supabase -> SQL Editor
-- ============================================================

-- Función auxiliar: devuelve true si el usuario actual es admin/editor
-- Lee el rol desde el JWT (app_metadata.rol). No consulta ninguna tabla.
CREATE OR REPLACE FUNCTION public.es_staff()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'rol') IN ('admin', 'editor'),
    false
  );
$$;

CREATE OR REPLACE FUNCTION public.es_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'rol') = 'admin',
    false
  );
$$;

-- ============================================================
-- Eliminar políticas antiguas (las que causan recursión)
-- ============================================================
DROP POLICY IF EXISTS "Admins tienen acceso total a usuarios" ON public.usuarios;
DROP POLICY IF EXISTS "Admins tienen acceso total a socios" ON public.socios;
DROP POLICY IF EXISTS "Admins tienen acceso total a noticias" ON public.noticias;
DROP POLICY IF EXISTS "Admins tienen acceso total a contacto" ON public.contacto_mensajes;
DROP POLICY IF EXISTS "Admins tienen acceso total a inscripciones" ON public.inscripciones;
DROP POLICY IF EXISTS "Admins pueden gestionar equipos" ON public.equipos;
DROP POLICY IF EXISTS "Admins pueden gestionar jugadores" ON public.jugadores;
DROP POLICY IF EXISTS "Admins pueden gestionar instalaciones" ON public.instalaciones;
DROP POLICY IF EXISTS "Admins pueden gestionar partidos" ON public.partidos;
DROP POLICY IF EXISTS "Admins pueden gestionar eventos" ON public.eventos;
DROP POLICY IF EXISTS "Admins pueden gestionar patrocinadores" ON public.patrocinadores;
DROP POLICY IF EXISTS "Admins pueden gestionar documentos" ON public.documentos;
DROP POLICY IF EXISTS "Admins pueden gestionar categorías" ON public.categorias_equipo;
DROP POLICY IF EXISTS "Admins pueden gestionar categorías noticia" ON public.categorias_noticia;
DROP POLICY IF EXISTS "Admins pueden gestionar configuración" ON public.configuracion_web;
DROP POLICY IF EXISTS "Admins pueden gestionar galería" ON public.galeria;

-- ============================================================
-- Recrear políticas usando el rol del JWT (sin recursión)
-- ============================================================
CREATE POLICY "Staff gestiona usuarios" ON public.usuarios
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona socios" ON public.socios
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona noticias" ON public.noticias
  FOR ALL USING (public.es_staff()) WITH CHECK (public.es_staff());

CREATE POLICY "Staff gestiona contacto" ON public.contacto_mensajes
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona inscripciones" ON public.inscripciones
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona equipos" ON public.equipos
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona jugadores" ON public.jugadores
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona instalaciones" ON public.instalaciones
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona partidos" ON public.partidos
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona eventos" ON public.eventos
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona patrocinadores" ON public.patrocinadores
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona documentos" ON public.documentos
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona categorias equipo" ON public.categorias_equipo
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona categorias noticia" ON public.categorias_noticia
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona configuracion" ON public.configuracion_web
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());

CREATE POLICY "Staff gestiona galeria" ON public.galeria
  FOR ALL USING (public.es_admin()) WITH CHECK (public.es_admin());
