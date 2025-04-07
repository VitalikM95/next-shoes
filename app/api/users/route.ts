import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { handleApiError, apiErrors } from '@/lib/api/error-handler'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'

// Схема валідації для створення користувача
const createUserSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
})

// Схема валідації для оновлення користувача
const updateUserSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
})

const getUser = async (req: NextRequest) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!user) {
    throw apiErrors.notFound('User')
  }

  return NextResponse.json(user)
}

const createUser = async (req: NextRequest) => {
  const data = await req.json()

  // Валідація даних
  const validatedData = createUserSchema.parse(data)

  // Перевірка чи користувач з таким email вже існує
  const existingUser = await prisma.user.findUnique({
    where: { email: validatedData.email },
  })

  if (existingUser) {
    throw apiErrors.validation('User with this email already exists')
  }

  // Хешування паролю перед збереженням
  const hashedPassword = await bcrypt.hash(validatedData.password, 10)

  const user = await prisma.user.create({
    data: {
      ...validatedData,
      password: hashedPassword,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return NextResponse.json(user, { status: 201 })
}

const updateUser = async (req: NextRequest) => {
  const session = await getServerSession(authConfig)

  if (!session?.user?.id) {
    throw apiErrors.unauthorized()
  }

  const data = await req.json()
  const { id, ...updateData } = data

  // Перевіряємо чи користувач намагається оновити свої дані
  if (id !== session.user.id) {
    throw apiErrors.forbidden('You can only update your own profile')
  }

  // Валідація даних оновлення
  const validatedData = updateUserSchema.parse(updateData)

  // Якщо оновлюється email, перевіряємо чи він вже існує
  if (validatedData.email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: validatedData.email,
        NOT: { id },
      },
    })

    if (existingUser) {
      throw apiErrors.validation('User with this email already exists')
    }
  }

  // Якщо оновлюється пароль, хешуємо його
  if (validatedData.password) {
    validatedData.password = await bcrypt.hash(validatedData.password, 10)
  }

  const user = await prisma.user.update({
    where: { id },
    data: validatedData,
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      updatedAt: true,
    },
  })

  return NextResponse.json(user)
}

// Експорт функцій для Next.js API роутів
export const GET = async (req: NextRequest) => {
  try {
    return await getUser(req)
  } catch (error) {
    return handleApiError(error)
  }
}

export const POST = async (req: NextRequest) => {
  try {
    return await createUser(req)
  } catch (error) {
    return handleApiError(error)
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    return await updateUser(req)
  } catch (error) {
    return handleApiError(error)
  }
}
