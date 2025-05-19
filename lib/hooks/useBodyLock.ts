'use client'
import { useEffect } from 'react'

/**
 * Hook for locking body scroll when a modal is active
 * @param active Whether to lock the body scroll
 */
export function useBodyLock(active: boolean): void {
  useEffect(() => {
    const getScrollbarWidth = () => {
      return window.innerWidth - document.documentElement.clientWidth
    }

    if (active) {
      const scrollbarWidth = getScrollbarWidth()

      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [active])
}
