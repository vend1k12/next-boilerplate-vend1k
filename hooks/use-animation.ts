"use client"

import { type AnimationControls, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface UseAnimationInViewOptions {
  threshold?: number
  triggerOnce?: boolean
  delay?: number
}

export function useAnimationInView({
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
}: UseAnimationInViewOptions = {}): {
  controls: AnimationControls
  ref: (node?: Element | null) => void
  inView: boolean
} {
  const controls = useAnimation()
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  })

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        controls.start("visible")
      }, delay)
    } else {
      controls.start("hidden")
    }
  }, [controls, inView, delay])

  return { controls, ref, inView }
}
