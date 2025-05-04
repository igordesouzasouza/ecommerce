"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { useCart } from "../hooks/use-cart"
import { useAuth } from "@/component/auth-provider"

export function Header() {
  // const { openCart, totalItems } = useCart()
  const { isAuthenticated } = useAuth()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Ateliê Exclusivo
        </Link>

        <div className="flex items-center gap-4">
          <Link href={isAuthenticated ? "/admin" : "/login"}>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Button variant="ghost" size="icon"  className="relative">
          {/* onClick={openCart} */}
            <ShoppingCart className="h-5 w-5" />
            {/* {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems} */}
              {/* </span> */}
            {/* )} */}
          </Button>
        </div>
      </div>
    </header>
  )
}
