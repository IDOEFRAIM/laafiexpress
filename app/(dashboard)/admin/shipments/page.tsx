import { ShipmentDashboardView } from "@/components/dashboard/ShipmentDashboardView"
import { ShipmentService } from "@/services/shipments"
import { UserService } from "@/services/users"

export default async function AdminShipmentsPage() {
  const [rawShipments, clients] = await Promise.all([
    ShipmentService.getAllShipments(),
    UserService.getClients()
  ])

  const shipments = JSON.parse(JSON.stringify(rawShipments))

  return (
    <div className="p-4 md:p-8 pt-20">
      <ShipmentDashboardView 
        title="Toutes les Expéditions" 
        shipments={shipments} 
        clients={clients}
        showAddButton={true}
        canUpdateStatus={true}
      />
    </div>
  )
}
