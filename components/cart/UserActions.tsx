'use client'

import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useCartDrawerStore } from '@/lib/store/cart-drawer-store'
import { useCartSWR } from '@/lib/hooks/useCartSWR'

const UserActions: FC = () => {
  const { openDrawer } = useCartDrawerStore()
  const { totalItems } = useCartSWR()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <div className="flex w-auto md:w-32 items-baseline justify-around pt-2 md:pt-3 gap-1 md:gap-2">
      <Link href="/profile" aria-label="Profile">
        <Button className="h-8 md:h-10 w-fit px-2" variant="link">
          <User strokeWidth={1} className="!h-8 !w-8" />
        </Button>
      </Link>
      <Button
        className="h-8 md:h-10 w-fit px-2"
        variant="link"
        onClick={openDrawer}
      >
        <div className="relative bg-white">
          <ShoppingCart strokeWidth={1} className="!h-8 !w-8" />
          <span className="absolute -right-2 -top-2 z-40 text-sm bg-black rounded-full text-white px-1.5 py-0 text-center ">
            {hasMounted ? totalItems : 0}
          </span>
        </div>
      </Button>
    </div>
  )
}

export { UserActions }
