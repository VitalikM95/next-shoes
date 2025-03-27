'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { RadioGroupCustom, RadioGroupItemSwitch } from '@/components/ui/radio-group-custom'

const SwitchButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const initialCategory = pathname.includes('/woman') ? 'woman' : 'man'
  const [selectedCategory, setSelectedCategory] = useState<'man' | 'woman'>(initialCategory)

  useEffect(() => {
    if (pathname !== `/collections/${selectedCategory}`) {
      router.push(`/collections/${selectedCategory}`)
    }
  }, [selectedCategory, router, pathname])

  return (
    <RadioGroupCustom
      className="border border-gray-500 rounded-none pt-[2px] pb-[3px] pr-[2px] pl-[3px]"
      value={selectedCategory}
      onValueChange={(value) => setSelectedCategory(value as 'man' | 'woman')}
    >
      <RadioGroupItemSwitch value="woman" label="WOMEN" />
      <RadioGroupItemSwitch value="man" label="MEN" />
    </RadioGroupCustom>
  )
}

export { SwitchButton }
