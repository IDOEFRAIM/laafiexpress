import { ShipmentService } from "@/services/shipments"
import { ClientTrackingView } from "@/components/shared/ClientTrackingView"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ClientLogisticsPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")
  if (!session) redirect("/login")

  try {
    const userData = JSON.parse(session.value)
    const rawShipments = await ShipmentService.getShipmentsByClient(userData.id)
    const shipments = JSON.parse(JSON.stringify(rawShipments))

    return (
      <div className="p-4 md:p-8 pt-20 max-w-[1600px] mx-auto">
        <ClientTrackingView shipments={shipments} />
      </div>
    )
  } catch {
    return <div className="p-8 text-center text-zinc-500">Erreur de chargement</div>
  }
}
