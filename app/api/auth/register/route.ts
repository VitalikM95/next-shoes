import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import { prisma } from '@/prisma/prisma-client'
import { handleApiError, apiErrors } from '@/lib/db/error-handler'
import { registerSchema } from '@/types/api.types'

const registerUser = async (req: NextRequest) => {
  const data = await req.json()
  const validatedData = registerSchema.parse(data)

  const existingUser = await prisma.user.findUnique({
    where: { email: validatedData.email },
  })

  if (existingUser) {
    throw apiErrors.validation('User with this email already exists')
  }

  const hashedPassword = await bcrypt.hash(validatedData.password, 10)

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
    { status: 201 },
  )
}

export const POST = async (req: NextRequest) => {
  try {
    return await registerUser(req)
  } catch (error) {
    return handleApiError(error)
  }
}
