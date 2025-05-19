'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'
import { Breadcrumbs } from './BreadCrumbs'
import { useBodyLock } from '@/lib/hooks/useBodyLock'
import {
  BestForSelector,
  ColorSelector,
  MaterialSelector,
  SizeSelector,
  TitleCategories,
} from './Filters'
import ClearFiltersButton from '@/components/shared/ClearFiltersButton'

const MobileFiltersDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useBodyLock(isOpen && mounted)

  const FiltersContent = () => (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <span className="mb-4 mt-5 font-bold">Filter By:</span>
        <ClearFiltersButton />
      </div>
      <hr />
      {isOpen && mounted && (
        <>
          <SizeSelector />
          <hr />
          <BestForSelector />
          <hr />
          <MaterialSelector />
          <hr />
          <ColorSelector />
        </>
      )}
    </>
  )

  const closeDrawer = () => setIsOpen(false)

  if (!mounted) return null

  return (
    <>
      <div className="flex w-full justify-between">
        <Breadcrumbs />
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
      <div
        className={`${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        } fixed left-0 top-0 z-30 h-screen w-screen bg-black/60 transition-all duration-300 ease-out`}
        onClick={closeDrawer}
      >
        <div
          className={`${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed left-0 top-0 h-screen w-[375px] transform bg-white shadow-lg transition-transform duration-300 ease-out`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex h-full flex-col">
            <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b bg-white py-2 px-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button
                variant="outline"
                size="icon"
                className="rounded-none border-2 border-transparent bg-white shadow-none hover:bg-black hover:text-white"
                onClick={closeDrawer}
              >
                <X strokeWidth={1} className="!h-7 !w-7" />
              </Button>
            </div>
            <div className="flex flex-grow flex-col overflow-y-auto overflow-x-hidden p-4">
              <TitleCategories />
              <FiltersContent />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileFiltersDrawer
