import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, apiErrors } from '@/lib/api/error-handler'
import { Prisma } from '@prisma/client'

// GET /api/products - отримати список продуктів
const getProducts = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  // Отримуємо параметри фільтрації
  const male = searchParams.get('male')
  const type = searchParams.get('type')
  const bestForRaw = searchParams.getAll('bestFor')
  const bestFor: string[] = bestForRaw.flatMap(val => val.split(','))
  const materialsRaw = searchParams.getAll('materials')
  const materials: string[] = materialsRaw.flatMap(val => val.split(','))
  const sizesRaw = searchParams.getAll('sizes')
  const sizes: string[] = sizesRaw.flatMap(val => val.split(','))
  const colorTypeRaw = searchParams.getAll('colorType')
  const colorType: string[] = colorTypeRaw.flatMap(val => val.split(','))

  // Перевіряємо наявність обов'язкового параметру male
  if (!male || !['man', 'woman'].includes(male)) {
    throw apiErrors.validation('The male parameter is required')
  }

  // Формуємо умови фільтрації
  const where: Prisma.ProductWhereInput = {
    male,
    ...(type && { type: { has: type } }),
    ...(bestFor.length > 0 && { bestFor: { hasSome: bestFor } }),
    ...(materials.length > 0 && { material: { in: materials } }),
    ...(sizes.length > 0 && {
      variants: {
        some: {
          sizes: { hasSome: sizes },
        },
      },
    }),
    ...(colorType.length > 0 && {
      variants: {
        some: {
          colorType: { in: colorType },
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
        where: {
          AND: [
            ...(colorType.length > 0 ? [{ colorType: { in: colorType } }] : []),
            ...(sizes.length > 0 ? [{ sizes: { hasSome: sizes } }] : []),
          ],
        },
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
