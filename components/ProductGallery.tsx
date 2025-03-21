'use client'
import { FC, useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { ImageModal } from './ImageModal'

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
    className={`rounded-none bg-[#F6F6F6] mb-2 border-2 transition-all duration-100 ${
      selected ? 'border-black' : 'hover:border-gray-400 cursor-pointer'
    }`}
  />
)

interface ProductGalleryProps {
  images: string[]
}

const ProductGallery: FC<ProductGalleryProps> = ({ images }) => {
  const [modalActive, setModalActive] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel()
  const [emblaThumbsRef] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'y',
  })

  const onSelect = useCallback(() => {
    if (emblaMainApi) {
      setSelectedIndex(emblaMainApi.selectedScrollSnap())
    }
  }, [emblaMainApi])

  useEffect(() => {
    if (emblaMainApi) {
      emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }
  }, [emblaMainApi, onSelect])

  const openModal = (src: string) => {
    setSelectedImage(src)
    setModalActive(true)
  }

  const onNext = useCallback(() => {
    setSelectedImage((prevImage) => {
      const currentIndex = images.indexOf(prevImage || '')
      const nextIndex = (currentIndex + 1) % images.length
      return images[nextIndex]
    })
  }, [images])

  const onPrev = useCallback(() => {
    setSelectedImage((prevImage) => {
      const currentIndex = images.indexOf(prevImage || '')
      const prevIndex = (currentIndex - 1 + images.length) % images.length
      return images[prevIndex]
    })
  }, [images])

  const updateSelectedIndex = (index: number) => {
    if (!modalActive) {
      setSelectedIndex(index)
      emblaMainApi?.scrollTo(index)
    }
  }

  return (
    <div className="embla">
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container px-0.5">
            {images.map((src, index) => (
              <Thumb
                key={index}
                onClick={() => updateSelectedIndex(index)}
                selected={index === selectedIndex}
                src={src}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {images.map((src, index) => (
            <div className="embla__slide" key={index}>
              <Image
                src={src}
                alt={`Product image ${index + 1}`}
                width={600}
                height={500}
                className="cursor-pointer bg-[#F6F6F6]"
                onClick={() => openModal(src)}
              />
            </div>
          ))}
        </div>
      </div>
      <ImageModal
        active={modalActive}
        setActive={setModalActive}
        imageSrc={selectedImage}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  )
}

export default ProductGallery
