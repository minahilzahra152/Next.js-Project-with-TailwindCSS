"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Mail, CheckCircle2 } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <Card className="w-full max-w-md border-primary/20 shadow-xl shadow-primary/10 backdrop-blur-sm animate-in fade-in-50 slide-in-from-bottom-4">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-16 h-16 text-primary animate-bounce" />
        </div>
        <CardTitle className="text-2xl">Account Created!</CardTitle>
        <CardDescription>Verify your email to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm text-foreground flex items-start gap-2">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>Check your email for a confirmation link. You must verify your email before you can login.</span>
          </p>
        </div>

        <Link href="/auth/login" className="block">
          <Button className="w-full bg-primary hover:bg-primary/90">Go to Login</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
