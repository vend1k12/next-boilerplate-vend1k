"use client"

import { NuqsAdapter } from "nuqs/adapters/next/app"
import { type ReactNode } from "react"
import { Toaster } from "~/components/ui/sonner"
import { AuthProvider } from "./auth-provider"
import { MotionProvider } from "./motion-provider"
import { QueryProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NuqsAdapter>
        <QueryProvider>
          <AuthProvider>
            <MotionProvider>
              {children}
              <Toaster position="top-right" richColors closeButton />
            </MotionProvider>
          </AuthProvider>
        </QueryProvider>
      </NuqsAdapter>
    </ThemeProvider>
  )
}
