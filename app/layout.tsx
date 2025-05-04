import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/component/theme-provider"
import { Header } from "@/component/header"
// import { CartProvider } from "@/component/cart-provider"
import { AuthProvider } from "@/component/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ateliê Exclusivo - Roupas Artesanais",
  description: "Loja online de roupas de ateliê exclusivas e artesanais",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
