export interface CheckoutFormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postCode: string
  country: string
  paymentMethod: string
}

export interface OrderItem {
  variantId: string
  size: string
  quantity: number
  priceAtPurchase: number
  discountAtPurchase: number
}

export interface CheckoutOrderData {
  address: string
  phone: string
  totalPrice: number
  country: string
  items: OrderItem[]
}
