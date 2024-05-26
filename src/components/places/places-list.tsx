import React from 'react'
import PlaceCard from './place-card'
import { db } from '@/server/db'
import { type PlacesSearchParams } from '@/app/(home)/explore/page'
import MyPagination from '../global/pagination'

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

  // Calculate the number of items to skip
  const skip = (page - 1) * pageSize

  // Fetch data and count from the database
  const [data, counts] = await Promise.all([
    db.place.findMany({
      where: {
        title: {
          contains: search
        },
        categorySlug: {
          in: categories.length ? categories : undefined
        }
      },
      take: pageSize,
      skip
    }),
    db.place.count({
      where: {
        title: {
          contains: search
        },
        categorySlug: {
          in: categories.length ? categories : undefined
        }
      }
    })
  ])

  const totalPages = Math.ceil(counts / pageSize)

  return (
    <>
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {data.length ? data.map((d) => <PlaceCard key={d.id} place={d} />) : <p>No Results...</p>}
      </div>
      <MyPagination page={page} totalPages={totalPages} />
    </>
  )
}

export default PlacesList
