// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { SlidersHorizontal } from "lucide-react"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetFooter,
//   SheetClose,
// } from "@/components/ui/sheet"

// interface ProductFilterProps {
//   onFilterChange: (filters: FilterOptions) => void
// }

// export interface FilterOptions {
//   categories: string[]
//   priceRange: [number, number]
//   fabricTypes: string[]
// }

// export function ProductFilter({ onFilterChange }: ProductFilterProps) {
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

//   const applyFilters = () => {
//     onFilterChange({
//       categories: [],
//       priceRange: [0, 500],
//       fabricTypes: [],
//     })
//     setIsMobileFilterOpen(false)
//   }

//   const FilterContent = () => (
//     <div className="space-y-6">
//       <div className="text-center py-8 text-gray-500">
//         Nenhum filtro disponível no momento
//       </div>
//     </div>
//   )

//   return (
//     <>
//       {/* Versão Desktop */}
//       <div className="hidden md:block w-full max-w-[250px]">
//         <div className="sticky top-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Filtros</h2>
//           </div>
//           <FilterContent />
//         </div>
//       </div>

//       {/* Versão Mobile */}
//       <div className="md:hidden w-full">
//         <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
//           <SheetTrigger asChild>
//             <Button variant="outline" className="w-full flex items-center justify-center gap-2">
//               <SlidersHorizontal className="h-4 w-4" />
//               Filtrar Produtos
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="bottom" className="h-[85vh]">
//             <SheetHeader>
//               <SheetTitle>Filtros</SheetTitle>
//               <SheetDescription>Refine sua busca por produtos</SheetDescription>
//             </SheetHeader>
//             <div className="py-4 overflow-y-auto">
//               <FilterContent />
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </>
//   )
// }
