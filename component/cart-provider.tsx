// "use client"

// import { useState, type ReactNode, useContext } from "react"
// import type { Product } from "@/types/product"
// import { CartContext } from "@/contexts/cart-context"
// import { CartSidebar } from "./cart-sidebar"

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [items, setItems] = useState<Array<{
//     product: Product;
//     quantity: number;
//     size?: string;
//     color?: string;
//   }>>([])
//   const [isOpen, setIsOpen] = useState(false)

//   const addToCart = (product: Product, size?: string, color?: string) => {
//     setItems((prevItems) => {
//       // Verificar se o produto já está no carrinho
//       const existingItemIndex = prevItems.findIndex(
//         (item) => item.product.id === product.id && item.size === size && item.color === color,
//       )

//       if (existingItemIndex > -1) {
//         // Se o produto já existe, aumentar a quantidade
//         const updatedItems = [...prevItems]
//         updatedItems[existingItemIndex].quantity += 1
//         return updatedItems
//       } else {
//         // Se o produto não existe, adicionar ao carrinho
//         return [...prevItems, { product, quantity: 1, size, color }]
//       }
//     })

//     // Abrir o carrinho quando um item é adicionado
//     setIsOpen(true)
//   }

//   const removeFromCart = (productId: string) => {
//     setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
//   }

//   const updateQuantity = (productId: string, quantity: number) => {
//     setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
//   }

//   const clearCart = () => {
//     setItems([])
//   }

//   const openCart = () => {
//     setIsOpen(true)
//   }

//   const closeCart = () => {
//     setIsOpen(false)
//   }

//   // Corrigir o cálculo do totalPrice para garantir precisão
//   const totalItems = items.reduce((total, item) => total + item.quantity, 0)

//   // Usar toFixed(2) para garantir precisão de 2 casas decimais e converter de volta para número
//   const totalPrice = items.reduce((total, item) => {
//     const itemTotal = item.product.price * item.quantity
//     return total + itemTotal
//   }, 0)

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         isOpen,
//         openCart,
//         closeCart,
//         totalItems,
//         totalPrice,
//       }}
//     >
//       {children}
//       <CartSidebar />
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider")
//   }
//   return context
// }

// // export { CartContext }
