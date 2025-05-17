'use client'

import { useRouter, usePathname } from 'next/navigation'
import {
  RadioGroupCustom,
  RadioGroupItemSwitch,
} from '@/components/ui/radio-group-custom'

const SwitchButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const currentCategory = pathname.split('/').pop() as 'man' | 'woman'

  const handleValueChange = (value: string) => {
    const newPath = pathname.replace(/\/man|\/woman/, `/${value}`)
    router.push(newPath, { scroll: false })
  }

  return (
    <RadioGroupCustom
      className="rounded-none border border-gray-500 pb-[3px] pl-[3px] pr-[2px] pt-[2px] text-xs sm:text-sm"
      value={currentCategory}
      onValueChange={handleValueChange}
    >
      <RadioGroupItemSwitch value="woman" label="WOMEN" />
      <RadioGroupItemSwitch value="man" label="MEN" />
    </RadioGroupCustom>
  )
}

export { SwitchButton }
