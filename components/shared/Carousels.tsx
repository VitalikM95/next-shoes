'use client'

import { useState } from 'react'
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

const BackgroundCarousel = () => {
  const [carouselRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div className="flex">
        <div className="relative h-[650px] w-screen flex-shrink-0">
          <Image
            src="/images/wide-bg1.avif"
            alt="bg-image"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-[650px] w-screen flex-shrink-0">
          <Image
            src="/images/wide-bg2.avif"
            alt="bg-image"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-[650px] w-screen flex-shrink-0">
          <Image
            src="/images/wide-bg3.avif"
            alt="bg-image"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-[650px] w-screen flex-shrink-0">
          <Image
            src="/images/wide-bg4.avif"
            alt="bg-image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

const BigCarouselContent = [
  {
    img: '/images/slider-img2.avif',
    title: "Men's Trainer Family",
    link: '/collections/man?type=Trainers',
  },
  {
    img: '/images/slider-img1.avif',
    title: "Women's Trainer Family",
    link: '/collections/woman?type=Trainers',
  },
  {
    img: '/images/slider-img3.avif',
    title: "Men's Weather-Ready Collection",
    link: '/collections/man?type=Water-Repellent+Shoes',
  },
  {
    img: '/images/slider-img4.avif',
    title: "Women's Weather-Ready Collection",
    link: '/collections/woman?type=Water-Repellent+Shoes',
  },
  {
    img: '/images/slider-img5.avif',
    title: "Men's Active Shoes",
    link: '/collections/man?type=Active+Shoes',
  },
  {
    img: '/images/slider-img6.avif',
    title: "Women's Active Shoes",
    link: '/collections/woman?type=Active+Shoes',
  },
]

const BigCarousel = () => {
  return (
    <div className="relative ">
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: window?.innerWidth && window.innerWidth < 768 ? 1 : 2,
        }}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="gap-2">
          {BigCarouselContent.map((item, i) => (
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
        <CarouselPrevious className="left-0 md:-left-2 h-16 md:h-24 w-10 md:w-14 bg-white/30 hover:bg-white/70 backdrop-blur-sm border-0 rounded-r-xl shadow-lg text-black transition-all duration-100 hover:scale-110 z-10" />
        <CarouselNext className="right-0 md:-right-2 h-16 md:h-24 w-10 md:w-14 bg-white/30 hover:bg-white/70 backdrop-blur-sm border-0 rounded-l-xl shadow-lg text-black transition-all duration-100 hover:scale-110 z-10" />
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
          <CarouselPrevious className="left-0 md:-left-2 top-[40%] h-14 md:h-20 w-10 md:w-12 bg-white/30 hover:bg-white/70 backdrop-blur-sm border-0 rounded-r-xl shadow-lg text-black transition-all duration-100 hover:scale-110 z-10" />
          <CarouselNext className="right-0 md:-right-2 top-[40%] h-14 md:h-20 w-10 md:w-12 bg-white/30 hover:bg-white/70 backdrop-blur-sm border-0 rounded-l-xl shadow-lg text-black transition-all duration-100 hover:scale-110 z-10" />
        </Carousel>
      </div>
    </>
  )
}

export { BackgroundCarousel, BigCarousel, SaleCarousel }
