import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { type CategorySearchParams } from '@/app/(admin)/admin/(dashboard)/category/page'
import { deleteCategory, getCategories } from '@/server/actions/category.actions'
import MyPagination from '../pagination'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import DeleteDropDownMenuItem from '../delete-dropdown-menu-item'

interface Props {
  searchParams: CategorySearchParams
}

async function CategoriesTable({ searchParams }: Props) {
  // Set default values if they are undefined
  let page = parseInt(searchParams.page ?? '1', 10)
  if (page < 1) page = 1
  const pageSize = parseInt(searchParams.pageSize ?? '10', 10)
  const search = searchParams.search ?? ''

  // Fetch data and count from the database
  const { data: categories, totalPages, counts } = await getCategories({ page, pageSize, search })

  return (
    <>
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category Slug</TableHead>
              <TableHead>Category name</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.slug}</TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href={`/admin/category/${category.slug}`}>
                        <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DeleteDropDownMenuItem id={category.slug} action={deleteCategory} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex">
        <MyPagination page={page} totalPages={totalPages} />
        <p className="text-sm text-zinc-500">
          Showing {categories.length} of {counts} result(s)
        </p>
      </div>
    </>
  )
}

export default CategoriesTable
