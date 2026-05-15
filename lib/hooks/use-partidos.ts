'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useProximosPartidos(limit = 5) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/partidos?tipo=proximos&limit=${limit}`,
    fetcher
  )
  
  return {
    partidos: data?.data || [],
    isLoading,
    isError: error,
    mutate
  }
}

export function useUltimosResultados(limit = 5) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/partidos?tipo=resultados&limit=${limit}`,
    fetcher
  )
  
  return {
    partidos: data?.data || [],
    isLoading,
    isError: error,
    mutate
  }
}

export function usePartidosEquipo(equipoId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    equipoId ? `/api/partidos?equipo=${equipoId}` : null,
    fetcher
  )
  
  return {
    partidos: data?.data || [],
    isLoading,
    isError: error,
    mutate
  }
}
