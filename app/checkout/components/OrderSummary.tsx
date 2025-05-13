'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useCartSWR } from '@/lib/hooks/useCartSWR'
import { Button } from '@/components/ui/button'
import { useFormState } from '@/lib/store/checkout-form-store'

const OrderSummary = () => {
  const { cartItems, totalPrice, isLoading } = useCartSWR()
  const [mounted, setMounted] = useState(false)
  const { isSubmitting, isValid } = useFormState()

  // Для уникнення помилок гідратації
  useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-10 bg-gray-50">
      <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

      <div className="max-h-[400px] overflow-y-auto">
        {cartItems.map(item => (
          <div
            key={item.id}
            className="mb-4 flex gap-4 border-b border-gray-200 pb-4"
          >
            <div className="relative h-24 w-24 flex-shrink-0">
              <Image
                src={item.image}
                alt={item.productName}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-grow">
              <h3 className="font-medium">{item.productName}</h3>
              <p className="text-sm text-gray-500">Color: {item.colorName}</p>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>

            <div className="text-right">
              <p className="font-medium">
                {mounted
                  ? `€${(item.price * item.quantity).toFixed(2)}`
                  : 'Loading...'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <span>Subtotal</span>
          <span>
            {mounted ? `€${totalPrice.toFixed(2)}` : 'Calculating...'}
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>
            {mounted ? `€${totalPrice.toFixed(2)}` : 'Calculating...'}
          </span>
        </div>
      </div>

      {/* Кнопка підтвердження замовлення */}
      <div className="mt-6">
        <Button
          type="submit"
          form="checkout-form"
          className="w-full"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </Button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        By placing your order, you agree to our{' '}
        <span className="cursor-pointer underline">Terms of Service</span> and{' '}
        <span className="cursor-pointer underline">Privacy Policy</span>.
      </div>
    </div>
  )
}

export default OrderSummary
