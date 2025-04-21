import { prisma } from '@/prisma/prisma-client'
import { ProductListItem } from '@/types/product.types'

export const getProducts = async (
  male: string,
  type?: string
): Promise<ProductListItem[]> => {
  try {
    const where = {
      male,
      ...(type && { type: { has: type } }),
    }

    const products = await prisma.product.findMany({
      where,
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

    console.log('Found products:', products.length)

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
    return []
  }
}
