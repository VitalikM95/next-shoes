'use client'

import * as React from 'react'
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import Image from 'next/image'

// const components: { title: string; href: string }[] = [
//   {
//     title: 'Alert Dialog',
//     href: '/docs/primitives/alert-dialog',
//   },
//   {
//     title: 'Hover Card',
//     href: '/docs/primitives/hover-card',
//   },
//   {
//     title: 'Progress',
//     href: '/docs/primitives/progress',
//   },
//   {
//     title: 'Scroll-area',
//     href: '/docs/primitives/scroll-area',
//   },
//   {
//     title: 'Tabs',
//     href: '/docs/primitives/tabs',
//   },
//   {
//     title: 'Tooltip',
//     href: '/docs/primitives/tooltip',
//   },
// ]

const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Men</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex w-screen px-36 gap-10 py-8">
              <li className="flex flex-col justify-between w-1/3">
                <div className="flex flex-col gap-3">
                  <Link className="uppercase font-bold hover:underline mb-5" href="#">
                    Shoes
                  </Link>
                  <Link className="hover:underline" href="/collections/11">
                    Trainers
                  </Link>
                  <Link className="hover:underline" href="/products/22">
                    Active Shoes
                  </Link>
                  <Link className="hover:underline" href="/profile">
                    Water-Repellent Shoes
                  </Link>
                </div>
                <Link className="hover:underline font-bold text-red-700 uppercase" href="/profile">
                  Sale
                </Link>
              </li>
              <li className="flex flex-col gap-3 w-1/3">
                <Link className="uppercase font-bold hover:underline mb-5" href="#">
                  Best Sellers
                </Link>
                <Link className="hover:underline" href="/collections/11">
                  Tree Runner
                </Link>
                <Link className="hover:underline" href="/products/22">
                  Tree Dasher 2
                </Link>
                <Link className="hover:underline" href="/profile">
                  Wool Runner Mizzle
                </Link>
                <Link className="hover:underline" href="/profile">
                  Tree Dasher Relay
                </Link>
              </li>
              <li className="flex flex-col gap-3 w-1/3">
                <Link className="uppercase font-bold hover:underline mb-5" href="#">
                  Featured
                </Link>
                <Link className="group flex justify-center items-center" href="/">
                  <Image
                    src="/images/shoe-wide1.avif"
                    alt="#"
                    width={400}
                    height={100}
                    className="relative group-hover:opacity-80 transition-opacity ease-out duration-300"
                  ></Image>
                  <div className="absolute text-lg font-bold uppercase group-hover:underline text-white">
                    The new whool runner go
                  </div>
                </Link>
                <Link className="group flex justify-center items-center" href="/">
                  <Image
                    src="/images/shoe-wide2.avif"
                    alt="#"
                    width={400}
                    height={100}
                    className="relative group-hover:opacity-80 transition-opacity ease-out duration-300"
                  ></Image>
                  <div className="absolute text-lg font-bold uppercase group-hover:underline text-white">
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
            <ul className="flex w-screen px-36 gap-10 py-8 ">
              <li className="flex flex-col justify-between w-1/3">
                <div className="flex flex-col gap-3">
                  <Link className="uppercase font-bold hover:underline mb-5" href="#">
                    Shoes
                  </Link>
                  <Link className="hover:underline" href="/collections/11">
                    Trainers
                  </Link>
                  <Link className="hover:underline" href="/products/22">
                    Active Shoes
                  </Link>
                  <Link className="hover:underline" href="/profile">
                    Flats
                  </Link>
                  <Link className="hover:underline" href="/profile">
                    Water-Repellent Shoes
                  </Link>
                </div>
                <Link className="hover:underline font-bold text-red-700 uppercase" href="/profile">
                  Sale
                </Link>
              </li>
              <li className="flex flex-col gap-3 w-1/3">
                <Link className="uppercase font-bold hover:underline mb-5" href="#">
                  Best Sellers
                </Link>
                <Link className="hover:underline" href="/collections/11">
                  Tree Runner
                </Link>
                <Link className="hover:underline" href="/products/22">
                  Tree Dasher 2
                </Link>
                <Link className="hover:underline" href="/profile">
                  Wool Runner Mizzle
                </Link>
                <Link className="hover:underline" href="/profile">
                  Tree Breezer
                </Link>
              </li>
              <li className="flex flex-col gap-3 w-1/3">
                <Link className="uppercase font-bold hover:underline mb-5" href="#">
                  Featured
                </Link>
                <Link className="group flex justify-center items-center" href="/">
                  <Image
                    src="/images/shoe-wide1.avif"
                    alt="#"
                    width={400}
                    height={100}
                    className="relative group-hover:opacity-80 transition-opacity ease-out duration-300"
                  ></Image>
                  <div className="absolute text-lg font-bold uppercase group-hover:underline text-white">
                    The new whool runner go
                  </div>
                </Link>
                <Link className="group flex justify-center items-center" href="/">
                  <Image
                    src="/images/shoe-wide2.avif"
                    alt="#"
                    width={400}
                    height={100}
                    className="relative group-hover:opacity-80 transition-opacity ease-out duration-300"
                  ></Image>
                  <div className="absolute text-lg font-bold uppercase group-hover:underline text-white">
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

// const ListItem = React.forwardRef<
//   React.ElementRef<'a'>,
//   React.ComponentPropsWithoutRef<typeof Link> & { title: string }
// >(({ className, title, children, href, ...props }, ref) => {
//   return (
//     <div>
//       <NavigationMenuLink asChild>
//         <Link
//           href={href || '#'}
//           ref={ref}
//           className={cn(
//             'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           {children}
//         </Link>
//       </NavigationMenuLink>
//     </div>
//   )
// })
// ListItem.displayName = 'ListItem'

export { Navigation }
