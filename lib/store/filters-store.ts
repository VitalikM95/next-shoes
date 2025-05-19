import { create } from 'zustand'
import { FiltersState } from '@/types/store.types'

export const useFiltersStore = create<FiltersState>(set => ({
  sizes: [],
  bestFor: [],
  materials: [],
  colorType: [],
  toggleFilter: (key, value) =>
    set(state => {
      const list = state[key]
      const isSelected = list.includes(value)
      return {
        [key]: isSelected
          ? list.filter(item => item !== value)
          : [...list, value],
      } as Partial<FiltersState>
    }),
  setFilters: filters => set(state => ({ ...state, ...filters })),
  resetFilters: () =>
    set({
      sizes: [],
      bestFor: [],
      materials: [],
      colorType: [],
    }),
}))
