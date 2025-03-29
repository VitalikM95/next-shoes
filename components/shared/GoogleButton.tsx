'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

const GoogleButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/profile'

  return (
    <Button
      className='w-full'
      onClick={() => signIn('google', { callbackUrl })}
    >
      Sign in with Google
    </Button>
  )
}

export { GoogleButton }
