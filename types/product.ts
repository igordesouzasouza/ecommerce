export interface Product {
  id: string
  name: string
  description: string
  sizes: string[] // Array of strings representing available sizes
  price: number
  images: string[]
  colors: string[]
  category: string
  fabric: string
  measurements?: {
    bust: string
    waist: string
    hip: string
    length?: string
  }
}
