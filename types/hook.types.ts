import { ProductListItem } from './product.types'

export type Gender = 'man' | 'woman'

export interface NavigationCategory {
  basePath: string
  categories: { label: string; value?: string }[]
  sale: {
    label: string
    href: string
  }
}

export type FilterKey = 'sizes' | 'bestFor' | 'materials' | 'colorType'

export interface UseFiltersReturn {
  selected: string[]
  toggle: (value: string) => void
}

export interface UseProductsSWRProps {
  products: ProductListItem[]
  isLoading: boolean
  isError: Error | null
}
