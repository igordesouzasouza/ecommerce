// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Loader2 } from "lucide-react"

// interface FormData {
//   name: string
//   email: string
//   message: string
// }

// interface FormErrors {
//   name?: string
//   email?: string
//   message?: string
// }

// export function ContactForm() {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     message: "",
//   })

  
//   const [errors, setErrors] = useState<FormErrors>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {}

//     if (!formData.name.trim()) {
//       newErrors.name = "Nome é obrigatório"
//     }

//     // if (!formData.email.trim()) {
//     //   newErrors.email = "Email é obrigatório"
//     // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//     //   newErrors.email = "Email inválido"
//     // }

//     if (!formData.message.trim()) {
//       newErrors.message = "Mensagem é obrigatória"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     try {
//       setIsSubmitting(true)
//       // Simulação de envio
//       await new Promise((resolve) => setTimeout(resolve, 1500))
      
      
//       // Limpar formulário após sucesso
//       setFormData({ name: "", email: "", message: "" })
//       alert("Mensagem enviada com sucesso!")
//     } catch (error) {
//       console.error("Erro ao enviar mensagem:", error)
//       alert("Erro ao enviar mensagem. Por favor, tente novamente.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }
  
  
//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Cadastrar uma nova dica Semanal</CardTitle>
//         <CardDescription>Cadastre dicas para seu Cliente</CardDescription>
//       </CardHeader>
//       <form onSubmit={handleSubmit}>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Titulo</Label>
//             <Input
//               id="name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className={errors.name ? "border-red-500" : ""}
//             />
//             {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
//           </div>

//           {/* <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className={errors.email ? "border-red-500" : ""}
//             />
//             {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
//           </div> */}

//           <div className="space-y-2">
//             <Label htmlFor="message">Mensagem</Label>
//             <Textarea
//               id="message"
//               value={formData.message}
//               onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//               className={errors.message ? "border-red-500" : ""}
//               rows={4}
//             />
//             {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
//           </div>
//         </CardContent>

//         <CardFooter>
//           <Button type="submit" disabled={isSubmitting} className="w-full">
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Enviando...
//               </>
//             ) : (
//               "Enviar Dica para o Painel "
//             )}
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   )
// }