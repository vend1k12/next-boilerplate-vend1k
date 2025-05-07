import { Metadata } from "next"
import { LoginForm } from "~/components/features/auth/login-form"

export const metadata: Metadata = {
  title: "Войти",
  description: "Войдите в свой аккаунт чтобы продолжить",
}

export default function LoginPage() {
  return <LoginForm />
}
