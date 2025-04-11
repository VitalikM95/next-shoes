import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
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

// Додаємо обробку помилок при закритті з'єднання
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

export { prisma }
