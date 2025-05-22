export const dynamic = 'force-dynamic'
export const revalidate = 0

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/prisma/prisma-client'
import { authConfig } from '@/lib/auth/config'
import { handleApiError, apiErrors } from '@/lib/db/error-handler'

const getCart = async (req: NextRequest) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  const userExists = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!userExists) {
    throw apiErrors.notFound('User')
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      items: {
        orderBy: {
          id: 'asc',
        },
        include: {
          variant: {
            select: {
              colorName: true,
              images: true,
              product: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!cart) {
    return NextResponse.json({ items: [] })
  }

  const transformedItems = cart.items.map(item => ({
    id: item.id,
    variantId: item.variantId,
    size: item.size,
    quantity: item.quantity,
    price: item.price,
    productName: item.productName || item.variant?.product?.name || '',
    productId: item.productId || item.variant?.product?.id || '',
    colorName: item.colorName || item.variant?.colorName || '',
    image:
      item.image ||
      (item.variant?.images?.length ? item.variant.images[0] : ''),
  }))

  return NextResponse.json({
    id: cart.id,
    userId: cart.userId,
    items: transformedItems,
  })
}

export const GET = async (req: NextRequest) => {
  try {
    return await getCart(req)
  } catch (error) {
    return handleApiError(error)
  }
}
