import useSWR from 'swr'
import { ProductListItem } from '@/types/product.types'
import { UseProductsSWRProps } from '@/types/hook.types'

const fetcher = (url: string) =>
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    })
    .then(data => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          `products_${url}`,
          JSON.stringify({
            data,
            timestamp: Date.now(),
          }),
        )
      }
      return data
    })
    .catch(error => {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(`products_${url}`)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < 3600000) {
            return data
          }
        }
      }
      throw error
    })

export const useProductsSWR = (
  male: string,
  initialData?: ProductListItem[],
  type?: string,
  bestFor?: string[],
  materials?: string[],
  colorType?: string[],
  sizes?: string[],
  shouldFetch: boolean = true,
): UseProductsSWRProps => {
  const query = [`male=${male}`]
  if (type) query.push(`type=${type}`)
  if (bestFor && bestFor.length > 0) query.push(`bestFor=${bestFor.join(',')}`)
  if (materials && materials.length > 0)
    query.push(`materials=${materials.join(',')}`)
  if (colorType && colorType.length > 0)
    query.push(`colorType=${colorType.join(',')}`)
  if (sizes && sizes.length > 0) query.push(`sizes=${sizes.join(',')}`)

  const url = `/api/products?${query.join('&')}`

  const { data, error, isLoading } = useSWR(shouldFetch ? url : null, fetcher, {
    fallbackData: initialData,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: true,
    dedupingInterval: 10000, // 10 seconds
    refreshInterval: 300000, // 5 minutes
    errorRetryCount: 3,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 404) return
      const timeout = Math.min(1000 * 2 ** retryCount, 30000)
      setTimeout(() => revalidate({ retryCount }), timeout)
    },
  })

  return {
    products: data,
    isLoading,
    isError: error,
  }
}
