'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, X, Loader2 } from 'lucide-react'
import { useBodyLock } from '@/lib/hooks/useBodyLock'
import Image from 'next/image'
import { useCartSWR } from '@/lib/hooks/useCartSWR'
import { useCartDrawerStore } from '@/lib/store/cart-drawer-store'
import { CartItem } from './CartItem'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const CartDrawer = () => {
  const { cartItems, isLoading, totalItems, totalPrice } = useCartSWR()
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
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      } fixed left-0 top-0 z-30 h-screen w-screen bg-black/60 transition-all duration-300 ease-out`}
      onClick={closeDrawer}
    >
      <div
        className={`${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } fixed right-0 top-0 h-screen w-[375px] transform bg-white shadow-lg transition-transform duration-300 ease-out`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex h-full flex-col">
          <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b bg-white py-2 pl-3 pr-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-none border-2 border-transparent bg-white shadow-none hover:bg-black hover:text-white"
              onClick={closeDrawer}
            >
              <X strokeWidth={1} className="!h-7 !w-7" />
            </Button>
            <Image src="/logo.svg" alt="logo" width={100} height={30} />
            <div className="relative bg-white">
              <ShoppingCart strokeWidth={1} className="h-10 w-10" />
              <span className="absolute left-[18px] top-[9px] z-50 text-sm font-bold">
                {totalItems}
              </span>
            </div>
          </div>

          <div className="flex flex-grow flex-col gap-5 overflow-y-auto overflow-x-hidden p-4 pt-4">
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-10 text-center">
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
            <div className="mt-auto border-t p-4">
              <div className="mb-4 flex justify-between text-lg font-semibold">
                <span>Total amount:</span>
                <span>€{totalPrice}</span>
              </div>
              <Link href="/checkout">
                <Button variant="default" className="w-full font-semibold">
                  Make an order
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { CartDrawer }
