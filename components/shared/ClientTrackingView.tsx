"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Anchor, 
  Plane,
  ArrowRight,
  Search,
  Globe,
  Navigation,
  Box
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ClientTrackingViewProps {
  shipments: any[]
}

const STEPS = [
  { key: "RECU_CHINE", label: "Réception Chine", location: "Guangzhou / Foshan", icon: Package },
  { key: "EN_COURS_GROUPAGE", label: "Groupage en cours", location: "Entrepôt Chine", icon: Box },
  { key: "CHARGE_TRANSIT", label: "En Transit", location: "En mer / En vol", icon: Truck },
  { key: "ARRIVE_OUAGA", label: "Arrivé à Ouagadougou", location: "Bureau Samandin", icon: MapPin },
  { key: "LIVRE", label: "Livré", location: "Client", icon: CheckCircle2 },
]

export function ClientTrackingView({ shipments }: ClientTrackingViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(shipments[0]?.id || null)

  const filtered = shipments.filter(s => 
    s.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.contentDescription?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedShipment = shipments.find(s => s.id === selectedId) || shipments[0]

  const getStepIndex = (status: string | null) => {
    const idx = STEPS.findIndex(s => s.key === (status || 'RECU_CHINE'))
    return idx >= 0 ? idx : 0
  }

  const activeStepIndex = selectedShipment ? getStepIndex(selectedShipment.status) : 0
  const progress = selectedShipment ? ((activeStepIndex + 1) / STEPS.length) * 100 : 0

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            Suivi <span className="text-blue-600">Logistique</span>
          </h1>
          <p className="text-zinc-400 font-bold text-xs mt-2 uppercase tracking-[0.3em]">
            Suivez vos colis en temps réel de la Chine au Burkina Faso
          </p>
        </div>

        <div className="relative group max-w-sm w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher un colis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Shipment List (Left) */}
        <div className="col-span-12 lg:col-span-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
          {filtered.length === 0 ? (
            <div className="p-12 bg-zinc-50 dark:bg-zinc-800/30 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
              <Package className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-400 font-bold">Aucun colis trouvé.</p>
            </div>
          ) : (
            filtered.map((shipment) => {
              const isActive = selectedId === shipment.id
              const isAir = shipment.type === 'AERIEN'
              const stepIdx = getStepIndex(shipment.status)
              const pct = ((stepIdx + 1) / STEPS.length) * 100

              return (
                <motion.div
                  key={shipment.id}
                  onClick={() => setSelectedId(shipment.id)}
                  whileHover={{ y: -3 }}
                  className={cn(
                    "p-6 rounded-[2rem] cursor-pointer transition-all border relative overflow-hidden",
                    isActive
                      ? "bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-500/30"
                      : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:border-blue-100 shadow-sm"
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        isActive ? "bg-white/20" : "bg-zinc-50 dark:bg-zinc-800 text-blue-600"
                      )}>
                        {isAir ? <Plane className="w-5 h-5" /> : <Anchor className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-black text-sm tracking-tight">{shipment.trackingNumber}</p>
                        <p className={cn("text-[10px] font-bold", isActive ? "text-blue-200" : "text-zinc-400")}>
                          {isAir ? 'Fret Aérien' : 'Fret Maritime'}
                        </p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                      isActive ? "bg-white/20" : "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                    )}>
                      {(shipment.status || 'RECU_CHINE').replace(/_/g, ' ')}
                    </div>
                  </div>

                  {/* Mini progress bar */}
                  <div className={cn("h-1.5 rounded-full overflow-hidden", isActive ? "bg-white/20" : "bg-zinc-100 dark:bg-zinc-800")}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      className={cn("h-full rounded-full", isActive ? "bg-white" : "bg-blue-600")}
                    />
                  </div>
                  <p className={cn("text-[9px] font-bold mt-2", isActive ? "text-blue-200" : "text-zinc-400")}>
                    {Math.round(pct)}% terminé
                  </p>
                </motion.div>
              )
            })
          )}
        </div>

        {/* Tracking Detail (Right) */}
        <div className="col-span-12 lg:col-span-8">
          {!selectedShipment ? (
            <div className="flex flex-col items-center justify-center h-full p-20 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl text-center">
              <Globe className="w-16 h-16 text-zinc-300 mb-6" />
              <h3 className="text-2xl font-black italic tracking-tighter mb-2">Suivi en temps réel</h3>
              <p className="text-zinc-500">Sélectionnez un colis pour voir son parcours.</p>
            </div>
          ) : (
            <motion.div 
              key={selectedShipment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-xl overflow-hidden"
            >
              {/* Top Banner */}
              <div className="p-10 bg-linear-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[20px_20px]" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Numéro de suivi</p>
                      <h2 className="text-3xl font-black italic tracking-tighter">{selectedShipment.trackingNumber}</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                        {selectedShipment.type === 'AERIEN' ? '✈️ Aérien' : '🚢 Maritime'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Départ</p>
                      <p className="text-sm font-bold">Guangzhou, Chine 🇨🇳</p>
                    </div>
                    <div className="flex-1 border-t-2 border-dashed border-white/20 relative mx-4">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        {selectedShipment.type === 'AERIEN' 
                          ? <Plane className="w-3 h-3 text-blue-600" /> 
                          : <Anchor className="w-3 h-3 text-blue-600" />
                        }
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Destination</p>
                      <p className="text-sm font-bold">Ouagadougou, BF 🇧🇫</p>
                    </div>
                  </div>

                  {/* Overall Progress */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Progression</span>
                      <span className="text-sm font-black">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-10 space-y-2">
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-8">Parcours détaillé</h4>
                
                {STEPS.map((step, idx) => {
                  const StepIcon = step.icon
                  const isCompleted = idx <= activeStepIndex
                  const isCurrent = idx === activeStepIndex
                  const isLast = idx === STEPS.length - 1

                  return (
                    <div key={step.key} className="flex gap-6 relative">
                      {/* Connector Line */}
                      {!isLast && (
                        <div className={cn(
                          "absolute left-5.75 top-12 w-0.5 h-16",
                          isCompleted && idx < activeStepIndex ? "bg-blue-600" : "bg-zinc-100 dark:bg-zinc-800"
                        )} />
                      )}
                      
                      {/* Step Dot */}
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all relative z-10",
                        isCurrent 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100 dark:ring-blue-900"
                          : isCompleted 
                            ? "bg-blue-600 text-white" 
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                      )}>
                        <StepIcon className="w-5 h-5" />
                      </div>

                      {/* Step Content */}
                      <div className={cn(
                        "flex-1 pb-8",
                        isCurrent ? "" : ""
                      )}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={cn(
                              "font-black text-sm",
                              isCompleted ? "text-zinc-900 dark:text-white" : "text-zinc-400"
                            )}>
                              {step.label}
                            </p>
                            <p className="text-[10px] font-bold text-zinc-400 mt-0.5">{step.location}</p>
                          </div>
                          
                          <div className="text-right">
                            {isCompleted ? (
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Fait</span>
                              </div>
                            ) : (
                              <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> En attente
                              </span>
                            )}
                          </div>
                        </div>

                        {isCurrent && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800"
                          >
                            <p className="text-[11px] text-blue-700 dark:text-blue-300 font-medium leading-relaxed">
                              {selectedShipment.type === 'AERIEN'
                                ? "Fret Aérien — Mises à jour les mardis et vendredis. Délai estimé : ~14 jours."
                                : "Fret Maritime — Mises à jour chaque samedi. Délai estimé : ~2 mois après chargement."
                              }
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Info Footer */}
              <div className="px-10 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard 
                    label="Poids" 
                    value={selectedShipment.weight ? `${selectedShipment.weight} kg` : '--'} 
                    icon={Package}
                  />
                  <InfoCard 
                    label="Volume" 
                    value={selectedShipment.cbm ? `${selectedShipment.cbm} m³` : '--'} 
                    icon={Box}
                  />
                  <InfoCard 
                    label="Destination" 
                    value={selectedShipment.destination || 'Ouagadougou (Samandin)'} 
                    icon={MapPin}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoCard({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-zinc-400" />
        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-sm font-black text-zinc-900 dark:text-white">{value}</p>
    </div>
  )
}
