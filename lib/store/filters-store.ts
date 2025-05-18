import { create } from 'zustand'

export type FiltersState = {
  sizes: string[]
  bestFor: string[]
  materials: string[]
  colorType: string[]
  toggleFilter: (
    key: keyof Omit<
      FiltersState,
      'resetFilters' | 'toggleFilter' | 'setFilters'
    >,
    value: string,
  ) => void
  setFilters: (
    filters: Partial<
      Omit<FiltersState, 'resetFilters' | 'toggleFilter' | 'setFilters'>
    >,
  ) => void
  resetFilters: () => void
}

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
