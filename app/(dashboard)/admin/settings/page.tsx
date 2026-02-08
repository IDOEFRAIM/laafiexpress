import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SettingsView } from "@/components/shared/SettingsView"

export default async function AdminSettingsPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")
  if (!session) redirect("/login")

  const userData = JSON.parse(session.value)

  return (
    <div className="p-4 md:p-8 pt-20 max-w-[1600px] mx-auto">
      <SettingsView role={userData.role} />
    </div>
  )
}
