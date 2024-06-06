'use client'

import React, { useCallback, useEffect } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../ui/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  page: number
  totalPages: number
  offset?: number
}

const disabledStyle = 'pointer-events-none text-zinc-400'

function MyPagination(props: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const pageNumbers: number[] = []
  const offset = props.offset ?? 2
  for (let i = props.page - offset; i <= props.page + offset; i++) {
    if (i >= 1 && i <= props.totalPages) {
      pageNumbers.push(i)
    }
  }

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', page.toString())

      router.replace(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  useEffect(() => {
    if (props.page > 1 && props.page > props.totalPages) {
      handlePageChange(props.totalPages)
    }
  }, [props.totalPages, props.page, handlePageChange])

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className={props.page <= 1 ? disabledStyle : undefined} onClick={() => handlePageChange(props.page - 1)} />
        </PaginationItem>
        {props.page - offset > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink onClick={() => handlePageChange(page)} isActive={props.page === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {props.page + offset < props.totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext className={props.page >= props.totalPages ? disabledStyle : undefined} onClick={() => handlePageChange(props.page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default MyPagination
