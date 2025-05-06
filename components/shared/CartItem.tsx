import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trash2, Minus, Plus } from 'lucide-react'
import { FC, memo } from 'react'
import { CartItemType } from '@/types/cart.types'
import { useCart } from '@/lib/hooks/useCart'

interface CartItemProps {
  item: CartItemType
}

const CartItem: FC<CartItemProps> = memo(({ item }) => {
  const { removeFromCart, updateQuantity } = useCart()

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
      <Link href={`/product/${item.productId}`} className="relative">
        <Image
          src={item.image}
          alt={item.colorName}
          width={140}
          height={140}
          className="object-cover image-bg"
        />
      </Link>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/product/${item.productId}`} className="flex-1">
            <h3 className="font-semibold truncate">{item.productName}</h3>
            <p className="text-sm font-semibold">
              Color:{' '}
              <span className="text-gray-500 font-normal">
                {item.colorName}
              </span>
            </p>
            <p className="text-sm font-semibold">
              Size:{' '}
              <span className="text-gray-500 font-normal">{item.size}</span>
            </p>
            <p className="text-sm font-semibold">
              Price:{' '}
              <span className="text-gray-500 font-normal">€{item.price}</span>
            </p>
          </Link>
          <Button
            variant="destructive"
            size="icon"
            className="border-none h-8 w-8 shrink-0"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm flex items-center gap-2">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center gap-1">
              <Button
                variant="secondary"
                className="w-8 h-8"
                size="icon"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isMinQuantity}
              >
                <Minus strokeWidth={2} className="!h-5 !w-5" />
              </Button>
              {item.quantity}
              <Button
                variant="secondary"
                className="w-8 h-8"
                size="icon"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isMaxQuantity}
              >
                <Plus strokeWidth={2} className="!h-5 !w-5" />
              </Button>
            </div>
          </div>
          <div className="font-semibold"> = €{itemTotal}</div>
        </div>
      </div>
    </div>
  )
})

CartItem.displayName = 'CartItem'

export { CartItem }
