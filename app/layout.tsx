import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Next Shoes',
    default: 'Next Shoes',
  },
  description: 'Comfortable shoe store with a wide range of products',
  keywords: ['shoes', 'store', 'sneakers', 'online shopping'],
  authors: [{ name: 'Next Shoes Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
