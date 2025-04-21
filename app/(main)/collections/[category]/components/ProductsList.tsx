'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useProducts } from '@/lib/api/products'
import { ProductListItem } from '@/types/product.types'
import { ProductCard } from './ProductCard'

interface ProductsListProps {
  initialProducts: ProductListItem[]
  initialSearchParams?: { [key: string]: string }
  category: string
}

const parseFilters = (params: URLSearchParams) => {
  return {
    type: params.get('type') || '',
    bestFor: params.get('bestFor')?.split(',') || [],
    materials: params.get('materials')?.split(',') || [],
    colorType: params.get('colorType')?.split(',') || [],
    sizes: params.get('sizes')?.split(',') || [],
  }
}

const areFiltersEqual = (
  current: ReturnType<typeof parseFilters>,
  initial: ProductsListProps['initialSearchParams']
) => {
  const compareArrays = (a: string[], b: string[]) =>
    a.length === b.length && a.every(v => b.includes(v))

  return (
    current.type === (initial?.type || '') &&
    compareArrays(current.bestFor, (initial?.bestFor || '').split(',')) &&
    compareArrays(current.materials, (initial?.materials || '').split(',')) &&
    compareArrays(current.colorType, (initial?.colorType || '').split(',')) &&
    compareArrays(current.sizes, (initial?.sizes || '').split(','))
  )
}

export const ProductsList = ({
  initialProducts,
  initialSearchParams,
  category,
}: ProductsListProps) => {
  const searchParams = useSearchParams()
  const [hasMounted, setHasMounted] = useState(false)

  const filters = useMemo(() => {
    return parseFilters(new URLSearchParams(searchParams.toString()))
  }, [searchParams])

  const shouldFetch = useMemo(() => {
    if (!hasMounted) return false
    return !areFiltersEqual(filters, initialSearchParams)
  }, [filters, hasMounted, initialSearchParams])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const {
    products = initialProducts,
    isLoading,
    isError,
  } = useProducts(
    category,
    initialProducts,
    filters.type,
    filters.bestFor,
    filters.materials,
    filters.colorType,
    filters.sizes,
    shouldFetch
  )

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading products</div>
      ) : !products?.length ? (
        <div>No products found</div>
      ) : (
        <div className='flex flex-wrap items-start gap-4 pl-4'>
          {products.map((product: ProductListItem) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      )}
    </>
  )
}
