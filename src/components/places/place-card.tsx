import { type Place } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  place: Place
}

function PlaceCard({ place }: Props) {
  return (
    <Link className="group relative cursor-pointer overflow-hidden rounded-lg" href={`/explore/${place.id}`}>
      <Image
        alt={place.title}
        className="aspect-[600/400] h-[300px] w-full object-cover transition-all duration-300 group-hover:scale-105"
        height="400"
        src={place.thumbnail}
        width="600"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent p-4 transition-all duration-300 group-hover:from-gray-900/60">
        <div className="flex h-full flex-col justify-end">
          <h3 className="text-xl font-bold text-white">{place.title}</h3>
          <p className="place_card_description text-sm text-gray-300">{place.description}</p>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCard
