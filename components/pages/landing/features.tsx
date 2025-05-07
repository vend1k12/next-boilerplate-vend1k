"use client"

import { m } from "framer-motion"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { fadeInVariants, MotionDiv, staggerContainerVariants } from "~/components/ui/motion"
import { Reveal } from "~/components/ui/reveal"
import { features } from "~/constants/features"

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-24 md:py-32">
      {/* Фоновые градиенты для визуального интереса */}
      <div className="bg-primary/5 absolute top-1/4 right-0 -z-10 h-[500px] w-[500px] rounded-full blur-3xl" />
      <div className="bg-secondary/5 absolute bottom-1/4 left-1/3 -z-10 h-[400px] w-[400px] rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="mb-16 text-center md:mb-20">
          <Reveal animation="fadeIn">
            <span className="bg-primary/10 text-primary mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
              Что мы предлагаем
            </span>
          </Reveal>

          <Reveal animation="slideUp" delay={0.1}>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Особенности, которые вам понравятся</h2>
          </Reveal>

          <Reveal animation="fadeIn" delay={0.2}>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Наш бойлерплейт сочетает в себе современные технологии и лучшие практики, чтобы сделать ваш процесс
              разработки максимально эффективным и приятным.
            </p>
          </Reveal>
        </div>

        <MotionDiv
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <m.div
              key={index}
              variants={fadeInVariants}
              custom={index}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex"
            >
              <Card className="bg-background/50 hover:border-primary/20 hover:bg-background/80 flex flex-1 flex-col border backdrop-blur-sm transition-colors">
                <CardHeader>
                  <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">
                    <feature.icon className="text-primary h-6 w-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </MotionDiv>

        <div className="mt-16 text-center md:mt-20">
          <Reveal animation="fadeIn" delay={0.3}>
            <div className="inline-flex flex-col items-center justify-center gap-4 sm:flex-row">
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" className="h-12 px-8">
                  Попробовать сейчас
                </Button>
              </m.div>
              <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Документация
                </Button>
              </m.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
