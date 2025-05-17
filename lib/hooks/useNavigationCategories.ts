import { TITLES } from '@/lib/constants'

type Gender = 'man' | 'woman'

export const useNavigationCategories = () => {
  const getCategories = (gender: Gender) => {
    const categories = TITLES[gender] || []
    const basePath = `/collections/${gender}`
    const saleLabel = gender === 'man' ? "Men's Sale" : "Women's Sale"

    return {
      basePath,
      categories,
      sale: {
        label: 'Sale',
        href: `${basePath}?type=${encodeURIComponent(saleLabel)}`,
      },
    }
  }

  return { getCategories }
}
