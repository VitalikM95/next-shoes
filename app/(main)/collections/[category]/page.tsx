import { ProductsList } from './components/ProductsList'
import { SwitchButton } from './components/SwitchButton'
import FiltersPanel from './components/FiltersPanel'
import { getProducts } from '@/lib/db/products'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { category: string }
  searchParams?: { type?: string }
}

export default async function CollectionPage({
  params,
  searchParams,
}: PageProps) {
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
