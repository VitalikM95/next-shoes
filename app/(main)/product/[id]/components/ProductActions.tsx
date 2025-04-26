'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  RadioGroupCustom,
  RadioGroupItemRound,
  RadioGroupItemSquare,
} from '@/components/ui/radio-group-custom'
import { useProductSelectionStore } from '@/lib/store/product-selection-store'
import { SIZE_RANGES } from '@/lib/constants'
import { Product } from '@/types/product.types'

interface ProductActionsProps {
  product: Product
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const { colorIndex, setColorIndex, size, setSize } =
    useProductSelectionStore()

  useEffect(() => {
    const newSizes = product.variants[colorIndex].sizes
    if (!newSizes.includes(size)) {
      setSize(newSizes[0])
    }
  }, [colorIndex, size, product.variants])

  return (
    <>
      <div className='flex flex-col py-5'>
        <div className='w-full'>
          <div className='font-semibold uppercase my-4'>
            <span>Color</span>
            <span className='pl-2 text-base normal-case text-gray-800 font-normal'>
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
        <div className='w-full'>
          <div className='font-semibold uppercase my-4'>Size</div>
          <RadioGroupCustom value={size} onValueChange={setSize}>
            {SIZE_RANGES[product.male as keyof typeof SIZE_RANGES].map(
              (availableSize: number) => {
                const isAvailable = product.variants[colorIndex].sizes.includes(
                  availableSize.toString()
                )
                return (
                  <RadioGroupItemSquare
                    key={availableSize}
                    value={availableSize.toString()}
                    id={availableSize.toString()}
                    labelTop='EU'
                    labelBottom={availableSize.toString()}
                    disabled={!isAvailable}
                  />
                )
              }
            )}
          </RadioGroupCustom>
        </div>
      </div>
      <div className='flex justify-between my-6'>
        <Button
          onClick={() =>
            alert(
              `Added to Bag\nColor: ${product.variants[colorIndex].colorName}\nSize: ${size}`
            )
          }
          variant='outline'
          className={`w-full mr-6 h-12 text-md uppercase border-2 transition-colors duration-200 ${
            product.variants[colorIndex].sizes.length > 0
              ? 'bg-black text-white border-black hover:bg-white hover:text-black'
              : 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
          }`}
          disabled={product.variants[colorIndex].sizes.length === 0}
        >
          {product.variants[colorIndex].sizes.length > 0
            ? 'Add to Bag'
            : 'No sizes available :('}
        </Button>
      </div>
    </>
  )
}

export default ProductActions
