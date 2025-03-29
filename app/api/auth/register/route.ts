import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
})

const registerUser = async (req: NextRequest) => {
  try {
    const data = await req.json()
    const validatedData = registerSchema.parse(data)

    // Перевірка чи користувач вже існує
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error registering user:', error)
    return NextResponse.json(
      { error: 'Error registering user' },
      { status: 500 }
    )
  }
}

export const POST = registerUser
