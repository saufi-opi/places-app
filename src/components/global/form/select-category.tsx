'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getCategories } from '@/server/actions/category.actions'
import { type Category } from '@prisma/client'
import { useEffect, useState } from 'react'

interface Props {
  value?: string
  onChange?: (value: string) => void
  name?: string
  className?: string
  id?: string
}

export function SelectCategory(props: Props) {
  const { value, onChange } = props

  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await getCategories()
      setCategories(data)
    }
    void getData()
  }, [])

  return (
    <Select value={value} onValueChange={onChange} name={props.name}>
      <SelectTrigger className={props.className} id={props.id}>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.slug}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
