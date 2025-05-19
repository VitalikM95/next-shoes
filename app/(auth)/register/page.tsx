import { Suspense } from 'react'

import { GoogleButton } from '@/components/shared/GoogleButton'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold uppercase">
        Create an account
      </h1>
      <Suspense fallback={null}>
        <GoogleButton />
      </Suspense>
      <RegisterForm />
    </div>
  )
}
