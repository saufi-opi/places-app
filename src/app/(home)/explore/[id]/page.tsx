import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import PlaceDetails from '@/components/places/place-details'
import PlaceDetailsSkeleton from '@/components/places/place-details-skeleton'
import { Suspense } from 'react'

interface PlaceParams {
  id: string
}

interface Props {
  params: PlaceParams
}

function PlaceByIdPage({ params }: Props) {
  return (
    <MaxWidthWrapper className="py-12 md:py-24 lg:py-32">
      <Suspense fallback={<PlaceDetailsSkeleton />} key={params.id}>
        <PlaceDetails placeId={params.id} />
      </Suspense>
    </MaxWidthWrapper>
  )
}

export default PlaceByIdPage
