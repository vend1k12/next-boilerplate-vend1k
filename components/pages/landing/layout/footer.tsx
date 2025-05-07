"use client"

import { m } from "framer-motion"
import Link from "next/link"
import { Reveal } from "~/components/ui/reveal"
import { footerLinks, socialLinks } from "~/constants/footer"
import { siteConfig } from "~/constants/site-config"

export function Footer() {
  return (
    <footer className="border-border/20 bg-card/50 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-4">
            <Reveal animation="fadeIn">
              <Link href="/" className="flex items-center">
                <span className="bg-primary mr-2 block h-8 w-8 rounded-lg"></span>
                <span className="text-xl font-bold">{siteConfig.name}</span>
              </Link>
              <p className="text-muted-foreground mt-4 max-w-xs">{siteConfig.description}</p>
              <div className="mt-6 flex space-x-4">
                {socialLinks.map((social, index) => (
                  <m.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </m.a>
                ))}
              </div>
            </Reveal>
          </div>

          {footerLinks.map((group, idx) => (
            <div key={idx} className="col-span-1 md:col-span-1 lg:col-span-2">
              <Reveal animation="fadeIn" delay={0.1 * idx}>
                <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Reveal animation="fadeIn" delay={0.3}>
              <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">Подписаться</h3>
              <p className="text-muted-foreground mb-4">Будьте в курсе последних новостей и обновлений.</p>
              <form className="flex w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    className="border-border/50 bg-background focus:border-primary w-full rounded-l-md border px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="border-primary bg-primary text-primary-foreground hover:bg-primary/90 rounded-r-md border border-l-0 px-3 py-2 text-sm font-medium"
                >
                  Отправить
                </button>
              </form>
            </Reveal>
          </div>
        </div>

        <div className="border-border/20 mt-12 border-t pt-8 md:flex md:items-center md:justify-between">
          <Reveal animation="fadeIn">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
            </p>
          </Reveal>
          <Reveal animation="fadeIn" delay={0.1}>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm">
                Условия использования
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary text-sm">
                Настройки cookie
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  )
}
