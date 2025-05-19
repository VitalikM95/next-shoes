import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mt-4">
          Page not found
        </h2>
        <p className="text-gray-500 mt-2 mb-6">
          Sorry, but the page you are looking for does not exist.
        </p>
        <Button>
          <Link href="/">Go to the main page</Link>
        </Button>
      </div>
    </div>
  )
}
