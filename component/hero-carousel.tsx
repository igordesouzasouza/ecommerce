"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselItem {
  id: number
  image: string
  title: string
  description: string
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    image: "",
    title: "Nova Coleção Primavera",
    description: "Descubra peças exclusivas feitas à mão com tecidos premium",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Roupas Artesanais",
    description: "Cada peça é única, feita com cuidado e atenção aos detalhes",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Estilo Atemporal",
    description: "Peças que transcendem tendências e permanecem elegantes por anos",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isAutoPlaying, currentSlide])

  // Pausar auto-play quando o mouse estiver sobre o carrossel
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <div className="relative w-full h-full">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-10">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-sm md:text-lg text-white/90 mb-4 max-w-md">{item.description}</p>
                <Button className="w-fit bg-white cursor-pointer" variant={"ghost"}>Ver Coleção</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegação */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border-white/10 text-white hover:bg-white/30"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border-white/10 text-white hover:bg-white/30"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentSlide === index ? "bg-white w-6" : "bg-white/50",
            )}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
