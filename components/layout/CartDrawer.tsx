'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, X, Loader2 } from 'lucide-react'
import { useBodyLock } from '@/lib/hooks/useBodyLock'
import Image from 'next/image'
import { useCart } from '@/lib/hooks/useCart'
import { useCartDrawerStore } from '@/lib/store/cart-drawer-store'
import { CartItem } from '../shared/CartItem'
import { useState, useEffect } from 'react'

const CartDrawer = () => {
  const { cartItems, isLoading, totalItems, totalPrice, makeOrder } = useCart()
  const { isOpen, closeDrawer } = useCartDrawerStore()
  const [mounted, setMounted] = useState(false)

  // Перевіряємо, чи компонент змонтований
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Блокуємо прокрутку body коли дравер відкритий
  useBodyLock(isOpen && mounted)

  // Не рендеримо нічого до повного монтування компонента
  if (!mounted) return null

  return (
    <div
      className={`${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } h-screen w-screen bg-black/60 fixed top-0 z-30 left-0 transition-all duration-300 ease-out`}
      onClick={closeDrawer}
    >
      <div
        className={`${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transform top-0 right-0 fixed h-screen bg-white w-[375px] shadow-lg transition-transform duration-300 ease-out`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="bg-white py-2 pl-3 pr-10 sticky top-0 z-10 w-full flex items-center justify-between border-b">
            <Button
              variant="outline"
              size="icon"
              className="bg-white border-2 border-transparent shadow-none rounded-none hover:bg-black hover:text-white"
              onClick={closeDrawer}
            >
              <X strokeWidth={1} className="!h-7 !w-7" />
            </Button>
            <Image
              src="/logo.svg"
              alt="logo"
              width={100}
              height={30}
              className="cursor-pointer"
            />
            <div className="bg-white relative">
              <ShoppingCart strokeWidth={1} className="h-10 w-10" />
              <span className="absolute left-[18px] top-[9px] z-50 text-sm font-bold">
                {totalItems}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden pt-4 gap-5 p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg">Cart is empty :(</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="mt-auto p-4 border-t">
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total amount:</span>
                <span>€{totalPrice}</span>
              </div>
              <Button
                variant="default"
                className="w-full font-semibold"
                onClick={makeOrder}
              >
                Make an order
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { CartDrawer }
