'use client'

import { useSyncFiltersFromURL } from '@/lib/hooks/useSyncFiltersFromURL'

export const SyncFiltersClient = () => {
  useSyncFiltersFromURL()
  return null
}
