'use client'

import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { CartItemType } from '@/types/cart.types'
import { useCartStore } from '@/lib/store/cart-store'
import { Product, Variant } from '@/types/product.types'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch cart data')
  return res.json()
}

export const useCart = () => {
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user

  // Зустосовуємо Zustand для роботи з локальною та серверною корзинами
  const {
    localItems,
    serverItems,
    isLoading,
    addLocalItem,
    removeLocalItem,
    updateLocalItemQuantity,
    setServerItems,
    setLoading,
    getCartTotal,
  } = useCartStore()

  // Отримуємо дані корзини з сервера для авторизованого користувача
  const { data, mutate } = useSWR(isLoggedIn ? '/api/cart' : null, fetcher, {
    onSuccess: data => {
      if (data?.items) {
        setServerItems(data.items)
      }
    },
    revalidateOnFocus: false,
  })

  // Додавання товару в корзину
  const addToCart = useCallback(
    async (
      variantId: string,
      size: string,
      product: Product,
      variant: Variant,
      price: number
    ) => {
      if (isLoggedIn) {
        // Додаємо товар до серверної корзини
        setLoading(true)
        try {
          const response = await fetch('/api/cart/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              variantId,
              size,
              quantity: 1,
              price,
              productName: product.name,
              productId: product.id,
              colorName: variant.colorName,
              image: variant.images[0] || '',
            }),
          })

          if (!response.ok) throw new Error('Failed to add item to cart')

          // Оновлюємо дані корзини
          mutate()
        } catch (error) {
          console.error('Error adding to cart:', error)
        } finally {
          setLoading(false)
        }
      } else {
        // Додаємо товар в локальну корзину
        const newItem: CartItemType = {
          id: `${variantId}-${size}-${Date.now()}`,
          variantId,
          size,
          quantity: 1,
          price: price || 0, // Додаємо перевірку на випадок, якщо price не передано
          productName: product.name,
          productId: product.id,
          colorName: variant.colorName,
          image: variant.images[0] || '',
        }

        addLocalItem(newItem)
      }
    },
    [isLoggedIn, addLocalItem, setLoading, mutate]
  )

  // Видалення товару з корзини
  const removeFromCart = useCallback(
    async (itemId: string) => {
      if (isLoggedIn) {
        // Видаляємо товар з серверної корзини
        setLoading(true)
        try {
          const response = await fetch(`/api/cart/items/${itemId}`, {
            method: 'DELETE',
          })

          if (!response.ok) throw new Error('Failed to remove item from cart')

          // Оновлюємо дані корзини
          mutate()
        } catch (error) {
          console.error('Error removing from cart:', error)
        } finally {
          setLoading(false)
        }
      } else {
        // Видаляємо товар з локальної корзини
        removeLocalItem(itemId)
      }
    },
    [isLoggedIn, removeLocalItem, setLoading, mutate]
  )

  // Оновлення кількості товару в корзині
  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      if (quantity < 1 || quantity > 9) return

      if (isLoggedIn) {
        // Оновлюємо кількість товару в серверній корзині
        setLoading(true)
        try {
          const response = await fetch(`/api/cart/items/${itemId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
          })

          if (!response.ok) throw new Error('Failed to update item quantity')

          // Оновлюємо дані корзини
          mutate()
        } catch (error) {
          console.error('Error updating quantity:', error)
        } finally {
          setLoading(false)
        }
      } else {
        // Оновлюємо кількість товару в локальній корзині
        updateLocalItemQuantity(itemId, quantity)
      }
    },
    [isLoggedIn, updateLocalItemQuantity, setLoading, mutate]
  )

  // Отримуємо поточні товари корзини та статистику
  const cartItems = isLoggedIn ? serverItems : localItems
  const { totalItems, totalPrice } = getCartTotal(isLoggedIn)

  // Метод для оформлення замовлення
  const makeOrder = useCallback(() => {
    console.log('Order items:', cartItems)
    console.log('Total price:', totalPrice)
  }, [cartItems, totalPrice])

  return {
    cartItems,
    isLoading,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    makeOrder,
    isLoggedIn,
  }
}
