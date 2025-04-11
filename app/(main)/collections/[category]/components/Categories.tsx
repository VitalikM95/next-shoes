'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { CheckboxRound } from '@/components/ui/checkbox-custom'
import { HUE, TITLES } from '@/lib/constants'

const useSlug = () => usePathname().split('/').pop() as keyof typeof HUE

const TitleCategories = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = useSlug()
  const categories = TITLES[slug] || []
  const [currentTitle, setCurrentTitle] = useState(
    slug === 'man'
      ? "Men's Shoes"
      : slug === 'woman'
      ? "Women's Shoes"
      : 'Shoes'
  )

  useEffect(() => {
    const type = searchParams.get('type')
    if (!type) {
      setCurrentTitle(
        slug === 'man'
          ? "Men's Shoes"
          : slug === 'woman'
          ? "Women's Shoes"
          : 'Shoes'
      )
    }
  }, [searchParams, slug])

  const handleCategoryClick = (category: string) => {
    setCurrentTitle(category)
    router.push(`/collections/${slug}?type=${category}`)
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

const ColorCategories = () => {
  const colors = HUE[useSlug()] || []

  return (
    <div className='flex flex-col gap-3 mb-4'>
      {colors.map(({ text, color }, i) => (
        <CheckboxRound key={i} label={text} color={color} />
      ))}
    </div>
  )
}

export { TitleCategories, ColorCategories }
