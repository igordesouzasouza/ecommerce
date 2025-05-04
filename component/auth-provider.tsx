"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Set to true for direct access without authentication
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Always authenticated for testing
    setIsAuthenticated(true)
    localStorage?.setItem("isAuthenticated", "true")
  }, [pathname, router])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Auto-authenticate for testing
    setIsAuthenticated(true)
    localStorage?.setItem("isAuthenticated", "true")
    return true
  }

  const logout = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("isAuthenticated")
    }
    setIsAuthenticated(false)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
