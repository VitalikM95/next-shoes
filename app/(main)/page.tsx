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

const libre = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['700', '400'],
  display: 'swap',
})

const shoes = [
  {
    image: '/images/small-sample1.avif',
    title: 'Tree Dasher 2',
    subtitle: 'Natural Black',
    price: '14O',
  },
  {
    image: '/images/small-sample2.avif',
    title: 'Tree Dasher 2',
    subtitle: 'Weathered White',
    price: '14O',
  },
  {
    image: '/images/small-sample3.avif',
    title: 'Wool Dasher Mizzles',
    subtitle: 'Stony Cream',
    price: '155',
  },
  {
    image: '/images/small-sample4.avif',
    title: 'Wool Dasher Mizzles',
    subtitle: 'Natural Black',
    price: '155',
  },
]

const shoeItems = [
  {
    image: '/images/sample-shoes1.avif',
    title: 'Tree Runner Go',
    description: 'Light, Breezy, Ready For Anything',
    link_man: '/product/cm9n1mobw00024n74r5aybp03',
    link_woman: '/product/cm9n1mr9400484n74rowduv1x',
  },
  {
    image: '/images/sample-shoes2.avif',
    title: 'Tree Dasher 2',
    description: 'Bouncy, Everyday Active Sneaker',
    link_man: '/product/cm9n1mool000s4n740qh5lng9',
    link_woman: '/product/cm9n1mrik00504n745shnddu0',
  },
  {
    image: '/images/sample-shoes3.avif',
    title: 'Tree Toppers',
    description: 'Water-Repellent, High Top Style',
    link_man: '/product/cm9n1mq19002s4n74twtltj3c',
    link_woman: '/product/cm9n1mtx100944n74fsmjqf0x',
  },
]

