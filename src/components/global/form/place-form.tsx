'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from './submit-button'
import { addPlace, updatePlace } from '@/server/actions/place.actions'
import { Textarea } from '@/components/ui/textarea'
import { SelectCategory } from './select-category'
import ImageUpload from './image-upload'
import { type Place } from '@prisma/client'
import { useJsApiLoader } from '@react-google-maps/api'
import { env } from '@/env'

interface Props {
  isCreate: boolean
  data?: Place
  id?: string
}

function PlaceForm({ isCreate, data, id }: Props) {
  const [placeResult, setPlaceResult] = useState<{ lat?: number; lng?: number; placeId?: string }>()
  const [error, action, loading] = useFormState(isCreate ? addPlace.bind(null, placeResult!) : updatePlace.bind(null, id!), {})
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries: ['places']
  })
  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null)
  const autocompleteRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (isLoaded) {
      const newAutoComplete = new google.maps.places.Autocomplete(autocompleteRef.current as unknown as HTMLInputElement, {
        componentRestrictions: { country: 'my' },
        fields: ['formatted_address', 'geometry', 'place_id']
      })
      setAutoComplete(newAutoComplete)
    }
  }, [isLoaded])

  useEffect(() => {
    if (autoComplete) {
      autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace()
        const lat = place.geometry?.location?.lat()
        const lng = place.geometry?.location?.lng()
        const placeId = place.place_id

        setPlaceResult({
          lat,
          lng,
          placeId
        })
      })
    }
  }, [autoComplete])

  return (
    <form action={action} className="grid grid-cols-2 gap-5">
      <div className="col-span-2 space-y-2 md:col-span-1">
        <Label htmlFor="title">Place Title</Label>
        <div>
          <Input
            className={error?.title ? 'border-destructive' : ''}
            type="text"
            id="title"
            name="title"
            defaultValue={data?.title}
            disabled={loading}
          />
          {error?.title && <div className="text-sm text-destructive">{error.title}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2 md:col-span-1">
        <Label htmlFor="categorySlug">Place Category</Label>
        <div>
          <SelectCategory
            className={error?.categorySlug ? 'border-destructive' : ''}
            id="categorySlug"
            name="categorySlug"
            defaultValue={data?.categorySlug ?? undefined}
          />
          {error?.categorySlug && <div className="text-sm text-destructive">{error.categorySlug}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="description">Place Description</Label>
        <div>
          <Textarea className={error?.description ? 'border-destructive' : ''} id="description" name="description" defaultValue={data?.description} />
          {error?.description && <div className="text-sm text-destructive">{error.description}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="address">Address</Label>
        <div>
          <Textarea
            ref={autocompleteRef}
            className={error?.address ? 'border-destructive' : ''}
            id="address"
            name="address"
            defaultValue={data?.address}
          />
          {error?.address && <div className="text-sm text-destructive">{error.address}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <div>
          <ImageUpload id="thumbnail" name="thumbnail" defaultValue={data?.thumbnail} />
          {error?.thumbnail && <div className="text-sm text-destructive">{error.thumbnail}</div>}
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="submitBy">Submitter Email</Label>
        <div>
          <Input type="email" id="submitBy" name="submitBy" defaultValue={data?.submitBy ?? undefined} />
        </div>
      </div>
      <SubmitButton className="col-span-2 w-full sm:w-20" title={isCreate ? 'Save' : 'Update'} />
    </form>
  )
}

export default PlaceForm
