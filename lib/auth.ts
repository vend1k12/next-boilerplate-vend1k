import { PrismaClient } from "@prisma/client"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { captcha, openAPI } from "better-auth/plugins"
import { admin } from "better-auth/plugins/admin"
import { passkey } from "better-auth/plugins/passkey"
import { username } from "better-auth/plugins/username"

import { env } from "~/env.mjs"

const prisma = new PrismaClient()

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    username(),
    passkey(),
    admin(),
    openAPI(),
    captcha({
      provider: "cloudflare-turnstile",
      secretKey: env.TURNSTILE_SECRET_KEY,
    }),
  ],
})
