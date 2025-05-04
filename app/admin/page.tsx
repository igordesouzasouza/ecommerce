"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Upload, X, Edit, Trash2, LogOut, Loader2, ChevronLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/types/product"
import { useAuth } from "@/component/auth-provider"

// Dados simulados para o preview
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Vestido Floral",
    description: "Vestido elegante com estampa floral para ocasiões especiais",
    price: 299.9,
    images: ["/placeholder.svg?height=400&width=300"],
    sizes: ["P", "M", "G"],
    colors: ["Azul", "Rosa"],
    category: "vestidos",
    fabric: "algodao",
  },
  {
    id: "2",
    name: "Blusa de Seda",
    description: "Blusa de seda com acabamento artesanal",
    price: 189.9,
    images: ["/placeholder.svg?height=400&width=300"],
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco", "Preto"],
    category: "blusas",
    fabric: "seda",
  },
  {
    id: "3",
    name: "Calça Alfaiataria",
    description: "Calça de alfaiataria com corte reto",
    price: 259.9,
    images: ["/placeholder.svg?height=400&width=300"],
    sizes: ["38", "40", "42", "44"],
    colors: ["Preto", "Bege"],
    category: "calcas",
    fabric: "linho",
  },
]

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    images: [],
    sizes: [],
    colors: [],
    category: "",
    fabric: "",
  })
  const [newSize, setNewSize] = useState("")
  const [newColor, setNewColor] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Versão simplificada para preview
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleAddProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.fabric
    ) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    try {
      setIsSubmitting(true)

      // Simulação para o preview
      setTimeout(() => {
        const newId = `${products.length + 1}`
        const imageUrl = imagePreview || "/placeholder.svg?height=400&width=300"

        const productData = {
          id: newId,
          name: newProduct.name || "",
          description: newProduct.description || "",
          price: newProduct.price || 0,
          images: [imageUrl],
          sizes: newProduct.sizes || [],
          colors: newProduct.colors || [],
          category: newProduct.category || "",
          fabric: newProduct.fabric || "",
        }

        setProducts([...products, productData])

        // Limpar o formulário
        setNewProduct({
          name: "",
          description: "",
          price: 0,
          images: [],
          sizes: [],
          colors: [],
          category: "",
          fabric: "",
        })
        setImagePreview(null)
        setImageFile(null)

        alert("Produto adicionado com sucesso!")
        setIsSubmitting(false)
      }, 1000)
    } catch (error) {
      console.error("Erro ao adicionar produto:", error)
      alert("Erro ao adicionar produto. Por favor, tente novamente.")
      setIsSubmitting(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return

    try {
      // Simulação para o preview
      setProducts(products.filter((product) => product.id !== id))
    } catch (error) {
      console.error("Erro ao excluir produto:", error)
      alert("Erro ao excluir produto. Por favor, tente novamente.")
    }
  }

  const handleAddSize = () => {
    if (!newSize) return
    setNewProduct({
      ...newProduct,
      sizes: [...(newProduct.sizes || []), newSize],
    })
    setNewSize("")
  }

  const handleRemoveSize = (size: string) => {
    setNewProduct({
      ...newProduct,
      sizes: newProduct.sizes?.filter((s) => s !== size),
    })
  }

  const handleAddColor = () => {
    if (!newColor) return
    setNewProduct({
      ...newProduct,
      colors: [...(newProduct.colors || []), newColor],
    })
    setNewColor("")
  }

  const handleRemoveColor = (color: string) => {
    setNewProduct({
      ...newProduct,
      colors: newProduct.colors?.filter((c) => c !== color),
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)

    // Criar URL temporária para visualização
    const imageUrl = URL.createObjectURL(file)
    setImagePreview(imageUrl)
  }

  const handleLogout = async () => {
    try {
      logout()
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  // Simulação de carregamento para o preview
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        </div>
        <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </Button>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="add">Adicionar Produto</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Produtos</CardTitle>
              <CardDescription>Visualize, edite ou remova produtos do catálogo.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Tecido</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price)}
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.fabric}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Produto</CardTitle>
              <CardDescription>Preencha os detalhes para adicionar um novo produto ao catálogo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Produto *</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Ex: Vestido Floral"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                      placeholder="Ex: 299.90"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vestidos">Vestidos</SelectItem>
                        <SelectItem value="blusas">Blusas</SelectItem>
                        <SelectItem value="calcas">Calças</SelectItem>
                        <SelectItem value="saias">Saias</SelectItem>
                        <SelectItem value="blazers">Blazers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fabric">Tipo de Tecido *</Label>
                    <Select
                      value={newProduct.fabric}
                      onValueChange={(value) => setNewProduct({ ...newProduct, fabric: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tecido" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="algodao">Algodão</SelectItem>
                        <SelectItem value="seda">Seda</SelectItem>
                        <SelectItem value="linho">Linho</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição *</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Descreva o produto em detalhes"
                      rows={4}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Imagem do Produto</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {imagePreview ? (
                        <div className="relative w-full aspect-square mb-4">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setImagePreview(null)
                              setImageFile(null)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="py-8">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Arraste uma imagem ou clique para fazer upload
                          </p>
                        </div>
                      )}
                      <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("image")?.click()}
                        className="mt-2"
                      >
                        Selecionar Imagem
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Imagem da Tabela de Medidas </Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {imagePreview ? (
                        <div className="relative w-full aspect-square mb-4">
                          <img
                            src={imagePreview || "/place.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-md"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setImagePreview(null)
                              setImageFile(null)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="py-8">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Arraste uma imagem ou clique para fazer upload
                          </p>
                        </div>
                      )}
                      <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("image")?.click()}
                        className="mt-2"
                      >
                        Selecionar Imagem
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tamanhos Disponíveis</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newProduct.sizes?.map((size) => (
                        <div key={size} className="flex items-center bg-muted rounded-md px-2 py-1">
                          <span className="text-sm">{size}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 ml-1"
                            onClick={() => handleRemoveSize(size)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input value={newSize} onChange={(e) => setNewSize(e.target.value)} placeholder="Ex: M" />
                      <Button variant="outline" size="icon" onClick={handleAddSize}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Cores Disponíveis</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newProduct.colors?.map((color) => (
                        <div key={color} className="flex items-center bg-muted rounded-md px-2 py-1">
                          <span className="text-sm">{color}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 ml-1"
                            onClick={() => handleRemoveColor(color)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input value={newColor} onChange={(e) => setNewColor(e.target.value)} placeholder="Ex: Azul" />
                      <Button variant="outline" size="icon" onClick={handleAddColor}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddProduct} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adicionando...
                  </>
                ) : (
                  "Adicionar Produto"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
