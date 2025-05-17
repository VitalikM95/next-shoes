import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'

import { TheHeader } from '@/components/layout/TheHeader'
import { TheFooter } from '@/components/layout/TheFooter'
import { CartDrawer } from '@/components/cart/CartDrawer'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${ubuntu.className} w-full`}>
      <TheHeader />
      <main>{children}</main>
      <TheFooter />
      <CartDrawer />
    </div>
  )
}
