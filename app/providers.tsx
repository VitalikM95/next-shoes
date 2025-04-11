import React from 'react'
import NextTopLoader from 'nextjs-toploader'
// import { SessionProvider } from 'next-auth/react'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <NextTopLoader
        color='#000'
        initialPosition={0.08}
        height={3}
        crawl={true}
        crawlSpeed={200}
        speed={200}
        easing='ease'
        showSpinner={false}
      />
    </>
  )
}
