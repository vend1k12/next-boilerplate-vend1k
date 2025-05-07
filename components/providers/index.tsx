"use client"

import { NuqsAdapter } from "nuqs/adapters/next/app"
import { type ReactNode } from "react"
import { Toaster } from "~/components/ui/sonner"
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
          <MotionProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </MotionProvider>
        </QueryProvider>
      </NuqsAdapter>
    </ThemeProvider>
  )
}
