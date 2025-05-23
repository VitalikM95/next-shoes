import { Libre_Baskerville } from 'next/font/google'
import {
  BackgroundCarousel,
  BigCarousel,
  SaleCarousel,
} from '@/components/shared/Carousels'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/db/products'
import { HOME_IMAGES, SHOE_ITEMS } from '@/lib/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next Shoes - the best footwear for any season',
}

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['700', '400'],
  display: 'swap',
})

export default async function HomePage() {
  const [woman, man] = await Promise.all([
    getProducts('woman', 'Active Shoes', 2),
    getProducts('man', 'Active Shoes', 2),
  ])
  const shoesGrid = [...woman, ...man]

  const [womanSale, manSale] = await Promise.all([
    getProducts('woman', "Men's Sale"),
    getProducts('man', "Women's Sale"),
  ])
  const shoesCarousel = {
    woman: womanSale,
    man: manSale,
  }

  return (
    <>
      <div>
        <nav>
          <ul className="flex h-14 items-center justify-center gap-6 pl-24">
            <li className="navlink-animation min-w-20 md:min-w-24 text-center">
              <Link href="/collections/man">Shop Men</Link>
            </li>
            <li className="navlink-animation min-w-20 md:min-w-24 text-center">
              <Link href="/collections/woman">Shop Women</Link>
            </li>
          </ul>
        </nav>
        <div className="relative">
          <BackgroundCarousel />
          <div className="absolute left-0 top-0 flex h-full w-full md:w-3/4 lg:w-1/2 flex-col justify-between p-5 md:p-10 text-white">
            <div className="flex flex-col">
              <h1
                className={`mb-2 md:mb-5 text-3xl sm:text-5xl md:text-6xl lg:text-[80px] leading-none ${libre.className}`}
              >
                Let Comfort Take You Places
              </h1>
              <p className="w-full sm:w-3/4 md:w-2/3 text-sm md:text-base uppercase">
                Two light bouncy trainers. countless Reasons to get outside and
                reset.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Link href="/collections/man">
                <Button
                  variant="secondary"
                  className="mr-0 sm:mr-4 min-w-0 sm:min-w-40"
                  size="lg"
                >
                  Shop Men
                </Button>
              </Link>
              <Link href="/collections/woman">
                <Button
                  variant="secondary"
                  className="mr-0 sm:mr-4 min-w-0 sm:min-w-40"
                  size="lg"
                >
                  Shop Women
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4 md:m-10 flex flex-col md:flex-row gap-2">
        {SHOE_ITEMS.map((item, index) => (
          <div key={index} className="group relative overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              width={1080}
              height={1000}
              className="w-full transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between bg-black bg-opacity-15 pb-6 sm:pb-12 pt-8 sm:pt-16 text-white">
              <div>
                <div className="text-center text-xl font-bold">
                  {item.title}
                </div>
                <p className="mt-2 text-center text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
              <div className="space-x-2 sm:invisible sm:opacity-0 transition-all duration-200 sm:group-hover:visible sm:group-hover:opacity-100">
                <Link href={item.link_man}>
                  <Button
                    variant="secondary"
                    className="min-w-28 sm:min-w-40"
                    size="lg"
                  >
                    Shop Men
                  </Button>
                </Link>
                <Link href={item.link_woman}>
                  <Button
                    variant="secondary"
                    className="min-w-28 sm:min-w-40"
                    size="lg"
                  >
                    Shop Women
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <section className="relative">
        <Image
          src="/images/wool-bg.avif"
          alt="bg-image"
          width={2800}
          height={700}
          className="h-[300px] md:h-auto object-cover"
        />
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between py-10 md:py-32 px-4 text-white">
          <h3 className="text-xl md:text-2xl uppercase text-center">
            We Make Better Things In A Better Way
          </h3>
          <p className="w-full md:w-3/4 lg:w-1/2 text-center text-sm md:text-base">
            By looking to the world's greatest innovator — Nature — we create
            shoes that deliver unrivalled comfort that you feel good in and feel
            good about.
          </p>
        </div>
      </section>
      <div className="m-4 md:m-10">
        <BigCarousel />
      </div>
      <div className="m-4 md:m-10 flex flex-col lg:flex-row gap-2">
        <div className="group relative w-full lg:w-1/2 overflow-hidden">
          <Image
            src="/images/bestsellers.avif"
            width="1000"
            height="1000"
            alt="bestsellers"
            className="w-full transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end p-5 md:p-10 text-white">
            <div>
              <div className="text-2xl md:text-3xl font-bold">
                Our Sale Shoes
              </div>
              <p className="mt-2 text-sm md:text-base">
                Light. Versatile. Comfortable. Every reason to be top-selling
                shoes.
              </p>
            </div>
            <div className="mt-4 md:mt-7 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
              <Link href="/collections/man?type=Men%27s+Sale">
                <Button
                  variant="secondary"
                  className="min-w-0 sm:min-w-40"
                  size="lg"
                >
                  Shop Men
                </Button>
              </Link>
              <Link href="/collections/woman?type=Women%27s+Sale">
                <Button
                  variant="secondary"
                  className="min-w-0 sm:min-w-40"
                  size="lg"
                >
                  Shop Women
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 flex-wrap gap-2 mt-2 lg:mt-0">
          {shoesGrid.map((item, i) => (
            <div
              key={i}
              className="group relative w-[48%] sm:w-[49%] overflow-hidden"
            >
              <Image
                src={item.variants[0].images[0]}
                width="400"
                height="400"
                alt="shoes-sample"
                className="w-full image-bg transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute bottom-3 flex w-full flex-col px-3 text-xs sm:text-sm tracking-normal">
                <div className="flex justify-between">
                  <div className="font-bold">{item.name}</div>
                  <div className="mt-1">€{item.price}</div>
                </div>
                <div>{item.type}</div>
              </div>
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-0 transition-all duration-200 group-hover:bg-opacity-15">
                <div className="invisible flex flex-col space-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <Link href={`/product/${item.id}`}>
                    <Button
                      variant="secondary"
                      className="min-w-24 sm:min-w-40"
                      size="lg"
                    >
                      Check it!
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-2">
        {HOME_IMAGES.map((item, i) => (
          <div
            key={i}
            className="group relative h-[400px] md:h-[500px] lg:h-[700px] w-full md:w-1/2 overflow-hidden"
          >
            <Image
              src={item.img}
              fill
              alt="image"
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between bg-black bg-opacity-15 pb-5 md:pb-10 pt-8 md:pt-16 text-white">
              <div className="text-center">
                <h5 className="mb-2 text-xl font-bold">{item.title}</h5>
                <p className="text-sm md:text-base">{item.subtitle}</p>
              </div>
              <div className="flex space-x-2 sm:invisible sm:opacity-0 transition-all duration-200 sm:group-hover:visible sm:group-hover:opacity-100">
                <Link href={item.link_man}>
                  <Button
                    variant="secondary"
                    className="min-w-28 sm:min-w-40"
                    size="lg"
                  >
                    Shop Men
                  </Button>
                </Link>
                <Link href={item.link_woman}>
                  <Button
                    variant="secondary"
                    className="min-w-28 sm:min-w-40"
                    size="lg"
                  >
                    Shop Women
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="m-4 md:m-10">
        <SaleCarousel shoes={shoesCarousel} />
      </div>
      <section className="px-4 md:px-10 py-10 md:py-20">
        <h3 className="mb-6 md:mb-10 text-2xl md:text-3xl font-bold">
          The NextShoes Approach
        </h3>
        <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-10">
          <div>
            <div className="mb-2 md:mb-3 text-lg md:text-xl font-bold">
              Wear-All-Day Comfort
            </div>
            <p className="text-sm">
              Lightweight, bouncy, and wildly comfortable, NextShoes shoes make
              any outing feel effortless. Slip in, lace up, or slide them on and
              enjoy the comfy support.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="mb-2 md:mb-3 text-lg md:text-xl font-bold">
              Sustainability In Every Step
            </div>
            <p className="text-sm">
              From materials to transport, we're working to reduce our carbon
              footprint to near zero. Holding ourselves accountable and striving
              for climate goals isn't a 30-year goal—it's now.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="mb-2 md:mb-3 text-lg md:text-xl font-bold">
              Materials From The Earth
            </div>
            <p className="text-sm">
              We replace petroleum-based synthetics with natural alternatives
              wherever we can. Like using wool, tree fiber, and sugar cane.
              They're soft, breathable, and better for the planet—win, win, win.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
