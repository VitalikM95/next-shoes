import { prisma } from '@/prisma/prisma-client'
import { Product, OtherInfo, Variant } from '@/types/product.types'

export async function getProductsByCategory(category: string, type?: string) {
  try {
    const where: any = { male: category }
    if (type) where.type = { has: type }

    const initialProducts = await prisma.product.findMany({
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
        },
      },
    })

    if (!initialProducts) {
      throw new Error('No products found')
    }

    return transformProducts(initialProducts)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching products:', error.message)
    } else {
      console.error('Unknown error occurred')
    }
    throw error
  }
}

export function transformProducts(products: any[]): Product[] {
  return products.map(product => {
    const otherInfo = product.otherInfo as unknown as OtherInfo[]
    return {
      id: product.id,
      name: product.name,
      male: product.male,
      type: product.type,
      best_for: product.bestFor,
      material: product.material,
      price: product.price,
      discountPercent: product.discountPercent,
      other_info: otherInfo,
      highlights: product.highlights,
      details: product.details,
      sustainability: product.sustainability,
      care_guide: product.careGuide,
      variants: product.variants.map((variant: Variant) => ({
        color: {
          type: variant.color?.type || '',
          name: variant.color?.name || '',
          hash: variant.color?.hash || '',
        },
        images: variant.images,
        sizes: variant.sizes,
      })),
    }
  })
}
