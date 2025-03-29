'use client'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: '/',
        redirect: true,
      })
    } catch (error) {
      console.error('Помилка при виході:', error)
    }
  }

  return (
    <Button
      variant='default'
      className='font-bold min-w-36 border border-black'
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  )
}
