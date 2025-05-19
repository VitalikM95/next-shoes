import Image from 'next/image'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export const TheFooter = () => {
  return (
    <footer className="bg-zinc-800 lg:px-12 lg:py-5 sm:px-5 px-0">
      <div className="mx-auto text-sm pt-5 font-light text-white">
        <div className="flex flex-col sm:gap-5 gap-2 items-center px-4 md:flex-row md:justify-between">
          <div className="xs:w-1/2 md:w-1/3">
            <div className="py-2 text-base font-bold uppercase">Help</div>
            <div className="my-2 w-fit cursor-pointer hover:underline">
              1-888-999-4444
            </div>
            <div className="my-2 w-fit cursor-pointer hover:underline">
              1-888-555-6666 (Text)
            </div>
            <div className="my-2 w-fit cursor-pointer hover:underline">
              help@nextshoes.com
            </div>
          </div>

          <div className="xs:w-1/2 md:w-1/3">
            <div className="py-2 text-base font-bold uppercase">
              FOLLOW THE FLOCK
            </div>
            <div className="my-4">
              Exclusive offers, a heads up on new things, and sightings of
              NextShoes in the wild. Oh, we have cute sheep, too. #weareall
            </div>
            <div className="flex justify-start gap-5">
              <Instagram className="cursor-pointer" />
              <Twitter className="cursor-pointer" />
              <Facebook className="cursor-pointer" />
            </div>
          </div>

          <div className="xs:w-1/2 md:w-1/3">
            <Image
              className="mx-auto mt-8 max-h-20"
              width={50}
              height={80}
              src="/sertified.png"
              alt="#"
            />
          </div>
        </div>
        <div className="text-center text-xs pt-10">
          © 2025 NextShoes, Inc. All Rights Reserved. Terms, Privacy &
          Accessibility
        </div>
      </div>
    </footer>
  )
}
