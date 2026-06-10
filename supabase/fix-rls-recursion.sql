-- ============================================
-- FIX: Recursión infinita en políticas RLS de "usuarios"
-- ============================================
-- Problema: la política de "usuarios" consultaba la propia tabla
-- "usuarios" dentro de su USING(...), lo que provoca recursión
-- infinita (error 42P17).
--
-- Solución: usar una función SECURITY DEFINER que se salta el RLS
-- al comprobar el rol. Ejecuta TODO este archivo en:
-- Supabase -> SQL Editor.
-- ============================================

-- 1) Función auxiliar que comprueba si el usuario actual es admin/editor
--    SECURITY DEFINER => se ejecuta con permisos del owner y NO dispara
--    el RLS de "usuarios", evitando la recursión.
create or replace function public.es_staff()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.usuarios
    where auth_id = auth.uid()
      and activo = true
      and rol in ('admin', 'editor')
  );
$$;

create or replace function public.es_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.usuarios
    where auth_id = auth.uid()
      and activo = true
      and rol = 'admin'
  );
$$;

-- 2) Eliminar las políticas problemáticas y recrearlas usando las funciones

-- usuarios: cada uno ve/edita su propia fila; los admin ven todo
drop policy if exists "Admins tienen acceso total a usuarios" on public.usuarios;

create policy "Usuario ve su propio perfil"
  on public.usuarios for select
  using (auth_id = auth.uid() or public.es_admin());

create policy "Usuario edita su propio perfil"
  on public.usuarios for update
  using (auth_id = auth.uid() or public.es_admin());

create policy "Admins gestionan usuarios"
  on public.usuarios for all
  using (public.es_admin());

-- socios
drop policy if exists "Admins tienen acceso total a socios" on public.socios;
create policy "Admins tienen acceso total a socios"
  on public.socios for all using (public.es_admin());

-- noticias
drop policy if exists "Admins tienen acceso total a noticias" on public.noticias;
create policy "Admins tienen acceso total a noticias"
  on public.noticias for all using (public.es_staff());

-- contacto
drop policy if exists "Admins tienen acceso total a contacto" on public.contacto_mensajes;
create policy "Admins tienen acceso total a contacto"
  on public.contacto_mensajes for all using (public.es_admin());

-- inscripciones
drop policy if exists "Admins tienen acceso total a inscripciones" on public.inscripciones;
create policy "Admins tienen acceso total a inscripciones"
  on public.inscripciones for all using (public.es_admin());

-- equipos
drop policy if exists "Admins pueden gestionar equipos" on public.equipos;
create policy "Admins pueden gestionar equipos"
  on public.equipos for all using (public.es_admin());

-- jugadores
drop policy if exists "Admins pueden gestionar jugadores" on public.jugadores;
create policy "Admins pueden gestionar jugadores"
  on public.jugadores for all using (public.es_admin());

-- instalaciones
drop policy if exists "Admins pueden gestionar instalaciones" on public.instalaciones;
create policy "Admins pueden gestionar instalaciones"
  on public.instalaciones for all using (public.es_admin());

-- partidos
drop policy if exists "Admins pueden gestionar partidos" on public.partidos;
create policy "Admins pueden gestionar partidos"
  on public.partidos for all using (public.es_admin());

-- eventos
drop policy if exists "Admins pueden gestionar eventos" on public.eventos;
create policy "Admins pueden gestionar eventos"
  on public.eventos for all using (public.es_admin());

-- patrocinadores
drop policy if exists "Admins pueden gestionar patrocinadores" on public.patrocinadores;
create policy "Admins pueden gestionar patrocinadores"
  on public.patrocinadores for all using (public.es_admin());

-- galeria (gestión admin, además de la lectura pública ya existente)
drop policy if exists "Admins pueden gestionar galeria" on public.galeria;
create policy "Admins pueden gestionar galeria"
  on public.galeria for all using (public.es_staff());
