'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFiltersStore } from '@/lib/store/filters-store'

const parseParam = (param: string | null): string[] => {
  if (!param) return []
  return param.split(',').filter(Boolean)
}

export const useSyncFiltersFromURL = () => {
  const searchParams = useSearchParams()
  const setFilters = useFiltersStore(state => state.setFilters)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const sizes = parseParam(params.get('sizes'))
    const bestFor = parseParam(params.get('bestFor'))
    const materials = parseParam(params.get('materials'))
    const colorType = parseParam(params.get('colorType'))

    setFilters({
      sizes,
      bestFor,
      materials,
      colorType,
    })
  }, [searchParams])
}
