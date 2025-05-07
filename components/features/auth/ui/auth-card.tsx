import Link from "next/link"
import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

interface AuthCardProps {
  children: ReactNode
  title: string
  description?: string
  footer?: ReactNode
}

export function AuthCard({ children, title, description, footer }: AuthCardProps) {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      {footer && <CardFooter className="flex justify-center border-t pt-4">{footer}</CardFooter>}
    </Card>
  )
}

interface AuthCardFooterProps {
  text: string
  linkText: string
  linkHref: string
}

export function AuthCardFooter({ text, linkText, linkHref }: AuthCardFooterProps) {
  return (
    <p className="text-muted-foreground text-sm">
      {text}{" "}
      <Link href={linkHref} className="text-primary font-medium hover:underline">
        {linkText}
      </Link>
    </p>
  )
}
