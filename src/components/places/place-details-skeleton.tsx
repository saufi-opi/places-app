import React from 'react'
import { Skeleton } from '../ui/skeleton'

function PlaceDetailsSkeleton() {
  return (
    <div className="container grid gap-8 px-4 md:grid-cols-2 md:px-6 lg:gap-12">
      <div>
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4 rounded-md" />
        <div className="grid gap-2">
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div>
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-40 rounded-md" />
            </div>
          </div>
        </div>
        <Skeleton className="h-24 w-full rounded-md" />
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div>
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-48 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div>
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-4 w-36 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceDetailsSkeleton
