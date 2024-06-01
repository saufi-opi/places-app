import PlaceForm from '@/components/global/form/place-form'
import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import { getPlaceById } from '@/server/actions/place.actions'
import { notFound } from 'next/navigation'

interface PlaceParams {
  id: string
}

interface Props {
  params: PlaceParams
}

async function PlaceDetailsPage({ params }: Props) {
  const isCreate = params.id === 'new'
  let data
  if (!isCreate) {
    data = await getPlaceById(params.id)
    if (!data) return notFound()
  }

  return (
    <MaxWidthWrapper className="space-y-8 py-20">
      <h1 className="mb-6 text-2xl font-bold">{isCreate ? 'New' : 'Edit'} Category</h1>
      <PlaceForm isCreate={isCreate} data={data} id={data?.id} />
    </MaxWidthWrapper>
  )
}

export default PlaceDetailsPage
