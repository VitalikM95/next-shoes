export type LoginFormData = {
  email: string
  password: string
}

export type RegisterFormData = {
  fullName: string
  email: string
  password: string
}

export type UserRole = 'USER' | 'ADMIN'

export interface UserWithoutPassword {
  id: string
  fullName: string
  email: string
  role: UserRole
  hasPassword: boolean
}

export interface AuthUser {
  id: string
  email: string
  name?: string
  role?: UserRole
}
