'use client'

import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { FC, useEffect, useState } from 'react'
import { SIZE_RANGES } from '@/lib/constants'
import { calculatePrice } from '@/lib/utils'
import { Product, ProductListItem } from '@/types/product.types'
import Link from 'next/link'
import { useCartSWR } from '@/lib/hooks/useCartSWR'
import { toast } from 'sonner'

interface ProductCardProps {
  item: ProductListItem
}

const ProductCard: FC<ProductCardProps> = ({ item }) => {
  const { name, price, discountPercent, variants = [], male } = item
  const { discountedPrice, originalPrice, hasDiscount } = calculatePrice(
    price,
    discountPercent
  )
  const sizes = SIZE_RANGES[male as keyof typeof SIZE_RANGES]
  const { addToCart } = useCartSWR()

  const [selectedImage, setSelectedImage] = useState(
    variants[0]?.images?.[0] || '/no_image.png'
  )
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)

  useEffect(() => {
    if (variants.length > 0) {
      setActiveVariantIndex(0)
      setSelectedImage(variants[0]?.images?.[0] || '/no_image.png')
    }
  }, [variants])

  const handleVariantClick = (index: number, image: string) => {
    setSelectedImage(image)
    setActiveVariantIndex(index)
  }

  const handleSizeClick = (size: number) => {
    const activeVariant = variants[activeVariantIndex]

    // Використовуємо правильне приведення типів через unknown
    // Фактично з об'єкта product використовуються лише поля id та name
    addToCart(
      activeVariant.id,
      size.toString(),
      item as unknown as Product,
      activeVariant,
      discountedPrice
    )

    toast.success(`Product "${name}" added to cart`, {
      description: `Color: ${activeVariant.colorName}, Size: ${size}`,
    })
  }

  if (!variants.length) return null

  return (
    <Card className="group relative h-[500px] w-[350px] overflow-visible rounded-none border-none shadow-none hover:shadow-xl">
      <Link href={`/product/${item.id}`} aria-label="Product">
        <CardContent>
          <Image
            src={selectedImage}
            width="400"
            height="400"
            className="image-bg"
            alt={name}
          />
        </CardContent>
      </Link>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-red-600">€{discountedPrice}</span>
              <span className="text-gray-500 line-through">
                €{originalPrice}
              </span>
            </div>
          ) : (
            <span className="text-black">€{discountedPrice}</span>
          )}
        </CardDescription>
        {variants.length > 0 && (
          <Carousel opts={{ align: 'start' }} className="mt-2 w-full max-w-sm">
            <CarouselContent className="px-0.5">
              {variants.map((variant, index) => {
                const image = variant.images?.[0] || '/placeholder.jpg'
                return (
                  <CarouselItem key={index} className="basis-1/4">
                    <div
                      className={`image-bg cursor-pointer rounded-none border !p-0 hover:border-black ${
                        index === activeVariantIndex
                          ? 'border-black'
                          : 'border-gray-300'
                      }`}
                      onClick={() => handleVariantClick(index, image)}
                    >
                      <Image
                        src={image}
                        alt={variant.colorName || 'Product variant'}
                        width={65}
                        height={70}
                      />
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious
              className="-left-6 w-6 transition-all duration-100 hover:scale-y-150 hover:text-black"
              custom="!w-6 !h-6"
            />
            <CarouselNext
              className="-right-6 w-6 transition-all duration-100 hover:scale-y-150 hover:text-black"
              custom="!w-6 !h-6"
            />
          </Carousel>
        )}
      </CardHeader>
      <CardFooter className="absolute left-0 top-[95%] z-10 flex w-full origin-top scale-y-0 flex-col items-start rounded-none bg-white shadow-xl transition-transform duration-100 group-hover:scale-y-100">
        <div className="my-4 text-sm font-bold">Quick Add</div>
        <div className="flex flex-wrap gap-2">
          {sizes?.map((size: number) => {
            const isAvailable = variants[activeVariantIndex]?.sizes?.includes(
              size.toString()
            )
            return (
              <Button
                size="icon"
                key={size}
                className={`h-10 w-10 rounded-none border bg-white ${
                  isAvailable
                    ? 'border-black text-black hover:brightness-95'
                    : 'cursor-not-allowed border-gray-300 text-gray-400'
                }`}
                disabled={!isAvailable}
                onClick={() => isAvailable && handleSizeClick(size)}
              >
                {size}
              </Button>
            )
          })}
        </div>
      </CardFooter>
    </Card>
  )
}

export { ProductCard }
