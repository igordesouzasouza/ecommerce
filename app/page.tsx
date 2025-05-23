"use client"

import { useState } from "react"
import { HeroCarousel } from "@/component/hero-carousel"
import { ProductGrid } from "@/component/product-grid"
// import { ProductFilter, type FilterOptions } from "@/component/product-filter"
import { FabricSection } from "@/component/fabric-section"
import { Footer } from "@/component/footer"

export default function Home() {
  // const [filters, setFilters] = useState<FilterOptions>({
  //   categories: [],
  //   priceRange: [0, 500],
  //   fabricTypes: [],
  // })

  // const handleFilterChange = (newFilters: FilterOptions) => {
  //   setFilters(newFilters)
  //   console.log("Filtros aplicados:", newFilters)
  // }

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <HeroCarousel />
        </section>

        

        <section id="produtos">
          <h2 className="text-3xl font-bold mb-8">Nossos Produtos</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* <ProductFilter onFilterChange={handleFilterChange} />
            <div className="flex-1">
              <ProductGrid filters={filters} />
            </div> */}
          </div>
        </section>
        <section className="mb-16" id="tecidos">
          <h2 className="text-3xl font-bold mb-8 mt-6 ml-14">Nossos Tecidos</h2>
          <div className="grid grid-cols-1 gap-6">
            <FabricSection
              id="algodao"
              title="Algodão Premium"
              description="Nosso algodão premium é cultivado organicamente e processado com técnicas sustentáveis. Resulta em tecidos macios, respiráveis e duráveis, perfeitos para o dia a dia."
              image="/placeholder.svg?height=200&width=300"
              products={12}
              className="flex flex-col md:flex-row items-center gap-6 h-56"
              imageClassName="w-full md:w-1/3 rounded-lg h-full object-cover"
              contentClassName="w-full md:w-2/3 space-y-2"
              buttonText="Ver Produtos de Algodão"
            />
            <FabricSection
              id="seda"
              title="Seda Natural"
              description="Nossa seda natural é obtida de forma ética e processada com cuidado artesanal. O resultado são peças com caimento perfeito, brilho sutil e toque incomparável."
              image="/placeholder.svg?height=200&width=300"
              products={8}
              className="flex flex-col md:flex-row items-center gap-6 h-56"
              imageClassName="w-full md:w-1/3 rounded-lg h-full object-cover"
              contentClassName="w-full md:w-2/3 space-y-2"
              buttonText="Ver Produtos de Seda"
            />
            <FabricSection
              id="linho"
              title="Linho Italiano"
              description="Importado diretamente da Itália, nosso linho é conhecido por sua textura única e durabilidade excepcional. Ideal para peças elegantes e confortáveis em climas quentes."
              image="/placeholder.svg?height=200&width=300"
              products={10}
              className="flex flex-col md:flex-row items-center gap-6 h-56"
              imageClassName="w-full md:w-1/3 rounded-lg h-full object-cover"
              contentClassName="w-full md:w-2/3 space-y-2"
              buttonText="Ver Produtos de Linho"
            />
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  )
}
