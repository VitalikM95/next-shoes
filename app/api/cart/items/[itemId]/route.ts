import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/prisma/prisma-client'
import { authConfig } from '@/lib/auth/config'
import { handleApiError, apiErrors } from '@/lib/db/error-handler'
import { CartItemParams } from '@/types/api.types'

const deleteCartItem = async (req: NextRequest, { params }: CartItemParams) => {
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
    where: { userId: session.user.id },
  })

  if (!cart) {
    throw apiErrors.notFound('Cart')
  }

  await prisma.cartItem.delete({
    where: {
      id: params.itemId,
      cartId: cart.id,
    },
  })

  return NextResponse.json({ success: true })
}

const updateCartItem = async (req: NextRequest, { params }: CartItemParams) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  const { quantity } = await req.json()

  if (quantity === undefined || quantity < 1) {
    throw apiErrors.validation('Invalid quantity provided')
  }

  const userExists = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!userExists) {
    throw apiErrors.notFound('User')
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  })

  if (!cart) {
    throw apiErrors.notFound('Cart')
  }

  const updatedItem = await prisma.cartItem.update({
    where: {
      id: params.itemId,
      cartId: cart.id,
    },
    data: { quantity },
  })

  return NextResponse.json(updatedItem)
}

export const DELETE = async (req: NextRequest, context: CartItemParams) => {
  try {
    return await deleteCartItem(req, context)
  } catch (error) {
    return handleApiError(error)
  }
}

export const PATCH = async (req: NextRequest, context: CartItemParams) => {
  try {
    return await updateCartItem(req, context)
  } catch (error) {
    return handleApiError(error)
  }
}
