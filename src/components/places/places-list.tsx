import React from 'react'
import PlaceCard from './place-card'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

async function PlacesList() {
  // simulate fetching data
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {data.map((d) => (
        <PlaceCard key={d} />
      ))}
    </div>
  )
}

export default PlacesList
