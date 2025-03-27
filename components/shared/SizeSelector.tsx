'use client'

import { usePathname } from 'next/navigation'
import { CheckboxSquare } from '@/components/ui/checkbox-custom'
import { SIZE_RANGES } from '@/lib/constants'

const SizeSelector = () => {
  const category = usePathname().includes('/man') ? 'man' : 'woman'

  return (
    <div className="flex flex-wrap gap-2 pr-8 mb-4">
      {SIZE_RANGES[category].map((size) => (
        <CheckboxSquare key={size} labelTop="EU" labelBottom={size.toString()} />
      ))}
    </div>
  )
}

export { SizeSelector }
