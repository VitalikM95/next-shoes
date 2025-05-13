'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CreditCard, Truck } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCartSWR } from '@/lib/hooks/useCartSWR'
import { useFormState } from '@/lib/store/checkout-form-store'
import { cn } from '@/lib/utils'

type FormData = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postCode: string
  country: string
  paymentMethod: string
}

const CheckoutForm = () => {
  const { cartItems, totalPrice, clearCart } = useCartSWR()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { data: session, status: authStatus } = useSession()
  const { setSubmitting, setValid } = useFormState()

  // Для уникнення помилок гідратації
  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      fullName: session?.user?.name || '',
      email: session?.user?.email || '',
      phone: '',
      address: '',
      city: '',
      postCode: '',
      country: 'Ukraine',
      paymentMethod: 'card',
    },
    mode: 'onChange', // Валідація при кожній зміні для активації кнопки
  })

  // Оновлюємо стан валідації в сховищі при зміні isValid
  useEffect(() => {
    setValid(isValid)
  }, [isValid, setValid])

  // Оновлюємо стан відправки форми в сховищі
  useEffect(() => {
    setSubmitting(isSubmitting)
  }, [isSubmitting, setSubmitting])

  const onSubmit = async (data: FormData) => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setIsSubmitting(true)

    try {
      // Створюємо структурований формат адреси з розділювачами для можливості парсингу в майбутньому
      // Формат: address|city|postCode|country
      const structuredAddress = `${data.address}|${data.city}|${data.postCode}|${data.country}`

      // Формуємо дані для відправки на сервер
      const orderData = {
        address: structuredAddress,
        phone: data.phone,
        totalPrice: totalPrice,
        country: data.country,
        items: cartItems.map(item => ({
          variantId: item.variantId,
          size: item.size,
          quantity: item.quantity,
          priceAtPurchase: item.price,
          discountAtPurchase: 0, // За замовчуванням, якщо немає знижки
        })),
      }

      // Для авторизованих користувачів відправляємо замовлення на сервер
      if (authStatus === 'authenticated') {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Error during checkout')
        }
      } else {
        // Для неавторизованих користувачів просто імітуємо обробку замовлення
        // В реальності тут могла б бути відправка на інший API ендпоінт, який не вимагає авторизації
        console.log('Guest order placed:', orderData)

        // Імітуємо невелику затримку для кращого UX
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      // Очищаємо корзину після успішного оформлення замовлення
      clearCart()

      toast.success('Your order has been placed successfully!')
      router.push('/')
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
      console.error('Order error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border-r-2 border-black px-10 pt-5">
      <h1 className="mb-5 text-2xl font-bold">Checkout</h1>

      {/* Express checkout кнопки */}
      <div className="mb-8">
        <p className="mb-4 font-semibold">Express checkout</p>
        <div className="grid grid-cols-3 gap-2">
          <Button className="bg-[#5433fb]">Shop Pay</Button>
          <Button className="bg-[#ffc439]">PayPal</Button>
          <Button>G Pay</Button>
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <div className="h-px flex-grow bg-gray-300"></div>
        <span className="mx-4 text-gray-500">OR</span>
        <div className="h-px flex-grow bg-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate id="checkout-form">
        {/* Shipping Information */}
        <div className="mb-6">
          <div className="mb-4 flex items-center font-bold">
            <Truck className="mr-2 h-5 w-5" />
            <span>Shipping Information</span>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                {...register('fullName', {
                  required: 'Full name is required',
                })}
                placeholder="Full Name"
                className={cn(
                  'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                  'focus-visible:ring-0 focus-visible:ring-offset-0',
                )}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  placeholder="Email"
                  type="email"
                  className={cn(
                    'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                    'focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Only numbers are allowed',
                    },
                  })}
                  placeholder="Phone Number"
                  className={cn(
                    'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                    'focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Input
                {...register('address', {
                  required: 'Address is required',
                })}
                placeholder="Address"
                className={cn(
                  'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                  'focus-visible:ring-0 focus-visible:ring-offset-0',
                )}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Input
                  {...register('city', {
                    required: 'City is required',
                  })}
                  placeholder="City"
                  className={cn(
                    'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                    'focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register('postCode', {
                    required: 'Postal code is required',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Only numbers are allowed',
                    },
                  })}
                  placeholder="Postal Code"
                  className={cn(
                    'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                    'focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                />
                {errors.postCode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.postCode.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  className={cn(
                    'w-full rounded-none border border-black py-2 pl-3 pr-10',
                    'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                    'focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                  {...register('country', {
                    required: 'Country is required',
                  })}
                >
                  <option value="Ukraine">Ukraine</option>
                  <option value="Poland">Poland</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <div className="mb-4 flex items-center font-bold">
            <CreditCard className="mr-2 h-5 w-5" />
            <span>Payment Method</span>
          </div>

          <div className="space-y-4">
            <div className="mt-4 space-y-4">
              <Input
                placeholder="Card Number"
                className={cn(
                  'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                  'focus-visible:ring-0 focus-visible:ring-offset-0',
                )}
                value="4242 4242 4242 4242"
                readOnly
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Expiry Date (MM/YY)"
                  className={cn(
                    'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                    'focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                  value="12/25"
                  readOnly
                />

                <Input
                  placeholder="Security Code (CVC)"
                  className={cn(
                    'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                    'focus-visible:ring-0 focus-visible:ring-offset-0',
                  )}
                  value="123"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
