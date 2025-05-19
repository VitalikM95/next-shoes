import { CartItemType, CartTotalType } from './cart.types'

export interface CartDrawerStore {
  isOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

export interface CartStore {
  localItems: CartItemType[]
  serverItems: CartItemType[]
  isLoading: boolean

  addLocalItem: (item: CartItemType) => void
  removeLocalItem: (itemId: string) => void
  updateLocalItemQuantity: (itemId: string, quantity: number) => void
  clearLocalCart: () => void

  setServerItems: (items: CartItemType[]) => void
  setLoading: (loading: boolean) => void

  getCartTotal: (isLoggedIn: boolean) => CartTotalType
}

export interface FormState {
  isSubmitting: boolean
  isValid: boolean
  setSubmitting: (isSubmitting: boolean) => void
  setValid: (isValid: boolean) => void
}

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

export interface ProductSelectionState {
  colorIndex: number
  size: string
  setColorIndex: (index: number) => void
  setSize: (size: string) => void
}
