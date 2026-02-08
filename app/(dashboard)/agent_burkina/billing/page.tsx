import { BillingService } from "@/services/billing"
import { BillingDashboardView } from "@/components/dashboard/BillingDashboardView"

export default async function AgentBurkinaBillingPage() {
  const [invoices, stats] = await Promise.all([
    BillingService.getAllInvoices(),
    BillingService.getFinanceStats()
  ])

  const cleanInvoices = JSON.parse(JSON.stringify(invoices))
  const cleanStats = JSON.parse(JSON.stringify(stats))

  return (
    <div className="h-full">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase">
            Facturation <span className="text-blue-600 font-black">Samandin</span>
          </h1>
          <p className="text-zinc-400 font-bold text-xs mt-2 uppercase tracking-[0.3em]">
            Encaissements clients • Suivi des paiements à la livraison
          </p>
        </div>
      </div>

      <BillingDashboardView 
        invoices={cleanInvoices} 
        stats={cleanStats} 
      />
    </div>
  )
}
