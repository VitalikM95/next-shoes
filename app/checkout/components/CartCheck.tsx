'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { useCartSWR } from '@/lib/hooks/useCartSWR'

//  Component for checking the availability of products in the local cart for UNAUTHORIZED users
//  and redirect to the main page if the cart is empty

const CartCheck = () => {
  const router = useRouter()
  const { cartItems, isLoading } = useCartSWR()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated' && !isLoading) {
      if (cartItems.length === 0) {
        router.push('/')
      }
    }
  }, [cartItems.length, isLoading, router, status])

  return null
}

export default CartCheck
