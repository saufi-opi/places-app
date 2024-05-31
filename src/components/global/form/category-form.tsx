'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addCategory, updateCategory } from '@/server/actions/category.actions'
import React from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from './submit-button'
import { type Category } from '@prisma/client'

interface Props {
  isCreate: boolean
  data?: Category
  slug?: string
}

function CategoryForm({ isCreate, data, slug }: Props) {
  const [error, action] = useFormState(isCreate ? addCategory : updateCategory.bind(null, slug!), {})

  return (
    <form action={action} className="grid grid-cols-2 space-y-4">
      {!isCreate && (
        <div className="col-span-2 max-w-full space-y-4 md:max-w-[50%]">
          <Label htmlFor="name">Category Slug</Label>
          <div>
            <Input type="text" id="slug" name="slug" defaultValue={data?.slug} disabled />
          </div>
        </div>
      )}
      <div className="col-span-2 space-y-2 md:col-span-1">
        <Label htmlFor="name">Category Name</Label>
        <div>
          <Input className={error?.name ? 'border-destructive' : ''} type="text" id="name" name="name" defaultValue={data?.name} />
          {error?.name && <div className="text-sm text-destructive">{error.name}</div>}
        </div>
      </div>
      <SubmitButton className="col-span-2 w-full sm:w-20" title={isCreate ? 'Save' : 'Update'} />
    </form>
  )
}

export default CategoryForm
