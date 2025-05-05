'use client'

import { useCartDrawerStore } from '@/lib/store/cart-drawer-store'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import { useCart } from '@/lib/hooks/useCart'
import { useState, useEffect } from 'react'

const UserActions = () => {
  const { openDrawer } = useCartDrawerStore()
  const { totalItems } = useCart()
  const [hasMounted, setHasMounted] = useState(false)

  // Handle hydration mismatch by rendering only after client-side hydration
  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <div className="w-32 pt-3 flex items-baseline justify-around">
      <Link href="/profile" aria-label="Profile">
        <Button className="h-10 w-fit px-2" variant="link">
          <User strokeWidth={1} className="h-10 w-10" />
        </Button>
      </Link>
      <Button className="h-10 w-fit px-2" variant="link" onClick={openDrawer}>
        <div className="bg-white relative">
          <ShoppingCart strokeWidth={1} className="h-10 w-10" />
          <span className="absolute left-[18px] top-[9px] z-50 text-sm font-bold">
            {hasMounted ? totalItems : 0}
          </span>
        </div>
      </Button>
    </div>
  )
}

export { UserActions }
