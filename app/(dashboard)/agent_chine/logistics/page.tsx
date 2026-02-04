import { LogisticsService } from "@/services/logistics"
import { LogisticsDashboardView } from "@/components/dashboard/LogisticsDashboardView"

export default async function AgentChineLogisticsPage() {
  const [rawContainers, rawPendingShipments] = await Promise.all([
    LogisticsService.getAllContainers(),
    LogisticsService.getShipmentsForGroupage()
  ])

  const containers = JSON.parse(JSON.stringify(rawContainers))
  const pendingShipments = JSON.parse(JSON.stringify(rawPendingShipments))

  return (
    <div className="h-full">
      <LogisticsDashboardView 
        containers={containers} 
        availableShipments={pendingShipments}
        canCreate={true}
        canUpdateStatus={true}
      />
    </div>
  )
}
