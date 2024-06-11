'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

function AdminLogin() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 pt-56">
      <div className="text-4xl font-bold">
        Let&apos;s<span className="text-primary">Jom</span>
      </div>
      <h1 className="text-2xl">Admin Login</h1>
      <Button variant="outline" onClick={() => signIn('google')}>
        <Image className="mr-3" src="/login-google.png" alt="Google logo" width={20} height={20} />
        Sign in with Google
      </Button>
      <Link href="/">
        <Button>Home</Button>
      </Link>
    </div>
  )
}

export default AdminLogin
