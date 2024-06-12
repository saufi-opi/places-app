import Search from '@/components/global/filter-components/search'
import Loading from '@/components/global/loading-spinner'
import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import PlacesTable from '@/components/global/table/place-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { Suspense } from 'react'

export interface PlaceSearchParams {
  page?: string
  pageSize?: string
  search?: string
}

interface Props {
  searchParams: PlaceSearchParams
}

function AdminPlacePage({ searchParams }: Props) {
  return (
    <MaxWidthWrapper className="space-y-8 py-20">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Places</h1>
        <Link href="/admin/place/new">
          <Button>Add Place</Button>
        </Link>
      </div>
      <Search />
      <Suspense fallback={<Loading className="flex items-center justify-center" />} key={JSON.stringify(searchParams)}>
        <PlacesTable searchParams={searchParams} />
      </Suspense>
    </MaxWidthWrapper>
  )
}

export default AdminPlacePage
