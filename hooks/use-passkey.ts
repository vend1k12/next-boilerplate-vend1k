"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { authClient } from "~/lib/auth-client"

export const usePasskey = () => {
  const router = useRouter()
  const [isSupported, setIsSupported] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasPasskey, setHasPasskey] = useState<boolean | null>(null)

  useEffect(() => {
    // Проверка поддержки passkey в браузере
    if (typeof window !== "undefined" && "PublicKeyCredential" in window) {
      setIsSupported(true)
    } else {
      setIsSupported(false)
    }
  }, [])

  // Инициировать автозаполнение с помощью passkey, если браузер поддерживает
  useEffect(() => {
    const tryAutoFill = async () => {
      if (
        isSupported &&
        typeof window !== "undefined" &&
        "PublicKeyCredential" in window &&
        typeof PublicKeyCredential.isConditionalMediationAvailable === "function"
      ) {
        const isAvailable = await PublicKeyCredential.isConditionalMediationAvailable()
        if (isAvailable) {
          try {
            await authClient.signIn.passkey({ autoFill: true })
          } catch (error) {
            console.error("Ошибка автозаполнения passkey:", error)
          }
        }
      }
    }

    void tryAutoFill()
  }, [isSupported])

  // Проверка наличия passkey у пользователя
  const checkUserPasskeys = async () => {
    setIsLoading(true)
    try {
      const result = await authClient.passkey.listUserPasskeys()
      const hasPasskeys = result?.data && Array.isArray(result.data) && result.data.length > 0
      setHasPasskey(hasPasskeys)
      return hasPasskeys
    } catch (err) {
      console.error("Ошибка при проверке passkey:", err)
      setHasPasskey(false)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Вход с помощью passkey
  const loginWithPasskey = async (redirectUrl?: string) => {
    setIsLoading(true)

    try {
      const result = await authClient.signIn.passkey()

      if (result?.error) {
        toast.error(result.error.message || "Не удалось войти с помощью Passkey")
        return false
      } else {
        toast.success("Вход выполнен успешно!")
        // Если указан redirectUrl, перенаправляем пользователя
        if (redirectUrl) {
          router.push(redirectUrl)
        }
        return true
      }
    } catch (err) {
      toast.error("Произошла ошибка при входе с Passkey")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Создание нового passkey
  const createPasskey = async (name: string = "Основной ключ") => {
    setIsLoading(true)

    try {
      const result = await authClient.passkey.addPasskey({
        name,
      })

      if (result?.error) {
        toast.error(result.error.message || "Не удалось создать Passkey")
        return false
      } else {
        toast.success("Passkey успешно создан")
        setHasPasskey(true)
        return true
      }
    } catch (err) {
      toast.error("Произошла ошибка при создании Passkey")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isSupported,
    isLoading,
    hasPasskey,
    loginWithPasskey,
    createPasskey,
    checkUserPasskeys,
  }
}
