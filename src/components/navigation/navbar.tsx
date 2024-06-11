import React from 'react'
import AppMenu from './app-menu'
import MaxWidthWrapper from '../global/max-width-wrapper'
import { Button } from '../ui/button'
import Link from 'next/link'
import Mobilenavigation from './mobile-navigation'
import { getServerAuthSession } from '@/server/auth'
import { env } from '@/env'

async function Navbar() {
  const session = await getServerAuthSession()
  const isAdmin = session?.user.email === env.ADMIN_EMAIL

  return (
    <MaxWidthWrapper className="flex items-center justify-between">
      <div className="block md:hidden">
        <Mobilenavigation />
      </div>
      <div className="text-xl font-bold">
        <Link href="/">
          Let&apos;s<span className="text-primary">Jom</span>
        </Link>
      </div>
      <nav className="hidden gap-5 md:flex">
        <AppMenu />
      </nav>
      {isAdmin ? (
        <Link href="/admin/category">
          <Button>Admin</Button>
        </Link>
      ) : (
        <Link href="/submit-place">
          <Button>Submit Place</Button>
        </Link>
      )}
    </MaxWidthWrapper>
  )
}

export default Navbar
