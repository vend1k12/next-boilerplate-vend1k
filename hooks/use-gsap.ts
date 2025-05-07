"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

type GSAPContext = ReturnType<typeof gsap.context>

export function useGSAP(callback: (context: GSAPContext) => void, deps: React.DependencyList = []) {
  const contextRef = useRef<GSAPContext | null>(null)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (elementRef.current) {
      contextRef.current = gsap.context(() => {
        callback(contextRef.current!)
      }, elementRef.current)
    }

    return () => {
      if (contextRef.current) {
        contextRef.current.revert()
      }
    }
  }, deps)

  return { elementRef }
}

export function useSplitText() {
  useEffect(() => {}, [])

  return {
    split: (text: string) => {
      return { chars: Array.from(text), words: text.split(" ") }
    },
  }
}
