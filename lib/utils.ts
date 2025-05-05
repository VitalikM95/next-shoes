import { clsx, type ClassValue } from 'clsx'
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

export function formatPrice(price: number) {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
