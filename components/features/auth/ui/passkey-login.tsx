"use client"

import { FingerprintIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { usePasskey } from "~/hooks/use-passkey"

interface PasskeyLoginProps {
  redirectUrl?: string
}

export function PasskeyLogin({ redirectUrl = "/dashboard" }: PasskeyLoginProps) {
  const router = useRouter()
  const { isSupported, isLoading, loginWithPasskey, checkUserPasskeys } = usePasskey()

  const handleLogin = async () => {
    try {
      // Пробуем войти с помощью passkey
      const loginSuccess = await loginWithPasskey(redirectUrl)

      if (loginSuccess) {
        // После успешного входа проверяем наличие passkey
        const hasPasskey = await checkUserPasskeys()

        if (!hasPasskey) {
          // Если passkey нет, перенаправляем на страницу предложения создать passkey
          router.push(`/auth/passkey-offer?redirectUrl=${encodeURIComponent(redirectUrl)}`)
        }
        // Если passkey есть, перенаправление уже выполнено в методе loginWithPasskey
      }
    } catch (error) {
      console.error("Ошибка при входе с passkey:", error)
    }
  }

  if (!isSupported) return null

  return (
    <div className="my-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2">или войдите с помощью Passkey</span>
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="mt-3 flex w-full items-center justify-center gap-2"
        onClick={handleLogin}
        disabled={isLoading}
      >
        <FingerprintIcon className="h-5 w-5" />
        {isLoading ? "Выполняется вход..." : "Войти с Passkey"}
      </Button>
    </div>
  )
}
