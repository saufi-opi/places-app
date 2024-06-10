import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import createSlug from 'slugify'
import { env } from '@/env'
import zod from 'zod'

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(input: string) {
  return createSlug(input, { lower: true, strict: true, locale: 'en' })
}

export async function getGmapLocation(address: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = await response.json()
  const parsedResult = GMapGeocodeResponse.safeParse(result)
  return parsedResult
}
