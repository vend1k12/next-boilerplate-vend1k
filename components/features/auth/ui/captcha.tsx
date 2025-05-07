"use client"

import type { TurnstileInstance } from "@marsidev/react-turnstile"
import { Turnstile } from "@marsidev/react-turnstile"
import { useTheme } from "next-themes"
import { useRef } from "react"
import { env } from "~/env.mjs"

interface CaptchaProps {
  onVerify?: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

export function Captcha({ onVerify, onError, onExpire }: CaptchaProps) {
  const ref = useRef<TurnstileInstance | null>(null)

  const { theme } = useTheme()

  return (
    <div className="my-2 flex w-full justify-center">
      <Turnstile
        ref={ref}
        siteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        onSuccess={onVerify}
        onError={() => onError?.()}
        onExpire={() => onExpire?.()}
        options={{
          theme: theme === "dark" ? "dark" : "light",
          size: "normal",
        }}
      />
    </div>
  )
}
