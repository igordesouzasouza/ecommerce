import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FabricSectionProps {
  title: string
  description: string
  image: string
  products: number
  id: string
}

export function FabricSection({ title, description, image, products, id }: FabricSectionProps) {
  return (
    <div id={id} className="relative overflow-hidden rounded-lg">
      <div className="relative h-[300px] md:h-[400px] w-full">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-center p-6 md:p-10">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-sm md:text-base text-white/90 mb-4">{description}</p>
            <div className="flex items-center gap-4">
              <Button asChild className="bg-white">
                <Link href={`/?fabric=${id}`}>Ver Produtos</Link>
              </Button>
              <span className="text-white/80 text-sm">{products} produtos disponíveis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
