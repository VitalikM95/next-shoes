import { create } from 'zustand'
import { CartItemType, CartTotalType } from '@/types/cart.types'
import { persist } from 'zustand/middleware'

interface CartStore {
  // Локальна корзина (для неавторизованих користувачів)
  localItems: CartItemType[]

  // Серверна корзина (для авторизованих користувачів)
  serverItems: CartItemType[]

  // Стан завантаження
  isLoading: boolean

  // Дії з локальною корзиною
  addLocalItem: (item: CartItemType) => void
  removeLocalItem: (itemId: string) => void
  updateLocalItemQuantity: (itemId: string, quantity: number) => void
  clearLocalCart: () => void

  // Дії з серверною корзиною
  setServerItems: (items: CartItemType[]) => void
  setLoading: (loading: boolean) => void

  // Отримання статистики
  getCartTotal: (isLoggedIn: boolean) => CartTotalType
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      localItems: [],
      serverItems: [],
      isLoading: false,

      // Локальна корзина
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
            item.id === itemId ? { ...item, quantity } : item
          ),
        })),

      clearLocalCart: () => set({ localItems: [] }),

      // Серверна корзина
      setServerItems: items => set({ serverItems: items }),
      setLoading: loading => set({ isLoading: loading }),

      // Статистика корзини
      getCartTotal: isLoggedIn => {
        const items = isLoggedIn ? get().serverItems : get().localItems

        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )

        return { totalItems, totalPrice }
      },
    }),
    {
      name: 'cart-storage',
      partialize: state => ({ localItems: state.localItems }),
    }
  )
)
