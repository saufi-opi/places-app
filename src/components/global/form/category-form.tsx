'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addcategory } from '@/server/actions/category.actions'
import React from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from './submit-button'

function CategoryForm() {
  const [error, action] = useFormState(addcategory, {})

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="name">Category Name</Label>
        <div>
          <Input className={error?.name ? 'border-destructive' : ''} type="text" id="name" name="name" />
          {error?.name && <div className="text-sm text-destructive">{error.name}</div>}
        </div>
      </div>
      <SubmitButton title="Save" />
    </form>
  )
}

export default CategoryForm
