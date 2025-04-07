import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { handleApiError, apiErrors } from '@/lib/api/error-handler'

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

const login = async (req: NextRequest) => {
  const data = await req.json()
  const validatedData = loginSchema.parse(data)

  // Пошук користувача
  const user = await prisma.user.findUnique({
    where: { email: validatedData.email },
  })

  if (!user || !user.password) {
    throw apiErrors.unauthorized('Invalid email or password')
  }

  // Перевірка паролю
  const isPasswordValid = await bcrypt.compare(
    validatedData.password,
    user.password
  )

  if (!isPasswordValid) {
    throw apiErrors.unauthorized('Invalid email or password')
  }

  // Повертаємо дані користувача (без паролю)
  return NextResponse.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  })
}

export const POST = async (req: NextRequest) => {
  try {
    return await login(req)
  } catch (error) {
    return handleApiError(error)
  }
}
