import React from 'react'
import FilterCheckbox from '../global/filter-components/filter-checkbox'
import FilterRadius from '../global/filter-components/filter-radius'

function PlacesFilter() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1">
      <div className="space-y-2">
        <p className="font-medium">Categories</p>
        <FilterCheckbox label="category 1" value="category-1" paramKey="categories" />
        <FilterCheckbox label="category 2" value="category-2" paramKey="categories" />
        <FilterCheckbox label="category 3" value="category-3" paramKey="categories" />
        <FilterCheckbox label="category 4" value="category-4" paramKey="categories" />
      </div>
      <div className="space-y-2">
        <p className="font-medium">Activities</p>
        <FilterCheckbox label="activity 1" value="activity-1" paramKey="activities" />
        <FilterCheckbox label="activity 2" value="activity-2" paramKey="activities" />
        <FilterCheckbox label="activity 3" value="activity-3" paramKey="activities" />
        <FilterCheckbox label="activity 4" value="activity-4" paramKey="activities" />
      </div>
      <div className="space-y-2">
        <p className="font-medium">Radius</p>
        <div className="w-[80%]">
          <FilterRadius />
        </div>
      </div>
    </div>
  )
}

export default PlacesFilter
