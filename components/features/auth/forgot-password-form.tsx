"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { AuthCard, AuthCardFooter } from "~/components/features/auth/ui/auth-card"
import { AuthMessage } from "~/components/features/auth/ui/auth-message"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"

import { useForgotPassword } from "~/hooks/use-auth"
import { forgotPasswordFormSchema, type ForgotPasswordFormValues } from "~/types/auth"

export function ForgotPasswordForm() {
  const { forgotPassword, isLoading, error, success } = useForgotPassword()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    await forgotPassword(values)
  }

  return (
    <AuthCard
      title="Восстановление пароля"
      description="Введите email, связанный с вашим аккаунтом, чтобы получить инструкции по сбросу пароля"
      footer={<AuthCardFooter text="Вспомнили пароль?" linkText="Войти" linkHref="/auth/login" />}
    >
      <AuthMessage message={error} type="error" />
      <AuthMessage message={success} type="success" />

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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Отправка..." : "Отправить инструкции"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
