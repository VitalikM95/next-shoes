import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartStore } from '@/types/store.types'

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      localItems: [],
      serverItems: [],
      isLoading: false,

      addLocalItem: item =>
        set(state => ({
          localItems: [...state.localItems, item],
        })),

      removeLocalItem: itemId =>
        set(state => ({
          localItems: state.localItems.filter(item => item.id !== itemId),
        })),

      updateLocalItemQuantity: (itemId, quantity) =>
        set(state => ({
          localItems: state.localItems.map(item =>
            item.id === itemId ? { ...item, quantity } : item,
          ),
        })),

      clearLocalCart: () => set({ localItems: [] }),

      setServerItems: items => set({ serverItems: items }),
      setLoading: loading => set({ isLoading: loading }),

      getCartTotal: isLoggedIn => {
        const items = isLoggedIn ? get().serverItems : get().localItems

        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        )

        return { totalItems, totalPrice }
      },
    }),
    {
      name: 'cart-storage',
      partialize: state => ({ localItems: state.localItems }),
    },
  ),
)
