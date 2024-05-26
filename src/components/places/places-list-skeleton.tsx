import React from 'react'
import { Skeleton } from '../ui/skeleton'

const data = [1, 2, 3, 4, 5, 6]

function PlacesListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {data.map((d) => (
        <div className="relative overflow-hidden rounded-lg" key={d}>
          <Skeleton className="h-[300px] min-w-[450px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent p-4">
            <div className="flex h-full flex-col justify-end space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlacesListSkeleton
