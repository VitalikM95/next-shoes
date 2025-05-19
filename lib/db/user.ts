import { prisma } from '@/prisma/prisma-client'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { apiErrors } from './error-handler'
import { UserWithoutPassword } from '@/types/auth.types'

export async function getCurrentUser(): Promise<UserWithoutPassword> {
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
      password: true,
    },
  })

  if (!user) {
    throw apiErrors.notFound('User')
  }

  const hasPassword = !!user.password

  const { password, ...userWithoutPassword } = user

  return {
    ...userWithoutPassword,
    hasPassword,
  }
}
