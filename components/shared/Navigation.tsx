import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import Image from 'next/image'
import { useNavigationCategories } from '@/lib/hooks/useNavigationCategories'

interface NavigationProps {
  isMobile?: boolean
}

const Navigation = ({ isMobile = false }: NavigationProps) => {
  const { getCategories } = useNavigationCategories()
  const men = getCategories('man')
  const women = getCategories('woman')

  // Мобільна версія меню
  if (isMobile) {
    return (
      <div className="flex justify-between px-4">
        <div>
          <h3 className="font-bold text-lg mb-3">Men</h3>
          <div className="flex flex-col space-y-2 pl-2">
            <Link className="hover:underline border-b" href={men.basePath}>
              All Men's Shoes
            </Link>
            {men.categories.slice(0, 5).map(({ label, value }) => (
              <Link
                key={label}
                className="hover:underline border-b"
                href={`${men.basePath}?type=${encodeURIComponent(value || label)}`}
              >
                {label}
              </Link>
            ))}
            <Link
              className="font-bold text-red-700 hover:underline mt-2 border-b"
              href={men.sale.href}
            >
              {men.sale.label}
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Women</h3>
          <div className="flex flex-col space-y-2 pl-2">
            <Link className="hover:underline border-b" href={women.basePath}>
              All Women's Shoes
            </Link>
            {women.categories.slice(0, 5).map(({ label, value }) => (
              <Link
                key={label}
                className="hover:underline border-b"
                href={`${women.basePath}?type=${encodeURIComponent(value || label)}`}
              >
                {label}
              </Link>
            ))}
            <Link
              className="font-bold text-red-700 hover:underline mt-2 border-b"
              href={women.sale.href}
            >
              {women.sale.label}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Десктопна версія меню
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Men</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col md:flex-row w-screen gap-4 md:gap-10 p-4 md:px-8 lg:px-36 md:py-8">
              <li className="flex w-full md:w-1/3 flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <Link
                    className="mb-2 md:mb-5 font-bold uppercase hover:underline"
                    href={men.basePath}
                  >
                    Shoes
                  </Link>
                  {men.categories.map(({ label, value }) => (
                    <Link
                      key={label}
                      className="hover:underline"
                      href={`${men.basePath}?type=${encodeURIComponent(
                        value || label,
                      )}`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <Link
                  className="font-bold uppercase text-red-700 hover:underline mt-3 md:mt-0"
                  href={men.sale.href}
                >
                  {men.sale.label}
                </Link>
              </li>
              <li className="flex w-full md:w-1/3 flex-col gap-3 mt-4 md:mt-0">
                <div className="mb-2 md:mb-5 font-bold uppercase">
                  Best Sellers
                </div>
                <Link
                  className="hover:underline"
                  href="/product/cmamj7ld8000d4ni010dk9l6n"
                >
                  Tree Runner
                </Link>
                <Link
                  className="hover:underline"
                  href="/product/cmamj7li5000s4ni082eehcqx"
                >
                  Tree Dasher 2
                </Link>
                <Link
                  className="hover:underline"
                  href="/product/cmamj7miz00264ni07duvwf60"
                >
                  Wool Runner Mizzle
                </Link>
                <Link
                  className="hover:underline"
                  href="/product/cmamj7m00001o4ni0fxw5zduc"
                >
                  Tree Dasher Relay
                </Link>
              </li>
              <li className="hidden md:flex w-full md:w-1/3 flex-col gap-3">
                <div className="mb-2 md:mb-5 font-bold uppercase hover:underline">
                  Featured
                </div>
                <Link
                  className="group flex items-center justify-center"
                  href="/collections/man?type=Active+Shoes"
                >
                  <Image
                    src="/images/shoe-wide1.avif"
                    alt="#"
                    width={400}
                    height={100}
                    className="relative transition-opacity duration-300 ease-out group-hover:opacity-80"
                  ></Image>
                  <div className="absolute text-lg font-bold uppercase text-white group-hover:underline">
                    Active shoes
                  </div>
                </Link>
                <Link
                  className="group flex items-center justify-center"
                  href="/collections/man?type=Water-Repellent+Shoes"
                >
                  <Image
                    src="/images/shoe-wide2.avif"
                    alt="#"
                    width={400}
                    height={100}
                    className="relative transition-opacity duration-300 ease-out group-hover:opacity-80"
                  ></Image>
                  <div className="absolute text-lg font-bold uppercase text-white group-hover:underline">
                    Rain ready shoes
                  </div>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Women</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col md:flex-row w-screen gap-4 md:gap-10 p-4 md:px-8 lg:px-36 md:py-8">
              <li className="flex w-full md:w-1/3 flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <Link
                    className="mb-2 md:mb-5 font-bold uppercase hover:underline"
                    href={women.basePath}
                  >
                    Shoes
                  </Link>
                  {women.categories.map(({ label, value }) => (
                    <Link
                      key={label}
                      className="hover:underline"
                      href={`${women.basePath}?type=${encodeURIComponent(
                        value || label,
                      )}`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <Link
                  className="font-bold uppercase text-red-700 hover:underline mt-3 md:mt-0"
                  href={women.sale.href}
                >
                  {women.sale.label}
                </Link>
              </li>
              <li className="flex w-full md:w-1/3 flex-col gap-3 mt-4 md:mt-0">
                <div className="mb-2 md:mb-5 font-bold uppercase hover:underline">
                  Best Sellers
                </div>
                <Link
                  className="hover:underline"
                  href="/product/cmamj7ojp004h4ni0jo54w9wf"
                >
                  Tree Runner
                </Link>
                <Link
                  className="hover:underline"
                  href="/product/cmamj7opf00504ni0urvibt6u"
                >
                  Tree Dasher 2
                </Link>
                <Link
                  className="hover:underline"
                  href="/product/cmamj7qss007v4ni0c5xlqtkq"
                >
                  Wool Runner Mizzle
                </Link>
                <Link
                  className="hover:underline"
                  href="/product/cmamj7p4a005u4ni0iq2ivzbd"
                >
                  Tree Breezer
                </Link>
              </li>
              <li className="hidden md:flex w-full md:w-1/3 flex-col gap-3">
                <div className="mb-2 md:mb-5 font-bold uppercase hover:underline">
                  Featured
                </div>
                <Link
                  className="group flex items-center justify-center"
                  href="/collections/woman?type=Active+Shoes"
                >
                  <Image
                    src="/images/shoe-wide1.avif"
                    alt="#"
                    width={400}
                    height={100}
                    className="relative transition-opacity duration-300 ease-out group-hover:opacity-80"
                  ></Image>
                  <div className="absolute text-lg font-bold uppercase text-white group-hover:underline">
                    Active shoes
                  </div>
                </Link>
                <Link
                  className="group flex items-center justify-center"
                  href="/collections/woman?type=Water-Repellent+Shoes"
                >
                  <Image
                    src="/images/shoe-wide2.avif"
                    alt="#"
                    width={400}
                    height={100}
                    className="relative transition-opacity duration-300 ease-out group-hover:opacity-80"
                  ></Image>
                  <div className="absolute text-lg font-bold uppercase text-white group-hover:underline">
                    Rain ready shoes
                  </div>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { Navigation }
