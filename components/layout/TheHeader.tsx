import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Navigation } from '../shared/Navigation'
import { UserActions } from '../cart/UserActions'
import { MobileNavigation } from '../shared/MobileNavigation'

export const TheHeader: FC = () => {
  return (
    <header className="sticky left-0 top-[-14px] z-20 h-auto min-h-16 w-full bg-white shadow-lg">
      <div className="sticky left-0 top-0 flex h-14 w-full items-center justify-between bg-white px-2 md:px-4">
        <MobileNavigation />

        <div className="hidden md:block md:self-end">
          <Navigation />
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 transform text-center">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.svg"
              alt="logo"
              width={120}
              height={35}
              className="cursor-pointer sm:w-[150px] md:w-[170px]"
            />
          </Link>
        </h1>

        <UserActions />
      </div>
    </header>
  )
}
