export type ProductListType = Product[]

export interface Product {
  name: string
  male: string
  type: string[]
  best_for: string[]
  material: string
  price: number
  discountPercent: number
  other_info: OtherInfo[]
  highlights: string
  details: string
  sustainability: string
  care_guide: string
  variants: Variant[]
}

interface OtherInfo {
  img: string
  title: string
  text: string
}

interface Variant {
  color: Color
  images: string[]
  sizes: string[]
}

interface Color {
  type: string
  name: string
  hash: string
}
