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
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'

const FiltersPanel = () => {
  useSyncFiltersFromURL()
  const pathname = usePathname() // дасть /collections/man
  const router = useRouter()
  const segments = pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1] // "man"
  const handleResetFilters = (category: string) => {
    router.push(`/collections/${category}`, { scroll: false })
  }

  return (
    <aside className='flex flex-col w-1/5'>
      <Breadcrumbs />
      <TitleCategories />
      <div className='flex justify-between items-center'>
        <span className='mt-5 mb-4 font-bold'>Filter By:</span>
        <Button
          variant='default'
          className='font-bold min-w-20 border border-red-800 hover:bg-red-800 text-red-800'
          onClick={() => handleResetFilters(lastSegment)}
        >
          Clear All
        </Button>
      </div>
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
