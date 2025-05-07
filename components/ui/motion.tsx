"use client"

import { domAnimation, HTMLMotionProps, LazyMotion, m } from "framer-motion"
import { forwardRef, type ReactNode } from "react"

type MotionDivProps = HTMLMotionProps<"div"> & {
  children: ReactNode
}

export const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(({ children, ...props }, ref) => (
  <LazyMotion features={domAnimation}>
    <m.div ref={ref} {...props}>
      {children}
    </m.div>
  </LazyMotion>
))
MotionDiv.displayName = "MotionDiv"

// 1. Fade In (Появление)
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// 2. Slide Up (Появление снизу)
export const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// 3. Slide In Left/Right (Появление сбоку)
export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// 4. Scale (Масштабирование)
export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// 5. Scale with bounce (Масштабирование с отскоком)
export const scaleWithBounceVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      mass: 0.5,
    },
  },
}

// 6. Stagger children (Последовательная анимация дочерних элементов)
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// 7. Hover and tap effect for interactive elements
export const interactiveVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.98 },
}
