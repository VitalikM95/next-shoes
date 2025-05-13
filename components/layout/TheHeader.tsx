import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '../shared/Navigation'
import { UserActions } from '../shared/UserActions'

const TheHeader = () => {
  return (
    <header className="sticky left-0 top-[-14px] z-20 h-16 w-full bg-white pr-8 shadow-lg">
      <div className="sticky left-0 top-0 flex h-14 w-full items-center justify-between bg-white">
        <div className="self-end">
          <Navigation />
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 transform text-center">
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
