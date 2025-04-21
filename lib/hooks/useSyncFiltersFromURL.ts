'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFiltersStore } from '@/lib/store/useFiltersStore'

const parseParam = (param: string | null): string[] => {
  if (!param) return []
  return param.split(',').filter(Boolean)
}

export const useSyncFiltersFromURL = () => {
  const searchParams = useSearchParams()
  const setFilters = useFiltersStore(state => state.setFilters)

  useEffect(() => {
    const sizes = parseParam(searchParams.get('sizes'))
    const bestFor = parseParam(searchParams.get('bestFor'))
    const materials = parseParam(searchParams.get('materials'))
    const colorType = parseParam(searchParams.get('colorType'))

    setFilters({
      sizes,
      bestFor,
      materials,
      colorType,
    })
  }, [searchParams]) // тепер оновлюється при кожній зміні URL
}
