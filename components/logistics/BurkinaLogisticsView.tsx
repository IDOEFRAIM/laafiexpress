"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  ArrowDownRight,
  Box,
  Search,
  Scan,
  RefreshCcw,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { updateContainerStatusAction } from '@/actions/logistics'
import { useRouter } from 'next/navigation'

interface BurkinaLogisticsViewProps {
  transitContainers: any[]
}

export function BurkinaLogisticsView({ transitContainers }: BurkinaLogisticsViewProps) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleArrival = async (containerId: string) => {
    if (!confirm("Voulez-vous confirmer l'arrivée de ce conteneur à Ouagadougou ?")) return
    
    setIsUpdating(containerId)
    try {
      const res = await updateContainerStatusAction(containerId, 'ARRIVE')
      if (res.success) {
        router.refresh()
      } else {
        alert("Erreur: " + res.error)
      }
    } catch (error) {
      alert("Une erreur est survenue")
    } finally {
      setIsUpdating(null)
    }
  }

  const filtered = transitContainers.filter(c => 
    c.containerNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-10">
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative group max-w-md w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Scuanner ou saisir n° conteneur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-16 pl-14 pr-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-sm shadow-xl shadow-zinc-200/50 dark:shadow-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-tight">En Transit</p>
            <p className="text-xl font-black text-blue-600 italic leading-tight">{transitContainers.length}</p>
          </div>
        </div>
      </div>

      {/* Container Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AnimatePresence mode='popLayout'>
          {filtered.map((container) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={container.id}
              className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-900 dark:text-white">
                      <Truck className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">N° Conteneur / Lot</p>
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter">
                        {container.containerNumber}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Status</p>
                    <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      En Mer / Route
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <InfoItem 
                    label="Départ" 
                    value={new Date(container.departureDate).toLocaleDateString()} 
                    icon={Clock} 
                  />
                  <InfoItem 
                    label="Colis" 
                    value={container.shipments?.length || 0} 
                    icon={Package} 
                  />
                  <InfoItem 
                    label="Destination" 
                    value="OUAGADOUGOU" 
                    icon={MapPin} 
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleArrival(container.id)}
                    disabled={isUpdating === container.id}
                    className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-200 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 transition-all"
                  >
                    {isUpdating === container.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Confirmer Arrivée
                      </>
                    )}
                  </button>
                  <button className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all">
                    <Search className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              </div>

              {/* Progress Line */}
              <div className="h-2 bg-zinc-100 dark:bg-zinc-800 w-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  className="h-full bg-blue-600 rounded-r-full"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[3rem]">
            <Scan className="w-16 h-16 text-zinc-300 mb-6" />
            <p className="text-zinc-500 font-bold text-center px-10">
              Aucun conteneur en transit trouvé. Scannez un conteneur pour commencer.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoItem({ label, value, icon: Icon }: any) {
  return (
    <div className="bg-zinc-50/50 dark:bg-zinc-950/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3 h-3 text-zinc-400" />
        <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-xs font-black text-zinc-900 dark:text-zinc-100 truncate">{value}</p>
    </div>
  )
}
