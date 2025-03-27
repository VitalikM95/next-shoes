import { FC, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useBodyLock } from '@/lib/utils.client'

interface IProps {
  active: boolean
  setActive: (arg: boolean) => void
  imageSrc: string | null
  onNext: () => void
  onPrev: () => void
}

const ImageModal: FC<IProps> = ({ active, setActive, imageSrc, onNext, onPrev }) => {
  useBodyLock(active)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(false)
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrev()
    }

    if (active) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, setActive, onNext, onPrev])

  return (
    <div
      className={`${
        active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } h-screen w-screen bg-black/70 fixed top-0 left-0 z-50 flex justify-center items-center transition-opacity duration-300 ease-out`}
      onClick={() => setActive(false)}
    >
      <div
        className={`${
          active ? 'scale-100' : 'scale-50'
        } relative bg-[#F6F6F6] w-full max-w-[800px] h-full max-h-screen flex flex-col justify-between transition-transform duration-300 ease-out`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 z-50 bg-transparent border-2 border-transparent shadow-none hover:bg-black hover:text-white"
          onClick={() => setActive(false)}
        >
          <X strokeWidth={1} className="!h-7 !w-7" />
        </Button>
        <div className="flex-grow flex flex-col justify-center items-center relative">
          <div className="relative w-[800px] h-[800px]">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt="Selected product image"
                width={800}
                height={800}
                className="rounded-md bg-[#F6F6F6] absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-300 ease-in-out"
              />
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent border border-transparent shadow-none hover:border-black"
            onClick={onPrev}
          >
            <ChevronLeft className="!h-7 !w-7" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border border-transparent shadow-none hover:border-black"
            onClick={onNext}
          >
            <ChevronRight className="!h-7 !w-7" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { ImageModal }
