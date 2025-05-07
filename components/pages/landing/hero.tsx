"use client"

import { m } from "framer-motion"
import { Button } from "~/components/ui/button"
import { MotionDiv, scaleWithBounceVariants, slideUpVariants } from "~/components/ui/motion"
import { Reveal } from "~/components/ui/reveal"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden py-20"
    >
      <div className="from-background/0 via-background to-background/90 absolute inset-0 -z-10 bg-gradient-to-b" />

      <div className="bg-primary/5 absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-3xl" />
      <div className="bg-secondary/10 absolute top-1/3 right-0 -z-10 h-[400px] w-[400px] rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <Reveal animation="fadeIn">
          <span className="bg-primary/10 text-primary mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
            Стильный и мощный Next.js бойлерплейт
          </span>
        </Reveal>

        <Reveal animation="bounce" delay={0.1}>
          <h1 className="from-foreground to-foreground/70 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            Создавайте красивые приложения легко и быстро
          </h1>
        </Reveal>

        <Reveal animation="slideUp" delay={0.2}>
          <p className="text-muted-foreground mx-auto mb-8 text-lg md:text-xl">
            Элегантный бойлерплейт с современными технологиями и анимациями. Стройте потрясающие интерфейсы с
            минимальными усилиями.
          </p>
        </Reveal>

        <MotionDiv
          className="flex flex-wrap items-center justify-center gap-4"
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
          transition={{ delay: 0.3 }}
        >
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" className="h-12 px-8">
              Начать проект
            </Button>
          </m.div>
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" variant="outline" className="h-12 px-8">
              Узнать больше
            </Button>
          </m.div>
        </MotionDiv>

        <div className="from-primary/20 to-secondary/20 relative mt-20 h-[300px] w-full rounded-xl bg-gradient-to-br backdrop-blur-md">
          <MotionDiv
            className="absolute -top-8 left-1/2 -translate-x-1/2 transform"
            initial="hidden"
            animate="visible"
            variants={scaleWithBounceVariants}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-background relative h-56 w-80 overflow-hidden rounded-xl p-2 shadow-2xl">
              <div className="bg-muted h-8 rounded-t-lg p-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="p-4">
                <div className="bg-muted mb-3 h-3 w-3/4 rounded" />
                <div className="bg-muted mb-2 h-2 w-full rounded" />
                <div className="bg-muted mb-2 h-2 w-full rounded" />
                <div className="bg-muted h-2 w-2/3 rounded" />
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
