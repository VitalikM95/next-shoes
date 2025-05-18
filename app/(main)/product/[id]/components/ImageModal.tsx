import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useBodyLock } from '@/lib/hooks/useBodyLock'

interface IProps {
  active: boolean
  setActive: (arg: boolean) => void
  imageSrc: string | null
  onNext: () => void
  onPrev: () => void
  isLoading?: boolean
}

const ImageModal: FC<IProps> = ({
  active,
  setActive,
  imageSrc,
  onNext,
  onPrev,
  isLoading = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [prevImageSrc, setPrevImageSrc] = useState<string | null>(null)
  useBodyLock(active)

  // Скидаємо стан завантаження при зміні зображення
  useEffect(() => {
    if (imageSrc !== prevImageSrc) {
      setImageLoaded(false)
      setPrevImageSrc(imageSrc)
    }
  }, [imageSrc, prevImageSrc])

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

  // Змінюємо логіку завантаження: показуємо лоадер тільки якщо це початкове завантаження
  const showLoader = isLoading || (imageSrc && !imageLoaded && !prevImageSrc)

  return (
    <div
      className={`${
        active
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      } fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/70 transition-opacity duration-300 ease-out`}
      onClick={() => setActive(false)}
    >
      <div
        className={`${
          active ? 'scale-100' : 'scale-50'
        } image-bg relative flex h-full max-h-screen w-full max-w-[800px] flex-col justify-between transition-transform duration-300 ease-out`}
        onClick={e => e.stopPropagation()}
      >
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-2 z-50 border-2 border-transparent bg-transparent shadow-none hover:bg-black hover:text-white"
          onClick={() => setActive(false)}
        >
          <X strokeWidth={1} className="!h-7 !w-7" />
        </Button>
        <div className="relative flex flex-grow flex-col items-center justify-center">
          <div className="relative h-full w-full">
            {showLoader ? (
              <div className="absolute inset-0 flex h-full w-full animate-pulse items-center justify-center">
                <span className="text-gray-500">Завантаження...</span>
              </div>
            ) : null}

            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Обране зображення товару"
                width={800}
                height={800}
                className={`image-bg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md transition-opacity duration-300 ease-in-out md:h-full md:w-full md:inset-0 md:translate-x-0 md:translate-y-0 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } w-full h-auto max-w-full object-contain md:object-cover`}
                priority
                onLoad={() => setImageLoaded(true)}
              />
            ) : !showLoader ? (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-100">
                <span className="text-gray-500">Зображення не знайдено</span>
              </div>
            ) : null}
          </div>

          {/* Завжди показуємо кнопки навігації, незалежно від стану завантаження */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 transform border border-transparent bg-transparent shadow-none hover:border-black"
            onClick={onPrev}
          >
            <ChevronLeft className="!h-7 !w-7" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 transform border border-transparent bg-transparent shadow-none hover:border-black"
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
