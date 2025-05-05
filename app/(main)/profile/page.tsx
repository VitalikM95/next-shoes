import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import SignOutButton from './components/SignOutButton'

import Image from 'next/image'
import { Settings } from 'lucide-react'

const data = [
  {
    number: 1,
    date: '13/08/22',
    address: 'Cassablanca',
    total: 1558,
    status: 'pending',
  },
  {
    number: 2,
    date: '14/08/22',
    address: 'Cassablanca',
    total: 1858,
    status: 'pending',
  },
  {
    number: 3,
    date: '08/08/22',
    address: 'Cassablanca',
    total: 1058,
    status: 'pending',
  },
  {
    number: 4,
    date: '23/08/22',
    address: 'Cassablanca',
    total: 158,
    status: 'pending',
  },
]

const ProfilePage = () => {
  return (
    <div className='flex flex-col px-5 max-w-screen-xl mx-auto my-5'>
      <div className='flex justify-end px-5 py-2 border-b-2 border-black'>
        <SignOutButton />
      </div>
      <div className='flex relative flex-col items-center my-2'>
        <Image
          src='/blank-profile.webp'
          alt='profile image'
          width={160}
          height={160}
          className='mt-10'
        />
        <div className='flex flex-col px-2 mb-5 mx-auto'>
          <div className='text-2xl text-center text-black font-bold mt-5'>
            Name User
          </div>
          <div className='text-lg mt-5'>e-mail: test@test.com</div>
          <div className='text-lg mt-5'>password: **********</div>
          <Button
            variant='outline'
            className='absolute top-0 sm:right-5 right-0 font-bold min-w-40'
          >
            Edit Profile
            <Settings />
          </Button>
        </div>
      </div>

      <div className='font-bold uppercase text-2xl px-5 py-2 my-10 border-b-2 border-black'>
        My orders
      </div>
      <Table className='mb-12'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Order #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Ship To</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              <TableCell className='font-medium'>{item.number}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.total}</TableCell>
              <TableCell className='text-right'>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProfilePage
