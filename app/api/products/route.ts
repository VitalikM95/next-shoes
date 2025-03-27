import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/products - отримати список продуктів
export async function GET(request: NextRequest) {
  try {
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
      return NextResponse.json(
        {
          error: 'The male parameter is required',
        },
        { status: 400 }
      )
    }

    // Формуємо умови фільтрації
    const where = {
      male,
      ...(type && { type: { has: type } }),
      ...(bestFor.length > 0 && { bestFor: { hasEvery: bestFor } }),
      ...(material && { material }),
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
      mainImage: product.variants[0]?.images[0],
      variants: product.variants.map(variant => ({
        id: variant.id,
        colorType: variant.colorType,
        sizes: variant.sizes,
        image: variant.images[0],
      })),
    }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
