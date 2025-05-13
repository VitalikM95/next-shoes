import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { handleApiError, apiErrors } from '@/lib/db/error-handler'

// GET /api/cart - отримати корзину користувача
export const GET = async (req: NextRequest) => {
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

    // Отримуємо корзину користувача з усіма необхідними даними
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          orderBy: {
            // Сортуємо елементи корзини для консистентного відображення
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

    // Якщо корзина не знайдена, повертаємо порожню корзину
    if (!cart) {
      return NextResponse.json({ items: [] })
    }

    // Трансформуємо дані для правильного формату CartItem
    const transformedItems = cart.items.map((item) => ({
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
  } catch (error) {
    console.error('Error getting cart:', error)
    return NextResponse.json({ error: 'Failed to get cart' }, { status: 500 })
  }
}
