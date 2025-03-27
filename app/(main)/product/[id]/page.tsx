'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  RadioGroupItemRound,
  RadioGroupCustom,
  RadioGroupItemSquare,
} from '@/components/ui/radio-group-custom'
import { data } from '@/temp'
import ProductGallery from '@/components/shared/ProductGallery'
import ReactMarkdown from 'react-markdown'

import { SIZE_RANGES } from '@/lib/constants'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'
import { calculatePrice } from '@/lib/utils'

const ProductPage = () => {
  const [colorIndex, setColorIndex] = useState(0)
  const [size, setSize] = useState(data[0].variants[colorIndex].sizes[0])
  const [currentImages, setCurrentImages] = useState(
    data[0].variants[colorIndex].images
  )

  const { discountedPrice, originalPrice, hasDiscount } = calculatePrice(
    data[0].price,
    data[0].discountPercent
  )

  useEffect(() => {
    const newAvailableSizes = data[0].variants[colorIndex].sizes
    setCurrentImages(data[0].variants[colorIndex].images)

    setSize(prevSize =>
      newAvailableSizes.includes(prevSize) ? prevSize : newAvailableSizes[0]
    )
  }, [colorIndex])

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex my-10'>
        <div className='flex flex-col w-1/2'>
          <ProductGallery images={currentImages} />
          <Accordion type='single' collapsible className='w-full mt-10'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Details</AccordionTrigger>
              <AccordionContent>
                <ReactMarkdown>
                  {data[0].details.replace(/\.\s*([^.:]*):/g, '.\n\n**$1:**')}
                </ReactMarkdown>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger>sustainability</AccordionTrigger>
              <AccordionContent>
                <ReactMarkdown>
                  {data[0].sustainability
                    .replace(/\.\s*/g, '.\n\n• ')
                    .replace(/([^:\n]+):/g, '**$1:**\n')}
                </ReactMarkdown>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger>Care Guide</AccordionTrigger>
              <AccordionContent>
                <ReactMarkdown>
                  {data[0].care_guide.replace(/(\d+\.)\s*/g, '\n\n$1')}
                </ReactMarkdown>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className='flex flex-col w-1/2 px-14'>
          <h2 className='text-3xl font-bold uppercase'>{data[0].name}</h2>
          <div className='flex py-5'>
            {hasDiscount ? (
              <>
                <div className='pr-6 text-2xl font-semibold text-red-600'>
                  ${discountedPrice}
                </div>
                <div className='pr-6 line-through text-base text-muted-foreground'>
                  ${originalPrice}
                </div>
              </>
            ) : (
              <div className='pr-8 text-2xl font-semibold text-black'>
                ${discountedPrice}
              </div>
            )}
          </div>
          <div className='text-sm p-2 text-center text-gray-800 bg-[#F6F6F6]'>
            <b className='text-base text-black'>{data[0].name} highlights: </b>
            <hr className='my-2' />
            <div className='line-clamp-5'>
              <ReactMarkdown components={{ hr: () => <hr className='my-2' /> }}>
                {data[0].highlights
                  .replace(/(\.)\s+/g, '$1\n\n---\n\n')
                  .replace(/\n\n---\n\n$/, '')}
              </ReactMarkdown>
            </div>
          </div>
          <div className='flex flex-col py-5'>
            <div className='w-full'>
              <div className='font-semibold uppercase my-4'>
                <span>Color</span>
                <span className='pl-2 text-base normal-case text-gray-800 font-normal'>
                  ({data[0].variants[colorIndex].color.name})
                </span>
              </div>
              <RadioGroupCustom
                defaultValue={'0'}
                onValueChange={value => setColorIndex(parseInt(value))}
              >
                {data[0].variants.map((variant, i) => {
                  const colorHash = variant.color.hash
                  const backgroundStyle = colorHash.includes(' ')
                    ? {
                        backgroundImage: `linear-gradient(to right, #${
                          colorHash.split(' ')[0]
                        } 50%, #${colorHash.split(' ')[1]} 50%)`,
                      }
                    : { backgroundColor: `#${colorHash}` }

                  return (
                    <RadioGroupItemRound
                      key={i}
                      value={i.toString()}
                      id={variant.color.name}
                      style={backgroundStyle}
                    />
                  )
                })}
              </RadioGroupCustom>
            </div>
            <div className='w-full'>
              <div className='font-semibold uppercase my-4'>Size</div>
              <RadioGroupCustom value={size} onValueChange={setSize}>
                {SIZE_RANGES[data[0].male as keyof typeof SIZE_RANGES].map(
                  (availableSize: number) => {
                    const isAvailable = data[0].variants[
                      colorIndex
                    ].sizes.includes(availableSize.toString())
                    return (
                      <RadioGroupItemSquare
                        key={availableSize}
                        value={availableSize.toString()}
                        id={availableSize.toString()}
                        labelTop='EU'
                        labelBottom={availableSize.toString()}
                        disabled={!isAvailable}
                      />
                    )
                  }
                )}
              </RadioGroupCustom>
            </div>
          </div>
          <div className='flex justify-between my-6'>
            <Button
              onClick={() =>
                alert(
                  `Added to Bag\nColor: ${data[0].variants[colorIndex].color.name}\nSize: ${size}`
                )
              }
              variant='outline'
              className={`w-full mr-6 h-12 text-md uppercase border-2 transition-colors duration-200 ${
                data[0].variants[colorIndex].sizes.length > 0
                  ? 'bg-black text-white border-black hover:bg-white hover:text-black'
                  : 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
              }`}
              disabled={data[0].variants[colorIndex].sizes.length === 0}
            >
              {data[0].variants[colorIndex].sizes.length > 0
                ? 'Add to Bag'
                : 'No sizes available :('}
            </Button>
          </div>
        </div>
      </div>
      <div className='flex mb-10 gap-4'>
        {data[0].other_info.map((info, i) => (
          <div key={i} className='flex flex-col w-1/3'>
            <Image src={info.img} alt='shoes photo' width={500} height={700} />
            <h5 className='font-bold text-2xl py-4'>{info.title}</h5>
            <p className='pb-16'>{info.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductPage
