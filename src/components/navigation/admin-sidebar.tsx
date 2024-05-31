'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Navlink from './navlink'
import { Button } from '../ui/button'
import { MenuIcon, XIcon } from 'lucide-react'

function AdminSidebar() {
  const [open, setOpen] = useState(false)

  const menus = [
    {
      title: 'Categories',
      href: '/admin/category'
    },
    {
      title: 'Places',
      href: '/admin/place'
    }
  ]

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        className="fixed m-5"
        variant="ghost"
      >
        <MenuIcon />
      </Button>
      <div className={`absolute z-40 min-h-full w-64 border-r bg-zinc-100 transition-all duration-300 ${open ? 'left-0' : '-left-64'}`}>
        <div className="flex items-center justify-between p-5">
          <div className="text-xl font-bold">
            <Link href="/">
              Let&apos;s<span className="text-primary">Jom</span>
            </Link>
          </div>
          <Button
            onClick={() => {
              setOpen(false)
            }}
            variant="ghost"
          >
            <XIcon />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 px-4 py-4">
          {menus.map((menu) => (
            <li className="list-none" key={menu.href} onClick={() => setOpen(false)}>
              <Navlink href={menu.href} title={menu.title} />
            </li>
          ))}
        </nav>
      </div>
    </>
  )
}

export default AdminSidebar
