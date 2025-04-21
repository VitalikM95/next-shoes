'use client'

import {
  BestForSelector,
  ColorSelector,
  MaterialSelector,
  SizeSelector,
  TitleCategories,
} from './Filters'
import { Breadcrumbs } from './BreadCrumbs'
import { useSyncFiltersFromURL } from '@/lib/hooks/useSyncFiltersFromURL'

const FiltersPanel = () => {
  useSyncFiltersFromURL()

  return (
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
  )
}

export default FiltersPanel
