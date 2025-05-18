"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types/product"
import { ProductCard } from "./product-card"
// import type { FilterOptions } from "./product-filter"
import { useProducts } from "@/hooks/use-products" // Add this import

// interface ProductGridProps {
//   filters?: FilterOptions
// }

export function ProductGrid() {
  const { products } = useProducts()

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">Nenhum produto disponível.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
