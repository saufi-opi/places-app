import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'
import React from 'react'

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={cn('', className)}>
      <LoaderIcon className="animate-spin" />
    </div>
  )
}