const images = [
  {
    img: '/images/big-img1.avif',
    title: 'Trail Runner',
    subtitle: 'Tough, Grippy, Ready To Explore',
    link_man: '/product/cm9n1mpb8001z4n74tik5gzb3',
    link_woman: '/product/cm9n1msm900734n74uw76teg0',
  },
  {
    img: '/images/big-img2.avif',
    title: 'Wool Piper Go',
    subtitle: 'Reimagined Classic, Elevated Comfort',
    link_man: '/product/cm9n1mq19002s4n74twtltj3c',
    link_woman: '/product/cm9n1mqwr003q4n7470taajon',
  },
]

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
          <ul className="flex justify-center items-center gap-4 h-14 pl-20">
            <li className="navlink-animation min-w-24 text-center">
              <Link href="/collections/man">Shop Men</Link>
            </li>
            <li className="navlink-animation min-w-24 text-center">
              <Link href="/collections/woman">Shop Women</Link>
            </li>
          </ul>
        </nav>
        <div className="relative">
          <BackgroundCarousel />
          <div className="absolute left-0 top-0 w-1/2 p-10 h-full flex flex-col justify-between text-white">
            <div className="flex flex-col">
              <h1
                className={`text-[80px] leading-none mb-5 ${libre.className}`}
              >
                Let Comfort Take You Places
              </h1>
              <p className="uppercase w-2/3 ">
                Two light bouncy trainers. countless Reasons to get outside and
                reset.
              </p>
            </div>
            <div>
              <Button variant="secondary" className="min-w-40 mr-4" size="lg">
                <Link href="/collections/man">Shop Men</Link>
              </Button>
              <Button variant="secondary" className="min-w-40 mr-4" size="lg">
                <Link href="/collections/woman">Shop Women</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-10 flex gap-2">
        {shoeItems.map((item, index) => (
          <div key={index} className="relative group overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              width={1080}
              height={1000}
              className="transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute h-full w-full pb-12 pt-16 text-white left-0 top-0 flex flex-col justify-between items-center bg-black bg-opacity-15">
              <div>
                <div className="font-bold text-center text-xl">
                  {item.title}
                </div>
                <p className="text-center mt-2">{item.description}</p>
              </div>
              <div className="space-x-2 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                <Button variant="secondary" className="min-w-40" size="lg">
                  <Link href={item.link_man}>Shop Men</Link>
                </Button>
                <Button variant="secondary" className="min-w-40" size="lg">
                  <Link href={item.link_woman}>Shop Women</Link>
                </Button>
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
        />
        <div className="absolute left-0 top-0 w-full h-full py-32 flex flex-col justify-between items-center text-white">
          <h3 className="uppercase text-2xl">
            We Make Better Things In A Better Way
          </h3>
          <p className="w-1/2 text-center">
            By looking to the world’s greatest innovator — Nature — we create
            shoes that deliver unrivalled comfort that you feel good in and feel
            good about.
          </p>
        </div>
      </section>
      <div className="m-10">
        <BigCarousel />
      </div>
      <div className="m-10 flex gap-2">
        <div className="w-1/2 relative group overflow-hidden">
          <Image
            src="/images/bestsellers.avif"
            width="1000"
            height="1000"
            alt="bestsellers"
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute h-full w-full left-0 top-0 flex flex-col justify-end text-white p-10">
            <div>
              <div className="font-bold text-3xl">Our Sale Shoes</div>
              <p className="mt-2">
                Light. Versatile. Comfortable. Every reason to be top-selling
                shoes.
              </p>
            </div>
            <div className="space-x-4 mt-7">
              <Button variant="secondary" className="min-w-40" size="lg">
                <Link href="/collections/man?type=Men%27s+Sale">Shop Men</Link>
              </Button>
              <Button variant="secondary" className="min-w-40" size="lg">
                <Link href="/collections/woman?type=Women%27s+Sale">
                  Shop Women
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex gap-2 flex-wrap">
          {shoesGrid.map((item, i) => (
            <div key={i} className="w-[49%] relative group overflow-hidden">
              <Image
                src={item.variants[0].images[0]}
                width="400"
                height="400"
                alt="shoes-sample"
                className="transition-transform duration-200 group-hover:scale-105 image-bg"
              />
              <div className="flex flex-col absolute bottom-3 px-3 w-full text-sm tracking-normal">
                <div className="flex justify-between ">
                  <div className="font-bold">{item.name}</div>
                  <div className="mt-1">€{item.price}</div>
                </div>
                <div>{item.type}</div>
              </div>
              <div className="absolute h-full w-full left-0 top-0 flex justify-center items-center bg-black bg-opacity-0 group-hover:bg-opacity-15 transition-all duration-200">
                <div className="space-y-2 flex flex-col opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                  <Button variant="secondary" className="min-w-40" size="lg">
                    <Link href={`/product/${item.id}`}>Check it!</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full gap-2">
        {images.map((item, i) => (
          <div
            key={i}
            className="relative w-1/2 h-[700px] group overflow-hidden"
          >
            <Image
              src={item.img}
              fill
              alt="image"
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute h-full w-full left-0 top-0 flex flex-col justify-between items-center text-white pt-16 pb-10 bg-black bg-opacity-15">
              <div className="text-center">
                <h5 className="font-bold text-xl mb-2">{item.title}</h5>
                <p>{item.subtitle}</p>
              </div>
              <div className="space-x-2 flex opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                <Button variant="secondary" className="min-w-40" size="lg">
                  <Link href={item.link_man}>Shop Men</Link>
                </Button>
                <Button variant="secondary" className="min-w-40" size="lg">
                  <Link href={item.link_woman}>Shop Women</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="m-10">
        <SaleCarousel shoes={shoesCarousel} />
      </div>
      <section className="py-20 px-10">
        <h3 className="font-bold text-3xl mb-10">The NextShoes Approach</h3>
        <div className="flex justify-between gap-10">
          <div>
            <div className="font-bold text-xl mb-3">Wear-All-Day Comfort</div>
            <p className="text-sm">
              Lightweight, bouncy, and wildly comfortable, NextShoes shoes make
              any outing feel effortless. Slip in, lace up, or slide them on and
              enjoy the comfy support.
            </p>
          </div>
          <div>
            <div className="font-bold text-xl mb-3">
              Sustainability In Every Step
            </div>
            <p className="text-sm">
              From materials to transport, we’re working to reduce our carbon
              footprint to near zero. Holding ourselves accountable and striving
              for climate goals isn’t a 30-year goal—it’s now.
            </p>
          </div>
          <div>
            <div className="font-bold text-xl mb-3">
              Materials From The Earth
            </div>
            <p className="text-sm">
              We replace petroleum-based synthetics with natural alternatives
              wherever we can. Like using wool, tree fiber, and sugar cane.
              They’re soft, breathable, and better for the planet—win, win, win.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
