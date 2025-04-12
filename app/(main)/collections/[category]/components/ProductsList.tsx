'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useProducts } from '@/lib/api/products'
import { Product } from '@/types/product.types'
import { ProductCard } from './ProductCard'

interface ProductsListProps {
  initialProducts: Product[]
  category: 'man' | 'woman'
}

export const ProductsList = ({
  initialProducts,
  category,
}: ProductsListProps) => {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    type: '',
    bestFor: [] as string[],
    materials: [] as string[],
  })

  useEffect(() => {
    const type = searchParams.get('type')
    const bestFor = searchParams.get('bestFor')?.split(',') || []
    const materials = searchParams.get('materials')?.split(',') || []

    setFilters({
      type: type || '',
      bestFor,
      materials,
    })
  }, [searchParams])

  const {
    products = initialProducts,
    isLoading,
    isError,
  } = useProducts(
    category,
    filters.type,
    initialProducts,
    filters.bestFor,
    filters.materials
  )

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading products</div>
  if (!products || !Array.isArray(products)) return <div>No products found</div>

  return (
    <div className='flex flex-wrap items-start gap-4 pl-4'>
      {products.map(product => (
        <ProductCard key={product.id} item={product} />
      ))}
    </div>
  )
}
