import { prisma } from './prisma-client'
import { hashSync } from 'bcrypt'
import { data } from '../temp'

async function generateUsers() {
  await prisma.user.createMany({
    data: [
      {
        email: 'user@gmail.com',
        fullName: 'User',
        password: hashSync('123456', 10),
        role: 'USER',
      },
      {
        email: 'admin@gmail.com',
        fullName: 'Admin',
        password: hashSync('123456', 10),
        role: 'ADMIN',
      },
    ],
  })
}

async function generateProducts() {
  for (const product of data) {
    await prisma.product.create({
      data: {
        name: product.name,
        male: product.male,
        type: product.type,
        bestFor: product.best_for,
        material: product.material,
        price: product.price,
        discountPercent: product.discountPercent,
        highlights: product.highlights,
        details: product.details,
        sustainability: product.sustainability,
        careGuide: product.care_guide,
        otherInfo: product.other_info,
        variants: {
          create: product.variants.map(variant => ({
            colorType: variant.color.type,
            colorName: variant.color.name,
            colorHash: variant.color.hash,
            images: variant.images,
            sizes: variant.sizes,
          })),
        },
      },
    })
  }
}

async function clear() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()
}

async function main() {
  try {
    console.log('🗑️ Cleaning up the database...')
    await clear()

    console.log('🌱 Generating users data...')
    await generateUsers()

    console.log('🌱 Generating products data...')
    await generateProducts()

    console.log('✅ Seed completed successfully')
  } catch (e) {
    console.error('❌ Error:', e)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
