"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { authClient } from "~/lib/auth-client"
import type {
  AuthState,
  ForgotPasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
  ResetPasswordFormValues,
  SocialProvider,
} from "~/types/auth"

export const useAuthState = (initialState?: Partial<AuthState>): AuthState => {
  const [state, setState] = useState<AuthState>({
    isLoading: false,
    error: null,
    success: null,
    ...initialState,
  })

  const setLoading = (isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }))
  }

  const setError = (error: string | null) => {
    setState((prev) => ({ ...prev, error }))
    if (error) toast.error(error)
  }

  const setSuccess = (success: string | null) => {
    setState((prev) => ({ ...prev, success }))
    if (success) toast.success(success)
  }

  const resetState = () => {
    setState({
      isLoading: false,
      error: null,
      success: null,
    })
  }

  return {
    ...state,
    setLoading,
    setError,
    setSuccess,
    resetState,
  } as AuthState
}

// Hook для входа в аккаунт
export const useLogin = () => {
  const router = useRouter()
  const state = useAuthState()

  const login = async (values: LoginFormValues) => {
    state.setLoading!(true)
    state.setError!(null)

    try {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            toast.success("Вход выполнен успешно!")
            router.push("/dashboard")
          },
          onError: (ctx) => {
            state.setError!(ctx.error.message)
          },
        }
      )
    } catch (err) {
      state.setError!("Произошла ошибка при входе. Пожалуйста, попробуйте снова.")
    } finally {
      state.setLoading!(false)
    }
  }

  return {
    ...state,
    login,
  }
}

// Hook для регистрации
export const useRegister = () => {
  const router = useRouter()
  const state = useAuthState()

  const register = async (values: RegisterFormValues) => {
    state.setLoading!(true)
    state.setError!(null)
    state.setSuccess!(null)

    try {
      const { data, error } = await authClient.signUp.email(
        {
          name: values.name,
          email: values.email,
          password: values.password,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            state.setSuccess!("Аккаунт успешно создан! Проверьте вашу почту для подтверждения email.")
          },
          onError: (ctx) => {
            state.setError!(ctx.error.message)
          },
        }
      )

      if (error) {
        state.setError!(error.message ?? "Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.")
      }
    } catch (err) {
      state.setError!("Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.")
    } finally {
      state.setLoading!(false)
    }
  }

  return {
    ...state,
    register,
  }
}

// Hook для восстановления пароля
export const useForgotPassword = () => {
  const state = useAuthState()

  const forgotPassword = async (values: ForgotPasswordFormValues) => {
    state.setLoading!(true)
    state.setError!(null)
    state.setSuccess!(null)

    try {
      const { data, error } = await authClient.forgetPassword(
        {
          email: values.email,
          redirectTo: "/auth/reset-password",
        },
        {
          onSuccess: () => {
            state.setSuccess!("Инструкции по сбросу пароля отправлены на ваш email")
          },
          onError: (ctx) => {
            state.setError!(ctx.error.message)
          },
        }
      )

      if (error) {
        state.setError!(error.message ?? "Произошла ошибка при отправке запроса. Пожалуйста, попробуйте снова.")
      }
    } catch (err) {
      state.setError!("Произошла ошибка при отправке запроса. Пожалуйста, попробуйте снова.")
    } finally {
      state.setLoading!(false)
    }
  }

  return {
    ...state,
    forgotPassword,
  }
}

// Hook для сброса пароля
export const useResetPassword = (token?: string | null, email?: string | null) => {
  const router = useRouter()
  const state = useAuthState()

  const resetPassword = async (values: ResetPasswordFormValues) => {
    if (!token || !email) {
      state.setError!("Отсутствуют необходимые параметры для сброса пароля.")
      return
    }

    state.setLoading!(true)
    state.setError!(null)
    state.setSuccess!(null)

    try {
      const { data, error } = await authClient.resetPassword(
        {
          token,
          newPassword: values.password,
        },
        {
          onSuccess: () => {
            state.setSuccess!("Ваш пароль успешно изменен")
            setTimeout(() => {
              router.push("/auth/login")
            }, 2000)
          },
          onError: (ctx) => {
            state.setError!(ctx.error.message)
          },
        }
      )

      if (error) {
        state.setError!(error.message ?? "Произошла ошибка при сбросе пароля. Пожалуйста, попробуйте снова.")
      }
    } catch (err) {
      state.setError!("Произошла ошибка при сбросе пароля. Пожалуйста, попробуйте снова.")
    } finally {
      state.setLoading!(false)
    }
  }

  return {
    ...state,
    resetPassword,
    isValid: Boolean(token && email),
  }
}

// Hook для авторизации через социальные сети
export const useSocialAuth = () => {
  const state = useAuthState()

  const socialAuth = async (provider: SocialProvider) => {
    state.setLoading!(true)
    state.setError!(null)

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      })
    } catch (err) {
      state.setError!(`Ошибка авторизации через ${provider}`)
      state.setLoading!(false)
    }
  }

  return {
    ...state,
    socialAuth,
  }
}
