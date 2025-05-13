import ProductGallery from './components/ImagesGallery'
import ReactMarkdown from 'react-markdown'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'
import { calculatePrice } from '@/lib/utils'
import ProductActions from './components/ProductActions'
import { getProductById } from '@/lib/db/products'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductById(params.id)
  if (!product) return notFound()

  const { discountedPrice, originalPrice, hasDiscount } = calculatePrice(
    product.price,
    product.discountPercent
  )
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="my-10 flex">
        <div className="flex w-1/2 flex-col">
          <ProductGallery variants={product.variants} />
          <Accordion type="single" collapsible className="mt-10 w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Details</AccordionTrigger>
              <AccordionContent>
                <ReactMarkdown>
                  {product.details.replace(/\.\s*([^.:]*):/g, '.\n\n**$1:**')}
                </ReactMarkdown>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>sustainability</AccordionTrigger>
              <AccordionContent>
                <ReactMarkdown>
                  {product.sustainability
                    .replace(/\.\s*/g, '.\n\n• ')
                    .replace(/([^:\n]+):/g, '**$1:**\n')}
                </ReactMarkdown>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Care Guide</AccordionTrigger>
              <AccordionContent>
                <ReactMarkdown>
                  {product.careGuide.replace(/(\d+\.)\s*/g, '\n\n$1')}
                </ReactMarkdown>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex w-1/2 flex-col px-14">
          <h2 className="text-3xl font-bold uppercase">{product.name}</h2>
          <div className="flex py-5">
            {hasDiscount ? (
              <>
                <div className="pr-6 text-2xl font-semibold text-red-600">
                  ${discountedPrice}
                </div>
                <div className="pr-6 text-base text-muted-foreground line-through">
                  ${originalPrice}
                </div>
              </>
            ) : (
              <div className="pr-8 text-2xl font-semibold text-black">
                ${discountedPrice}
              </div>
            )}
          </div>
          <div className="bg-[#F6F6F6] p-2 text-center text-sm text-gray-800">
            <b className="text-base text-black">{product.name} highlights: </b>
            <hr className="my-2" />
            <div className="line-clamp-5">
              <ReactMarkdown components={{ hr: () => <hr className="my-2" /> }}>
                {product.highlights
                  .replace(/(\.)\s+/g, '$1\n\n---\n\n')
                  .replace(/\n\n---\n\n$/, '')}
              </ReactMarkdown>
            </div>
          </div>
          <ProductActions product={product} discountedPrice={discountedPrice} />
        </div>
      </div>
      <div className="mb-10 flex gap-4">
        {product.otherInfo.map((info, i) => (
          <div key={i} className="flex w-1/3 flex-col">
            <Image src={info.img} alt="shoes photo" width={500} height={700} />
            <h5 className="py-4 text-2xl font-bold">{info.title}</h5>
            <p className="pb-16">{info.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
