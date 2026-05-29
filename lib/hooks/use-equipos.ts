'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useEquipos(temporada?: string) {
  const url = temporada ? `/api/equipos?temporada=${temporada}` : '/api/equipos'
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)
  
  return {
    equipos: data?.data || [],
    isLoading,
    isError: error,
    mutate
  }
}
