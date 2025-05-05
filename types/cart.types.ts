export interface CartItemType {
  id: string
  variantId: string
  size: string
  quantity: number
  price: number
  productName: string
  productId: string
  colorName: string
  image: string
}

export interface CartTotalType {
  totalItems: number
  totalPrice: number
}
