'use client'
import { FC, useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ImageModal } from './ImageModal'
import { useProductSelectionStore } from '@/lib/store/product-selection-store'
import { Loader2 } from 'lucide-react'

interface ThumbProps {
  selected: boolean
  onClick: () => void
  src: string
}

const Thumb: FC<ThumbProps> = ({ selected, onClick, src }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}
      <Image
        src={src}
        alt="Thumbnail"
        width={400}
        height={400}
        onClick={onClick}
        onLoad={() => setIsLoading(false)}
        className={`image-bg mb-2 rounded-none border-2 transition-all duration-100 ${
          selected ? 'border-black' : 'cursor-pointer hover:border-gray-400'
        } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  )
}

interface ImagesGalleryProps {
  variants: {
    images: string[]
  }[]
}

const ImagesGallery: FC<ImagesGalleryProps> = ({ variants }) => {
  const { colorIndex } = useProductSelectionStore()
  const currentImages = variants[colorIndex].images

  const [modalActive, setModalActive] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageLoading, setIsImageLoading] = useState(false)

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()
  const [emblaThumbsRef] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'y',
  })

  const onSelect = useCallback(() => {
    if (emblaMainApi) {
      setCurrentImageIndex(emblaMainApi.selectedScrollSnap())
    }
  }, [emblaMainApi])

  useEffect(() => {
    if (emblaMainApi) {
      emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }
  }, [emblaMainApi, onSelect])

  useEffect(() => {
    setCurrentImageIndex(0)
    if (emblaMainApi) {
      emblaMainApi.scrollTo(0)
    }
  }, [colorIndex, emblaMainApi])

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalActive(true)
  }

  const navigateImage = useCallback(
    (direction: 'next' | 'prev') => {
      setIsImageLoading(true)
      setCurrentImageIndex(prevIndex => {
        const newIndex =
          direction === 'next'
            ? (prevIndex + 1) % currentImages.length
            : (prevIndex - 1 + currentImages.length) % currentImages.length
        return newIndex
      })
    },
    [currentImages.length],
  )

  const updateSelectedIndex = (index: number) => {
    if (!modalActive) {
      setCurrentImageIndex(index)
      emblaMainApi?.scrollTo(index)
    }
  }

  return (
    <div className="embla w-full" key={`gallery-${colorIndex}`}>
      <div className="embla-thumbs text-center">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container px-0.5">
            {currentImages.map((src, index) => (
              <Thumb
                key={`thumb-${index}`}
                onClick={() => updateSelectedIndex(index)}
                selected={index === currentImageIndex}
                src={src}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {currentImages.map((src, index) => {
            const [isLoading, setIsLoading] = useState(true)
            return (
              <div className="embla__slide relative" key={`slide-${index}`}>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                )}
                <Image
                  src={src}
                  alt={`Product image ${index + 1}`}
                  width={600}
                  height={600}
                  onLoad={() => setIsLoading(false)}
                  className={`image-bg cursor-pointer transition-opacity duration-200 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onClick={() => openModal(index)}
                />
              </div>
            )
          })}
        </div>
      </div>
      <ImageModal
        active={modalActive}
        setActive={setModalActive}
        imageSrc={currentImages[currentImageIndex]}
        onNext={() => navigateImage('next')}
        onPrev={() => navigateImage('prev')}
        isLoading={isImageLoading}
      />
    </div>
  )
}

export default ImagesGallery
