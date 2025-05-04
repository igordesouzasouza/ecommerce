"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

interface ProductFilterProps {
  onFilterChange: (filters: FilterOptions) => void
}

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  fabricTypes: string[]
}

const categoryOptions = [
  { id: "vestidos", label: "Vestidos" },
  { id: "blusas", label: "Blusas" },
  { id: "calcas", label: "Calças" },
  { id: "saias", label: "Saias" },
  { id: "blazers", label: "Blazers" },
]

const fabricOptions = [
  { id: "algodao", label: "Algodão" },
  { id: "seda", label: "Seda" },
  { id: "linho", label: "Linho" },
]

export function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, category]
      } else {
        return prev.filter((c) => c !== category)
      }
    })
  }

  const handleFabricChange = (fabric: string, checked: boolean) => {
    setSelectedFabrics((prev) => {
      if (checked) {
        return [...prev, fabric]
      } else {
        return prev.filter((f) => f !== fabric)
      }
    })
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  const removeFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 500])
    setSelectedFabrics([])
    onFilterChange({
      categories: [],
      priceRange: [0, 500],
      fabricTypes: [],
    })
  }
  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      priceRange: priceRange,
      fabricTypes: selectedFabrics,
    })
    setIsMobileFilterOpen(false)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 500])
    setSelectedFabrics([])
    onFilterChange({
      categories: [],
      priceRange: [0, 500],
      fabricTypes: [],
    })
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categorias */}
      <div>
        <h3 className="text-lg font-medium mb-3">Categorias</h3>
        <div className="space-y-2">
          {categoryOptions.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Faixa de Preço
      <div>
        <h3 className="text-lg font-medium mb-3 ">Faixa de Preço</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 500]}
            max={500}
            step={10}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={handlePriceChange}
            className="mb-6 bg-black"
          />
          <div className="flex justify-between text-sm ">
            <span>
              R$ {priceRange[0].toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span>
              R$ {priceRange[1].toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div> */}

      {/* Tipos de Tecido */}
      <div>
        <h3 className="text-lg font-medium mb-3">Tipos de Tecido</h3>
        <div className="space-y-2">
          {fabricOptions.map((fabric) => (
            <div key={fabric.id} className="flex items-center space-x-2">
              <Checkbox
                id={`fabric-${fabric.id}`}
                checked={selectedFabrics.includes(fabric.id)}
                onCheckedChange={(checked) => handleFabricChange(fabric.id, checked === true)}
              />
              <Label htmlFor={`fabric-${fabric.id}`} className="text-sm cursor-pointer">
                {fabric.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Ação (apenas para versão mobile) */}
      <div className="flex flex-col gap-2 md:hidden">
        <Button onClick={applyFilters} className="w-full">
          Aplicar Filtros
        </Button>
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Limpar Filtros
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Versão Desktop */}
      <div className="hidden md:block w-full max-w-[250px]">
        <div className="sticky top-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Filtros</h2>
            {(selectedCategories.length > 0 ||
              selectedFabrics.length > 0 ||
              priceRange[0] > 0 ||
              priceRange[1] < 500) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            )}
          </div>
          <FilterContent />
          <Button onClick={applyFilters} className="w-full mt-6">
            Aplicar Filtros
          </Button>
          <Button onClick={removeFilters} className="w-full mt-6 bg-black text-white" variant="destructive">
            Remover Filtros
          </Button>
        </div>
        
      </div>

      {/* Versão Mobile */}
      <div className="md:hidden w-full">
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtrar Produtos
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh]">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>Refine sua busca por produtos</SheetDescription>
            </SheetHeader>
            <div className="py-4 overflow-y-auto">
              <FilterContent />
            </div>
            <SheetFooter className="flex flex-row gap-2 sm:justify-start">
              <SheetClose asChild>
                <Button onClick={applyFilters}>Aplicar Filtros</Button>
              </SheetClose>
              <Button variant="outline" onClick={clearFilters}>
                Limpar Filtros
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
