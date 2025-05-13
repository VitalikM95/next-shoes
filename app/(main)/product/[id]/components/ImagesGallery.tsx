'use client'
import { FC, useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ImageModal } from './ImageModal'
import { useProductSelectionStore } from '@/lib/store/product-selection-store'

interface ThumbProps {
  selected: boolean
  onClick: () => void
  src: string
}

const Thumb: FC<ThumbProps> = ({ selected, onClick, src }) => (
  <Image
    src={src}
    alt="Thumbnail"
    width={400}
    height={400}
    onClick={onClick}
    className={`image-bg mb-2 rounded-none border-2 transition-all duration-100 ${
      selected ? 'border-black' : 'cursor-pointer hover:border-gray-400'
    }`}
  />
)

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

  // Скидаємо індекс при зміні кольору
  useEffect(() => {
    setCurrentImageIndex(0)
    // Додаємо невелику затримку перед прокручуванням до початку
    const timer = setTimeout(() => {
      if (emblaMainApi) {
        emblaMainApi.scrollTo(0)
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [colorIndex, emblaMainApi])

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalActive(true)
  }

  const navigateImage = useCallback(
    (direction: 'next' | 'prev') => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex =
          direction === 'next'
            ? (prevIndex + 1) % currentImages.length
            : (prevIndex - 1 + currentImages.length) % currentImages.length
        return newIndex
      })
    },
    [currentImages.length]
  )

  const updateSelectedIndex = (index: number) => {
    if (!modalActive) {
      setCurrentImageIndex(index)
      emblaMainApi?.scrollTo(index)
    }
  }

  return (
    <div className="embla" key={`gallery-${colorIndex}`}>
      <div className="embla-thumbs">
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
          {currentImages.map((src, index) => (
            <div className="embla__slide" key={`slide-${index}`}>
              <Image
                src={src}
                alt={`Product image ${index + 1}`}
                width={600}
                height={600}
                className="image-bg cursor-pointer"
                onClick={() => openModal(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <ImageModal
        active={modalActive}
        setActive={setModalActive}
        imageSrc={currentImages[currentImageIndex]}
        onNext={() => navigateImage('next')}
        onPrev={() => navigateImage('prev')}
      />
    </div>
  )
}

export default ImagesGallery
