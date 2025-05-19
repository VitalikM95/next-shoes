import { FC, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useCartSWR } from '@/lib/hooks/useCartSWR'
import { CartItemType } from '@/types/cart.types'
interface CartItemProps {
  item: CartItemType
}

const CartItem: FC<CartItemProps> = memo(({ item }) => {
  const { removeFromCart, updateQuantity } = useCartSWR()

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 9) {
      updateQuantity(item.id, newQuantity)
    }
  }

  const isMinQuantity = item.quantity <= 1
  const isMaxQuantity = item.quantity >= 9
  const itemTotal = item.price * item.quantity

  return (
    <div className="flex gap-4 border-b pb-4">
      <Link href={`/product/${item.productId}`} className="relative shrink-0">
        <Image
          src={item.image}
          alt={item.colorName}
          width={100}
          height={100}
          className="image-bg object-cover"
        />
      </Link>
      <div className="flex w-full flex-col gap-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${item.productId}`} className="flex-1 min-w-0">
            <h3 className="truncate font-bold">{item.productName}</h3>
            <p className="text-sm font-medium">
              Color:{' '}
              <span className="font-normal text-gray-500">
                {item.colorName}
              </span>
            </p>
            <p className="text-sm font-medium">
              Size:{' '}
              <span className="font-normal text-gray-500">{item.size}</span>
            </p>
            <p className="flex justify-between text-sm font-medium">
              Price:{' '}
              <span className="text-base font-semibold">€{itemTotal}</span>
            </p>
          </Link>
          <Button
            variant="destructive"
            size="icon"
            className="h-8 w-8 shrink-0 border-none"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center gap-1 font-semibold">
            <Button
              variant="secondary"
              className="h-8 w-8"
              size="icon"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isMinQuantity}
            >
              <Minus strokeWidth={2} className="!h-5 !w-5" />
            </Button>
            {item.quantity}
            <Button
              variant="secondary"
              className="h-8 w-8"
              size="icon"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isMaxQuantity}
            >
              <Plus strokeWidth={2} className="!h-5 !w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

CartItem.displayName = 'CartItem'

export { CartItem }
