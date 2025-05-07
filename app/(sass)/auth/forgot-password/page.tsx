import { Metadata } from "next"
import { ForgotPasswordForm } from "~/components/features/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Восстановление пароля",
  description: "Восстановите доступ к вашему аккаунту",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
