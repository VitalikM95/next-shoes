import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Перевірка ролі користувача
    const token = req.nextauth.token
    const isAdmin = token?.role === 'admin'

    // Захист адмін роутів
    if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

// Захищені роути
export const config = {
  matcher: ['/profile/:path*', '/admin/:path*', '/api/protected/:path*'],
}
