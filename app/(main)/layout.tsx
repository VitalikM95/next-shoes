import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import { TheHeader } from '@/components/TheHeader'
import { TheFooter } from '@/components/TheFooter'
import '../globals.css'
import { CartDrawer } from '@/components/CartDrawer'

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Next Shoes',
  description: 'Created as a test project',
}

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={ubuntu.className}>
      <TheHeader />
      <main>{children}</main>
      <TheFooter />
      <CartDrawer />
    </div>
  )
}
