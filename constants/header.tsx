import { siteConfig } from "./site-config"

export const navItems = [
  { title: "Главная", href: "#hero" },
  { title: "Особенности", href: "#features" },
  { title: "Технологии", href: "#tech-stack" },
  { title: "Контакты", href: "#contact" },
]

export const headerConfig = {
  logo: {
    text: siteConfig.name,
    href: "/",
  },
  cta: {
    text: "Начать проект",
    href: siteConfig.links.github,
  },
}
