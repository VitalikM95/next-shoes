import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'

// DELETE /api/cart/items/[itemId] - видалити товар з корзини
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { itemId: string } }
) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Перевіряємо, чи існує користувач
    const userExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!userExists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

    // Отримуємо корзину користувача
  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  })

  if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
  }

    // Видаляємо товар
  await prisma.cartItem.delete({
    where: {
      id: params.itemId,
      cartId: cart.id,
    },
  })

  return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting item from cart:', error)
    return NextResponse.json(
      { error: 'Failed to delete item from cart' },
      { status: 500 }
    )
  }
}

// PATCH /api/cart/items/[itemId] - оновити кількість товару
export const PATCH = async (
  req: NextRequest,
  { params }: { params: { itemId: string } }
) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { quantity } = await req.json()

    if (quantity === undefined || quantity < 1) {
      return NextResponse.json(
        { error: 'Invalid quantity provided' },
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

    // Отримуємо корзину користувача
  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  })

  if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 })
  }

    // Оновлюємо кількість товару
  const updatedItem = await prisma.cartItem.update({
    where: {
      id: params.itemId,
      cartId: cart.id,
    },
    data: { quantity },
  })

  return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating cart item quantity:', error)
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 }
    )
  }
}
