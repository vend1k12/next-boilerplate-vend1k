import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "~/constants/site-config"

interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col justify-center p-4 md:p-8">
      <div className="mb-8 flex justify-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} className="mr-2" />
          <span className="text-2xl font-semibold">{siteConfig.name}</span>
        </Link>
      </div>

      {title && (
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        </div>
      )}

      <main className="mx-auto w-full max-w-md">{children}</main>

      <footer className="text-muted-foreground mt-16 text-center text-sm">
        <div className="mb-2">
          <Link href="/terms" className="mr-4 hover:underline">
            Условия использования
          </Link>
          <Link href="/privacy" className="hover:underline">
            Политика конфиденциальности
          </Link>
        </div>
        <p>© {new Date().getFullYear()} Все права защищены</p>
      </footer>
    </div>
  )
}
