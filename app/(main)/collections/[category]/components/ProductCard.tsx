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
import { FC, useState } from 'react'
import { SIZE_RANGES } from '@/lib/constants'
import { calculatePrice } from '@/lib/utils'
import { Product } from '@/types/product.types'
import Link from 'next/link'

interface ProductCardProps {
  item: Product
}

const ProductCard: FC<ProductCardProps> = ({ item }) => {
  const { name, price, discountPercent, variants = [], male } = item
  const { discountedPrice, originalPrice, hasDiscount } = calculatePrice(
    price,
    discountPercent
  )
  const sizes = SIZE_RANGES[male as keyof typeof SIZE_RANGES]

  const [selectedImage, setSelectedImage] = useState(
    variants[0]?.images?.[0] || '/placeholder.jpg'
  )
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)

  const handleVariantClick = (index: number, image: string) => {
    setSelectedImage(image)
    setActiveVariantIndex(index)
  }

  const handleSizeClick = (size: number) => {
    const productInfo = {
      name,
      price: discountedPrice,
      size,
      color: variants[activeVariantIndex]?.color,
      image: selectedImage,
    }
    console.log(productInfo)
  }

  if (!variants.length) return null

  return (
    <Card className='w-[350px] relative border-none rounded-none shadow-none hover:shadow-xl overflow-visible h-[500px] group'>
      <Link href='/product/1' aria-label='Product'>
        <CardContent>
          <Image
            src={selectedImage}
            width='400'
            height='400'
            className='bg-[#F6F6F6]'
            alt={name}
          />
        </CardContent>
      </Link>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {hasDiscount ? (
            <div className='flex items-center gap-2'>
              <span className='text-red-600 font-bold'>€{discountedPrice}</span>
              <span className='text-gray-500 line-through'>
                €{originalPrice}
              </span>
            </div>
          ) : (
            <span className='text-black'>€{discountedPrice}</span>
          )}
        </CardDescription>
        {variants.length > 0 && (
          <Carousel opts={{ align: 'start' }} className='w-full max-w-sm mt-2'>
            <CarouselContent className='px-0.5'>
              {variants.map((variant, index) => {
                const image = variant.images?.[0] || '/placeholder.jpg'
                return (
                  <CarouselItem key={index} className='basis-1/4'>
                    <div
                      className={`border rounded-none bg-[#F6F6F6] cursor-pointer !p-0 hover:border-black ${
                        index === activeVariantIndex
                          ? 'border-black'
                          : 'border-gray-300'
                      }`}
                      onClick={() => handleVariantClick(index, image)}
                    >
                      <Image
                        src={image}
                        alt={variant.color?.name || 'Product variant'}
                        width={65}
                        height={70}
                      />
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious
              className='-left-6 w-6 hover:scale-y-150 transition-all duration-100'
              custom='!w-6 !h-6'
            />
            <CarouselNext
              className='-right-6 w-6 hover:scale-y-150 transition-all duration-100'
              custom='!w-6 !h-6'
            />
          </Carousel>
        )}
      </CardHeader>
      <CardFooter className='flex flex-col items-start absolute top-[95%] left-0 w-full bg-white transition-transform origin-top scale-y-0 z-10 group-hover:scale-y-100 duration-100 shadow-xl rounded-none'>
        <div className='font-bold my-4 text-sm'>Quick Add</div>
        <div className='flex gap-2 flex-wrap'>
          {sizes?.map((size: number) => {
            const isAvailable = variants[activeVariantIndex]?.sizes?.includes(
              size.toString()
            )
            return (
              <Button
                size='icon'
                key={size}
                className={`h-10 w-10 rounded-none border bg-white ${
                  isAvailable
                    ? 'border-black text-black hover:brightness-95'
                    : 'border-gray-300 text-gray-400 cursor-not-allowed'
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
