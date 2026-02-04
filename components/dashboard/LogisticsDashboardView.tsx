"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  Truck, 
  Box as BoxIcon, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  MoreVertical,
  Maximize2,
  Anchor,
  Plane,
  ArrowRight,
  Package,
  Settings,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { updateContainerStatusAction, addShipmentsToContainerAction } from '@/actions/logistics'
import { sendBulkUpdateAction } from '@/actions/notifications'
import { CreateContainerDialog } from '../logistics/CreateContainerDialog'
import { generateManifestPDF } from '@/lib/pdf/manifest-generator'

export type DbContainer = {
  id: string
  containerNumber: string
  status: string | null
  departureDate: any
  estimatedArrival: any
  createdAt: any
  shipments: any[]
}

interface LogisticsDashboardViewProps {
  containers: DbContainer[]
  availableShipments?: any[]
  canCreate?: boolean
  canUpdateStatus?: boolean
}

export function LogisticsDashboardView({ 
  containers, 
  availableShipments = [],
  canCreate = false,
  canUpdateStatus = false 
}: LogisticsDashboardViewProps) {
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('All')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isStuffingOpen, setIsStuffingOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedForStuffing, setSelectedForStuffing] = useState<string[]>([])
  const [isNotifying, setIsNotifying] = useState(false)
  const router = useRouter()

  const handleSendBulkUpdate = async (type: 'AERIEN' | 'MARITIME') => {
    if (!window.confirm(`Confirmer l'envoi des notifications groupées pour le fret ${type} ?`)) return
    setIsNotifying(true)
    const res = await sendBulkUpdateAction(type)
    if (res?.success) {
      alert(`Notifications lancées : ${'count' in res && typeof res.count === 'number' ? res.count : 0} messages envoyés.`)
    } else {
      alert(
        'reason' in res && res.reason
          ? res.reason
          : 'error' in res && res.error
            ? res.error
            : "Erreur lors de l'envoi"
      )
    }
    setIsNotifying(false)
  }

  const activeContainer = useMemo(() => {
    if (selectedContainerId) {
      return containers.find(c => c.id === selectedContainerId) || containers[0]
    }
    return containers.length > 0 ? containers[0] : null
  }, [containers, selectedContainerId])

  const handleUpdateStatus = async (newStatus: any) => {
    if (!activeContainer) return
    setIsUpdating(true)
    const res = await updateContainerStatusAction(activeContainer.id, newStatus)
    if (res.success) {
      router.refresh()
    } else {
      alert(res.error || "Erreur lors de la mise à jour du statut")
    }
    setIsUpdating(false)
  }

  const handleAddShipments = async () => {
    if (!activeContainer || selectedForStuffing.length === 0) return
    setIsUpdating(true)
    const res = await addShipmentsToContainerAction(activeContainer.id, selectedForStuffing)
    if (res.success) {
      setIsStuffingOpen(false)
      setSelectedForStuffing([])
      router.refresh()
    } else {
      alert(res.error || "Une erreur est survenue lors du groupage")
    }
    setIsUpdating(false)
  }

  const handleDownloadManifest = () => {
    if (!activeContainer) return;
    generateManifestPDF({
      containerNumber: activeContainer.containerNumber,
      departureDate: activeContainer.departureDate,
      estimatedArrival: activeContainer.estimatedArrival,
      shipments: activeContainer.shipments.map((s: any) => ({
        trackingNumber: s.trackingNumber,
        clientName: s.client?.fullName || 'Inconnu',
        description: s.contentDescription || '',
        weight: s.weight,
        cbm: s.cbm,
        status: s.status
      }))
    });
  }

  const filteredContainers = useMemo(() => {
    if (activeTab === 'All') return containers
    return containers.filter(c => c.status === activeTab)
  }, [containers, activeTab])

  const stats = useMemo(() => ({
    All: containers.length,
    OUVERT: containers.filter(c => c.status === 'OUVERT').length,
    FERME: containers.filter(c => c.status === 'FERME').length,
    EN_MER: containers.filter(c => c.status === 'EN_MER').length,
    ARRIVE: containers.filter(c => c.status === 'ARRIVE').length,
  }), [containers])

  return (
    <div className="flex flex-col gap-8 h-full bg-[#F8FAFC] dark:bg-zinc-950 p-6 rounded-[3rem]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-2 bg-white dark:bg-sky-900 p-1.5 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-x-auto no-scrollbar">
          {Object.entries(stats).map(([label, count]) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2",
                activeTab === label 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              )}
            >
              {label} <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-md font-black",
                activeTab === label ? "bg-white/20 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
              )}>{count}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl">
            <button 
              onClick={() => handleSendBulkUpdate('AERIEN')}
              disabled={isNotifying}
              className="px-4 py-2 hover:bg-white dark:hover:bg-zinc-700 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
              title="Alerte Hebdomadaire Air (Mar/Ven)"
            >
              Bulk Aérien
            </button>
            <button 
              onClick={() => handleSendBulkUpdate('MARITIME')}
              disabled={isNotifying}
              className="px-4 py-2 hover:bg-white dark:hover:bg-zinc-700 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
              title="Alerte Hebdomadaire Mer (Sam)"
            >
              Bulk Maritime
            </button>
          </div>

          {canCreate && (
            <button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="h-14 px-8 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all font-black text-sm flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nouveau Départ
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Left List */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 no-scrollbar pb-10">
          {filteredContainers.length === 0 && (
            <div className="p-10 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[3rem] text-center text-zinc-400">
              Aucun conteneur/vol trouvé.
            </div>
          )}
          
          {filteredContainers.map((container) => {
            const isActive = activeContainer?.id === container.id
            const isAir = container.containerNumber.startsWith('AF') || container.containerNumber.startsWith('TK')
            
            return (
              <motion.div
                key={container.id}
                onClick={() => setSelectedContainerId(container.id)}
                whileHover={{ y: -5 }}
                className={cn(
                  "p-8 rounded-[3rem] cursor-pointer transition-all border relative overflow-hidden shadow-sm",
                  isActive
                    ? "bg-zinc-900 border-zinc-900 text-white shadow-2xl shadow-zinc-900/40"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-blue-100"
                )}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner",
                      isActive ? "bg-white/10" : "bg-zinc-50 dark:bg-zinc-800 text-blue-600"
                    )}>
                      {isAir ? <Plane className="w-6 h-6" /> : <Anchor className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className={cn("text-[10px] font-black uppercase tracking-widest", isActive ? "text-zinc-500" : "text-zinc-400")}>
                        {isAir ? "Vol Cargo" : "Conteneur"}
                      </p>
                      <h3 className="font-black text-lg">{container.containerNumber}</h3>
                    </div>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    isActive ? "bg-white/10 text-white" : "bg-blue-50 text-blue-600"
                  )}>
                    {container.status}
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-zinc-500 mb-1">Départ</p>
                    <p className="text-sm font-bold">
                      {container.departureDate ? new Date(container.departureDate).toLocaleDateString('fr-FR') : "À définir"}
                    </p>
                  </div>
                  <div className="flex items-center text-zinc-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-[10px] font-black uppercase text-zinc-500 mb-1">Estim. Arrivée</p>
                    <p className="text-sm font-bold">
                      {container.estimatedArrival ? new Date(container.estimatedArrival).toLocaleDateString('fr-FR') : "Pendant transit"}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-zinc-500" />
                    <span className="font-bold text-sm">{(container.shipments || []).length} colis</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-500" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Right Details */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-zinc-900 rounded-[4rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col">
          {!activeContainer ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-20">
               <div className="w-32 h-32 bg-zinc-50 dark:bg-zinc-800 rounded-[3rem] flex items-center justify-center mb-8">
                <Truck className="w-16 h-16 text-zinc-200" />
              </div>
              <h3 className="text-3xl font-black mb-4 italic">Logistique & Départs</h3>
              <p className="text-zinc-500 max-w-sm">Sélectionnez un conteneur pour gérer le groupage et le suivi du transit.</p>
            </div>
          ) : (
            <>
              <div className="p-12 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest leading-none">
                        {activeContainer.status}
                      </span>
                      <h2 className="text-4xl font-black italic tracking-tighter">
                        {activeContainer.containerNumber}
                      </h2>
                    </div>
                    <p className="text-zinc-500 font-medium">Gestion du groupage et du cycle de vie logistique</p>
                  </div>
                  <div className="flex gap-4">
                     <button className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center hover:bg-zinc-100 transition-all">
                      <Settings className="w-6 h-6 text-zinc-400" />
                    </button>
                    <button className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center hover:bg-zinc-100 transition-all">
                      <MoreVertical className="w-6 h-6 text-zinc-400" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <StatCard label="Colis chargés" value={(activeContainer.shipments || []).length} icon={Package} />
                  <StatCard label="Poids Total (est.)" value="-- kg" icon={Truck} color="blue" />
                  <StatCard label="Volume Total" value="-- CBM" icon={BoxIcon} color="orange" />
                  <StatCard label="Délai estimé" value="14 - 60j" icon={Calendar} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-12 space-y-12 no-scrollbar">
                {/* Status Update Actions */}
                {canUpdateStatus && (
                  <div>
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-6">Cycle de vie Logistique</h4>
                    <div className="flex gap-4">
                      {['OUVERT', 'FERME', 'EN_MER', 'ARRIVE'].map((status) => {
                        const isCurrent = activeContainer.status === status
                        return (
                          <button
                            key={status}
                            onClick={() => handleUpdateStatus(status)}
                            disabled={isUpdating || isCurrent}
                            className={cn(
                              "flex-1 h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all",
                              isCurrent 
                                ? "bg-green-500 text-white shadow-lg shadow-green-500/20" 
                                : "bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-500 hover:border-blue-500 hover:text-blue-500"
                            )}
                          >
                            {status === 'EN_MER' ? 'En Transit' : status === 'ARRIVE' ? 'Arrivé Ouaga' : status}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Shipments inside */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Liste des colis groupés</h4>
                    <button 
                      onClick={handleDownloadManifest}
                      className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                    >
                      Imprimer le manifeste
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {activeContainer.shipments.length === 0 ? (
                      <div className="p-12 bg-zinc-50 dark:bg-zinc-800/30 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
                         <p className="text-zinc-400 font-bold mb-4">Ce conteneur est vide.</p>
                         {activeContainer.status === 'OUVERT' && (
                           <button 
                            onClick={() => setIsStuffingOpen(true)}
                            className="px-6 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                           >
                             Ajouter des colis
                           </button>
                         )}
                      </div>
                    ) : (
                      activeContainer.shipments.map((s: any) => (
                        <div 
                          key={s.id} 
                          className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-800 group hover:border-blue-100 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 font-black text-[10px] border border-zinc-100 dark:border-zinc-700">
                              #
                            </div>
                            <div>
                              <p className="font-black text-sm">{s.trackingNumber}</p>
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Poids: {s.weight || '--'}kg | Vol: {s.cbm || '--'}m3</p>
                            </div>
                          </div>
                          <button className="p-3 text-zinc-300 group-hover:text-blue-600 transition-all">
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                   {activeContainer.status === 'OUVERT' && (
                    <button 
                      onClick={() => setIsStuffingOpen(true)}
                      className="w-full mt-8 p-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] text-zinc-400 font-black text-[10px] uppercase tracking-widest hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter des colis au groupage
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Stuffing Modal */}
          <AnimatePresence>
            {isStuffingOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-white dark:bg-zinc-900 overflow-y-auto p-12"
              >
                <div className="flex items-center justify-between mb-12">
                  <h3 className="text-3xl font-black italic tracking-tighter text-zinc-900 dark:text-white">Sélectionnez les colis</h3>
                  <button onClick={() => setIsStuffingOpen(false)} className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableShipments.length === 0 && (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-800/50 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[3rem]">
                       <Package className="w-16 h-16 text-zinc-300 mb-6" />
                       <p className="text-zinc-500 font-bold max-w-xs text-center">
                         Aucun colis en attente de groupage. Les colis doivent être au statut "RECU_CHINE" pour apparaître ici.
                       </p>
                    </div>
                  )}
                  {availableShipments.map((s) => {
                    const isSelected = selectedForStuffing.includes(s.id)
                    return (
                      <div 
                        key={s.id}
                        onClick={() => {
                          setSelectedForStuffing(prev => 
                            prev.includes(s.id) ? prev.filter(id => id !== s.id) : [...prev, s.id]
                          )
                        }}
                        className={cn(
                          "p-8 rounded-[2rem] border-2 cursor-pointer transition-all",
                          isSelected ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/30 font-black" : "bg-zinc-50 dark:bg-zinc-800 border-zinc-50 dark:border-zinc-800 hover:border-blue-100"
                        )}
                      >
                         <p className={cn("text-[10px] font-black uppercase mb-1", isSelected ? "text-white/60" : "text-zinc-500")}>
                           Client: {s.client?.fullName || 'Inconnu'}
                         </p>
                         <p className="text-xl font-black mb-4">{s.trackingNumber}</p>
                         <div className="flex gap-4">
                            <span className="text-[10px] uppercase font-black px-2 py-1 bg-black/10 rounded-md">{s.weight || 0}kg</span>
                            <span className="text-[10px] uppercase font-black px-2 py-1 bg-black/10 rounded-md">{s.cbm || 0}m3</span>
                         </div>
                      </div>
                    )
                  })}
                </div>

                <div className="sticky bottom-0 mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-end gap-6">
                   <button 
                    onClick={() => setIsStuffingOpen(false)}
                    className="h-16 px-10 text-zinc-500 font-bold hover:text-zinc-900 transition-all text-sm"
                   >
                     Annuler
                   </button>
                   <button 
                    onClick={handleAddShipments}
                    disabled={selectedForStuffing.length === 0 || isUpdating}
                    className="h-16 px-12 bg-blue-600 text-white rounded-[2rem] shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all font-black text-sm disabled:opacity-50"
                   >
                     Confirmer le groupage ({selectedForStuffing.length})
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CreateContainerDialog 
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color = "zinc" }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/10",
    orange: "text-orange-600 bg-orange-50 dark:bg-orange-900/10",
    zinc: "text-zinc-400 bg-zinc-50 dark:bg-zinc-800"
  }

  return (
    <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-100 dark:border-zinc-800">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", colors[color])}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xl font-black">{value}</p>
    </div>
  )
}
