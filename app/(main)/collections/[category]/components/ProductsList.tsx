'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ProductListItem } from '@/types/product.types'
import { ProductCard } from './ProductCard'
import { useProductsSWR } from '@/lib/hooks/useProductsSWR'

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

  // Просто отримуємо всі параметри з URL
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  )

  // Отримуємо всі потрібні значення для фільтрів
  const type = params.get('type') || ''
  const bestFor = params.getAll('bestFor')
  const materials = params.getAll('materials')
  const colorType = params.getAll('colorType')
  const sizes = params.getAll('sizes')

  // Запускаємо запит тільки після монтування на клієнті
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
    hasMounted // Виконуємо запит тільки після монтування компонента
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
        <div className="flex flex-wrap items-start gap-4 pl-4">
          {products.map((product: ProductListItem) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      )}
    </>
  )
}
