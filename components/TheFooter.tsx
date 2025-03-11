import { Facebook, Instagram, Twitter } from 'lucide-react'
import Image from 'next/image'

const TheFooter = () => {
  return (
    <footer className="p-12 bg-zinc-800">
      <div className="mx-auto font-light text-sm text-white ">
        <div className="flex flex-col md:flex-row items-center md:justify-between px-4">
          <div className="xs:w-1/2 md:w-1/3 my-6">
            <div className="uppercase font-bold text-base py-2">Help</div>
            <div className="w-fit hover:underline my-2 cursor-pointer">1-888-999-4444</div>
            <div className="w-fit hover:underline my-2 cursor-pointer">1-888-555-6666 (Text)</div>
            <div className="w-fit hover:underline my-2 cursor-pointer">help@nextshoes.com</div>
          </div>

          <div className="xs:w-1/2 md:w-1/3 my-6">
            <div className="uppercase font-bold text-base py-2">FOLLOW THE FLOCK</div>
            <div className="my-4">
              Exclusive offers, a heads up on new things, and sightings of NextShoes in the wild.
              Oh, we have cute sheep, too. #weareall
            </div>
            <div className="flex gap-5 justify-start ">
              <Instagram className="cursor-pointer" />
              <Twitter className="cursor-pointer" />
              <Facebook className="cursor-pointer" />
            </div>
          </div>

          <div className="xs:w-1/2 md:w-1/3 my-6">
            <Image
              className="max-h-20 mx-auto mt-8"
              width={50}
              height={80}
              src="/sertified.png"
              alt="#"
            />
          </div>
        </div>
        <div className="text-center text-xs">
          © 2025 NextShoes, Inc. All Rights Reserved. Terms, Privacy & Accessibility
        </div>
      </div>
    </footer>
  )
}

export { TheFooter }
