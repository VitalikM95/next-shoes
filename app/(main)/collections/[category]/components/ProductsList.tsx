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
  const [filters, setFilters] = useState({ type: '' })

  useEffect(() => {
    const type = searchParams.get('type')
    setFilters({ type: type || '' })
  }, [searchParams])

  const {
    products = initialProducts,
    isLoading,
    isError,
  } = useProducts(category, filters.type, initialProducts)

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
