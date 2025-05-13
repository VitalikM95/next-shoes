import { GoogleButton } from '@/components/shared/GoogleButton'
import LoginForm from './components/LoginForm'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">Вхід в акаунт</h1>
      <Suspense fallback={null}>
        <GoogleButton />
      </Suspense>
      <LoginForm />
    </div>
  )
}
