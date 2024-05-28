'use server'

import { db } from '../db'
import zod from 'zod'
import { revalidatePath } from 'next/cache'

export const PlaceZodSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  thumbnail: zod.string(),
  address: zod.string(),
  categorySlug: zod.string(),
  googleMap: zod.string(),
  submitBy: zod.string().optional()
})

export const addPlace = async (formData: FormData) => {
  const parsed = PlaceZodSchema.safeParse(formData)
  if (!parsed.success) {
    return parsed.error.formErrors.fieldErrors
  }

  await db.place.create({ data: parsed.data })
  revalidatePath('/explore')
}
