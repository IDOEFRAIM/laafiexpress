import { getProfileAction } from "@/actions/profile"
import { ProfileView } from "@/components/shared/ProfileView"
import { redirect } from "next/navigation"

export default async function AgentChineProfilePage() {
  const profile = await getProfileAction()
  if (!profile) redirect("/login")

  return (
    <div className="p-4 md:p-8 pt-20 max-w-[1600px] mx-auto">
      <ProfileView profile={profile} />
    </div>
  )
}
