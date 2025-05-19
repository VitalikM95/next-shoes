export interface OrderItem {
  id: string
  size: string
  quantity: number
  priceAtPurchase: number
}

export interface Order {
  id: string
  orderNumber: number
  totalPrice: number
  createdAt: string
  status:
    | 'PROCESSING'
    | 'CONFIRMED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'COMPLETED'
    | 'CANCELED'
    | 'RETURNED'
  country: string
  itemsCount: number
}

export type OrderItemData = {
  variantId: string
  size: string
  quantity: number
  priceAtPurchase: number
  discountAtPurchase: number
}
