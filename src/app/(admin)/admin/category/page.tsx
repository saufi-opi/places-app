import Search from '@/components/global/filter-components/search'
import Loading from '@/components/global/loading-spinner'
import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import CategoriesTable from '@/components/global/table/category-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { Suspense } from 'react'

export interface CategorySearchParams {
  page?: string
  pageSize?: string
  search?: string
}

interface Props {
  searchParams: CategorySearchParams
}

function AdminCategorypage({ searchParams }: Props) {
  return (
    <MaxWidthWrapper className="space-y-8 py-20">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/admin/category/new">
          <Button>Add Category</Button>
        </Link>
      </div>
      <Search />
      <Suspense fallback={<Loading className="flex items-center justify-center" />} key={JSON.stringify(searchParams)}>
        <CategoriesTable searchParams={searchParams} />
      </Suspense>
    </MaxWidthWrapper>
  )
}

export default AdminCategorypage
