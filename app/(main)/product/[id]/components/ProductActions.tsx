'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { ShoppingCart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  RadioGroupCustom,
  RadioGroupItemRound,
  RadioGroupItemSquare,
} from '@/components/ui/radio-group-custom'
import { useProductSelectionStore } from '@/lib/store/product-selection-store'
import { SIZE_RANGES } from '@/lib/constants'
import { useCartSWR } from '@/lib/hooks/useCartSWR'
import { ProductActionsProps } from '@/types/product.types'

const ProductActions = ({ product, discountedPrice }: ProductActionsProps) => {
  const { colorIndex, setColorIndex, size, setSize } =
    useProductSelectionStore()
  const { addToCart } = useCartSWR()

  useEffect(() => {
    const newSizes = product.variants[colorIndex].sizes
    if (!newSizes.includes(size)) {
      setSize(newSizes[0])
    }
  }, [colorIndex, size, product.variants])

  const handleAddToCart = async () => {
    try {
      await addToCart(
        product.variants[colorIndex].id,
        size,
        product,
        product.variants[colorIndex],
        discountedPrice,
      )

      toast.success('Product added to cart')
    } catch (error) {
      toast.error('Error adding to cart')
    }
  }

  return (
    <>
      <div className="flex flex-col py-5">
        <div className="w-full">
          <div className="my-4 font-semibold uppercase">
            <span>Color</span>
            <span className="pl-2 text-base font-normal normal-case text-gray-800">
              ({product.variants[colorIndex].colorName})
            </span>
          </div>
          <RadioGroupCustom
            defaultValue={'0'}
            onValueChange={value => setColorIndex(parseInt(value))}
          >
            {product.variants.map((variant, i) => {
              const colorHash = variant.colorHash
              const backgroundStyle = colorHash.includes(' ')
                ? {
                    backgroundImage: `linear-gradient(to right, #${
                      colorHash.split(' ')[0]
                    } 50%, #${colorHash.split(' ')[1]} 50%)`,
                  }
                : { backgroundColor: `#${colorHash}` }

              return (
                <RadioGroupItemRound
                  key={i}
                  value={i.toString()}
                  id={variant.colorName}
                  style={backgroundStyle}
                />
              )
            })}
          </RadioGroupCustom>
        </div>
        <div className="w-full">
          <div className="my-4 font-semibold uppercase">Size</div>
          <RadioGroupCustom value={size} onValueChange={setSize}>
            {SIZE_RANGES[product.male as keyof typeof SIZE_RANGES].map(
              (availableSize: number) => {
                const isAvailable = product.variants[colorIndex].sizes.includes(
                  availableSize.toString(),
                )
                return (
                  <RadioGroupItemSquare
                    key={availableSize}
                    value={availableSize.toString()}
                    id={availableSize.toString()}
                    labelTop="EU"
                    labelBottom={availableSize.toString()}
                    disabled={!isAvailable}
                  />
                )
              },
            )}
          </RadioGroupCustom>
        </div>
      </div>
      <div className="my-6 flex justify-between">
        <Button
          onClick={handleAddToCart}
          className={`h-12 w-full border-2 font-bold ${
            product.variants[colorIndex].sizes.length > 0
              ? ''
              : 'cursor-not-allowed border-gray-300 bg-gray-300 text-gray-500'
          }`}
          disabled={product.variants[colorIndex].sizes.length === 0}
        >
          {product.variants[colorIndex].sizes.length > 0
            ? 'Add to Cart'
            : 'No sizes available :('}
          <ShoppingCart className="h-8 w-8" />
        </Button>
      </div>
    </>
  )
}

export default ProductActions
