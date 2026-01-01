import { createClient } from "@/lib/supabase/server"
import { DashboardClient } from "@/components/dashboard-client"

export default async function DashboardPage() {
  const supabase = await createClient()

  let user = null
  let profile = null
  let scans = []
  let scheduledScans = []

  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    user = authUser

    if (user) {
      // Get data from database for logged-in users
      const { data: scansData } = await supabase
        .from("scans")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      const { data: scheduledData } = await supabase.from("scheduled_scans").select("*").eq("user_id", user.id)

      scans = scansData || []
      profile = profileData
      scheduledScans = scheduledData || []
    }
  } catch (error) {
    console.warn("[Dashboard] Auth check failed, showing guest view")
  }

  return <DashboardClient user={user} profile={profile} initialScans={scans} scheduledScans={scheduledScans} />
}
