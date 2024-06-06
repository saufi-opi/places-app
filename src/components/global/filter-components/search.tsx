'use client'

import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '../../ui/input'

function Search() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = new URLSearchParams(searchParams)
  const initialValue = params.get('search') ?? ''

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
      <Input className="pl-10" placeholder="Search..." type="search" onChange={(e) => handleSearch(e.target.value)} defaultValue={initialValue} />
    </div>
  )
}

export default Search
