'use client'

import { useEffect } from 'react'

/**
 * Component that initializes client-side functionality
 * - Cleans local storage from old cached data
 * - Runs every 6 hours to maintain clean storage
 */
const ClientInit = () => {
  useEffect(() => {
    const cleanLocalStorage = () => {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('products_')) {
          const cached = localStorage.getItem(key)
          if (cached) {
            const { timestamp } = JSON.parse(cached)
            const sixHoursInMs = 3600000 * 6 // 6 hours

            if (Date.now() - timestamp > sixHoursInMs) {
              localStorage.removeItem(key)
            }
          }
        }
      })
    }
    cleanLocalStorage()
    const sixHoursInMs = 3600000 * 6
    const interval = setInterval(cleanLocalStorage, sixHoursInMs)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return null
}

export default ClientInit
