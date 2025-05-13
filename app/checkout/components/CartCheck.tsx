'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartSWR } from '@/lib/hooks/useCartSWR'
import { useSession } from 'next-auth/react'

/**
 * Компонент для перевірки наявності товарів у локальній корзині
 * та перенаправлення на головну сторінку, якщо корзина порожня
 */
const CartCheck = () => {
  const router = useRouter()
  const { cartItems, isLoading } = useCartSWR()
  const { status } = useSession()

  useEffect(() => {
    // Перевіряємо корзину лише для незареєстрованих користувачів
    // Для зареєстрованих користувачів перевірка вже відбулась на сервері
    if (status === 'unauthenticated' && !isLoading) {
      if (cartItems.length === 0) {
        router.push('/')
      }
    }
  }, [cartItems.length, isLoading, router, status])

  return null // Компонент не рендерить нічого в DOM
}

export default CartCheck
