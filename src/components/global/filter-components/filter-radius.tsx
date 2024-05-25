'use client'

import { useState } from 'react'
import { Slider } from '../../ui/slider'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

function FilterRadius() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = new URLSearchParams(searchParams)
  const radius = parseInt(params.get('radius') ?? '0')

  const [value, setValue] = useState<number>(radius)

  const handleChange = useDebouncedCallback((numbers: number[]) => {
    const newValue = numbers[0] ?? 0
    setValue(newValue)
    if (newValue) {
      params.set('radius', newValue.toString())
    } else {
      params.delete('radius')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 100)

  return (
    <div className="space-y-3">
      <p>
        {value ? (
          <>
            <span>{value}</span>
            <span className="mx-1">Km</span>
          </>
        ) : (
          'Not set'
        )}
      </p>
      <Slider defaultValue={[0]} value={[value]} onValueChange={handleChange} step={1} max={1000} />
    </div>
  )
}

export default FilterRadius
