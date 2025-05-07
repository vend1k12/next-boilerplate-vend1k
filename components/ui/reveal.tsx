"use client"

import { domAnimation, LazyMotion, m, Variants } from "framer-motion"
import { type ReactNode, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "~/lib/cn"

interface RevealProps {
  children: ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  className?: string
  once?: boolean
  threshold?: number
  withContainer?: boolean
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "bounce"
}

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const animationVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  bounce: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  },
}

export function Reveal({
  children,
  width = "fit-content",
  delay = 0,
  className,
  once = true,
  threshold = 0.1,
  withContainer = true,
  animation = "slideUp",
}: RevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  })

  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (inView && !hasPlayed) {
      setHasPlayed(true)
    }
  }, [inView, hasPlayed])

  const variants = animationVariants[animation] || defaultVariants

  const motionContent = (
    <m.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay: delay }}
      className={cn("", className)}
      style={{ width }}
    >
      {children}
    </m.div>
  )

  if (!withContainer) {
    return <LazyMotion features={domAnimation}>{motionContent}</LazyMotion>
  }

  return (
    <div style={{ width }}>
      <LazyMotion features={domAnimation}>{motionContent}</LazyMotion>
    </div>
  )
}
