import { createBrowserClient } from "@supabase/ssr"

let client = null

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[Supabase] Missing environment variables. Please check .env.local file.")
    return null
  }

  if (client) return client
  client = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return client
}
