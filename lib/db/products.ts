import { prisma } from '@/prisma/prisma-client'
import { OtherInfo, ProductListItem } from '@/types/product.types'
import { createApiError } from './error-handler'

export const getProducts = async (
  male: string,
  type?: string,
  limit?: number
): Promise<ProductListItem[]> => {
  try {
    const isSale = type === "Men's Sale" || type === "Women's Sale"

    const where = {
      male,
      ...(isSale
        ? { discountPercent: { not: 0 } }
        : type
        ? { type: { has: type } }
        : {}),
    }

    const products = await prisma.product.findMany({
      where,
      ...(limit && { take: limit }),
      select: {
        id: true,
        name: true,
        male: true,
        type: true,
        bestFor: true,
        material: true,
        price: true,
        discountPercent: true,
        variants: {
          select: {
            id: true,
            images: true,
            colorType: true,
            colorName: true,
            colorHash: true,
            sizes: true,
          },
        },
      },
    })

    return products.map(product => ({
      ...product,
      variants: product.variants.map(variant => ({
        id: variant.id,
        colorType: variant.colorType,
        colorName: variant.colorName,
        colorHash: variant.colorHash,
        images: variant.images,
        sizes: variant.sizes,
      })),
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    throw createApiError('Failed to fetch products', 500, error)
  }
}

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: true,
    },
  })

  if (!product) return null

  return {
    ...product,
    otherInfo: (product.otherInfo as unknown as OtherInfo[]) || [],
    variants: product.variants.map(variant => ({
      id: variant.id,
      colorType: variant.colorType,
      colorName: variant.colorName,
      colorHash: variant.colorHash,
      images: variant.images,
      sizes: variant.sizes,
    })),
  }
}
