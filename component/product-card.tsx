"use client"

import Image from "next/image"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-64 w-full">
          <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          <div className="absolute bottom-2 right-2 flex gap-1">
            {product.colors.map((color, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="w-4 h-4 rounded-full border border-white"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{color}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        
        {/* Tabela de Medidas */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-1">Medidas:</p>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-1">Busto</td>
                <td className="py-1 text-right">{product.measurements?.bust || '-'}</td>
              </tr>
              <tr className="border-b">
                <td className="py-1">Cintura</td>
                <td className="py-1 text-right">{product.measurements?.waist || '-'}</td>
              </tr>
              <tr>
                <td className="py-1">Quadril</td>
                <td className="py-1 text-right">{product.measurements?.hip || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(product.price)}
          </span>
          <Button size="sm" className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            <span>Comprar</span>
          </Button>
        </div>
      </div>
    </div>
  )
}


