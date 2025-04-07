import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { handleApiError, apiErrors } from '@/lib/api/error-handler'

// GET /api/cart - get user's cart
const getCart = async (request: NextRequest) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  })

  if (!cart) {
    throw apiErrors.notFound('Cart')
  }

  return NextResponse.json(cart)
}

// POST /api/cart - sync cart
const syncCart = async (request: NextRequest) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  const { localCart } = await request.json()

  const cart = await prisma.cart.create({
    data: {
      userId: session.user.id,
      items: {
        create: localCart.map((item: any) => ({
          variantId: item.variantId,
          size: item.size,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      items: {
        include: {
          variant: true,
        },
      },
    },
  })

  return NextResponse.json(cart)
}

// Export functions for Next.js API routes
export const GET = async (req: NextRequest) => {
  try {
    return await getCart(req)
  } catch (error) {
    return handleApiError(error)
  }
}

export const POST = async (req: NextRequest) => {
  try {
    return await syncCart(req)
  } catch (error) {
    return handleApiError(error)
  }
}
