export type User = {
  id: string
  fullName: string
  email: string
  role: string
  hasPassword?: boolean
}

export type ProfileFormData = {
  fullName: string
  email: string
  password: string
}
