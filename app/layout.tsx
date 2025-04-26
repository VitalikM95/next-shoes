import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import ClientInit from './client-init'

export const metadata: Metadata = {
  title: 'Next Shoes',
  description: 'Created as a test project',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
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
