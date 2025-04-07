import { prisma } from '@/prisma/prisma-client'
import { Product, OtherInfo, Variant } from '@/types/product.types'

// Функція для отримання продуктів за категорією
export async function getProductsByCategory(category: string) {
  const initialProducts = await prisma.product.findMany({
    where: { male: category },
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

  return transformProducts(initialProducts)
}

// Функція для трансформації продуктів
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
