import Image from 'next/image'
import Link from 'next/link'
import CheckoutForm from './components/CheckoutForm'
import OrderSummary from './components/OrderSummary'
import { getServerSession } from 'next-auth'
import { authConfig } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { House } from 'lucide-react'
import { prisma } from '@/prisma/prisma-client'
import CartCheck from './components/CartCheck'

export default async function CheckoutPage() {
  const session = await getServerSession(authConfig)

  // Перевіряємо наявність товарів у корзині лише для авторизованих користувачів
  // Для неавторизованих користувачів перевірка буде на стороні клієнта
  if (session?.user?.id) {
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: true,
      },
    })

    // Якщо корзина не існує або в ній немає товарів, перенаправляємо на домашню сторінку
    if (!cart || cart.items.length === 0) {
      redirect('/')
    }
  }

  return (
    <>
      {/* Клієнтський компонент для перевірки локальної корзини незареєстрованих користувачів */}
      <CartCheck />

      <div className="mx-auto my-2 max-w-screen-xl">
        <div className="border-b-2 border-black px-5 pb-5">
          <Link href="/" aria-label="Home" className="flex w-fit items-center">
            <House size={32} />
            <Image src="/logo.svg" alt="logo" width={200} height={100} />
          </Link>
        </div>

        <div className="grid grid-cols-2 ">
          <CheckoutForm />
          <OrderSummary />
        </div>
      </div>
    </>
  )
}
