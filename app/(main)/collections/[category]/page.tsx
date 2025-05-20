import { getProducts } from '@/lib/db/products'
import { Metadata } from 'next'

import { ProductsList } from './components/ProductsList'
import { SwitchButton } from './components/SwitchButton'
import FiltersPanel from './components/FiltersPanel'

export const dynamic = 'force-dynamic'

interface CollectionPageProps {
  params: { category: string }
  searchParams?: { type?: string }
}

export async function generateMetadata({
  params,
  searchParams,
}: CollectionPageProps): Promise<Metadata> {
  const category = params.category
  const type = searchParams?.type

  const categoryTitle = category === 'man' ? "Men's Shoes" : "Women's Shoes"
  const typeTitle = type ? ` - ${type}` : ''

  return {
    title: `${categoryTitle}${typeTitle}`,
    description: `Collection of ${categoryTitle.toLowerCase()}${typeTitle.toLowerCase()} in our store. Wide selection of models and sizes.`,
  }
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const category = params.category
  const type = searchParams?.type

  const products = await getProducts(category, type)

  return (
    <main className="flex flex-col px-4 py-6 md:flex-row md:px-6 md:py-8 lg:px-12 lg:py-10 xl:px-16">
      <FiltersPanel />
      <div className="flex w-full flex-col md:w-4/5">
        <div className="mb-4 flex justify-end">
          <SwitchButton />
        </div>
        <ProductsList
          initialProducts={products}
          initialSearchParams={searchParams}
          category={params.category}
        />
      </div>
    </main>
  )
}
