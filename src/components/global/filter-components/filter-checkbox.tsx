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
  const [checked, setChecked] = useState<boolean | string>(keyParamsString.includes(value))

  const handleChangeURL = useDebouncedCallback((checked: boolean | string) => {
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
  }, 300)

  const handleChange = (checked: boolean | string) => {
    setChecked(checked)
    handleChangeURL(checked)
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox className="my-1 self-start" onCheckedChange={(checked) => handleChange(checked)} checked={!!checked} />
      <label className="cursor-pointer font-normal hover:text-zinc-500" onClick={() => handleChange(!checked)}>
        {label}
      </label>
    </div>
  )
}

export default FilterCheckbox
