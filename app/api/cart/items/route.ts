import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { prisma } from '@/prisma/prisma-client'
import { authConfig } from '@/lib/auth/config'
import { handleApiError, apiErrors } from '@/lib/db/error-handler'
import { AddCartItemData } from '@/types/api.types'

const addCartItem = async (req: NextRequest) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  const {
    variantId,
    size,
    quantity,
    price,
    productName,
    productId,
    colorName,
    image,
  } = (await req.json()) as AddCartItemData

  if (!variantId || !size || !quantity || price === undefined) {
    throw apiErrors.validation('Missing required fields')
  }

  const userExists = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!userExists) {
    throw apiErrors.notFound('User')
  }

  let cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: session.user.id },
    })
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      variantId,
      size,
    },
  })

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        variantId,
        size,
        quantity,
        price,
        productName,
        productId,
        colorName,
        image,
      },
    })
  }

  const updatedCart = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: true },
  })

  return NextResponse.json(updatedCart)
}

export const POST = async (req: NextRequest) => {
  try {
    return await addCartItem(req)
  } catch (error) {
    return handleApiError(error)
  }
}
