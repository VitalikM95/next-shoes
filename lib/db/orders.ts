import { prisma } from '@/prisma/prisma-client'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { apiErrors } from './error-handler'
import { Order } from '@/types/order.types'

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
      items: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const orders: Order[] = dbOrders.map((order, index) => ({
    id: order.id,
    orderNumber: dbOrders.length - index,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt.toISOString(),
    status: order.status,
    country: (order as any).country || 'Ukraine',
    itemsCount: order.items.length,
  }))

  return orders
}
