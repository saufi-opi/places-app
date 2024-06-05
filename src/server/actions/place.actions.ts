'use server'

import { db } from '../db'
import zod from 'zod'
import { revalidatePath } from 'next/cache'
import { del, put } from '@vercel/blob'
import { type DefaultQueryOtions } from '@/types/types'
import { notFound } from 'next/navigation'

const FileZodSchema = zod.instanceof(File, { message: 'File is required' })

const ThumbnailZodSchema = FileZodSchema.refine((file) => file.size > 0 && file.type.startsWith('image/'), {
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

const UpdatePlaceZodSchema = PlaceZodSchema.extend({
  thumbnail: FileZodSchema.optional()
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

export const updatePlace = async (id: string, prevState: unknown, formData: FormData) => {
  const parsed = UpdatePlaceZodSchema.safeParse(Object.fromEntries(formData.entries()))
  const errors: FormErrors = {}

  if (!parsed.success) {
    return parsed.error.formErrors.fieldErrors
  }

  const oldItem = await db.place.findFirst({ where: { id } })
  if (!oldItem) return notFound()

  const category = await db.category.findFirst({ where: { slug: parsed.data.categorySlug } })
  if (!category) {
    errors.categorySlug = 'Category does not exist'
    return errors
  }

  const file = parsed.data.thumbnail
  let newURL
  if (file && file.size > 0) {
    await del(oldItem.thumbnail)
    const { url } = await put(file.name, file, { access: 'public' })
    newURL = url
  }

  await db.place.update({
    where: { id },
    data: {
      ...parsed.data,
      thumbnail: newURL ? newURL : oldItem.thumbnail
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

  const matchStage = {
    $match: {
      title: { $regex: search, $options: 'i' },
      ...(categories.length ? { categorySlug: { $in: categories } } : {})
    }
  }

  const lookupStage = {
    $lookup: {
      from: 'Category',
      localField: 'categorySlug',
      foreignField: 'slug',
      as: 'category'
    }
  }

  const unwindStage = {
    $unwind: {
      path: '$category',
      preserveNullAndEmptyArrays: true
    }
  }

  const idStage = [
    {
      $addFields: {
        id: { $toString: '$_id' }
      }
    },
    {
      $project: {
        _id: 0
      }
    }
  ]

  // Fetch data and count from the database
  const [data, c] = await Promise.all([
    db.place.aggregateRaw({ pipeline: [matchStage, lookupStage, unwindStage, ...idStage, { $skip: skip }, { $limit: pageSize }] }),
    db.place.aggregateRaw({ pipeline: [matchStage, { $count: 'count' }] })
  ])

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const counts = c.length && +c.length > 0 ? +c[0]?.count : 0
  const totalPages = Math.ceil(counts / (pageSize ?? counts))

  return {
    data,
    counts,
    totalPages
  }
}

export const getPlaceById = async (id: string) => {
  const item = await db.place.findFirst({ where: { id } })
  return item
}

export const deletePlace = async (id: string) => {
  await db.place.delete({ where: { id } })
  revalidatePath('/explore')
  revalidatePath('/admin/place')
}
