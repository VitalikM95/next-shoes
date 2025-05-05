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
    const transformedItems = cart.items.map(item => ({
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

// POST /api/cart - синхронізувати корзину
const syncCart = async (request: NextRequest) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  try {
    // Перевіряємо, чи існує користувач перед роботою з корзиною
    const userExists = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!userExists) {
      console.warn(
        `User with ID ${session.user.id} not found in database but exists in session`
      )
      throw apiErrors.notFound('User')
    }

    // Отримуємо дані локальної корзини
    const { localCart } = await request.json()

    // Знаходимо корзину користувача
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: true, // Завантажуємо всі елементи корзини для перевірки дублікатів
      },
    })

    // Якщо корзини немає, створюємо нову
    if (!cart) {
      try {
        // Створюємо корзину з порожнім масивом елементів
        cart = await prisma.cart.create({
          data: { userId: session.user.id },
          include: { items: true }, // Включаємо порожній масив items для типів
        })
      } catch (createError) {
        console.error('Error creating cart:', createError)
        throw apiErrors.server('Failed to create cart')
      }
    }

    // Перевіряємо, що корзина існує на цьому етапі
    if (!cart) {
      throw apiErrors.server('Failed to initialize cart')
    }

    // Додаємо всі товари з локальної корзини, якщо вони є
    if (Array.isArray(localCart) && localCart.length > 0) {
      // Створюємо мапу існуючих елементів для швидкого пошуку
      const existingItemsMap = new Map()
      cart.items.forEach(item => {
        const key = `${item.variantId}_${item.size}`
        existingItemsMap.set(key, item)
      })

      for (const item of localCart) {
        if (!item.variantId || !item.size) {
          console.warn('Skipping invalid cart item without variantId or size')
          continue // Пропускаємо некоректні елементи
        }

        try {
          // Створюємо ключ для пошуку
          const itemKey = `${item.variantId}_${item.size}`
          const existingItem = existingItemsMap.get(itemKey)

          if (existingItem) {
            console.log(
              `Updating existing cart item: ${itemKey}, quantity: ${existingItem.quantity} + ${item.quantity}`
            )
            // Оновлюємо кількість
            await prisma.cartItem.update({
              where: { id: existingItem.id },
              data: { quantity: existingItem.quantity + (item.quantity || 1) },
            })
          } else {
            console.log(
              `Creating new cart item: ${itemKey}, quantity: ${
                item.quantity || 1
              }`
            )
            // Перевіряємо через додатковий запит перед створенням (подвійна перевірка)
            const doubleCheck = await prisma.cartItem.findFirst({
              where: {
                cartId: cart.id,
                variantId: item.variantId,
                size: item.size,
              },
            })

            if (doubleCheck) {
              console.log(
                `Item already exists (race condition), updating instead: ${itemKey}`
              )
              // Якщо елемент все ж існує (наприклад, був створений в іншій операції)
              await prisma.cartItem.update({
                where: { id: doubleCheck.id },
                data: { quantity: doubleCheck.quantity + (item.quantity || 1) },
              })
            } else {
              // Пробуємо безпосередньо створити запис через try-catch
              try {
                await prisma.cartItem.create({
                  data: {
                    cartId: cart.id,
                    variantId: item.variantId,
                    size: item.size,
                    quantity: item.quantity || 1,
                    price: item.price || 0,
                    productName: item.productName,
                    productId: item.productId,
                    colorName: item.colorName,
                    image: item.image,
                  },
                })
              } catch (createError) {
                const typedError = createError as any
                if (typedError.code === 'P2002') {
                  // Код для порушення унікального обмеження в Prisma
                  console.log(
                    `Handling unique constraint violation for: ${itemKey}`
                  )

                  // Спробуємо оновити існуючий запис
                  try {
                    const existingRecord = await prisma.cartItem.findFirst({
                      where: {
                        cartId: cart.id,
                        variantId: item.variantId,
                        size: item.size,
                      },
                    })

                    if (existingRecord) {
                      await prisma.cartItem.update({
                        where: { id: existingRecord.id },
                        data: {
                          quantity:
                            existingRecord.quantity + (item.quantity || 1),
                        },
                      })
                    }
                  } catch (updateError) {
                    console.error(
                      `Failed to update existing item after constraint error: ${updateError}`
                    )
                  }
                } else {
                  // Якщо помилка не пов'язана з унікальним обмеженням, просто логуємо її
                  console.error(
                    `Error creating cart item: ${
                      typedError.message || 'Unknown error'
                    }`
                  )
                }
              }
            }
          }
        } catch (itemError) {
          console.error('Error processing cart item:', itemError)
          // Продовжуємо з наступним елементом
          continue
        }
      }
    }

    // Повертаємо оновлену корзину з детальною інформацією про товари
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
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

    if (!updatedCart) {
      throw apiErrors.notFound('Cart')
    }

    // Трансформуємо дані для правильного формату CartItem
    const transformedItems = updatedCart.items.map(item => ({
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
      id: updatedCart.id,
      userId: updatedCart.userId,
      items: transformedItems,
    })
  } catch (error) {
    console.error('Error syncing cart:', error)
    throw error
  }
}

export const POST = async (req: NextRequest) => {
  try {
    return await syncCart(req)
  } catch (error) {
    return handleApiError(error)
  }
}
