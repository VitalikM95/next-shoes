import RegisterForm from './RegisterForm'
import { GoogleButton } from '@/components/shared/GoogleButton'
export default function RegisterPage() {
  return (
    <div className='p-8 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-center mb-6'>Створення акаунту</h1>
      <GoogleButton />
      <RegisterForm />
    </div>
  )
}
