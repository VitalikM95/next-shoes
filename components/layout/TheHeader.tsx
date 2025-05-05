import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '../shared/Navigation'
import { UserActions } from '../shared/UserActions'

const TheHeader = () => {
  return (
    <header className="h-16 pr-8 sticky top-[-14px] w-full left-0 bg-white z-20 shadow-lg ">
      <div className="flex justify-between items-center sticky h-14 top-0 left-0 w-full bg-white">
        <div className="self-end">
          <Navigation />
        </div>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.svg"
              alt="logo"
              width={170}
              height={50}
              className="cursor-pointer"
            />
          </Link>
        </h1>
        <UserActions />
      </div>
    </header>
  )
}

export { TheHeader }
