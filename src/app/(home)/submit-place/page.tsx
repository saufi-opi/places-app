import PlaceForm from '@/components/global/form/place-form'
import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import React from 'react'

function SubmitPlace() {
  return (
    <MaxWidthWrapper className="max-w-screen-md space-y-5 py-12">
      <h1 className="text-3xl font-bold">Submit A Place</h1>
      <PlaceForm />
    </MaxWidthWrapper>
  )
}

export default SubmitPlace
