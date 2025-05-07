import { Metadata } from "next"
import { AuthLayout } from "~/components/features/auth/auth-layout"
import { ResetPasswordForm } from "~/components/features/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Сброс пароля",
  description: "Создайте новый пароль для вашего аккаунта",
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  )
}
