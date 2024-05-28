'use server'

import { db } from '../db'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'
import zod from 'zod'
import { type ActionReturnType } from '@/types/action'
import { type Category } from '@prisma/client'

export const CategoryZodSchema = zod.object({
  slug: zod.string().optional(),
  name: zod.string()
})

export const addcategory = async (formData: FormData): Promise<ActionReturnType<Category>> => {
  const parsed = CategoryZodSchema.safeParse(formData)
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.message
    }
  }

  const slug = slugify(parsed.data.name)
  const item = await db.category.create({
    data: {
      slug,
      name: parsed.data.name
    }
  })
  revalidatePath('/admin/category')

  return {
    success: true,
    item
  }
}
