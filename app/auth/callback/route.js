import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || new URL(request.url).origin}/auth/error?error=${error}`,
    )
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || new URL(request.url).origin}/dashboard`,
      )
    }
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || new URL(request.url).origin}/auth/error`,
  )
}
