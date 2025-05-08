"use client"

import { CreditCard, FileText, LayoutDashboard, Settings, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { type ReactNode, useState } from "react"

import { UserHeader } from "~/components/features/user-header"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar"

import { ModeToggle } from "~/components/ui/mode-toggle"

type NavItem = {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Обзор",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Счета",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Пользователи",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Документы",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Настройки",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

const getBreadcrumbItems = (pathname: string) => {
  const paths = pathname.split("/").filter(Boolean)
  if (paths.length === 0) return []

  // Создаем хлебные крошки на основе текущего пути
  const breadcrumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`
    const title = navItems.find((item) => item.href === href)?.title || path.charAt(0).toUpperCase() + path.slice(1)
    return { title, href }
  })

  return breadcrumbs
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbItems(pathname)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <SidebarProvider defaultOpen={!sidebarOpen} onOpenChange={setSidebarOpen}>
        <Sidebar variant="sidebar" collapsible="offcanvas" className="border-r">
          <SidebarHeader className="border-b p-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
              <LayoutDashboard className="h-5 w-5" />
              <span>Дашборд</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <div className="p-2">
              <h2 className="mb-2 px-2 text-sm font-semibold">Навигация</h2>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <ModeToggle />
          </SidebarFooter>
        </Sidebar>

        <div className="flex w-full flex-col">
          <header className="flex items-center justify-between p-4">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Дашборд</BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbs.length > 1 &&
                    breadcrumbs.slice(1).map((crumb, index) => (
                      <React.Fragment key={crumb.href}>
                        <BreadcrumbSeparator />
                        {index === breadcrumbs.length - 2 ? (
                          <BreadcrumbItem>
                            <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                          </BreadcrumbItem>
                        ) : (
                          <BreadcrumbItem>
                            <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
                          </BreadcrumbItem>
                        )}
                      </React.Fragment>
                    ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <UserHeader />
          </header>

          <main className="w-full overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  )
}
