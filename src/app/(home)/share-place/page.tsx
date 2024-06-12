import PlaceForm from '@/components/global/form/place-form'
import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import React from 'react'

function SharePlacePage() {
  return (
    <MaxWidthWrapper className="max-w-screen-md space-y-5 py-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">New Place</h1>
        <h1 className="text-xl text-zinc-500">Share Your Favourite Place With Others!</h1>
      </div>
      <PlaceForm isCreate={true} />
    </MaxWidthWrapper>
  )
}

export default SharePlacePage
