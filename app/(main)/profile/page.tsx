import { Button } from '@/components/ui/button'
import SignOutButton from './components/SignOutButton'
import { getCurrentUser } from '@/lib/db/user'
import { getUserOrders } from '@/lib/db/orders'
import Image from 'next/image'
import ProfileForm from './components/ProfileForm'
import OrdersTable from './components/OrdersTable'

const ProfilePage = async () => {
  const user = await getCurrentUser()
  const orders = await getUserOrders()

  return (
    <div className="mx-auto my-5 flex max-w-screen-xl flex-col px-5">
      <div className="flex justify-end border-b-2 border-black px-5 py-2">
        <SignOutButton />
      </div>
      <div className="relative my-2 flex flex-col items-center">
        <Image
          src="/blank-profile.webp"
          alt="profile image"
          width={160}
          height={160}
          className="mt-10"
        />
        <div className="mx-auto mb-5 flex flex-col px-2">
          <ProfileForm user={user} />
        </div>
      </div>

      <OrdersTable orders={orders} />
    </div>
  )
}

export default ProfilePage
