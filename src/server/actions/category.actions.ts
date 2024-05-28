'use server'

import { db } from '../db'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'
import zod from 'zod'

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

export const getCategories = async () => {
  return await db.category.findMany({})
}
