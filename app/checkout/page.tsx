import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-10">
      <div className="border-b-2 border-black px-5 pb-5">
        <Link href="/" aria-label="Home" className="inline-block">
          <Image src="/logo.svg" alt="logo" width={200} height={100} />
        </Link>
      </div>
      <div className="flex">
        <div className="w-1/2 p-4 border-r-2 border-black">Express checkout</div>
        <div className="w-1/2 p-4">Title</div>
      </div>
    </div>
  )
}

export default page
