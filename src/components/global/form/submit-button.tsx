'use client'

import { Button } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <LoaderIcon className="h-6 w-6 animate-spin" /> : title}
    </Button>
  )
}

export default SubmitButton
