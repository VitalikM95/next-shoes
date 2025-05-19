import { create } from 'zustand'
import { ProductSelectionState } from '@/types/store.types'

export const useProductSelectionStore = create<ProductSelectionState>(set => ({
  colorIndex: 0,
  size: '',
  setColorIndex: index => set({ colorIndex: index }),
  setSize: size => set({ size }),
}))
