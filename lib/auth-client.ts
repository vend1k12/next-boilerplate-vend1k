import { adminClient, passkeyClient, usernameClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

import { env } from "~/env.mjs"

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_BASE_URL,
  plugins: [usernameClient(), passkeyClient(), adminClient()],
})
