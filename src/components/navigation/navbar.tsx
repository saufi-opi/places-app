import React from 'react'
import AppMenu from './app-menu'
import MaxWidthWrapper from '../global/max-width-wrapper'
import { Button } from '../ui/button'
import Link from 'next/link'

function Navbar() {
  return (
    <MaxWidthWrapper className="flex items-center justify-between">
      <div className="text-xl font-bold">
        Let&apos;s<span className="text-primary">Jom</span>
      </div>
      <nav className="hidden gap-5 md:flex">
        <AppMenu />
      </nav>
      <Link href="/submit-place">
        <Button>Submit Place</Button>
      </Link>
    </MaxWidthWrapper>
  )
}

export default Navbar
