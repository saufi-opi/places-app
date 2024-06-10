'use server'

import { db } from '../db'
import zod from 'zod'
import { revalidatePath } from 'next/cache'
import { del, put } from '@vercel/blob'
import { type DefaultQueryOtions } from '@/types/types'
import { notFound } from 'next/navigation'
import { type Category, type Place } from '@prisma/client'
import { env } from '@/env'

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
  submitBy: zod.string().optional()
})

const UpdatePlaceZodSchema = PlaceZodSchema.extend({
  thumbnail: FileZodSchema.optional()
})

const GmapGeocodeResult = zod.object({
  geometry: zod.object({
    location: zod.object({
      lat: zod.number(),
      lng: zod.number()
    })
  }),
  place_id: zod.string()
})

const GMapGeocodeResponse = zod.object({
  status: zod.string(),
  results: zod.array(GmapGeocodeResult)
})

type FormErrors = Record<string, string>

interface GetPlacesOptions extends DefaultQueryOtions {
  categories?: string[]
  activities?: string[]
  radius?: number
}

interface GmapPlace {
  lat?: number
  lng?: number
  placeId?: string
}

export const addPlace = async (place: GmapPlace, prevState: unknown, formData: FormData) => {
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

  // check if place coordinates or place id is missing
  if (!place?.lat || !place?.lng || !place?.placeId) {
    // using gmap encoding api to get place id and location
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(parsed.data.address)}&key=${env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await response.json()
    const parsedResult = GMapGeocodeResponse.safeParse(result)
    if (!parsedResult.success || parsedResult.data.status === 'ZERO_RESULTS' || !parsedResult.data.results[0]) {
      return { address: ['Cannot find coordinates for the entered address'] }
    }
    place = {
      lat: parsedResult.data.results[0].geometry.location.lat,
      lng: parsedResult.data.results[0].geometry.location.lng,
      placeId: parsedResult.data.results[0].place_id
    }
  }

  const lat = place.lat
  const lng = place.lng
  const placeId = place.placeId
  const googleMap = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${placeId}`

  const thumbnail = parsed.data.thumbnail
  const { url } = await put(thumbnail.name, thumbnail, { access: 'public' })
  await db.place.create({
    data: {
      ...parsed.data,
      googleMap,
      thumbnail: url
    }
  })
  revalidatePath('/explore')
}

export const updatePlace = async (id: string, place: GmapPlace, prevState: unknown, formData: FormData) => {
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

  let newGoogleMap
  if (oldItem.address !== parsed.data.address) {
    const lat = place.lat
    const lng = place.lng
    const placeId = place.placeId
    newGoogleMap = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${placeId}`
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
      thumbnail: newURL ? newURL : oldItem.thumbnail,
      googleMap: newGoogleMap ? newGoogleMap : oldItem.googleMap
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const counts = Array.isArray(c) && c.length > 0 && typeof c[0] === 'object' && 'count' in c[0] ? +c[0].count : 0
  const totalPages = Math.ceil(counts / (pageSize ?? counts))

  return {
    data: data as unknown as (Place & { category?: Category })[],
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
