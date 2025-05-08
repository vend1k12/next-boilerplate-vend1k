import { type ReactNode } from "react"
import { UserHeader } from "~/components/features/user-header"

// Компонент для защиты административных маршрутов
export default function AdminLayout({ children }: { children: ReactNode }) {
  // Защита реализована в middleware
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b py-4">
        <div className="container flex items-center justify-between">
          <h1 className="text-2xl font-bold">Административная панель</h1>
          <UserHeader />
        </div>
      </header>
      <main className="container flex-1 py-6">{children}</main>
    </div>
  )
}
