import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

import { UserRole } from '@/types/auth.types'

interface AuthToken {
  role?: UserRole
  name?: string
  email?: string
  id?: string
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token as AuthToken | null
    const isAdmin = token?.role === 'ADMIN'

    if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
)

export const config = {
  matcher: ['/profile/:path*', '/admin/:path*', '/api/protected/:path*'],
}
