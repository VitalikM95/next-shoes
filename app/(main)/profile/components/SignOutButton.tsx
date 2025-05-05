'use client'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: '/',
        redirect: true,
      })
    } catch (error) {
      console.error('Error on exit:', error)
    }
  }

  return (
    <Button variant='destructive' className='min-w-40' onClick={handleSignOut}>
      Sign Out
      <LogOut />
    </Button>
  )
}
