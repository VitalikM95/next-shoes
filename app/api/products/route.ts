import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, apiErrors } from '@/lib/api/error-handler'

// GET /api/products - отримати список продуктів
const getProducts = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  // Отримуємо параметри фільтрації
  const male = searchParams.get('male')
  const type = searchParams.get('type')
  const sizes = searchParams.getAll('size')
  const colorType = searchParams.get('colorType')
  const bestFor = searchParams.getAll('bestFor')
  const material = searchParams.get('material')

  // Перевіряємо наявність обов'язкового параметру male
  if (!male || !['man', 'woman'].includes(male)) {
    throw apiErrors.validation('The male parameter is required')
  }

  // Формуємо умови фільтрації
  const where = {
    male,
    ...(type && { type: { has: type } }),
    ...(bestFor.length > 0 && { bestFor: { hasSome: bestFor } }),
    ...(material && { material: { in: material.split(',') } }),
    ...(sizes.length > 0 && {
      variants: {
        some: {
          sizes: { hasSome: sizes },
        },
      },
    }),
    ...(colorType && {
      variants: {
        some: {
          colorType,
        },
      },
    }),
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      variants: {
        select: {
          id: true,
          colorType: true,
          colorName: true,
          colorHash: true,
          sizes: true,
          images: true,
        },
        where: colorType
          ? {
              colorType: colorType,
            }
          : undefined,
      },
    },
  })

  // Трансформуємо дані для відповіді
  const transformedProducts = products.map(product => ({
    ...product,
    variants: product.variants.map(variant => ({
      ...variant,
      color: {
        type: variant.colorType,
        name: variant.colorName,
        hash: variant.colorHash,
      },
    })),
  }))

  return NextResponse.json(transformedProducts)
}

// Export functions for Next.js API routes
export const GET = async (req: NextRequest) => {
  try {
    return await getProducts(req)
  } catch (error) {
    return handleApiError(error)
  }
}
