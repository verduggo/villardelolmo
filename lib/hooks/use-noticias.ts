'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useNoticias(limit?: number) {
  const url = limit ? `/api/noticias?limit=${limit}` : '/api/noticias'
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)
  
  return {
    noticias: data?.data || [],
    isLoading,
    isError: error,
    mutate
  }
}

export function useNoticiasDestacadas(limit = 3) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/noticias?destacadas=true&limit=${limit}`,
    fetcher
  )
  
  return {
    noticias: data?.data || [],
    isLoading,
    isError: error,
    mutate
  }
}
