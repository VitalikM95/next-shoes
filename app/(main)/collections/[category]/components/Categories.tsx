'use client'

import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
  CheckboxRound,
  CheckboxSquare,
  CheckboxStandard,
} from '@/components/ui/checkbox-custom'
import { HUE, TITLES, SIZE_RANGES, BEST_FOR, MATERIAL } from '@/lib/constants'

type Gender = 'man' | 'woman'

const useCategory = () => {
  const pathname = usePathname()
  return pathname.split('/').pop() as Gender
}

const getTitle = (gender: Gender | null, type: string | null) => {
  if (type) return type
  return gender === 'man'
    ? "Men's Shoes"
    : gender === 'woman'
    ? "Women's Shoes"
    : 'Shoes'
}

const updateSearchParams = (
  searchParams: URLSearchParams,
  key: string,
  values: string[]
) => {
  const newParams = new URLSearchParams(searchParams)
  if (values.length > 0) {
    newParams.set(key, values.join(','))
  } else {
    newParams.delete(key)
  }
  return newParams
}

const TitleCategories = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = useCategory()
  const gender = category as Gender
  const type = searchParams.get('type')
  const currentTitle = getTitle(gender, type)
  const categories = TITLES[category] || []

  const handleCategoryClick = (category: string) => {
    router.push(`/collections/${gender}?type=${category}`)
  }

  return (
    <div className='flex flex-col'>
      <h2 className='text-2xl font-bold py-4'>{currentTitle}</h2>
      <ul>
        {categories.map(category => (
          <li
            key={category}
            className={`cursor-pointer hover:underline pb-1.5 ${
              category === currentTitle
                ? 'font-bold hover:no-underline cursor-text'
                : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}

const SelectorWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) => (
  <div className='flex flex-col gap-2 mb-4'>
    {title && <h3 className='uppercase font-bold my-5'>{title}</h3>}
    {children}
  </div>
)

const SizeSelector = () => {
  const category = useCategory() as Gender
  const sizes = SIZE_RANGES[category]

  return (
    <SelectorWrapper title='Sizes'>
      <p className='text-xs mb-4'>
        Most of our shoes only come in full sizes. If you're a half size, select
        your nearest whole size too.
      </p>
      <div className='flex flex-wrap gap-2 pr-8'>
        {sizes.map(size => (
          <CheckboxSquare
            key={size}
            labelTop='EU'
            labelBottom={size.toString()}
          />
        ))}
      </div>
    </SelectorWrapper>
  )
}

const ColorSelector = () => {
  const colors = HUE[useCategory()] || []

  return (
    <SelectorWrapper title='HUE'>
      {colors.map(({ text, color }, i) => (
        <CheckboxRound key={i} label={text} color={color} />
      ))}
    </SelectorWrapper>
  )
}

const BestForSelector = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = useCategory()
  const [selectedBestFor, setSelectedBestFor] = useState<string[]>(
    searchParams.get('bestFor')?.split(',') || []
  )

  const handleBestForChange = (value: string) => {
    const newSelected = selectedBestFor.includes(value)
      ? selectedBestFor.filter(item => item !== value)
      : [...selectedBestFor, value]

    setSelectedBestFor(newSelected)
    const newParams = updateSearchParams(searchParams, 'bestFor', newSelected)
    router.push(`/collections/${category}?${newParams.toString()}`)
  }

  return (
    <SelectorWrapper title='Best For'>
      {BEST_FOR.map((item, i) => (
        <CheckboxStandard
          key={i}
          label={item}
          checked={selectedBestFor.includes(item)}
          onCheckedChange={() => handleBestForChange(item)}
          name={`bestFor-${i}`}
          id={`bestFor-${i}`}
        />
      ))}
    </SelectorWrapper>
  )
}

const MaterialSelector = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = useCategory()
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    searchParams.get('materials')?.split(',') || []
  )

  const handleMaterialChange = (value: string) => {
    const newSelected = selectedMaterials.includes(value)
      ? selectedMaterials.filter(item => item !== value)
      : [...selectedMaterials, value]

    setSelectedMaterials(newSelected)
    const newParams = updateSearchParams(searchParams, 'materials', newSelected)
    router.push(`/collections/${category}?${newParams.toString()}`)
  }

  return (
    <SelectorWrapper title='Material'>
      {MATERIAL.map((item, i) => (
        <CheckboxStandard
          key={i}
          label={item}
          checked={selectedMaterials.includes(item)}
          onCheckedChange={() => handleMaterialChange(item)}
          name={`material-${i}`}
          id={`material-${i}`}
        />
      ))}
    </SelectorWrapper>
  )
}

export {
  TitleCategories,
  ColorSelector,
  SizeSelector,
  BestForSelector,
  MaterialSelector,
}
