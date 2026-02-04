import { DashboardSidebar } from "@/components/shared/DashboardSidebar"
import { cookies } from "next/headers"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const sessionData = cookieStore.get("session")?.value
  const session = sessionData ? JSON.parse(sessionData) : null
  const role = session?.role?.toLowerCase() || "client"

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <DashboardSidebar role={role} />
      <main className="flex-1 ml-20 p-8 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
