import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { handleApiError, apiErrors } from '@/lib/db/error-handler'

// POST /api/cart/items - додати товар до корзини
export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const {
      variantId,
      size,
      quantity,
      price,
      productName,
      productId,
      colorName,
      image,
    } = await req.json()

    if (!variantId || !size || !quantity || price === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Перевіряємо, чи існує користувач
    const userExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!userExists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Знаходимо корзину користувача або створюємо нову
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: session.user.id },
      })
    }

    // Перевіряємо чи є вже такий товар в корзині
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        variantId,
        size,
      },
    })

    // Оновлюємо або створюємо товар
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

    // Повертаємо оновлену корзину
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true },
    })

    return NextResponse.json(updatedCart)
  } catch (error) {
    console.error('Error adding item to cart:', error)
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}
