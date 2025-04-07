'use client'

import { ProductCard } from '@/components/shared/ProductCard'
import { useProducts } from '@/lib/api/products'
import { Product } from '@/types/product.types'

interface ProductsListProps {
  initialProducts: Product[]
  category: 'man' | 'woman'
}

export const ProductsList = ({
  initialProducts,
  category,
}: ProductsListProps) => {
  // Використовуємо SWR з початковими даними
  const {
    products = initialProducts,
    isLoading,
    isError,
  } = useProducts(category)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading products</div>
  if (!products || !Array.isArray(products)) return <div>No products found</div>

  return (
    <div className='flex flex-wrap items-start gap-4 pl-4'>
      {products.map((product: Product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </div>
  )
}
