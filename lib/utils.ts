import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

interface PriceCalculation {
  discountedPrice: number
  originalPrice: number
  hasDiscount: boolean
}

export function calculatePrice(
  price: number,
  discount: number,
): PriceCalculation {
  const discountedPrice = discount ? price - (price * discount) / 100 : price
  return {
    discountedPrice: Math.round(discountedPrice),
    originalPrice: price,
    hasDiscount: discount > 0,
  }
}
