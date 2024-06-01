import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import MyPagination from '../pagination'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import DeleteDropDownMenuItem from '../delete-dropdown-menu-item'
import { type PlaceSearchParams } from '@/app/(admin)/admin/place/page'
import { deletePlace, getPlaces } from '@/server/actions/place.actions'
import Image from 'next/image'

interface Props {
  searchParams: PlaceSearchParams
}

async function PlacesTable({ searchParams }: Props) {
  // Set default values if they are undefined
  let page = parseInt(searchParams.page ?? '1', 10)
  if (page < 1) page = 1
  const pageSize = parseInt(searchParams.pageSize ?? '10', 10)
  const search = searchParams.search ?? ''

  // Fetch data and count from the database
  const { data: places, totalPages, counts } = await getPlaces({ page, pageSize, search })

  return (
    <>
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Category</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {places.map((place) => (
              <TableRow key={place.id}>
                <TableCell className="font-medium">{place.title}</TableCell>
                <TableCell className="font-medium">
                  <Image className="h-14 w-auto" alt="thumbnail" src={place.thumbnail} width={200} height={200} />
                </TableCell>
                <TableCell className="font-medium">{place.address}</TableCell>
                <TableCell className="font-medium">{place.category?.name ?? 'Uncategorized'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link href={`/admin/place/${place.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DeleteDropDownMenuItem id={place.id} action={deletePlace} />
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
          Showing {places.length} of {counts} result(s)
        </p>
      </div>
    </>
  )
}

export default PlacesTable
