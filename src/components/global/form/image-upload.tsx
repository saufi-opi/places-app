'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { type ChangeEvent, useState, useRef } from 'react'

interface Props {
  id?: string
  name?: string
  defaultValue?: string
}

function ImageUpload({ id, name, defaultValue }: Props) {
  const [image, setImage] = useState({
    url: defaultValue,
    name: ''
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const file = files[0]
      setImage({
        url: URL.createObjectURL(file!),
        name: file?.name ?? ''
      })
    }
  }

  const handleCLick = () => {
    inputRef.current?.click()
  }

  return (
    <div>
      <Button onClick={handleCLick} type="button">
        Upload Image
      </Button>
      <Input ref={inputRef} type="file" accept="image/*" className="hidden" id={id} name={name} onChange={handleImageUpload} />
      {image.url && (
        <div className="mt-4">
          <Image src={image.url} alt="Uploaded preview" className="h-auto max-h-52 w-auto" width={200} height={200} />
          <p className="text-sm text-zinc-500">{image.name}</p>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
