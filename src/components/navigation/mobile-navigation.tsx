'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Menu, X } from 'lucide-react'
import AppMenu from './app-menu'

interface Props {
  className?: string
}

function Mobilenavigation({ className }: Props) {
  const [show, setShow] = useState<boolean>(false)

  const handleToggle = () => {
    setShow((prev) => !prev)
  }

  return (
    <>
      {/* {show && <div className="absolute top-0 z-40 h-screen w-screen bg-black/20 " onClick={handleToggle} />} */}
      <div className={cn('', className)}>
        <Button className={`left-5 top-5 z-50 ${show ? 'fixed' : 'absolute'}`} onClick={handleToggle} variant="outline">
          {show ? <X /> : <Menu />}
        </Button>
        <div
          className={`fixed left-0 top-0 z-40 h-screen w-3/4 max-w-xs transform bg-background shadow-lg transition-transform duration-300 ${
            show ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col items-center justify-center">
            <div className="space-y-5" onClick={handleToggle}>
              <AppMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mobilenavigation
