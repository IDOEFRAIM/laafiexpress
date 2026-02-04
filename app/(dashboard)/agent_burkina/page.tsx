import React from 'react'
import { ShipmentDashboardView } from '@/components/dashboard/ShipmentDashboardView'
import { ShipmentService } from '@/services/shipments'
import { Package, Truck, CheckCircle2, AlertCircle } from 'lucide-react'

export default async function AgentBurkinaPage() {
  const shipments = await ShipmentService.getAllShipments()
  
  // Stats
  const arrivals = shipments.filter(s => s.status === 'ARRIVE_OUAGA').length
  const delivered = shipments.filter(s => s.status === 'LIVRE').length
  const pending = shipments.filter(s => s.status === 'CHARGE_TRANSIT').length

  const cleanShipments = JSON.parse(JSON.stringify(shipments))

  return (
    <div className='p-4 md:p-8 pt-20 max-w-[1600px] mx-auto'>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatItem label="En Transit" value={pending} icon={Truck} color="blue" />
        <StatItem label="Arrivés (Bureau)" value={arrivals} icon={Package} color="green" />
        <StatItem label="Total Livrés" value={delivered} icon={CheckCircle2} color="orange" />
        <StatItem label="Alertes" value={0} icon={AlertCircle} color="red" />
      </div>

      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            Gestion <span className="text-blue-600">Burkina</span>
          </h1>
          <p className="text-zinc-400 font-bold text-xs mt-2 uppercase tracking-[0.3em]">
            Dernières arrivées & Livraisons clients
          </p>
        </div>
      </div>

      <ShipmentDashboardView 
        title='Gestion Burkina' 
        shipments={cleanShipments} 
        canUpdateStatus={true}
      />
    </div>
  )
}

function StatItem({ label, value, icon: Icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    orange: "bg-orange-500",
    red: "bg-red-500"
  }
  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl flex items-center gap-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${colors[color]}`}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest leading-none mb-1">{label}</p>
        <p className="text-3xl font-black italic text-zinc-900 dark:text-white leading-none">{value}</p>
      </div>
    </div>
  )
}
