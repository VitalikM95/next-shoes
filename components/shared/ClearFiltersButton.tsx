'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useFiltersStore } from '@/lib/store/filters-store'

const ClearFiltersButton = () => {
  const pathname = usePathname()
  const router = useRouter()
  const segments = pathname.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]

  const resetFilters = useFiltersStore(state => state.resetFilters)

  const handleResetFilters = () => {
    resetFilters()

    router.push(`/collections/${lastSegment}`, { scroll: false })
  }

  return (
    <Button variant="destructive" onClick={handleResetFilters}>
      Clear All
      <Trash2 className="ml-1 h-4 w-4" />
    </Button>
  )
}

export default ClearFiltersButton
