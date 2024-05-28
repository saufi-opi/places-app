'use server'

import { db } from '../db'
import zod from 'zod'
import { revalidatePath } from 'next/cache'
import { put } from '@vercel/blob'

const ThumbnailZodSchema = zod
  .instanceof(File, { message: 'Place thumbnail is required' })
  .refine((file) => file.size > 0 && file.type.startsWith('image/'), {
    message: 'Place thumbnail is required'
  })

const PlaceZodSchema = zod.object({
  title: zod.string({ required_error: 'Place title is required' }).min(1, { message: 'Place title is required' }),
  description: zod.string({ required_error: 'Place description is required' }).min(1, { message: 'Place description is required' }),
  thumbnail: ThumbnailZodSchema,
  address: zod.string({ required_error: 'Place address is required' }).min(1, { message: 'Place address is required' }),
  categorySlug: zod.string({ required_error: 'Place category is required' }).min(1, { message: 'Place category is required' }),
  googleMap: zod.string({ required_error: 'Google map link is required' }).min(1, { message: 'Google map link is required' }),
  submitBy: zod.string().optional()
})

type FormErrors = Record<string, string>

export const addPlace = async (prevState: unknown, formData: FormData) => {
  const parsed = PlaceZodSchema.safeParse(Object.fromEntries(formData.entries()))
  const errors: FormErrors = {}

  if (!parsed.success) {
    return parsed.error.formErrors.fieldErrors
  }

  const category = await db.category.findFirst({ where: { slug: parsed.data.categorySlug } })
  if (!category) {
    errors.categorySlug = 'Category does not exist'
    return errors
  }

  const thumbnail = parsed.data.thumbnail
  const { url } = await put(thumbnail.name, thumbnail, { access: 'public' })
  await db.place.create({
    data: {
      ...parsed.data,
      thumbnail: url
    }
  })
  revalidatePath('/explore')
}
