import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { handleApiError, apiErrors } from '@/lib/api/error-handler'

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
})

const registerUser = async (req: NextRequest) => {
  const data = await req.json()
  const validatedData = registerSchema.parse(data)

  // Перевірка чи користувач вже існує
  const existingUser = await prisma.user.findUnique({
    where: { email: validatedData.email },
  })

  if (existingUser) {
    throw apiErrors.validation('User with this email already exists')
  }

  // Хешування паролю
  const hashedPassword = await bcrypt.hash(validatedData.password, 10)

  // Створення користувача
  const user = await prisma.user.create({
    data: {
      ...validatedData,
      password: hashedPassword,
    },
  })

  return NextResponse.json(
    {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
    { status: 201 }
  )
}

export const POST = async (req: NextRequest) => {
  try {
    return await registerUser(req)
  } catch (error) {
    return handleApiError(error)
  }
}
