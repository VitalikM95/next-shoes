'use client'

import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { RadioGroupCustom, RadioGroupItemUnderline } from '@/components/ui/radio-group-custom'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

const BackgroundCarousel = () => {
  const [carouselRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div className="flex">
        <div className="relative flex-shrink-0 w-screen h-[650px]">
          <Image src="/images/wide-bg1.avif" alt="bg-image" fill className="object-cover" />
        </div>
        <div className="relative flex-shrink-0 w-screen h-[650px]">
          <Image src="/images/wide-bg2.avif" alt="bg-image" fill className="object-cover" />
        </div>
        <div className="relative flex-shrink-0 w-screen h-[650px]">
          <Image src="/images/wide-bg3.avif" alt="bg-image" fill className="object-cover" />
        </div>
        <div className="relative flex-shrink-0 w-screen h-[650px]">
          <Image src="/images/wide-bg4.avif" alt="bg-image" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}

const images = [
  {
    img: '/images/slider-img1.avif',
    title: "Women's Runner Family",
    link: '#',
  },
  {
    img: '/images/slider-img2.avif',
    title: "Men's Runner Family",
    link: '#',
  },
  {
    img: '/images/slider-img3.avif',
    title: "Men's Weather-Ready Collection",
    link: '#',
  },
  {
    img: '/images/slider-img4.avif',
    title: "Women's Weather-Ready Collection",
    link: '#',
  },
  {
    img: '/images/slider-img5.avif',
    title: "Men's Active Shoes",
    link: '#',
  },
  {
    img: '/images/slider-img6.avif',
    title: "Women's Active Shoes",
    link: '#',
  },
]

const BigCarousel = () => {
  return (
    <Carousel
      opts={{
        align: 'start',
        slidesToScroll: 2,
      }}
      className="w-full"
    >
      <CarouselContent className="gap-2">
        {images.map((item, i) => (
          <CarouselItem key={i} className="relative group overflow-hidden h-[620px] basis-1/2">
            <Image
              src={item.img}
              alt="bg-image"
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <Link
              href={item.link}
              className="absolute h-full w-full left-0 top-0 bg-black bg-opacity-15 text-white flex items-center justify-center text-2xl font-bold"
            >
              {item.title}
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-8 h-20 hover:scale-y-150 transition-all duration-100" />
      <CarouselNext className="-right-8 h-20 hover:scale-y-150 transition-all duration-100" />
    </Carousel>
  )
}

const shoes = {
  man: [
    {
      link: '/images/shoes/man-shoe1.webp',
      title: 'Mens Wool Runner Go',
      subtitle: 'Deep Navy',
      price: '125',
    },
    {
      link: '/images/shoes/man-shoe2.webp',
      title: 'Mens Wool Dasher Mizzles',
      subtitle: 'Deep Navy',
      price: '155',
    },
    {
      link: '/images/shoes/man-shoe3.webp',
      title: 'Mens Tree Gliders',
      subtitle: 'Medium Grey',
      price: '150',
    },
    {
      link: '/images/shoes/man-shoe4.webp',
      title: 'Mens Wool Piper Go',
      subtitle: 'Natural Black',
      price: '130',
    },
    {
      link: '/images/shoes/man-shoe5.webp',
      title: 'Mens Tree Dasher 2',
      subtitle: 'Blizzard ',
      price: '140',
    },
    {
      link: '/images/shoes/man-shoe6.webp',
      title: 'Mens Tree Dasher Relay',
      subtitle: 'Deep Navy',
      price: '140',
    },
    {
      link: '/images/shoes/man-shoe7.webp',
      title: 'Mens Tree Pipers',
      subtitle: 'Kaikoura White ',
      price: '120',
    },
  ],
  woman: [
    {
      link: '/images/shoes/woman-shoe1.webp',
      title: 'Womans Tree Dasher Relay',
      subtitle: 'Deep Navy',
      price: '140',
    },
    {
      link: '/images/shoes/woman-shoe2.webp',
      title: 'Womans Tree Dasher Relay',
      subtitle: 'Deep Navy',
      price: '140',
    },
    {
      link: '/images/shoes/woman-shoe3.webp',
      title: 'Womans Tree Dasher Relay',
      subtitle: 'Deep Navy',
      price: '140',
    },
    {
      link: '/images/shoes/woman-shoe4.webp',
      title: 'Womans Tree Dasher Relay',
      subtitle: 'Deep Navy',
      price: '140',
    },
    {
      link: '/images/shoes/woman-shoe5.webp',
      title: 'Womans Tree Dasher Relay',
      subtitle: 'Deep Navy',
      price: '140',
    },
    {
      link: '/images/shoes/woman-shoe6.webp',
      title: 'Womans Tree Dasher Relay',
      subtitle: 'Deep Navy',
      price: '140',
    },
    {
      link: '/images/shoes/woman-shoe7.webp',
      title: 'Womans Tree Dasher Relay',
      subtitle: 'Deep Navy',
      price: '140',
    },
    {
      link: '/images/shoes/woman-shoe8.webp',
      title: 'Womans Tree Dasher Relay',
      subtitle: 'Deep Navy',
      price: '140',
    },
  ],
}

const SmallCarousel = () => {
  const [selectedCategory, setSelectedCategory] = useState<'man' | 'woman'>('woman')

  return (
    <>
      <div className="flex justify-between">
        <div className="uppercase font-bold text-lg">More to shop</div>
        <RadioGroupCustom
          defaultValue={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value as 'man' | 'woman')}
        >
          <RadioGroupItemUnderline value="woman" label="WOMAN" />
          <RadioGroupItemUnderline value="man" label="MAN" />
        </RadioGroupCustom>
      </div>
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 4,
        }}
        className="w-full"
      >
        <CarouselContent className="p-5 gap-2">
          {shoes[selectedCategory]?.map((item, i) => (
            <CarouselItem key={i} className="relative group overflow-hidden h-[450px] basis-1/4">
              <Link
                href="#"
                className="absolute h-full w-full left-0 top-0 flex flex-col justify-end"
              >
                <Image
                  src={item.link}
                  alt="shoes"
                  fill
                  className="object-top object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <div className="">
                  <div className="font-bold text-lg">{item.title}</div>
                  <div className="">{item.subtitle}</div>
                  <div className="">€{item.price}</div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-9 top-[40%] h-14 hover:scale-y-150 transition-all duration-100" />
        <CarouselNext className="-right-9 top-[40%] h-14 hover:scale-y-150 transition-all duration-100" />
      </Carousel>
    </>
  )
}

export { BackgroundCarousel, BigCarousel, SmallCarousel }
