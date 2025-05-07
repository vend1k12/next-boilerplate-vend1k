"use client"

import { domAnimation, LazyMotion, m } from "framer-motion"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { ModeToggle } from "~/components/ui/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { headerConfig, navItems } from "~/constants/header"
import { cn } from "~/lib/cn"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("/")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)

      const sections = navItems.map((item) => item.href).filter((href) => href.startsWith("#"))

      if (scrollPosition < 100) {
        setActiveSection("/")
        return
      }

      for (const section of sections) {
        const element = document.querySelector(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 100,
          behavior: "smooth",
        })
        setActiveSection(href)
      }
    }
  }

  const renderNavLinks = (mobile: boolean = false) => {
    return navItems.map((item, index) => {
      const isActive = activeSection === item.href

      return (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "hover:text-primary transition-colors",
            isActive && "text-primary font-medium",
            mobile ? "border-border/30 block border-b py-4 text-lg" : ""
          )}
          onClick={(e) => {
            if (mobile) setIsMobileMenuOpen(false)
            handleNavClick(e, item.href)
          }}
        >
          {item.title}
        </Link>
      )
    })
  }

  const renderDesktopNav = () => (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-2">
        {navItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:bg-accent bg-transparent px-4",
                activeSection === item.href && "text-primary font-medium"
              )}
            >
              {item.title}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <LazyMotion features={domAnimation}>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          isScrolled ? "border-border/40 bg-background/80 border-b backdrop-blur-lg" : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
          <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href={headerConfig.logo.href} className="group flex items-center">
              <span className="bg-primary mr-2 block h-8 w-8 rounded-lg transition-all group-hover:scale-110"></span>
              <span className="group-hover:text-primary text-xl font-bold transition-colors">
                {headerConfig.logo.text}
              </span>
            </Link>
          </m.div>

          <m.div
            className="hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {renderDesktopNav()}
          </m.div>

          <m.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ModeToggle />
            <Button variant="default" className="group relative hidden overflow-hidden md:inline-flex" asChild>
              <Link href={headerConfig.cta.href}>
                <span className="relative z-10">{headerConfig.cta.text}</span>
                <span className="bg-primary/20 absolute inset-0 translate-y-full transform transition-transform duration-300 group-hover:translate-y-0"></span>
              </Link>
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Открыть меню">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0 sm:w-[350px]">
                <div className="flex h-full flex-col px-6 py-6">
                  <div className="mb-6 space-y-1">{renderNavLinks(true)}</div>
                  <div className="mt-auto">
                    <Button className="w-full" size="lg" asChild>
                      <Link href={headerConfig.cta.href}>{headerConfig.cta.text}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </m.div>
        </div>
      </header>
    </LazyMotion>
  )
}
