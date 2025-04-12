import { getProducts } from './get-products'
import { ProductsList } from './components/ProductsList'
import {
  TitleCategories,
  ColorSelector,
  BestForSelector,
  MaterialSelector,
} from './components/Categories'
import { Breadcrumbs } from './components/BreadCrumbs'
import { SwitchButton } from './components/SwitchButton'
import { SizeSelector } from './components/Categories'

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: 'man' | 'woman' }
  searchParams: {
    type?: string
    bestFor?: string
    materials?: string
  }
}) {
  console.log('Page params:', params)
  console.log('Page searchParams:', searchParams)

  const bestFor = searchParams.bestFor?.split(',') || []
  const materials = searchParams.materials?.split(',') || []

  console.log('Processed filters:', { bestFor, materials })

  const transformedProducts = await getProducts(
    await Promise.resolve(params.category),
    await Promise.resolve(searchParams.type),
    bestFor,
    materials
  )

  return (
    <main className='px-16 py-10 flex'>
      <aside className='flex flex-col w-1/5'>
        <Breadcrumbs />
        <TitleCategories />
        <div className='mt-5 mb-4 font-bold'>Filter By:</div>
        <hr />
        <SizeSelector />
        <hr />
        <BestForSelector />
        <hr />
        <MaterialSelector />
        <hr />
        <ColorSelector />
      </aside>
      <div className='w-4/5 flex flex-col'>
        <div className='flex justify-end'>
          <SwitchButton />
        </div>
        <ProductsList
          initialProducts={transformedProducts}
          category={params.category}
        />
      </div>
    </main>
  )
}
