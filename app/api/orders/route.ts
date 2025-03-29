import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'

// Схема валідації для створення замовлення
const createOrderSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  totalPrice: z.number().min(0, 'Total price must be positive'),
  items: z.array(
    z.object({
      variantId: z.string(),
      size: z.string(),
      quantity: z.number().min(1),
      priceAtPurchase: z.number(),
      discountAtPurchase: z.number(),
    })
  ),
})

// Отримання замовлень користувача
const getUserOrders = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authConfig)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
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
  } catch (error) {
    console.error('Error getting user orders:', error)
    return NextResponse.json(
      { error: 'Error getting user orders' },
      { status: 500 }
    )
  }
}

// Створення нового замовлення
const createOrder = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authConfig)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const data = await req.json()
    const validatedData = createOrderSchema.parse(data)

    // Отримуємо корзину користувача для перевірки
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: true,
      },
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Створюємо замовлення
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalPrice: validatedData.totalPrice,
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

    // Оновлюємо дані користувача
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        address: validatedData.address,
        phone: validatedData.phone,
      },
    })

    // Очищаємо корзину
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
  }
}

// Експорт функцій для Next.js API роутів
export const GET = getUserOrders
export const POST = createOrder
