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

const Navigation = () => {
  const { getCategories } = useNavigationCategories()
  const men = getCategories('man')
  const women = getCategories('woman')
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Men</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='flex w-screen px-36 gap-10 py-8'>
              <li className='flex flex-col justify-between w-1/3'>
                <div className='flex flex-col gap-3'>
                  <Link
                    className='uppercase font-bold hover:underline mb-5'
                    href={men.basePath}
                  >
                    Shoes
                  </Link>
                  {men.categories.map(({ label, value }) => (
                    <Link
                      key={label}
                      className='hover:underline'
                      href={`${men.basePath}?type=${encodeURIComponent(
                        value || label
                      )}`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <Link
                  className='hover:underline font-bold text-red-700 uppercase'
                  href={men.sale.href}
                >
                  {men.sale.label}
                </Link>
              </li>
              <li className='flex flex-col gap-3 w-1/3'>
                <div className='uppercase font-bold mb-5'>Best Sellers</div>
                <Link
                  className='hover:underline'
                  href='/product/cm9n1moja000d4n74olg5ctcy'
                >
                  Tree Runner
                </Link>
                <Link
                  className='hover:underline'
                  href='/product/cm9n1mool000s4n740qh5lng9'
                >
                  Tree Dasher 2
                </Link>
                <Link
                  className='hover:underline'
                  href='/product/cm9n1mpk200264n74rhb2al4e'
                >
                  Wool Runner Mizzle
                </Link>
                <Link
                  className='hover:underline'
                  href='/product/cm9n1mp1m001o4n74vy08oaod'
                >
                  Tree Dasher Relay
                </Link>
              </li>
              <li className='flex flex-col gap-3 w-1/3'>
                <div className='uppercase font-bold hover:underline mb-5'>
                  Featured
                </div>
                <Link
                  className='group flex justify-center items-center'
                  href='/product/cm9n1moww001i4n74azqa1hi5'
                >
                  <Image
                    src='/images/shoe-wide1.avif'
                    alt='#'
                    width={400}
                    height={100}
                    className='relative group-hover:opacity-80 transition-opacity ease-out duration-300'
                  ></Image>
                  <div className='absolute text-lg font-bold uppercase group-hover:underline text-white'>
                    The new whool runner go
                  </div>
                </Link>
                <Link
                  className='group flex justify-center items-center'
                  href='/collections/man?type=Water-Repellent+Shoes'
                >
                  <Image
                    src='/images/shoe-wide2.avif'
                    alt='#'
                    width={400}
                    height={100}
                    className='relative group-hover:opacity-80 transition-opacity ease-out duration-300'
                  ></Image>
                  <div className='absolute text-lg font-bold uppercase group-hover:underline text-white'>
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
            <ul className='flex w-screen px-36 gap-10 py-8 '>
              <li className='flex flex-col justify-between w-1/3'>
                <div className='flex flex-col gap-3'>
                  <Link
                    className='uppercase font-bold hover:underline mb-5'
                    href={women.basePath}
                  >
                    Shoes
                  </Link>
                  {women.categories.map(({ label, value }) => (
                    <Link
                      key={label}
                      className='hover:underline'
                      href={`${women.basePath}?type=${encodeURIComponent(
                        value || label
                      )}`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
                <Link
                  className='hover:underline font-bold text-red-700 uppercase'
                  href={women.sale.href}
                >
                  {women.sale.label}
                </Link>
              </li>
              <li className='flex flex-col gap-3 w-1/3'>
                <div className='uppercase font-bold hover:underline mb-5'>
                  Best Sellers
                </div>
                <Link
                  className='hover:underline'
                  href='/product/cm9n1mrdi004h4n74o47vfs1y'
                >
                  Tree Runner
                </Link>
                <Link
                  className='hover:underline'
                  href='/product/cm9n1mrik00504n745shnddu0'
                >
                  Tree Dasher 2
                </Link>
                <Link
                  className='hover:underline'
                  href='/product/cm9n1mt7z007v4n74870yt5ac'
                >
                  Wool Runner Mizzle
                </Link>
                <Link
                  className='hover:underline'
                  href='/product/cm9n1mrsx005u4n74vj29lowe'
                >
                  Tree Breezer
                </Link>
              </li>
              <li className='flex flex-col gap-3 w-1/3'>
                <div className='uppercase font-bold hover:underline mb-5'>
                  Featured
                </div>
                <Link
                  className='group flex justify-center items-center'
                  href='/product/cm9n1ms1z006f4n74s4xmj0g1'
                >
                  <Image
                    src='/images/shoe-wide1.avif'
                    alt='#'
                    width={400}
                    height={100}
                    className='relative group-hover:opacity-80 transition-opacity ease-out duration-300'
                  ></Image>
                  <div className='absolute text-lg font-bold uppercase group-hover:underline text-white'>
                    The new whool runner go
                  </div>
                </Link>
                <Link
                  className='group flex justify-center items-center'
                  href='/collections/woman?type=Water-Repellent+Shoes'
                >
                  <Image
                    src='/images/shoe-wide2.avif'
                    alt='#'
                    width={400}
                    height={100}
                    className='relative group-hover:opacity-80 transition-opacity ease-out duration-300'
                  ></Image>
                  <div className='absolute text-lg font-bold uppercase group-hover:underline text-white'>
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
