'use client'

import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { CartItemType } from '@/types/cart.types'
import { Product, Variant } from '@/types/product.types'
import { useCartStore } from '@/lib/store/cart-store'

interface UseCartSWRReturn {
  cartItems: CartItemType[]
  isLoading: boolean
  totalItems: number
  totalPrice: number
  addToCart: (
    variantId: string,
    size: string,
    product: Product,
    variant: Variant,
    price: number,
  ) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  isLoggedIn: boolean
}

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Failed to fetch cart data')
    return res.json()
  })

export const useCartSWR = (): UseCartSWRReturn => {
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user

  const {
    localItems,
    serverItems,
    isLoading,
    addLocalItem,
    removeLocalItem,
    updateLocalItemQuantity,
    clearLocalCart,
    setServerItems,
    setLoading,
    getCartTotal,
  } = useCartStore()

  const { data, mutate } = useSWR(isLoggedIn ? '/api/cart' : null, fetcher, {
    onSuccess: data => {
      if (data?.items) {
        setServerItems(data.items)
      }
    },
    revalidateOnFocus: false,
  })

  const addToCart = useCallback(
    async (
      variantId: string,
      size: string,
      product: Product,
      variant: Variant,
      price: number,
    ): Promise<void> => {
      if (isLoggedIn) {
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

          mutate()
        } catch (error) {
          console.error('Error adding to cart:', error)
        } finally {
          setLoading(false)
        }
      } else {
        const existingItem = localItems.find(
          item => item.variantId === variantId && item.size === size,
        )

        if (existingItem) {
          if (existingItem.quantity < 9) {
            updateLocalItemQuantity(existingItem.id, existingItem.quantity + 1)
          }
        } else {
          const newItem: CartItemType = {
            id: `${variantId}-${size}-${Date.now()}`,
            variantId,
            size,
            quantity: 1,
            price: price || 0,
            productName: product.name,
            productId: product.id,
            colorName: variant.colorName,
            image: variant.images[0] || '',
          }

          addLocalItem(newItem)
        }
      }
    },
    [
      isLoggedIn,
      addLocalItem,
      updateLocalItemQuantity,
      setLoading,
      mutate,
      localItems,
    ],
  )

  const removeFromCart = useCallback(
    async (itemId: string): Promise<void> => {
      if (isLoggedIn) {
        setLoading(true)
        try {
          const response = await fetch(`/api/cart/items/${itemId}`, {
            method: 'DELETE',
          })

          if (!response.ok) throw new Error('Failed to remove item from cart')

          mutate()
        } catch (error) {
          console.error('Error removing from cart:', error)
        } finally {
          setLoading(false)
        }
      } else {
        removeLocalItem(itemId)
      }
    },
    [isLoggedIn, removeLocalItem, setLoading, mutate],
  )

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number): Promise<void> => {
      if (quantity < 1 || quantity > 9) return

      if (isLoggedIn) {
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

          mutate()
        } catch (error) {
          console.error('Error updating quantity:', error)
        } finally {
          setLoading(false)
        }
      } else {
        updateLocalItemQuantity(itemId, quantity)
      }
    },
    [isLoggedIn, updateLocalItemQuantity, setLoading, mutate],
  )

  const clearCart = useCallback(async (): Promise<void> => {
    if (isLoggedIn) {
      await mutate()
    }

    clearLocalCart()
  }, [isLoggedIn, clearLocalCart, mutate])

  const cartItems = isLoggedIn ? serverItems : localItems
  const { totalItems, totalPrice } = getCartTotal(isLoggedIn)

  return {
    cartItems,
    isLoading,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isLoggedIn,
  }
}
