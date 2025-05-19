import { create } from 'zustand'
import { CartDrawerStore } from '@/types/store.types'

export const useCartDrawerStore = create<CartDrawerStore>(set => ({
  isOpen: false,
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
}))
