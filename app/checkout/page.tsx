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

      <div className="mx-auto my-2 max-w-screen-xl px-2 sm:px-6">
        <div className="border-b border-black sm:border-b-2 sm:border-black px-2 sm:px-5 py-3 sm:pb-5">
          <Link
            href="/"
            aria-label="Home"
            className="flex w-fit items-center gap-2"
          >
            <House size={20} className="sm:w-8 sm:h-8" />
            <Image
              src="/logo.svg"
              alt="logo"
              width={150}
              height={75}
              className="w-32 sm:w-40 md:w-[200px] h-auto"
              priority
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 sm:mt-0">
          <CheckoutForm />
          <OrderSummary />
        </div>
      </div>
    </>
  )
}
