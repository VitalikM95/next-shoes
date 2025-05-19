import { z } from 'zod'

// Common params interfaces
export interface ProductParams {
  params: { id: string }
}

export interface CartItemParams {
  params: { itemId: string }
}

// Auth types
export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
})

export type RegisterData = z.infer<typeof registerSchema>

// User types
export const createUserSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
})

export const updateUserSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
})

export type CreateUserData = z.infer<typeof createUserSchema>
export type UpdateUserData = z.infer<typeof updateUserSchema>
export type CreateOrderData = z.infer<typeof createOrderSchema>

// Cart types
export interface AddCartItemData {
  variantId: string
  size: string
  quantity: number
  price: number
  productName?: string
  productId?: string
  colorName?: string
  image?: string
}

// Order types
export const createOrderSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
  totalPrice: z.number().min(0, 'Total price must be positive'),
  country: z.string().default('Ukraine'),
  items: z.array(
    z.object({
      variantId: z.string(),
      size: z.string(),
      quantity: z.number().min(1),
      priceAtPurchase: z.number(),
      discountAtPurchase: z.number(),
    }),
  ),
})

export interface ApiError {
  message: string
  status: number
  details?: unknown
}
