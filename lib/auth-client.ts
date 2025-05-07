import { adminClient, passkeyClient, usernameClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

import { env } from "~/env.mjs"

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [usernameClient(), passkeyClient(), adminClient()],
})
