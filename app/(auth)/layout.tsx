import Link from 'next/link'
import { Home } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md relative">
        <div className="absolute top-0 left-8 -mt-16 mb-4">
          <Button variant="outline" asChild>
            <Link href="/">
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}
