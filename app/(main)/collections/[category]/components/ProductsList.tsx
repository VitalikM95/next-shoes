'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ProductListItem } from '@/types/product.types'
import { ProductCard } from './ProductCard'
import { useProductsSWR } from '@/lib/hooks/useProductsSWR'
import Image from 'next/image'
import { ListProductSkeleton } from '@/components/shared/Skeletons'

interface ProductsListProps {
  initialProducts: ProductListItem[]
  initialSearchParams?: { [key: string]: string }
  category: string
}

export const ProductsList = ({
  initialProducts,
  category,
}: ProductsListProps) => {
  const searchParams = useSearchParams()
  const [hasMounted, setHasMounted] = useState(false)

  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  )

  const type = params.get('type') || ''
  const bestFor = params.getAll('bestFor')
  const materials = params.getAll('materials')
  const colorType = params.getAll('colorType')
  const sizes = params.getAll('sizes')

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const {
    products = initialProducts,
    isLoading,
    isError,
  } = useProductsSWR(
    category,
    initialProducts,
    type,
    bestFor,
    materials,
    colorType,
    sizes,
    hasMounted,
  )

  return (
    <>
      {!isLoading ? (
        <div className="w-full flex justify-around flex-wrap">
          {[...Array(9)].map((_, i) => (
            <ListProductSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="w-full py-8 text-center">Something went wrong :(</div>
      ) : !products?.length ||
        products.every(
          (product: ProductListItem) => !product.variants?.length,
        ) ? (
        <div className="w-full pt-16">
          <Image
            src="/no-products-found.png"
            alt="No products found"
            width={250}
            height={250}
            className="mx-auto"
          />
        </div>
      ) : (
        <div className="grid auto-cols-[360px] grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,360px)] justify-center">
          {products.map((product: ProductListItem) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard item={product} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
