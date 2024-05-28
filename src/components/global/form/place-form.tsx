'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from './submit-button'
import { addPlace } from '@/server/actions/place.actions'
import { Textarea } from '@/components/ui/textarea'
import { SelectCategory } from './select-category'

function PlaceForm() {
  const [error, action] = useFormState(addPlace, {})

  return (
    <form action={action} className="grid grid-cols-2 gap-5">
      <div className="col-span-2 space-y-2 md:col-span-1">
        <Label htmlFor="title">Place Title</Label>
        <div>
          <Input className={error?.title ? 'border-destructive' : ''} type="text" id="title" name="title" />
          {error?.title && <div className="text-sm text-destructive">{error.title}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2 md:col-span-1">
        <Label htmlFor="categorySlug">Place Category</Label>
        <div>
          <SelectCategory className={error?.categorySlug ? 'border-destructive' : ''} id="categorySlug" name="categorySlug" />
          {error?.categorySlug && <div className="text-sm text-destructive">{error.categorySlug}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="description">Place Description</Label>
        <div>
          <Textarea className={error?.description ? 'border-destructive' : ''} id="description" name="description" />
          {error?.description && <div className="text-sm text-destructive">{error.description}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="address">Address</Label>
        <div>
          <Textarea className={error?.address ? 'border-destructive' : ''} id="address" name="address" />
          {error?.address && <div className="text-sm text-destructive">{error.address}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="googleMap">Google Map Link</Label>
        <div>
          <Input className={error?.googleMap ? 'border-destructive' : ''} type="text" id="googleMap" name="googleMap" />
          {error?.googleMap && <div className="text-sm text-destructive">{error.googleMap}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <div>
          <Input type="file" accept="image/*" id="thumbnail" name="thumbnail" />
          {error?.thumbnail && <div className="text-sm text-destructive">{error.thumbnail}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="submitBy">Submitter Email</Label>
        <div>
          <Input type="email" id="submitBy" name="submitBy" />
        </div>
      </div>
      <SubmitButton className="col-span-2 w-full sm:w-20" title="Save" />
    </form>
  )
}

export default PlaceForm
