import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FabricSectionProps {
  id: string
  title: string
  description: string
  image: string
  products: number
  className?: string
  imageClassName?: string
  contentClassName?: string
  buttonText: string
}

export function FabricSection({
  id,
  title,
  description,
  image,
  products,
  className = "",
  imageClassName = "",
  contentClassName = "",
  buttonText
}: FabricSectionProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${className}`}>
      <img
        src={image}
        alt={title}
        className={imageClassName}
      />
      <div className={contentClassName}>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        <Button 
          variant="default" 
          className="mt-2"
          onClick={() => window.location.href = `#${id}`}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
