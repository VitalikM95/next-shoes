import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
  var isBeforeExitHandlerRegistered: boolean | undefined
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: process.env.POSTGRES_URL_NON_POOLING,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

if (!global.isBeforeExitHandlerRegistered) {
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
  global.isBeforeExitHandlerRegistered = true
}

export { prisma }
