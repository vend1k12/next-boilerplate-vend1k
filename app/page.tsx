import Link from "next/link"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { features } from "~/constants/features"

export default function Web() {
  return (
    <main className="flex min-h-screen flex-col bg-[#fbfbfd] text-[#1d1d1f] dark:bg-black dark:text-[#f5f5f7]">
      {/* Hero Section */}
      <section className="flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20 text-center">
        <Badge className="mb-4 rounded-full bg-[#a960ee] px-3 py-1 text-xs font-medium text-white hover:bg-[#a960ee]/90 dark:bg-[#a960ee] dark:text-white">
          NEW
        </Badge>
        <h1 className="mb-4 text-6xl font-semibold tracking-tight sm:text-7xl md:text-8xl">Next.js Enterprise.</h1>
        <h2 className="mb-5 text-6xl font-semibold tracking-tight text-[#6e6e73] sm:text-7xl md:text-8xl">
          Stylish. Powerful. Yours.
        </h2>
        <p className="mb-10 max-w-2xl text-xl text-[#6e6e73]">
          The most elegant boilerplate for building modern
          <br className="hidden md:inline" /> web applications.
        </p>
        <div className="flex items-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-[#a960ee] px-8 text-white hover:bg-[#9750d3] dark:bg-[#a960ee] dark:text-white"
          >
            Get Started
          </Button>
          <Button size="lg" variant="link" className="text-[#a960ee] dark:text-[#b68df0]">
            Learn More &rarr;
          </Button>
        </div>
        <div className="relative mt-20 h-[50vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-b from-white to-gray-100 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] dark:from-[#151516] dark:to-black/80"></div>
      </section>

      {/* Highlights Section */}
      <section className="mx-auto mt-32 max-w-7xl px-6 text-center">
        <h2 className="mb-4 text-5xl font-semibold tracking-tight">Features</h2>
        <p className="mx-auto mb-20 max-w-2xl text-xl text-[#6e6e73]">
          A carefully crafted set of tools for creating exceptional web applications.
        </p>

        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={feature.title} className="group relative flex flex-col items-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-white text-4xl shadow-sm transition-transform duration-300 group-hover:scale-110 dark:from-[#1d1d1f] dark:to-black">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-2xl font-medium">{feature.title}</h3>
              <p className="text-[#6e6e73]">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="rounded-3xl bg-gradient-to-b from-[#f5f5f7] to-white p-12 shadow-sm dark:from-[#151516] dark:to-[#1d1d1f]">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-semibold">Why Choose Our Boilerplate</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#6e6e73]">
              Everything you need to quickly start a world-class project.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 bg-white/50 p-8 shadow-sm backdrop-blur-sm dark:bg-black/30">
              <h3 className="mb-6 text-2xl font-medium">Traditional Approach</h3>
              <ul className="space-y-4 text-[#6e6e73]">
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">✕</span>
                  <span>Time-consuming configuration setup</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">✕</span>
                  <span>Version compatibility issues</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">✕</span>
                  <span>Lack of unified code style</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-red-500">✕</span>
                  <span>Need to set up CI/CD from scratch</span>
                </li>
              </ul>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-[#f5f5f7] to-white p-8 shadow-md dark:from-[#1d1d1f] dark:to-black">
              <h3 className="mb-6 text-2xl font-medium">Next.js Enterprise</h3>
              <ul className="space-y-4 text-[#6e6e73]">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Instant development start</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Always up-to-date dependencies</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Unified architecture and style</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Production-ready CI/CD pipeline</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-semibold">Impressive Capabilities</h2>
          <p className="mx-auto max-w-2xl text-lg text-[#6e6e73]">
            The best technologies brought together in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="text-center">
            <p className="mb-2 text-5xl font-semibold text-[#a960ee] dark:text-[#b68df0]">20+</p>
            <p className="text-sm text-[#6e6e73]">UI Components</p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-5xl font-semibold text-[#a960ee] dark:text-[#b68df0]">100%</p>
            <p className="text-sm text-[#6e6e73]">TypeScript</p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-5xl font-semibold text-[#a960ee] dark:text-[#b68df0]">CI/CD</p>
            <p className="text-sm text-[#6e6e73]">GitHub Actions</p>
          </div>
          <div className="text-center">
            <p className="mb-2 text-5xl font-semibold text-[#a960ee] dark:text-[#b68df0]">Bun</p>
            <p className="text-sm text-[#6e6e73]">Package Manager</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto mt-32 max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-5xl font-semibold tracking-tight">Ready to Start?</h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-[#6e6e73]">
          Clone the repository and build something amazing.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link target="_blank" href="https://github.com/vend1k/next-boilerplate-vend1k">
            <Button
              size="lg"
              className="w-full rounded-full bg-[#a960ee] px-8 text-white hover:bg-[#9750d3] sm:w-auto dark:bg-[#a960ee] dark:text-white"
            >
              🌟 Star on GitHub
            </Button>
          </Link>
          <Link target="_blank" href="https://github.com/vend1k/next-boilerplate-vend1k">
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full border-[#a960ee] text-[#a960ee] hover:bg-[#a960ee]/10 sm:w-auto dark:border-[#b68df0] dark:text-[#b68df0] dark:hover:bg-[#b68df0]/10"
            >
              Fork repository
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t border-gray-200 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-[#6e6e73]">© 2024 Next.js Enterprise Boilerplate. MIT License.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-[#6e6e73] hover:text-[#a960ee] dark:hover:text-[#b68df0]">
                GitHub
              </a>
              <a href="#" className="text-sm text-[#6e6e73] hover:text-[#a960ee] dark:hover:text-[#b68df0]">
                Twitter
              </a>
              <a href="#" className="text-sm text-[#6e6e73] hover:text-[#a960ee] dark:hover:text-[#b68df0]">
                Discord
              </a>
            </div>
          </div>
          <Separator className="mb-8 bg-gray-200 dark:bg-gray-800" />
          <p className="text-xs text-[#86868b]">Designed with passion and attention to detail.</p>
        </div>
      </footer>
    </main>
  )
}
