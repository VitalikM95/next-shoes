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
    [searchParams],
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
    hasMounted, // Виконуємо запит тільки після монтування компонента
  )

  return (
    <>
      {isLoading ? (
        <div className="w-full py-8 text-center">Завантаження...</div>
      ) : isError ? (
        <div className="w-full py-8 text-center">
          Помилка завантаження товарів
        </div>
      ) : !products?.length ? (
        <div className="w-full py-8 text-center">Товари не знайдені</div>
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
