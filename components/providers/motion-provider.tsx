"use client"

import { domAnimation, LazyMotion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { type ReactNode, useEffect } from "react"

interface MotionProviderProps {
  children: ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Any global GSAP setup can go here

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
