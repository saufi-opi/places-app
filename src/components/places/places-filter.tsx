import React from 'react'
import FilterCheckbox from '../global/filter-components/filter-checkbox'
import FilterRadius from '../global/filter-components/filter-radius'
import { db } from '@/server/db'

async function PlacesFilter() {
  const categories = await db.category.findMany({})

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1">
      <div className="space-y-2">
        <p className="font-medium">Categories</p>
        {categories.map((category) => (
          <FilterCheckbox key={category.slug} label={category.name} value={category.slug} paramKey="categories" />
        ))}
      </div>
      {/* <div className="space-y-2">
        <p className="font-medium">Activities</p>
        <FilterCheckbox label="activity 1" value="activity-1" paramKey="activities" />
        <FilterCheckbox label="activity 2" value="activity-2" paramKey="activities" />
        <FilterCheckbox label="activity 3" value="activity-3" paramKey="activities" />
        <FilterCheckbox label="activity 4" value="activity-4" paramKey="activities" />
      </div> */}
      <div className="space-y-2">
        <p className="font-medium">Radius</p>
        <div>
          <FilterRadius />
        </div>
      </div>
    </div>
  )
}

export default PlacesFilter
