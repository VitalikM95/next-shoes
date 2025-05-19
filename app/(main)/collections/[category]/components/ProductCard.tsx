'use client'

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

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
import { SIZE_RANGES } from '@/lib/constants'
import { calculatePrice } from '@/lib/utils'
import { useCartSWR } from '@/lib/hooks/useCartSWR'
import {
  Product,
  ProductListItem,
  ProductCardProps,
} from '@/types/product.types'

const ProductCard: FC<ProductCardProps> = ({ item }) => {
  const { name, price, discountPercent, variants = [], male } = item
  const { discountedPrice, originalPrice, hasDiscount } = calculatePrice(
    price,
    discountPercent,
  )
  const sizes = SIZE_RANGES[male as keyof typeof SIZE_RANGES]
  const { addToCart } = useCartSWR()

  const [selectedImage, setSelectedImage] = useState(
    variants[0]?.images?.[0] || '/no_image.png',
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

    addToCart(
      activeVariant.id,
      size.toString(),
      item as unknown as Product,
      activeVariant,
      discountedPrice,
    )

    toast.success(`Product "${name}" added to cart`, {
      description: `Color: ${activeVariant.colorName}, Size: ${size}`,
    })
  }

  if (!variants.length) return null

  return (
    <Card className="group relative w-[360px] overflow-visible rounded-none border-none shadow-none transition-shadow duration-300 hover:shadow-xl h-[550px]">
      <Link href={`/product/${item.id}`} aria-label="Product">
        <CardContent className="p-5 ">
          <Image
            src={selectedImage}
            width="400"
            height="400"
            className="image-bg h-auto w-full"
            alt={name}
          />
        </CardContent>
      </Link>
      <CardHeader className="p-5 ">
        <CardTitle className="line-clamp-1 text-sm sm:text-base md:text-lg">
          {name}
        </CardTitle>
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
                  <CarouselItem
                    key={index}
                    className="basis-1/4 min-w-12 md:min-w-14"
                  >
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
              className="-left-3 w-5 sm:-left-6 sm:w-6 transition-all duration-100 hover:scale-y-150 hover:text-black"
              custom="!w-5 !h-5 sm:!w-6 sm:!h-6"
            />
            <CarouselNext
              className="-right-3 w-5 sm:-right-6 sm:w-6 transition-all duration-100 hover:scale-y-150 hover:text-black"
              custom="!w-5 !h-5 sm:!w-6 sm:!h-6"
            />
          </Carousel>
        )}
      </CardHeader>
      <CardFooter className="flex flex-col items-start absolute top-[95%] left-0 w-full bg-white transition-transform origin-top scale-y-0 z-10 group-hover:scale-y-100 duration-100 shadow-xl rounded-none">
        <div className="my-2 text-xs font-bold sm:my-4 sm:text-sm">
          Quick Add
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {sizes?.map((size: number) => {
            const isAvailable = variants[activeVariantIndex]?.sizes?.includes(
              size.toString(),
            )
            return (
              <Button
                size="icon"
                key={size}
                className={`h-8 w-8 rounded-none border bg-white text-xs sm:h-10 sm:w-10 sm:text-sm ${
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
