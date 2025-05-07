#!/usr/bin/env node

import { config } from "dotenv"
import { resolve } from "path"
import { fileURLToPath } from "url"
import { env } from "~/env.mjs"

// Определяем путь к текущему файлу и корню проекта
const __filename = fileURLToPath(import.meta.url)
const __dirname = fileURLToPath(new URL(".", import.meta.url))
const rootDir = resolve(__dirname, "..")

// Загружаем переменные окружения из .env файла
config({ path: resolve(rootDir, ".env") })

console.log("ENV file loaded from:", resolve(rootDir, ".env"))

try {
  console.log("Environment variables successfully validated!")
  console.log("Available variables:", {
    ANALYZE: env.ANALYZE,
    BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET ? "[SET]" : "[NOT SET]",
    NEXT_PUBLIC_BETTER_AUTH_URL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
    TURNSTILE_SECRET_KEY: env.TURNSTILE_SECRET_KEY ? "[SET]" : "[NOT SET]",
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  })
} catch (error) {
  console.error("Error validating environment variables:", error.message)
  process.exit(1)
}
