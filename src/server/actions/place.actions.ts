'use server'

import { db } from '../db'
import zod from 'zod'
import { revalidatePath } from 'next/cache'

//TODO: handle thumbnail upload - get the file from formdata and uplaod to vercel blob, get the url and save in db as thumbnail
const PlaceZodSchema = zod.object({
  title: zod.string({ required_error: 'Place title is required' }).min(1, { message: 'Place title is required' }),
  description: zod.string({ required_error: 'Place descritpion is required' }).min(1, { message: 'Place descritpion is required' }),
  thumbnail: zod.string(),
  address: zod.string({ required_error: 'Place address is required' }).min(1, { message: 'Place address is required' }),
  categorySlug: zod.string({ required_error: 'Place category is required' }).min(1, { message: 'Place category is required' }),
  googleMap: zod.string({ required_error: 'Google map link is required' }).min(1, { message: 'Google map link is required' }),
  submitBy: zod.string().optional()
})

export const addPlace = async (prevState: unknown, formData: FormData) => {
  const parsed = PlaceZodSchema.safeParse(formData)
  if (!parsed.success) {
    return parsed.error.formErrors.fieldErrors
  }

  await db.place.create({ data: parsed.data })
  revalidatePath('/explore')
}
