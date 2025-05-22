import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, apiErrors } from '@/lib/db/error-handler'
import { Prisma } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const getProducts = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

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

  if (!male || !['man', 'woman'].includes(male)) {
    throw apiErrors.validation('The male parameter is required')
  }

  const isSale = type === "Men's Sale" || type === "Women's Sale"

  const where: Prisma.ProductWhereInput = {
    male,
    ...(isSale
      ? { discountPercent: { not: 0 } }
      : type
        ? { type: { has: type } }
        : {}),
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

  return NextResponse.json(products)
}

export const GET = async (req: NextRequest) => {
  try {
    return await getProducts(req)
  } catch (error) {
    return handleApiError(error)
  }
}
