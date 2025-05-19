import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import bcrypt from 'bcrypt'

import { prisma } from '@/prisma/prisma-client'
import { handleApiError, apiErrors } from '@/lib/db/error-handler'
import { authConfig } from '@/lib/auth/config'
import { createUserSchema, updateUserSchema } from '@/types/api.types'

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

  const validatedData = createUserSchema.parse(data)

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

  if (id !== session.user.id) {
    throw apiErrors.forbidden('You can only update your own profile')
  }

  const validatedData = updateUserSchema.parse(updateData)

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

  const currentUser = await prisma.user.findUnique({
    where: { id },
    select: {
      password: true,
    },
  })

  if (!currentUser) {
    throw apiErrors.notFound('User')
  }

  const hasPassword =
    currentUser.password !== null &&
    currentUser.password !== undefined &&
    currentUser.password.length > 0

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

  const responseUser = {
    ...user,
    hasPassword: validatedData.password ? true : hasPassword,
  }

  return NextResponse.json(responseUser)
}

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
