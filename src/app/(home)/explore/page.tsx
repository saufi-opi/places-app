import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import Search from '@/components/global/filter-components/search'
import PlacesFilter from '@/components/places/places-filter'
import PlacesList from '@/components/places/places-list'
import PlacesListSkeleton from '@/components/places/places-list-skeleton'
import React, { Suspense } from 'react'

export interface PlacesSearchParams {
  page?: string
  pageSize?: string
  search?: string
  categories?: string
  activities?: string
  radius?: string
}

interface Props {
  searchParams: PlacesSearchParams
}

function ExplorePage({ searchParams }: Props) {
  const key = JSON.stringify(searchParams)

  return (
    <MaxWidthWrapper className="my-20 flex flex-col gap-5 lg:flex-row">
      <div className="space-y-10 lg:w-1/3">
        <h2 className="text-xl font-bold">Filter Places</h2>
        <PlacesFilter />
      </div>
      <div className="grow space-y-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <h1 className="text-3xl font-bold">Discover Places</h1>
          <Search />
        </div>
        <Suspense fallback={<PlacesListSkeleton />} key={key}>
          <PlacesList searchParams={searchParams} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  )
}

export default ExplorePage
