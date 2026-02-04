import { LogisticsService } from "@/services/logistics"
import { BurkinaLogisticsView } from "@/components/logistics/BurkinaLogisticsView"

export default async function AgentBurkinaLogisticsPage() {
  const allContainers = await LogisticsService.getAllContainers()
  
  // Filter only those in status 'FERME' or 'EN_MER' (Transit)
  const transitContainers = allContainers.filter(c => 
    c.status === 'FERME' || c.status === 'EN_MER'
  )

  // Clean data for serialization
  const cleanContainers = JSON.parse(JSON.stringify(transitContainers))

  return (
    <div className="h-full max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-6xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
          Réception <span className="text-blue-600 font-black tracking-widest">Ouagadougou</span>
        </h1>
        <p className="text-zinc-400 font-bold text-sm mt-4 uppercase tracking-[0.4em]">
          Contrôle des arrivages • Validation des conteneurs
        </p>
      </div>

      <BurkinaLogisticsView transitContainers={cleanContainers} />
    </div>
  )
}
