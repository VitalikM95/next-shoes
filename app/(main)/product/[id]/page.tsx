import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { Metadata } from 'next'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { calculatePrice } from '@/lib/utils'
import { getProductById } from '@/lib/db/products'

import ProductGallery from './components/ImagesGallery'
import ProductActions from './components/ProductActions'

interface ProductPageProps {
  params: { id: string }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: 'Product not found',
      description: 'This product does not exist or has been removed',
    }
  }

  return {
    title: product.name,
    description: `${product.name} - ${product.type}. ${product.highlights.split('.')[0]}.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)
  if (!product) return notFound()

  const { discountedPrice, originalPrice, hasDiscount } = calculatePrice(
    product.price,
    product.discountPercent,
  )
  return (
    <div className="mx-auto max-w-screen-xl px-5">
      <div className="my-10 flex lg:flex-row flex-col flex-wrap">
        <div className="flex lg:w-1/2 w-full flex-col order-1">
          <ProductGallery variants={product.variants} />
        </div>
        <div className="flex lg:w-1/2 w-full flex-col sm:pl-10 px-0 lg:pr-5 lg:pt-0 pt-10 sm:pr-10 order-2">
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
        <div className="w-full mt-10 lg:w-1/2 order-4 lg:order-3">
          <Accordion type="single" collapsible className="w-full">
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
        <div className="hidden lg:block lg:w-1/2 order-3 lg:order-4"></div>
      </div>

      <div className="mb-10 flex flex-col md:flex-row gap-4">
        {product.otherInfo.map((info, i) => (
          <div key={i} className="flex w-full md:w-1/3 flex-col">
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={info.img}
                alt="shoes photo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
              />
            </div>
            <h5 className="py-4 text-xl md:text-2xl font-bold">{info.title}</h5>
            <p className="pb-10 md:pb-16">{info.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
