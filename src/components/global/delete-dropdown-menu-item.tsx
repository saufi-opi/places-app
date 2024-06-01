'use client'

import React from 'react'
import { DropdownMenuItem } from '../ui/dropdown-menu'

interface Props {
  id: string
  action: unknown
}

function DeleteDropDownMenuItem(props: Props) {
  const handleClick = async () => {
    if (typeof props.action === 'function') {
      await props.action(props.id)
    }
  }

  return (
    <DropdownMenuItem className="cursor-pointer text-destructive" onClick={handleClick}>
      Delete
    </DropdownMenuItem>
  )
}

export default DeleteDropDownMenuItem
