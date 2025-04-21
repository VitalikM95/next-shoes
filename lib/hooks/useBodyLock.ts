'use client'
import { useEffect } from 'react'

export function useBodyLock(active: boolean) {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '15px'
    } else {
      document.body.style.overflow = 'visible'
      document.body.style.paddingRight = '0px'
    }

    return () => {
      document.body.style.overflow = 'visible'
      document.body.style.paddingRight = '0px'
    }
  }, [active])
}
