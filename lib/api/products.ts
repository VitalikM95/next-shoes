import useSWR from 'swr'
import { Product } from '@/types/product.types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useProducts = (male: 'man' | 'woman', initialData?: Product[]) => {
  const { data, error, isLoading } = useSWR(
    `/api/products?male=${male}`,
    fetcher,
    {
      fallbackData: initialData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    products: data,
    isLoading,
    isError: error,
  }
}
