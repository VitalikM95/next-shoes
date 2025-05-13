import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculatePrice(price: number, discount: number) {
  const discountedPrice = discount ? price - (price * discount) / 100 : price
  return {
    discountedPrice: Math.round(discountedPrice),
    originalPrice: price,
    hasDiscount: discount > 0,
  }
}
