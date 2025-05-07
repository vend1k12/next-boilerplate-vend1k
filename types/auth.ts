import { z } from "zod"

// Базовая схема для email
export const emailSchema = z.object({
  email: z.string().email({ message: "Пожалуйста, введите корректный email" }),
})

// Схема для пароля
export const passwordSchema = z.object({
  password: z.string().min(8, { message: "Пароль должен быть не менее 8 символов" }),
})

// Схема для подтверждения пароля
export const confirmPasswordFields = {
  password: z.string().min(8, { message: "Пароль должен быть не менее 8 символов" }),
  confirmPassword: z.string(),
}

export const confirmPasswordSchema = z
  .object(confirmPasswordFields)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })

// Схема для имени пользователя
export const nameSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
})

// Схема для входа
export const loginFormSchema = z.object({
  ...emailSchema.shape,
  ...passwordSchema.shape,
})

// Схема для регистрации
export const registerFormSchema = z
  .object({
    ...nameSchema.shape,
    ...emailSchema.shape,
    ...confirmPasswordFields,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })

// Схема для восстановления пароля
export const forgotPasswordFormSchema = emailSchema

// Схема для сброса пароля
export const resetPasswordFormSchema = confirmPasswordSchema

// Типы форм
export type LoginFormValues = z.infer<typeof loginFormSchema>
export type RegisterFormValues = z.infer<typeof registerFormSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>

// Типы провайдеров социальных сетей
export type SocialProvider = "github" | "google"

// Типы ошибок и состояний
export interface AuthState {
  isLoading: boolean
  error: string | null
  success: string | null
  setLoading?: (isLoading: boolean) => void
  setError?: (error: string | null) => void
  setSuccess?: (success: string | null) => void
  resetState?: () => void
}
