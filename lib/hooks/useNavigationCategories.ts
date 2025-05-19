import { TITLES } from '@/lib/constants'
import { Gender, NavigationCategory } from '@/types/hook.types'

export const useNavigationCategories = () => {
  const getCategories = (gender: Gender): NavigationCategory => {
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
