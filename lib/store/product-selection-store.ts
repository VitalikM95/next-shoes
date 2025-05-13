import { create } from 'zustand'

interface ProductSelectionState {
  colorIndex: number
  size: string
  setColorIndex: (index: number) => void
  setSize: (size: string) => void
}

export const useProductSelectionStore = create<ProductSelectionState>(
  (set) => ({
    colorIndex: 0,
    size: '',
    setColorIndex: (index) => set({ colorIndex: index }),
    setSize: (size) => set({ size }),
  })
)
