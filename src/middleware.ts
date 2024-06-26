import { getToken } from 'next-auth/jwt'
import { type NextRequest, NextResponse } from 'next/server'
import { env } from './env'

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (path === '/') {
    return NextResponse.next()
  }

  const session = await getToken({
    req,
    secret: env.NEXTAUTH_SECRET,
    cookieName: env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'
  })

  const isAdmin = session?.email === env.ADMIN_EMAIL

  const isProtected = path.startsWith('/admin') && path !== '/admin/login'

  if (!isAdmin && isProtected) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  } else if (isAdmin && path === '/admin/login') {
    return NextResponse.redirect(new URL('/admin/category', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
