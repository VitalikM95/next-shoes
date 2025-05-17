'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { FiltersState, useFiltersStore } from '@/lib/store/filters-store'

type FilterKey = keyof Omit<
  FiltersState,
  'resetFilters' | 'toggleFilter' | 'setFilters'
>

export const useDebouncedFilters = (filterKey: FilterKey) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selected = useFiltersStore(state => state[filterKey])
  const toggle = useFiltersStore(state => state.toggleFilter)

  const [debounced] = useDebounce<string[]>(selected, 400)

  useEffect(() => {
    // Якщо немає вибраних значень і немає параметрів в URL, не робимо нічого
    if (debounced.length === 0 && !searchParams.has(filterKey)) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    if (debounced.length > 0) {
      params.set(filterKey, debounced.join(','))
    } else {
      params.delete(filterKey)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [debounced, router, pathname, searchParams, filterKey])

  return {
    selected,
    toggle: (value: string) => toggle(filterKey, value),
  }
}
