"use client"

import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { usePasskey } from "~/hooks/use-passkey"

interface PasskeySuggestionProps {
  onSkip?: () => void
}

export function PasskeySuggestion({ onSkip }: PasskeySuggestionProps) {
  const { isSupported, createPasskey } = usePasskey()

  const handleCreatePasskey = async () => {
    try {
      await createPasskey()
      toast.success("Passkey успешно создан")
    } catch (error) {
      console.error(error)
      toast.error("Не удалось создать passkey")
    }
  }

  if (isSupported === null) return null

  if (!isSupported) {
    return null // Не показываем ничего, если браузер не поддерживает passkey
  }

  return (
    <Card className="mt-4 w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Установите Passkey</CardTitle>
        <CardDescription>Повысьте безопасность вашего аккаунта и войдите без пароля</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground pb-2 text-sm">
        <p>
          Passkey позволяет входить в аккаунт без пароля используя отпечаток пальца, Face ID или PIN-код вашего
          устройства.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onSkip}>
          Позже
        </Button>
        <Button size="sm" onClick={handleCreatePasskey}>
          Создать Passkey
        </Button>
      </CardFooter>
    </Card>
  )
}
