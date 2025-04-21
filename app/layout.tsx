import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ClientInit from './client-init'

export const metadata: Metadata = {
  title: 'Next Shoes',
  description: 'Created as a test project',
}

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={ubuntu.className} lang='en'>
      <head>
        <link data-rh='true' rel='icon' href='/logo.svg' />
      </head>
      <body>
        <ClientInit />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
