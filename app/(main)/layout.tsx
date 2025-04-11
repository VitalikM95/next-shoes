import type { Metadata } from 'next'
import { TheHeader } from '@/components/layout/TheHeader'
import { TheFooter } from '@/components/layout/TheFooter'
import { CartDrawer } from '@/components/layout/CartDrawer'

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <TheHeader />
      <main>{children}</main>
      <TheFooter />
      <CartDrawer />
    </div>
  )
}
