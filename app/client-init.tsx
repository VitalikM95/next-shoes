'use client'

import { useEffect } from 'react'

const ClientInit = () => {
  useEffect(() => {
    // Очищення кешу продуктів
    const cleanLocalStorage = () => {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('products_')) {
          const cached = localStorage.getItem(key)
          if (cached) {
            const { timestamp } = JSON.parse(cached)
            if (Date.now() - timestamp > 3600000 * 6) {
              // 6 годин
              localStorage.removeItem(key)
            }
          }
        }
      })
    }

    // Очищуємо localStorage при першому рендері
    cleanLocalStorage()

    // Очищуємо кожні 6 годин
    const interval = setInterval(cleanLocalStorage, 3600000 * 6)

    // Очищення інтервалу при демонтовані компонента
    return () => {
      clearInterval(interval)
    }
  }, [])

  return null
}

export default ClientInit
