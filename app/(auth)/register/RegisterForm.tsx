'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
          fullName: formData.get('fullName'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Помилка реєстрації')
      }

      // Після успішної реєстрації авторизуємо користувача та перенаправляємо на профіль
      await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      })
      router.push('/profile')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Щось пішло не так')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label
            htmlFor='fullName'
            className='block text-sm font-medium text-gray-700'
          >
            Повне ім'я
          </label>
          <input
            type='text'
            name='fullName'
            id='fullName'
            required
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            required
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Пароль
          </label>
          <input
            type='password'
            name='password'
            id='password'
            required
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
          />
        </div>

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50'
        >
          {isLoading ? 'Завантаження...' : 'Зареєструватися'}
        </button>
      </form>

      <p className='mt-4 text-center text-sm text-gray-600'>
        Вже маєте акаунт?{' '}
        <Link href='/login' className='text-blue-600 hover:underline'>
          Увійти
        </Link>
      </p>
    </>
  )
}
