import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import createSlug from 'slugify'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(input: string) {
  return createSlug(input, { lower: true, strict: true, locale: 'en' })
}
