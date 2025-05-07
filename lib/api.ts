import { ApiError, ApiResponse } from "~/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>
  baseUrl?: string
}

/**
 * Обертка для работы с API с типизацией
 */
export async function fetchApi<T>(
  endpoint: string,
  method: RequestMethod = "GET",
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { params, body, headers = {}, baseUrl = API_BASE_URL, ...rest } = options

  let url = `${baseUrl}${endpoint}`
  if (params) {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value))
    })
    url = `${url}?${queryParams.toString()}`
  }

  const requestBody = body instanceof FormData ? body : body ? JSON.stringify(body) : undefined

  const requestHeaders = {
    ...(!(body instanceof FormData) &&
      method !== "GET" && {
        "Content-Type": "application/json",
      }),
    ...headers,
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: requestBody,
      ...rest,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: "Ошибка сервера",
      }))

      throw new Error((errorData as ApiError).message || `HTTP error ${response.status}`)
    }

    const text = await response.text()
    if (!text) {
      return { data: null as T, success: true }
    }

    const data = JSON.parse(text) as ApiResponse<T>
    return data
  } catch (error) {
    console.error("API request error:", error)
    throw error
  }
}
