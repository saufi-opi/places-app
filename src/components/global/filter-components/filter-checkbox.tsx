'use client'

import React, { useState } from 'react'
import { Checkbox } from '../../ui/checkbox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
  label: string
  value: string
  paramKey: string
}

function FilterCheckbox({ label, value, paramKey }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = new URLSearchParams(searchParams)
  const keyParamsString = params.get(paramKey) ?? ''
  const [checked, setChecked] = useState<boolean>(keyParamsString.includes(value))

  const handleChange = useDebouncedCallback((checked: boolean | string) => {
    if (checked) {
      setChecked(true)
      const prefix = keyParamsString ? keyParamsString + ',' : ''
      params.set(paramKey, `${prefix}${value}`)
    } else {
      setChecked(false)
      const newkeyParams = keyParamsString
        .split(',')
        .filter((category) => category !== value)
        .join(',')
      if (newkeyParams) params.set(paramKey, newkeyParams)
      else params.delete(paramKey)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 200)

  return (
    <div className="flex items-center gap-2">
      <Checkbox onCheckedChange={(checked) => handleChange(checked)} checked={checked} />
      <label className="cursor-pointer font-normal" onClick={() => handleChange(!checked)}>
        {label}
      </label>
    </div>
  )
}

export default FilterCheckbox
