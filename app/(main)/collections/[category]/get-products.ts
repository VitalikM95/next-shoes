import { prisma } from '@/prisma/prisma-client'
import { Product, OtherInfo, Variant, Color } from '@/types/product.types'

const transformOtherInfo = (otherInfo: any): OtherInfo[] => {
  if (!otherInfo) return []

  try {
    const parsed =
      typeof otherInfo === 'string' ? JSON.parse(otherInfo) : otherInfo

    if (Array.isArray(parsed)) {
      return parsed.map(item => ({
        img: item.img || '',
        title: item.title || '',
        text: item.text || '',
      }))
    }
    return []
  } catch {
    return []
  }
}

export const getProducts = async (
  male: 'man' | 'woman',
  type?: string,
  bestFor?: string[],
  materials?: string[]
): Promise<Product[]> => {
  try {
    console.log('Filtering with params:', { male, type, bestFor, materials })

    const where: any = {
      male,
    }

    if (type) {
      where.type = {
        has: type,
      }
    }

    if (bestFor && bestFor.length > 0) {
      where.bestFor = {
        hasSome: bestFor,
      }
    }

    if (materials && materials.length > 0) {
      where.material = {
        in: materials,
      }
    }

    console.log('Prisma where clause:', where)

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
          },
        },
      },
    })

    console.log('Found products:', products.length)

    return products.map(product => {
      const variants: Variant[] = product.variants.map(variant => ({
        color: {
          type: variant.colorType,
          name: variant.colorName,
          hash: variant.colorHash,
        } as Color,
        images: [],
        sizes: variant.sizes,
      }))

      return {
        ...product,
        best_for: product.bestFor,
        other_info: transformOtherInfo(product.otherInfo),
        care_guide: product.careGuide,
        variants,
      } as Product
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
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
