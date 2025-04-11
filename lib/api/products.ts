import useSWR from 'swr'
import { Product } from '@/types/product.types'

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()

    // Зберігаємо дані в localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `products_${url}`,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      )
    }

    return data
  } catch (error) {
    // Спробуємо отримати дані з localStorage при помилці
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(`products_${url}`)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        // Використовуємо кешовані дані, якщо вони не старіші за 1 годину
        if (Date.now() - timestamp < 3600000) {
          return data
        }
      }
    }
    throw error
  }
}

export const useProducts = (
  male: 'man' | 'woman',
  type?: string,
  initialData?: Product[]
) => {
  const query = [`male=${male}`]
  if (type) query.push(`type=${type}`)

  const url = `/api/products?${query.join('&')}`

  const { data, error, isLoading } = useSWR(url, fetcher, {
    fallbackData: initialData,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: true,
    revalidateOnMount: true,
    dedupingInterval: 10000, // 10 секунд
    refreshInterval: 300000, // 5 хвилин
    errorRetryCount: 3,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Не повторюємо запит при 404 помилці
      if (error.status === 404) return
      // Збільшуємо інтервал між спробами
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
