"use client"

import { useEffect, useRef } from "react"
import { Features } from "./features"
import { Hero } from "./hero"

export function LandingPage() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleNavLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.tagName === "A" && target.hasAttribute("href") && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()

        const targetId = target.getAttribute("href")?.substring(1)
        if (targetId) {
          const element = document.getElementById(targetId)
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }
      }
    }

    document.addEventListener("click", handleNavLinkClick)

    return () => {
      document.removeEventListener("click", handleNavLinkClick)
    }
  }, [])

  return (
    <div ref={scrollRef} className="relative">
      <Hero />
      <Features />
    </div>
  )
}
