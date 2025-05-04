"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function CheckoutButton() {
  const { items } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    if (items.length === 0) return

    try {
      setIsLoading(true)

      // Simulação para o preview
      setTimeout(() => {
        router.push("/success?session_id=simulado")
      }, 1500)
    } catch (error) {
      console.error("Erro ao processar checkout:", error)
      alert("Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.")
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={isLoading || items.length === 0} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processando...
        </>
      ) : (
        "Finalizar Compra"
      )}
    </Button>
  )
}
