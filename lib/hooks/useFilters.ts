'use client'

import { useEffect, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useFiltersStore } from '@/lib/store/filters-store'
import { FilterKey, UseFiltersReturn } from '@/types/hook.types'

export const useFilters = (key: FilterKey): UseFiltersReturn => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selected = useFiltersStore(state => state[key])
  const setFilters = useFiltersStore(state => state.setFilters)

  useEffect(() => {
    const value = searchParams.get(key)
    if (value) {
      const values = value.split(',').filter(Boolean)
      setFilters({ [key]: values })
    } else {
      setFilters({ [key]: [] })
    }
  }, [searchParams, key, setFilters])

  const toggle = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      const newSelected = selected.includes(value)
        ? selected.filter(item => item !== value)
        : [...selected, value]

      setFilters({ [key]: newSelected })

      if (newSelected.length > 0) {
        params.set(key, newSelected.join(','))
      } else {
        params.delete(key)
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [selected, router, pathname, searchParams, key, setFilters],
  )

  return { selected, toggle }
}
