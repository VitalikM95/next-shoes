'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings, Save, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { User, ProfileFormData } from '@/types/user.types'

type ProfileFormProps = {
  user: User
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasPassword, setHasPassword] = useState(user.hasPassword || false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      password: '',
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      const hasChanges =
        data.fullName !== user.fullName ||
        data.email !== user.email ||
        (data.password && data.password.trim() !== '')

      if (!hasChanges) {
        setIsEditing(false)
        setIsLoading(false)
        return
      }

      const updateData = {
        id: user.id,
        fullName: data.fullName,
        email: data.email,
      }

      if (data.password && data.password.trim() !== '') {
        Object.assign(updateData, { password: data.password })
      }

      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to update profile')
      }

      const updatedUser = await response.json()

      if (data.password && data.password.trim() !== '') {
        setHasPassword(true)
      }

      toast.success('Profile successfully updated')
      setIsEditing(false)

      reset({
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        password: '',
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Error while updating profile')
    } finally {
      setIsLoading(false)
    }
  }

  const cancelEditing = () => {
    setIsEditing(false)
    reset({
      fullName: user.fullName,
      email: user.email,
      password: '',
    })
  }

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col pt-2 ">
            <span className="font-medium uppercase">User Name:</span>

            <Input
              {...register('fullName', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              className={cn(
                'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                'focus-visible:ring-0 focus-visible:ring-offset-0',
              )}
              placeholder="Your name"
            />
            {errors.fullName && (
              <span className="text-sm text-red-500">
                {errors.fullName.message}
              </span>
            )}

            <div className="mt-3 w-full text-lg">
              <span className="font-medium uppercase">e-mail:</span>
              <Input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email format',
                  },
                })}
                className={cn(
                  'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                  'focus-visible:ring-0 focus-visible:ring-offset-0',
                )}
                placeholder="Your email"
              />
            </div>
            {errors.email && (
              <span className="pt-2 text-sm text-red-500">
                {errors.email.message}
              </span>
            )}

            <div className="mt-3 w-full text-lg">
              <span className="font-medium uppercase">password:</span>
              <Input
                {...register('password', {
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type="password"
                className={cn(
                  'rounded-none border border-black focus:border-2 focus:border-black focus:outline-none',
                  'focus-visible:ring-0 focus-visible:ring-offset-0',
                )}
                placeholder="New password"
              />
            </div>
            {errors.password ? (
              <span className="pt-2 text-sm text-red-500">
                {errors.password.message}
              </span>
            ) : (
              <div className="mt-1 text-sm text-gray-500">
                {hasPassword
                  ? 'Leave empty to not change password'
                  : 'Enter password for your account (you are registered via Google)'}
              </div>
            )}
          </div>

          <div className="absolute right-5 top-0 flex min-w-44 flex-col gap-2">
            <Button
              type="submit"
              variant="outline"
              className="border-green-700 font-semibold text-green-700 hover:bg-green-700 hover:text-white"
              disabled={isLoading}
            >
              Save
              <Save className="ml-2 h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="font-semibold"
              onClick={cancelEditing}
              disabled={isLoading}
            >
              Cancel
              <X className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      ) : (
        <div className="cursor-default">
          <div className="mt-5 text-center text-2xl font-bold text-black">
            {user.fullName}
          </div>
          <div className="mt-5 border-b border-black text-base">
            <span className="font-medium uppercase">e-mail:</span>
            <span className="pl-2 text-gray-500">{user.email}</span>
          </div>
          <div className="mt-5 border-b border-black text-base">
            <span className="font-medium uppercase">password:</span>
            <span className="pl-2 text-gray-500">**********</span>
          </div>
          <Button
            variant="outline"
            className="absolute right-5 top-0 min-w-44 font-semibold"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
            <Settings className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )
}
