import { prisma } from '@/prisma/prisma-client'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { apiErrors } from './error-handler'

// Спрощена модель OrderItem, включає тільки основні поля
export interface OrderItem {
  id: string
  size: string
  quantity: number
  priceAtPurchase: number
}

export interface Order {
  id: string
  orderNumber: number // Порядковий номер замовлення
  totalPrice: number
  createdAt: string
  status:
    | 'PROCESSING'
    | 'CONFIRMED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'COMPLETED'
    | 'CANCELED'
    | 'RETURNED'
  country: string // Країна доставки
  itemsCount: number // Загальна кількість предметів у замовленні
}

export async function getUserOrders(): Promise<Order[]> {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  const dbOrders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      items: true, // Спрощуємо запит, нам не потрібні деталі про варіанти та продукти
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Трансформуємо дані для відповідності типу Order
  const orders: Order[] = dbOrders.map((order, index) => ({
    id: order.id,
    orderNumber: dbOrders.length - index, // Порядковий номер починаючи з останнього (найновішого)
    totalPrice: order.totalPrice,
    createdAt: order.createdAt.toISOString(),
    status: order.status,
    country: (order as any).country || 'Ukraine', // Використовуємо any для обходу типізації
    itemsCount: order.items.length, // Загальна кількість предметів
  }))

  return orders
}
