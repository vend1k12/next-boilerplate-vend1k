/**
 * Централизованное хранилище ключей для React Query
 * Хранит все ключи запросов в одном месте для лучшей типизации и организации
 */

export const QueryKeys = {
  users: {
    all: ["users"] as const,
    lists: () => [...QueryKeys.users.all, "list"] as const,
    detail: (id: string) => [...QueryKeys.users.all, "detail", id] as const,
  },

  auth: {
    all: ["auth"] as const,
    profile: () => [...QueryKeys.auth.all, "profile"] as const,
    permissions: () => [...QueryKeys.auth.all, "permissions"] as const,
  },
}
