import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/prisma/prisma-client'
import { authConfig } from '@/lib/auth/config'
import { handleApiError, apiErrors } from '@/lib/db/error-handler'
import { createOrderSchema } from '@/types/api.types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const getUserOrders = async (req: NextRequest) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  const orders = await prisma.order.findMany({
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
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json(orders)
}

const createOrder = async (req: NextRequest) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  const data = await req.json()
  const validatedData = createOrderSchema.parse(data)

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: true,
    },
  })

  if (!cart || cart.items.length === 0) {
    throw apiErrors.validation('Cart is empty')
  }

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      totalPrice: validatedData.totalPrice,
      ...(validatedData.country
        ? ({ country: validatedData.country } as any)
        : {}),
      items: {
        create: validatedData.items.map(item => ({
          variantId: item.variantId,
          size: item.size,
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase,
          discountAtPurchase: item.discountAtPurchase,
        })),
      },
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

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      address: validatedData.address,
      phone: validatedData.phone,
    },
  })

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  })

  return NextResponse.json(order, { status: 201 })
}

export const GET = async (req: NextRequest) => {
  try {
    return await getUserOrders(req)
  } catch (error) {
    return handleApiError(error)
  }
}

export const POST = async (req: NextRequest) => {
  try {
    return await createOrder(req)
  } catch (error) {
    return handleApiError(error)
  }
}
