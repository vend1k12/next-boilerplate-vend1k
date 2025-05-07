"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { AuthCard, AuthCardFooter } from "~/components/features/auth/ui/auth-card"
import { AuthMessage } from "~/components/features/auth/ui/auth-message"
import { SocialAuth } from "~/components/features/auth/ui/social-auth"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"

import { useLogin } from "~/hooks/use-auth"
import { loginFormSchema, type LoginFormValues } from "~/types/auth"

export function LoginForm() {
  const { login, isLoading, error } = useLogin()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    await login(values)
  }

  return (
    <AuthCard
      title="Вход в аккаунт"
      description="Введите данные вашего аккаунта для входа"
      footer={<AuthCardFooter text="Нет аккаунта?" linkText="Зарегистрироваться" linkHref="/auth/register" />}
    >
      <AuthMessage message={error} type="error" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Link href="/auth/forgot-password" className="text-primary text-sm hover:underline">
              Забыли пароль?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Выполняется вход..." : "Войти"}
          </Button>
        </form>
      </Form>

      <SocialAuth />
    </AuthCard>
  )
}
