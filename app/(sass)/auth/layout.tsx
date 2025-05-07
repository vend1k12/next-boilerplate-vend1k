import { Metadata } from "next"
import { AuthLayout } from "~/components/features/auth/auth-layout"
import { siteConfig } from "~/constants/site-config"

interface AuthLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    template: "%s | " + siteConfig.name,
    default: siteConfig.name,
  },
}

export default function Auth({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-4xl px-4">
        <AuthLayout>{children}</AuthLayout>
      </div>
    </div>
  )
}
