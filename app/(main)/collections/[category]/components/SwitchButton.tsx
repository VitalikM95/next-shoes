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
      className='border border-gray-500 rounded-none pt-[2px] pb-[3px] pr-[2px] pl-[3px]'
      value={currentCategory}
      onValueChange={handleValueChange}
    >
      <RadioGroupItemSwitch value='woman' label='WOMEN' />
      <RadioGroupItemSwitch value='man' label='MEN' />
    </RadioGroupCustom>
  )
}

export { SwitchButton }
