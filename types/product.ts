export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  sizes?: string[]
  colors?: string[]
  category?: string
  fabric?: string
}
