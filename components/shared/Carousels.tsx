'use client'

import { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  RadioGroupCustom,
  RadioGroupItemUnderline,
} from '@/components/ui/radio-group-custom'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { ProductListItem } from '@/types/product.types'
import { calculatePrice } from '@/lib/utils'
import { BIG_CAROUSEL_CONTENT } from '@/lib/constants'

const BackgroundCarousel = () => {
  const [carouselRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay({ delay: 7000, stopOnInteraction: false }),
  ])
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div className="flex">
        {[
          '/images/wide-bg1.avif',
          '/images/wide-bg2.avif',
          '/images/wide-bg3.avif',
          '/images/wide-bg4.avif',
        ].map((imgSrc, index) => (
          <div
            key={index}
            className="relative h-[650px] w-screen flex-shrink-0"
          >
            <Image src={imgSrc} alt="bg-image" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

const BigCarousel = () => {
  const [slidesToScroll, setSlidesToScroll] = useState(2)

  useEffect(() => {
    setSlidesToScroll(window.innerWidth < 768 ? 1 : 2)
  }, [])

  return (
    <div className="relative ">
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll,
        }}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="gap-2">
          {BIG_CAROUSEL_CONTENT.map((item, i) => (
            <CarouselItem
              key={i}
              className="group relative h-[620px] basis-full md:basis-1/2 overflow-hidden"
            >
              <Image
                src={item.img}
                alt="bg-image"
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <Link
                href={item.link}
                className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-15 text-2xl font-bold text-white"
              >
                {item.title}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 md:-left-2 h-12 md:h-20 w-8 md:w-10 bg-none hover:bg-white/30 backdrop-blur-sm border-0 text-black transition-all duration-100 hover:scale-110 z-10" />
        <CarouselNext className="right-0 md:-right-2 h-12 md:h-20 w-8 md:w-10 bg-none hover:bg-white/30 backdrop-blur-sm border-0 text-black transition-all duration-100 hover:scale-110 z-10" />
      </Carousel>
    </div>
  )
}

type SaleCarouselProps = {
  shoes: {
    woman: ProductListItem[]
    man: ProductListItem[]
  }
}

const SaleCarousel = ({ shoes }: SaleCarouselProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'man' | 'woman'>(
    'woman',
  )

  return (
    <>
      <div className="flex justify-between">
        <div className="text-lg font-bold uppercase">Sale Shoes</div>
        <RadioGroupCustom
          defaultValue={selectedCategory}
          onValueChange={value => setSelectedCategory(value as 'man' | 'woman')}
        >
          <RadioGroupItemUnderline value="woman" label="WOMAN" />
          <RadioGroupItemUnderline value="man" label="MAN" />
        </RadioGroupCustom>
      </div>
      <div className="relative px-4">
        <Carousel
          opts={{
            align: 'start',
            slidesToScroll: 1,
          }}
          className="w-full overflow-hidden"
        >
          <CarouselContent className="gap-2 p-5">
            {shoes[selectedCategory]?.map((item, i) => {
              const { discountedPrice, originalPrice, hasDiscount } =
                calculatePrice(item.price, item.discountPercent)

              return (
                <CarouselItem
                  key={i}
                  className="group relative h-[350px] sm:h-[400px] md:h-[450px] basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 overflow-hidden"
                >
                  <Link
                    href={`/product/${item.id}`}
                    className="absolute left-0 top-0 flex h-full w-full flex-col justify-end"
                  >
                    <Image
                      src={item.variants[0].images[0]}
                      alt="shoes"
                      fill
                      className="max-h-fit bg-[#F6F6F6] object-contain object-top transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="bg-white/80 px-2 py-1">
                      <div className="text-base md:text-lg font-bold">
                        {item.name}
                      </div>
                      <div className="text-sm md:text-base">{item.type[0]}</div>
                      {hasDiscount ? (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-600">
                            €{discountedPrice}
                          </span>
                          <span className="text-gray-500 line-through">
                            €{originalPrice}
                          </span>
                        </div>
                      ) : (
                        <span className="text-black">€{discountedPrice}</span>
                      )}
                    </div>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="left-0 md:-left-2 h-12 md:h-20 w-8 md:w-10 bg-none hover:bg-white/30 backdrop-blur-sm border-0 text-gray-600 hover:text-gray-600 transition-all duration-100 hover:scale-110 z-10 -translate-y-20" />
          <CarouselNext className="right-0 md:-right-2 h-12 md:h-20 w-8 md:w-10 bg-none hover:bg-white/30 backdrop-blur-sm border-0 text-gray-600 hover:text-gray-600 transition-all duration-100 hover:scale-110 z-10 -translate-y-20" />
        </Carousel>
      </div>
    </>
  )
}

export { BackgroundCarousel, BigCarousel, SaleCarousel }
