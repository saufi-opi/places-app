'use server'

import { db } from '../db'
import zod from 'zod'
import { revalidatePath } from 'next/cache'
import { type ActionReturnType } from '@/types/action'
import { type Place } from '@prisma/client'

export const PlaceZodSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  thumbnail: zod.string(),
  address: zod.string(),
  categorySlug: zod.string(),
  googleMap: zod.string(),
  submitBy: zod.string().optional()
})

export const addPlace = async (formData: FormData): Promise<ActionReturnType<Place>> => {
  const parsed = PlaceZodSchema.safeParse(formData)
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.message
    }
  }
  const item = await db.place.create({ data: parsed.data })
  revalidatePath('/explore')

  return {
    success: true,
    item
  }
}