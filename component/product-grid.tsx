"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types/product"
import { ProductCard } from "./product-card"
import type { FilterOptions } from "./product-filter"
import { useProducts } from "@/hooks/use-products" // Add this import

interface ProductGridProps {
  filters?: FilterOptions
}

export function ProductGrid({ filters }: ProductGridProps) {
  const { products } = useProducts() // Use the shared products state
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  useEffect(() => {
    if (!filters) {
      setFilteredProducts(products)
      return
    }

    let result = [...products]

    // Filtrar por categoria
    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category || ""))
    }

    // Filtrar por faixa de preço
    result = result.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Filtrar por tipo de tecido
    if (filters.fabricTypes.length > 0) {
      result = result.filter((product) => filters.fabricTypes.includes(product.fabric || ""))
    }

    setFilteredProducts(result)
  }, [filters])

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">Nenhum produto encontrado com os filtros selecionados.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
