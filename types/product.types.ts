export type ProductListType = Product[]

export interface Product {
  id: string
  name: string
  male: string
  type: string[]
  bestFor: string[]
  material: string
  price: number
  discountPercent: number
  otherInfo: OtherInfo[]
  highlights: string
  details: string
  sustainability: string
  careGuide: string
  variants: Variant[]
}

export interface OtherInfo {
  img: string
  title: string
  text: string
}

export interface Variant {
  id: string
  colorType: string
  colorName: string
  colorHash: string
  images: string[]
  sizes: string[]
}

export interface ProductListItem {
  id: string
  name: string
  male: string
  type: string[]
  bestFor: string[]
  material: string
  price: number
  discountPercent: number
  variants: Variant[]
}
