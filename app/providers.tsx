'use client'

import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import ClientInit from './client-init'

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ClientInit />
      {children}
      <NextTopLoader
        color="#000"
        initialPosition={0.08}
        height={3}
        crawl={true}
        crawlSpeed={200}
        speed={200}
        easing="ease"
        showSpinner={false}
      />
    </SessionProvider>
  )
}
