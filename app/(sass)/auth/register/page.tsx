import { Metadata } from "next"
import { RegisterForm } from "~/components/features/auth/register-form"

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Создайте новый аккаунт чтобы начать использовать наш сервис",
}

export default function RegisterPage() {
  return <RegisterForm />
}
