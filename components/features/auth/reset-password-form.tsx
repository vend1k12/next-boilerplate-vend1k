"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

import { AuthCard, AuthCardFooter } from "~/components/features/auth/ui/auth-card"
import { AuthMessage } from "~/components/features/auth/ui/auth-message"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"

import { useResetPassword } from "~/hooks/use-auth"
import { resetPasswordFormSchema, type ResetPasswordFormValues } from "~/types/auth"

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const { resetPassword, isLoading, error, success, isValid } = useResetPassword(token, email)

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: ResetPasswordFormValues) => {
    await resetPassword(values)
  }

  if (!isValid) {
    return (
      <AuthCard title="Ошибка сброса пароля" description="Отсутствуют необходимые параметры для сброса пароля">
        <p className="text-muted-foreground mb-4 text-sm">
          Ссылка недействительна или устарела. Пожалуйста, запросите новую ссылку для сброса пароля.
        </p>
        <Button asChild className="w-full">
          <Link href="/auth/forgot-password">Запросить сброс пароля</Link>
        </Button>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Сброс пароля"
      description="Задайте новый пароль для вашего аккаунта"
      footer={<AuthCardFooter text="Вспомнили пароль?" linkText="Войти" linkHref="/auth/login" />}
    >
      <AuthMessage message={error} type="error" />
      <AuthMessage message={success} type="success" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Новый пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Сброс пароля..." : "Сбросить пароль"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
