"use client"

import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { usePasskey } from "~/hooks/use-passkey"

export default function PasskeyOfferPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams?.get("redirectUrl") || "/dashboard"
  const { isSupported, isLoading, createPasskey } = usePasskey()

  if (isLoading) {
    return (
      <div className="container flex h-screen max-w-xl items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    )
  }

  const handleCreatePasskey = async () => {
    try {
      const result = await createPasskey()
      if (result) {
        router.push(redirectUrl)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSkip = () => {
    router.push(redirectUrl)
  }

  if (!isSupported) {
    router.push(redirectUrl)
    return null
  }

  return (
    <div className="container flex h-screen max-w-xl items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Повысьте безопасность вашего аккаунта</CardTitle>
          <CardDescription>Настройте Passkey для быстрого и безопасного входа в аккаунт без пароля</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-muted-foreground">
            <p>Passkey - это современный способ входа, который:</p>
            <ul className="mt-2 ml-6 list-disc">
              <li>Использует биометрические данные вашего устройства (отпечаток пальца, Face ID)</li>
              <li>Не требует запоминания сложных паролей</li>
              <li>Обеспечивает высокий уровень защиты от фишинга</li>
              <li>Работает на всех ваших устройствах</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleSkip}>
            Позже
          </Button>
          <Button onClick={handleCreatePasskey} disabled={isLoading}>
            {isLoading ? "Создание..." : "Создать Passkey"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
