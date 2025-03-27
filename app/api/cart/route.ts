import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth/next'

// GET /api/cart - отримати корзину користувача
// export async function GET(request: NextRequest) {
//   try {
//     // Отримуємо userId з сесії/токена
//     const session = await getServerSession() // або інший спосіб отримання сесії
//     const userId = session?.user?.id

//     if (!userId) {
//       return NextResponse.json(
//         { error: 'Необхідно авторизуватися' },
//         { status: 401 }
//       )
//     }

//     const cart = await prisma.cart.findUnique({
//       where: {
//         userId: parseInt(userId),
//       },
//       include: {
//         items: {
//           include: {
//             variant: {
//               include: {
//                 product: true,
//               },
//             },
//           },
//         },
//       },
//     })

//     if (!cart) {
//       return NextResponse.json(
//         { error: 'Корзина не знайдена' },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json(cart)
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Помилка отримання корзини' },
//       { status: 500 }
//     )
//   }
// }

// POST /api/cart - синхронізація корзини
export async function POST(request: NextRequest) {
  try {
    const { userId, localCart } = await request.json()

    const cart = await prisma.cart.create({
      data: {
        userId,
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
    return NextResponse.json(
      { error: 'Помилка синхронізації корзини' },
      { status: 500 }
    )
  }
}
