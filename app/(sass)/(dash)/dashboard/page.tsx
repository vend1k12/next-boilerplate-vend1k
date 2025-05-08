"use client"

import { useAuth } from "~/components/providers/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

export default function DashboardPage() {
  const { session, signOut } = useAuth()
  const user = session.data?.user

  return (
    <div className="space-y-6">
      {session.isPending ? (
        <p>Загрузка...</p>
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Профиль пользователя</CardTitle>
              <CardDescription>Основная информация</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-sm leading-none font-medium">Имя</p>
                  <p className="text-muted-foreground text-sm">{user?.name || "Не указано"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm leading-none font-medium">Email</p>
                  <p className="text-muted-foreground text-sm">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
