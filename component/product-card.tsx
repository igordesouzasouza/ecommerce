"use client"

import Image from "next/image"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
// import { useCart } from "@/hooks/use-cart"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  // const { addToCart } = useCart()

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-64 w-full">
          <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(product.price)}
          </span>
          <Button size="sm"  className="flex items-center gap-1">{/*  onClick={() => addToCart(product)} */}
            <ShoppingCart className="h-4 w-4" />
            <span>Adicionar</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
