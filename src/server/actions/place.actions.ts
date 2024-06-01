'use server'

import { db } from '../db'
import zod from 'zod'
import { revalidatePath } from 'next/cache'
import { put } from '@vercel/blob'
import { type DefaultQueryOtions } from '@/types/types'

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

interface GetPlacesOptions extends DefaultQueryOtions {
  categories?: string[]
  activities?: string[]
  radius?: number
}

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

// TODO: add activities filter and radius filter
export const getPlaces = async (options?: GetPlacesOptions) => {
  // Set default values if they are undefined
  options ??= {}
  options.search ??= ''
  options.categories ??= []

  const { page, pageSize, search, categories } = options

  // Calculate the number of items to skip
  const skip = page && pageSize ? (page - 1) * pageSize : undefined

  // Fetch data and count from the database
  const [data, counts] = await Promise.all([
    db.place.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive'
        },
        categorySlug: {
          in: categories.length ? categories : undefined
        }
      },
      include: {
        category: true
      },
      take: pageSize,
      skip
    }),
    db.place.count({
      where: {
        title: {
          contains: search,
          mode: 'insensitive'
        },
        categorySlug: {
          in: categories.length ? categories : undefined
        }
      }
    })
  ])

  const totalPages = Math.ceil(counts / (pageSize ?? counts))

  return {
    data,
    counts,
    totalPages
  }
}

export const deletePlace = async (id: string) => {
  await db.place.delete({ where: { id } })
  revalidatePath('/explore')
  revalidatePath('/admin/place')
}
