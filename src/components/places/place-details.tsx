import { db } from '@/server/db'
import { LocateIcon, MapIcon, TagIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  placeId: string
}

async function PlaceDetails({ placeId }: Props) {
  const data = await db.place.findFirst({
    where: {
      id: placeId
    },
    include: {
      category: true
    }
  })

  if (!data) {
    return notFound()
  }

  return (
    <div className="container grid gap-8 px-4 md:grid-cols-2 md:px-6 lg:gap-12">
      <div>
        <Image alt="Place" className="aspect-[600/400] h-[400px] w-[600px] rounded-lg object-cover" src={data.thumbnail} height="400" width="600" />
      </div>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <div className="grid gap-2">
          <div className="flex items-center gap-4">
            <TagIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            <div>
              <h3 className="font-semibold">Category</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{data.category.name}</p>
            </div>
          </div>
          {/* <div className="flex items-center gap-4">
            <ActivityIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            <div>
              <h3 className="font-semibold">Activities</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Sightseeing, Culinary, Shopping</p>
            </div>
          </div> */}
        </div>
        <p className="text-zinc-500 dark:text-zinc-400">{data.description}</p>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <LocateIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            <div>
              <h3 className="font-semibold">Address</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{data.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            <div>
              <h3 className="font-semibold">Google Maps</h3>
              <Link className="text-zinc-500 underline dark:text-zinc-400" href={data.googleMap}>
                View on Google Maps
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceDetails
