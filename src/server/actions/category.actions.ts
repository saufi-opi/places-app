'use server'

import { db } from '../db'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'
import zod from 'zod'
import { type DefaultQueryOtions } from '@/types/types'

const CreateCategoryZodSchema = zod.object({
  name: zod.string({ required_error: 'Category name is reuired' }).min(1, { message: 'Category name is required' })
})

export const addcategory = async (prevState: unknown, formData: FormData) => {
  const parsed = CreateCategoryZodSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!parsed.success) {
    return parsed.error.formErrors.fieldErrors
  }

  const slug = slugify(parsed.data.name)
  await db.category.create({
    data: {
      slug,
      name: parsed.data.name
    }
  })
  revalidatePath('/admin/category')
}

export const getCategories = async (options?: DefaultQueryOtions) => {
  // Set default values if they are undefined
  options ??= {}
  options.search ??= ''

  const { page, pageSize, search } = options

  // Calculate the number of items to skip
  const skip = page && pageSize ? (page - 1) * pageSize : undefined

  // Fetch data and count from the database
  const [data, counts] = await Promise.all([
    db.category.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      take: pageSize,
      skip
    }),
    db.category.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
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
