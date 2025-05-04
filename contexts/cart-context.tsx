"use client"

import { createContext, useContext } from "react"
import type { Product } from "@/types/product"

interface CartItem {
  product: Product
  quantity: number
  size?: string
  color?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, size?: string, color?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  totalItems: number
  totalPrice: number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}