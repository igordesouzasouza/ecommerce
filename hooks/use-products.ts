"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore"

import { db } from "@/lib/firebase"
import type { Product } from "@/types/product"
// import type { FilterOptions } from "@/component/product-filter"

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Vestido Floral",
    description: "Vestido elegante com estampa floral",
    price: 299.9,
    images: ["/placeholder.svg?height=400&width=300"],
    sizes: ["P", "M", "G"],
    colors: ["Azul", "Rosa"],
    category: "vestidos",
    fabric: "algodao",
  },
  {
    id: "1",
    name: "Vestido Floral",
    description: "Vestido elegante com estampa floral",
    price: 299.9,
    images: ["/placeholder.svg?height=400&width=300"],
    sizes: ["P", "M", "G"],
    colors: ["Azul", "Rosa"],
    category: "vestidos",
    fabric: "algodao",
  },
  {
    id: "1",
    name: "Vestido Floral",
    description: "Vestido elegante com estampa floral",
    price: 299.9,
    images: ["/placeholder.svg?height=400&width=300"],
    sizes: ["P", "M", "G"],
    colors: ["Azul", "Rosa"],
    category: "vestidos",
    fabric: "algodao",
  },
  {
    id: "1",
    name: "Vestido Floral",
    description: "Vestido elegante com estampa floral",
    price: 299.9,
    images: ["/placeholder.svg?height=400&width=300"],
    sizes: ["P", "M", "G"],
    colors: ["Azul", "Rosa"],
    category: "vestidos",
    fabric: "algodao",
  },
  // Add more mock products as needed
]

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        // Use mock data directly, no filters
        setProducts([...mockProducts])
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Falha ao carregar produtos. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts()
  }, []) // Remove filters from dependency array

  return { products, loading, error }
}
