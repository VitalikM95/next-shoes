import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, apiErrors } from '@/lib/api/error-handler'

// GET /api/products/[id] - отримати конкретний товар
const getProduct = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params

  if (!id) {
    throw apiErrors.validation('Product ID is required')
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: {
        select: {
          id: true,
          colorType: true,
          sizes: true,
          images: true,
        },
      },
    },
  })

  if (!product) {
    throw apiErrors.notFound('Product')
  }

  // Трансформуємо дані для відповіді
  const transformedProduct = {
    ...product,
    mainImage: product.variants[0]?.images[0],
    variants: product.variants.map(variant => ({
      id: variant.id,
      colorType: variant.colorType,
      sizes: variant.sizes,
      image: variant.images[0],
    })),
  }

  return NextResponse.json(transformedProduct)
}

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    return await getProduct(request, { params })
  } catch (error) {
    return handleApiError(error)
  }
}
