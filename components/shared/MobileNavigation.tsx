'use client'

import { Menu } from 'lucide-react'
import { Button } from '../ui/button'
import { useState, useEffect } from 'react'
import { Navigation } from '../shared/Navigation'
import { useBodyLock } from '@/lib/hooks/useBodyLock'

export const MobileNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Перевіряємо, чи компонент змонтований
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Блокуємо прокрутку body коли мобільне меню відкрите
  useBodyLock(mobileMenuOpen && mounted)

  // Не рендеримо нічого до повного монтування компонента
  if (!mounted) return null

  return (
    <>
      {/* Мобільна кнопка меню */}
      <div className="block md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1"
        >
          <Menu className="!h-6 !w-6" />
        </Button>
      </div>

      {/* Мобільне меню з оверлеєм */}
      <div
        className={`${
          mobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        } fixed left-0 top-0 z-50 h-screen w-screen bg-black/60 transition-all duration-300 ease-out`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {/* Мобільне меню, що розкривається зверху */}
        <div
          className={`${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          } fixed left-0 top-0 z-50 w-full transform bg-white border-b border-gray-200 shadow-md transition-transform duration-300 ease-out md:hidden`}
          onClick={e => e.stopPropagation()}
        >
          <div className="w-full overflow-y-auto py-6 px-4">
            <Navigation isMobile={true} />
          </div>
        </div>
      </div>
    </>
  )
}
