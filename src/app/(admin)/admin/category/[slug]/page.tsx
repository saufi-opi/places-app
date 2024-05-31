import CategoryForm from '@/components/global/form/category-form'
import MaxWidthWrapper from '@/components/global/max-width-wrapper'
import { getCategoryBySlug } from '@/server/actions/category.actions'
import { notFound } from 'next/navigation'

interface CategoryParams {
  slug: string
}

interface Props {
  params: CategoryParams
}

async function CategoryDetailsPage({ params }: Props) {
  const isCreate = params.slug === 'new'
  let data
  if (!isCreate) {
    data = await getCategoryBySlug(params.slug)
    if (!data) return notFound()
  }

  return (
    <MaxWidthWrapper className="space-y-8 py-20">
      <h1 className="mb-6 text-2xl font-bold">{isCreate ? 'New' : 'Edit'} Category</h1>
      <CategoryForm isCreate={isCreate} data={data} slug={data?.slug} />
    </MaxWidthWrapper>
  )
}

export default CategoryDetailsPage
