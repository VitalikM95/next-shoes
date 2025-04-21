import { getProducts } from './get-products'
import { ProductsList } from './components/ProductsList'
import { SwitchButton } from './components/SwitchButton'
import FiltersPanel from './components/FiltersPanel'

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
    <main className='px-16 py-10 flex'>
      <FiltersPanel />
      <div className='w-4/5 flex flex-col'>
        <div className='flex justify-end'>
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
