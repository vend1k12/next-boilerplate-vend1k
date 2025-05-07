interface AuthMessageProps {
  message: string | null
  type: "error" | "success"
}

export function AuthMessage({ message, type }: AuthMessageProps) {
  if (!message) return null

  const bgClass = type === "error" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"

  return <div className={`rounded-md p-3 ${bgClass} text-sm`}>{message}</div>
}
