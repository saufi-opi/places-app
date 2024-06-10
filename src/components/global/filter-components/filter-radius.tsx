'use client'

import { useEffect, useState } from 'react'
import { Slider } from '../../ui/slider'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '@/components/ui/input'

function FilterRadius() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = new URLSearchParams(searchParams)
  const radius = parseInt(params.get('radius') ?? '0')

  const [value, setValue] = useState<number>(radius)
  const [location, setLocation] = useState({ lat: 3.1319, lng: 101.6841 }) // default from KL, in case user block location access

  const handleChangeUrl = useDebouncedCallback((newValue: number) => {
    if (newValue) {
      params.set('lat', location.lat.toString())
      params.set('lng', location.lng.toString())
      params.set('radius', newValue.toString())
    } else {
      params.delete('radius')
      params.delete('lat')
      params.delete('lng')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  const handleChange = (numbers: number[]) => {
    const newValue = numbers[0] ?? 0
    setValue(newValue)
    handleChangeUrl(newValue)
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }

  useEffect(() => {
    getLocation()
  }, [value])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Radius"
          type="number"
          value={value}
          onChange={(e) => handleChange(parseInt(e.target.value) > 500 ? [500] : [parseInt(e.target.value)])}
        />
        <span className="text-zinc-500 dark:text-zinc-400">Km</span>
      </div>
      <Slider className="cursor-pointer" defaultValue={[0]} value={[value]} onValueChange={handleChange} step={1} max={500} />
    </div>
  )
}

export default FilterRadius
