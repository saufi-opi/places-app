'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  title: string
  href: string
}
function Navlink({ href, title }: Props) {
  const pathname = usePathname()

  return (
    <Link
      className={`hover:text-zinc-900 ${pathname === href ? 'text-zinc-900' : 'text-zinc-400'} transition-all duration-300 hover:scale-105`}
      href={href}
    >
      {title}
    </Link>
  )
}

export default Navlink
