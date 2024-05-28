'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton({ title, className }: { title: string; className?: string }) {
  const { pending } = useFormStatus()

  return (
    <Button className={cn('', className)} type="submit" disabled={pending}>
      {pending ? <LoaderIcon className="h-6 w-6 animate-spin" /> : title}
    </Button>
  )
}

export default SubmitButton
