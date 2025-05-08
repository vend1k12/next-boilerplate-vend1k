"use client"

import { usePathname, useRouter } from "next/navigation"
import { ReactNode, createContext, useContext, useEffect } from "react"

import { authClient } from "~/lib/auth-client"

type AuthContextType = {
  session: ReturnType<typeof authClient.useSession>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const session = authClient.useSession()
  const router = useRouter()
  const pathname = usePathname()

  // Функция для выхода из системы
  const signOut = async () => {
    await authClient.signOut()
    router.push("/")
  }

  // Перенаправление с защищенных маршрутов, если пользователь не аутентифицирован
  useEffect(() => {
    const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin")

    if (isProtectedRoute && !session.isPending && !session.data) {
      const callbackUrl = encodeURIComponent(pathname)
      router.push(`/auth/login?callbackUrl=${callbackUrl}`)
    }
  }, [session.isPending, session.data, pathname, router])

  return <AuthContext.Provider value={{ session, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
