"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Trash2, Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import { CheckoutButton } from "@/component/checkout-button"

export function CartSidebar() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="flex justify-between items-center">
            <span>Carrinho de Compras</span>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-4 w-4" />
            </Button>
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="text-muted-foreground mb-4">Seu carrinho está vazio</div>
            <Button variant="outline" onClick={closeCart}>
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-auto py-4">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{item.product.name}</h4>
                    {item.size && <p className="text-xs text-muted-foreground">Tamanho: {item.size}</p>}
                    {item.color && <p className="text-xs text-muted-foreground">Cor: {item.color}</p>}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        }}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.product.price * item.quantity)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {items.length > 0 && (
          <>
            <Separator className="my-4" />
            <SheetFooter className="flex-shrink-0 sm:flex-col">
              <div className="w-full flex justify-between items-center mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalPrice)}
                </span>
              </div>
              <CheckoutButton />
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
