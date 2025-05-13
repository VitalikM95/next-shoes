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
import { Trash2 } from 'lucide-react'

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
    <aside className="flex w-1/5 flex-col">
      <Breadcrumbs />
      <TitleCategories />
      <div className="flex items-center justify-between">
        <span className="mb-4 mt-5 font-bold">Filter By:</span>
        <Button
          variant="destructive"
          onClick={() => handleResetFilters(lastSegment)}
        >
          Clear All
          <Trash2 className="h-4 w-4" />
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
