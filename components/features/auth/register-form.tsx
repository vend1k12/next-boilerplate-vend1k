"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { AuthCard, AuthCardFooter } from "~/components/features/auth/ui/auth-card"
import { AuthMessage } from "~/components/features/auth/ui/auth-message"
import { Captcha } from "~/components/features/auth/ui/captcha"
import { SocialAuth } from "~/components/features/auth/ui/social-auth"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"

import { useRegister } from "~/hooks/use-auth"
import { registerFormSchema, type RegisterFormValues } from "~/types/auth"

export function RegisterForm() {
  const { register, isLoading, error, success, setCaptchaToken } = useRegister()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    await register(values)
  }

  return (
    <AuthCard
      title="Создать аккаунт"
      description="Заполните форму ниже для регистрации"
      footer={<AuthCardFooter text="Уже есть аккаунт?" linkText="Войти" linkHref="/auth/login" />}
    >
      <AuthMessage message={error} type="error" />
      <AuthMessage message={success} type="success" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Иван Иванов" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

          <Captcha onVerify={setCaptchaToken} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </form>
      </Form>

      <SocialAuth />
    </AuthCard>
  )
}
