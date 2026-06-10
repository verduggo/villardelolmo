"use client"

import useSWR from "swr"
import type { Database } from "@/lib/database.types"

export type Socio = Database["public"]["Tables"]["socios"]["Row"]

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    const error = new Error(data.error || "Error al cargar los datos del socio")
    ;(error as Error & { status?: number }).status = res.status
    throw error
  }
  return res.json()
}

export function useSocio() {
  const { data, error, isLoading, mutate } = useSWR<{ socio: Socio }>(
    "/api/socios/me",
    fetcher,
    { revalidateOnFocus: false }
  )

  return {
    socio: data?.socio ?? null,
    isLoading,
    error,
    mutate,
  }
}

// Iniciales para avatares: "Juan García" -> "JG"
export function getIniciales(nombre?: string | null, apellidos?: string | null): string {
  const n = nombre?.trim()?.[0] ?? ""
  const a = apellidos?.trim()?.[0] ?? ""
  return (n + a).toUpperCase() || "S"
}
