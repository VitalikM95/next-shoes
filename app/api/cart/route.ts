import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'

// GET /api/cart - get user's cart
const getCart = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authConfig)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
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
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
    }

    return NextResponse.json(cart)
  } catch (error) {
    return NextResponse.json({ error: 'Error getting cart' }, { status: 500 })
  }
}

// POST /api/cart - sync cart
const syncCart = async (request: NextRequest) => {
  try {
    const session = await getServerSession(authConfig)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
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
  } catch (error) {
    return NextResponse.json({ error: 'Error syncing cart' }, { status: 500 })
  }
}

// Export functions for Next.js API routes
export const GET = getCart
export const POST = syncCart
