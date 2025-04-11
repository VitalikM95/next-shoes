import { GoogleButton } from '@/components/shared/GoogleButton'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    <div className='p-8 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-center mb-6'>Вхід в акаунт</h1>
      <GoogleButton />
      <LoginForm />
    </div>
  )
}
