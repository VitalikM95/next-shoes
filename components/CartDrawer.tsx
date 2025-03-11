'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, X } from 'lucide-react'
import { useBodyLock } from '@/lib/hooks'

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)

  useBodyLock(isOpen)

  const handleCloseHistory = () => {
    setIsOpen(false)
  }
  return (
    <div
      className={` ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } h-screen w-screen bg-black/60 fixed top-0 z-30 left-0 transition-all duration-300 ease-out`}
      onClick={handleCloseHistory}
    >
      <div
        className={` ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transform top-0 right-0 fixed h-screen bg-white w-[375px] shadow-lg transition-transform duration-300 ease-out`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <div className="bg-white p-2 pr-10 fixed z-10 w-full flex items-center justify-between border-b">
            <Button
              variant="outline"
              size="icon"
              className="bg-white border-2 border-transparent shadow-none rounded-none hover:bg-black hover:text-white"
              onClick={handleCloseHistory}
            >
              <X strokeWidth={1} className="!h-7 !w-7" />
            </Button>
            <div className="bg-white relative">
              <ShoppingCart strokeWidth={1} className="!h-10 !w-10" />
              <span className="absolute left-[18px] top-[9px] z-50 text-sm font-bold">1</span>
            </div>
          </div>
          <div className="flex flex-col h-screen overflow-y-auto overflow-x-hidden text-7xl pt-20 gap-5 p-7">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores laborum suscipit natus
            beatae, mollitia blanditiis illo, minus libero sapiente obcaecati quae, rem fugiat velit
            omnis error quod cum similique. Error aut repellendus accusamus officiis doloremque
            repudiandae fuga delectus quaerat earum illum! Optio ducimus cumque modi ipsa provident
          </div>
        </div>
      </div>
    </div>
  )
}

export { CartDrawer }
