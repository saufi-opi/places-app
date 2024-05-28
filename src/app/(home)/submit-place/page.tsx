import PlaceForm from '@/components/global/form/place-form'
import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import React from 'react'

function SubmitPlace() {
  return (
    <MaxWidthWrapper className="max-w-screen-md py-12">
      <h1>Submit A Place</h1>
      <PlaceForm />
    </MaxWidthWrapper>
  )
}

export default SubmitPlace
