import { LogisticsService } from "@/services/logistics"
import { LogisticsDashboardView } from "@/components/dashboard/LogisticsDashboardView"

export default async function AdminLogisticsPage() {
  const [rawContainers, rawPendingShipments] = await Promise.all([
    LogisticsService.getAllContainers(),
    LogisticsService.getShipmentsForGroupage()
  ])

  const containers = JSON.parse(JSON.stringify(rawContainers))
  const pendingShipments = JSON.parse(JSON.stringify(rawPendingShipments))

  return (
    <div className="h-full">
      <div className="mb-10">
        <h1 className="text-5xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase">
          Logistique <span className="text-blue-600 font-black">Globale</span>
        </h1>
        <p className="text-zinc-400 font-bold text-xs mt-2 uppercase tracking-[0.3em]">
          Vue d'ensemble de tous les conteneurs et expéditions
        </p>
      </div>

      <LogisticsDashboardView 
        containers={containers} 
        availableShipments={pendingShipments}
        canCreate={true}
        canUpdateStatus={true}
      />
    </div>
  )
}
