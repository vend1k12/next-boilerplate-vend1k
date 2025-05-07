export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export type ApiError = {
  message: string
  code?: string
  errors?: Record<string, string[]>
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  links: {
    github: string
    twitter: string
    linkedin: string
  }
  creator: {
    name: string
    url: string
  }
  keywords: string[]
}
