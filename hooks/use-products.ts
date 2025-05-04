"use client"

// hooks/use-products.ts
import { useState, useEffect } from "react"
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore"

import { db } from "@/lib/firebase"
import type { Product } from "@/types/product"
import type { FilterOptions } from "@/component/product-filter"

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

export function useProducts(filters?: FilterOptions) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        // Use mock data directly
        let fetchedProducts = [...mockProducts]
        
        // Apply filters to mock data
        if (filters) {
          // Filter logic remains the same
          if (filters.categories.length > 0) {
            fetchedProducts = fetchedProducts.filter((product) =>
              filters.categories.includes(product.category || "")
            );
          }
      
          // Filtrar por faixa de preço
          fetchedProducts = fetchedProducts.filter(
            (product) =>
              product.price >= filters.priceRange[0] &&
              product.price <= filters.priceRange[1]
          );
      
          // Filtrar por tipo de tecido
          if (filters.fabricTypes.length > 0) {
            fetchedProducts = fetchedProducts.filter((product) =>
              filters.fabricTypes.includes(product.fabric || "")
            );
          }
        }
      
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Falha ao carregar produtos. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts()
  }, [filters])

  return { products, loading, error }
}
