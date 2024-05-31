import React from 'react'
import PlaceCard from './place-card'
import { type PlacesSearchParams } from '@/app/(home)/explore/page'
import MyPagination from '../global/pagination'
import { getPlaces } from '@/server/actions/place.actions'

interface Props {
  searchParams: PlacesSearchParams
}

// TODO: add activities filter
async function PlacesList({ searchParams }: Props) {
  // Set default values if they are undefined
  let page = parseInt(searchParams.page ?? '1', 10)
  if (page < 1) page = 1
  const pageSize = parseInt(searchParams.pageSize ?? '9', 10)
  const search = searchParams.search ?? ''
  const categories = searchParams.categories?.split(',') ?? []

  // Fetch data and count from the database
  const { data, totalPages } = await getPlaces({ page, pageSize, categories, search })

  if (data.length === 0) {
    return <h2 className="text-xl font-bold text-zinc-400">0 places found...</h2>
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {data.map((d) => (
          <PlaceCard key={d.id} place={d} />
        ))}
      </div>
      <MyPagination page={page} totalPages={totalPages} />
    </>
  )
}

export default PlacesList
