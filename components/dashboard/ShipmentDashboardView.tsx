"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin, 
  Navigation, 
  Download,
  Maximize2,
  Plus,
  MessageSquare,
  Phone,
  Bell,
  Settings,
  Grid,
  ShoppingBag,
  User,
  FileText,
  Clock,
  Package,
  Truck,
  Globe,
  Info,
  CheckCircle2,
  CreditCard,
  AlertTriangle
} from 'lucide-react'
import { cn, formatCFA } from '@/lib/utils'
import { AddShipmentDialog } from '../shipments/AddShipmentDialog'
import { updateShipmentStatusAction } from '@/actions/shipments'
import { useRouter } from 'next/navigation'

export type DbShipment = {
  id: string
  trackingNumber: string
  status: string | null
  type: string
  destination?: string | null
  weight: any
  cbm: any
  imageUrl?: string | null
  invoiceUrl?: string | null
  createdAt: any
  shippingMode?: string
  paymentStatus?: string
  client?: {
    id?: string
    fullName: string | null
    email: string | null
  }
  invoices?: Array<{
    status: string | null
    totalAmount: number
  }>
}

interface ShipmentDashboardViewProps {
  title: string
  shipments: DbShipment[]
  clients?: any[]
  showAddButton?: boolean
  canUpdateStatus?: boolean
}

const SHIPMENT_STEPS = ["RECU_CHINE", "EN_COURS_GROUPAGE", "CHARGE_TRANSIT", "ARRIVE_OUAGA", "LIVRE"]

const getCheckpoints = (status: string | null, createdAt: any) => {
  const steps = [
    { label: "Réception Chine", key: "RECU_CHINE" },
    { label: "Groupage", key: "EN_COURS_GROUPAGE" },
    { label: "En Transit", key: "CHARGE_TRANSIT" },
    { label: "Arrivée Ouaga", key: "ARRIVE_OUAGA" },
    { label: "Livré", key: "LIVRE" }
  ]

  const statusIndex = steps.findIndex(s => s.key === (status || 'RECU_CHINE'))
  
  return steps.map((s, idx) => ({
    label: s.label,
    completed: idx <= statusIndex,
    time: idx <= statusIndex ? "Fait" : "--:--",
    location: idx <= statusIndex ? (idx < 2 ? "Guangzhou" : "Ouagadougou") : "En attente"
  }))
}

export function ShipmentDashboardView({ 
  title, 
  shipments, 
  clients = [], 
  showAddButton = false,
  canUpdateStatus = false 
}: ShipmentDashboardViewProps) {
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const activeShipment = useMemo(() => {
    if (selectedShipmentId) {
      return shipments.find(s => s.id === selectedShipmentId) || shipments[0]
    }
    return shipments.length > 0 ? shipments[0] : null
  }, [shipments, selectedShipmentId])

  const handleUpdateStatus = async () => {
    if (!activeShipment) return
    
    const currentIndex = SHIPMENT_STEPS.indexOf(activeShipment.status || "RECU_CHINE")
    
    if (currentIndex >= SHIPMENT_STEPS.length - 1) {
      alert("Ce colis est déjà au statut final.")
      return
    }

    const nextStatus = SHIPMENT_STEPS[currentIndex + 1]

    // Règle de sécurité 2026: Pas de livraison si non payé
    if (nextStatus === "LIVRE") {
      const invoices = activeShipment.invoices || []
      const isPaid = invoices.some((inv: any) => inv.status === 'PAYE')
      if (!isPaid) {
        const confirmAnyway = window.confirm("Attention: Ce colis n'est pas encore marqué comme PAYÉ. Voulez-vous vraiment confirmer la livraison ?")
        if (!confirmAnyway) return
      }
    }

    setIsUpdating(true)
    try {
      console.log(`Updating shipment ${activeShipment.id} to ${nextStatus}`)
      const res = await updateShipmentStatusAction(activeShipment.id, nextStatus)
      if (res.success) {
        alert(`Statut mis à jour : ${nextStatus}`)
        router.refresh()
      } else {
        alert(res.error || "Une erreur est survenue lors de la mise à jour")
      }
    } catch (err: any) {
      alert("Erreur technique : " + err.message)
    } finally {
      setIsUpdating(false)
    }
  }

  // Auto-select first shipment on load if nothing selected
  React.useEffect(() => {
    if (!selectedShipmentId && shipments.length > 0) {
      setSelectedShipmentId(shipments[0].id)
    }
  }, [shipments, selectedShipmentId])

  const stats = useMemo(() => {
    return {
      All: shipments.length,
      Prepared: shipments.filter(s => s.status === 'RECU_CHINE').length,
      'Ready for shipping': shipments.filter(s => s.status === 'EN_COURS_GROUPAGE').length,
      'In transit': shipments.filter(s => s.status === 'CHARGE_TRANSIT').length,
      'Arrived Ouaga': shipments.filter(s => s.status === 'ARRIVE_OUAGA').length,
      Delivered: shipments.filter(s => s.status === 'LIVRE').length,
    }
  }, [shipments])

  const filteredShipments = useMemo(() => {
    let result = shipments

    if (activeTab === 'Prepared') result = result.filter(s => s.status === 'RECU_CHINE')
    else if (activeTab === 'Ready for shipping') result = result.filter(s => s.status === 'EN_COURS_GROUPAGE')
    else if (activeTab === 'In transit') result = result.filter(s => s.status === 'CHARGE_TRANSIT')
    else if (activeTab === 'Arrived Ouaga') result = result.filter(s => s.status === 'ARRIVE_OUAGA')
    else if (activeTab === 'Delivered') result = result.filter(s => s.status === 'LIVRE')

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(s => 
        s.trackingNumber.toLowerCase().includes(query) ||
        s.client?.fullName?.toLowerCase().includes(query) ||
        s.destination?.toLowerCase().includes(query)
      )
    }

    return result
  }, [shipments, activeTab, searchQuery])

  return (
    <div className="flex flex-col gap-8 h-full bg-[#F8FAFC] dark:bg-zinc-950 p-6 rounded-[3rem]">
      {/* Top Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1.5 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-x-auto no-scrollbar">
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
          <div className="relative flex-1 md:w-80 pointer-events-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Chercher un colis, client, destination..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
            />
          </div>
          <button className="p-3.5 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-3.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl relative shadow-sm hover:bg-zinc-50 transition-colors">
            <Bell className="w-5 h-5 text-zinc-600" />
            <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Left Column: Shipment List */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-4 no-scrollbar pb-10">
          {/* Add New Package Card */}
          {showAddButton && (
            <motion.div 
              whileHover={{ y: -5 }}
              onClick={() => setIsAddDialogOpen(true)}
              className="p-10 bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center group cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-12 h-12 text-blue-600" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white border-4 border-white dark:border-zinc-900 shadow-xl">
                  <Plus className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-black text-xl mb-2">Add new package</h3>
              <p className="text-zinc-400 text-sm max-w-50">Fill out the form and create a new logistics order</p>
            </motion.div>
          )}

          {filteredShipments.map((shipment) => {
            const isActive = activeShipment?.id === shipment.id
            
            return (
              <motion.div
                key={shipment.id}
                onClick={() => setSelectedShipmentId(shipment.id)}
                whileHover={{ y: -5 }}
                className={cn(
                  "p-10 rounded-[3rem] cursor-pointer transition-all border relative overflow-hidden flex flex-col shadow-sm",
                  isActive
                    ? "bg-blue-600 border-blue-600 shadow-2xl shadow-blue-500/40 text-white"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 hover:shadow-xl hover:border-blue-100"
                )}
              >
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", isActive ? "text-blue-100/60" : "text-zinc-400")}>Number</p>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-lg tracking-tight">{shipment.trackingNumber}</h3>
                      {shipment.type === 'AERIEN' ? (
                        <Globe className={cn("w-4 h-4", isActive ? "text-blue-200" : "text-blue-500")} />
                      ) : (
                        <Navigation className={cn("w-4 h-4", isActive ? "text-cyan-200" : "text-cyan-500")} />
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", isActive ? "text-blue-100/60" : "text-zinc-400")}>Status</p>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 justify-end">
                        <div className={cn("w-2 h-2 rounded-full", isActive ? "bg-green-400 animate-pulse" : "bg-blue-500")} />
                        <span className="font-black text-sm uppercase tracking-wide">{(shipment.status || 'RECU_CHINE').replace('_', ' ')}</span>
                      </div>
                      {shipment.invoices && shipment.invoices[0] && (
                        <span className={cn(
                          "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter",
                          shipment.invoices[0].status === 'PAYE' 
                            ? "bg-green-500/20 text-green-500" 
                            : "bg-orange-500/20 text-orange-500"
                        )}>
                          {shipment.invoices[0].status === 'PAYE' ? 'Payé' : 'Impayé'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-10 relative">
                  <div className="flex-1">
                    <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", isActive ? "text-blue-100/60" : "text-zinc-400")}>Departure</p>
                    <p className="font-black text-sm whitespace-nowrap">
                      {new Date(shipment.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} 
                      <span className={isActive ? "text-white/40" : "text-zinc-400"}> {new Date(shipment.createdAt).getHours()}:{new Date(shipment.createdAt).getMinutes().toString().padStart(2, '0')}</span>
                    </p>
                  </div>
                  
                  <div className="flex-[1.5] px-6 relative flex items-center">
                    <div className={cn("border-t-2 border-dashed w-full", isActive ? "border-white/20" : "border-zinc-100")} />
                    <div className={cn("absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full", isActive ? "bg-white/40" : "bg-zinc-200")} />
                  </div>

                  <div className="flex-1 text-right">
                    <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", isActive ? "text-blue-100/60" : "text-zinc-400")}>Arrival</p>
                    <p className="font-black text-sm whitespace-nowrap">--.--.-- <span className={isActive ? "text-white/40" : "text-zinc-400"}>--:--</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/10 dark:border-zinc-800/50 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden ring-4 ring-white/10 shadow-inner">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${shipment.client?.fullName || shipment.id}`} alt="" />
                    </div>
                    <div>
                      <p className={cn("text-[10px] font-black uppercase tracking-widest", isActive ? "text-blue-100/60" : "text-zinc-400")}>Customer</p>
                      <p className="font-bold text-sm truncate max-w-25">{shipment.client?.fullName || "Eve Swan"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className={cn("w-10 h-10 rounded-xl transition-all flex items-center justify-center", isActive ? "bg-white/10 hover:bg-white/20" : "bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 text-blue-600 shadow-sm")}>
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className={cn("w-10 h-10 rounded-xl transition-all flex items-center justify-center", isActive ? "bg-white/10 hover:bg-white/20" : "bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 text-blue-600 shadow-sm")}>
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Right Column: Map & Dynamic Details */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-zinc-900 rounded-[4rem] overflow-hidden relative border border-zinc-100 dark:border-zinc-800 shadow-2xl">
          {!activeShipment ? (
            <div className="flex flex-col items-center justify-center h-full p-20 text-center">
              <div className="w-32 h-32 bg-zinc-50 dark:bg-zinc-800/50 rounded-[3rem] flex items-center justify-center mb-8 border border-zinc-100 dark:border-zinc-800">
                <Package className="w-16 h-16 text-zinc-300" />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter italic">Prêt à expédier ?</h3>
              <p className="text-zinc-500 max-w-sm font-medium leading-relaxed">
                Aucun colis n'est actuellement sélectionné ou disponible. 
                {showAddButton ? " Utilisez la carte à gauche pour enregistrer un nouveau colis." : " Vos colis apparaîtront ici dès qu'ils seront enregistrés."}
              </p>
            </div>
          ) : (
            <>
              {/* Map Layer */}
              <div className="absolute inset-0 z-0 select-none">
                <div className="w-full h-full bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] bg-size-[40px_40px] opacity-40" />
                
                <svg className="absolute inset-0 w-full h-full text-blue-600/10 pointer-events-none" viewBox="0 0 1000 1000">
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M100,800 Q300,750 450,550 T750,200" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    strokeDasharray="24 12"
                  />
                  <motion.circle 
                    cx="450" cy="550" r="12" fill="#3b82f6"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </svg>
              </div>

              {/* Floating UI Elements */}
              <div className="relative z-10 w-full h-full p-12 pointer-events-none">
                {/* Center Status Tag */}
                <AnimatePresence mode='wait'>
                  {activeShipment && (
                    <motion.div 
                      key={activeShipment.id}
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-auto"
                    >
                      <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl px-10 py-5 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-white dark:border-zinc-800 flex flex-col items-center min-w-50">
                        <p className="text-[10px] font-black text-zinc-400 tracking-[0.3em] mb-1.5 uppercase">{activeShipment.trackingNumber}</p>
                        <div className="text-lg font-black text-zinc-900 dark:text-white uppercase flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] animate-pulse" />
                          {(activeShipment.status || 'RECU_CHINE').replace('_', ' ')}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Map Controls */}
                <div className="absolute bottom-12 right-12 flex flex-col gap-4 pointer-events-auto">
                  <button className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-center font-black text-2xl hover:scale-110 active:scale-95 transition-all text-zinc-600 hover:text-blue-600">+</button>
                  <button className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-center font-black text-2xl hover:scale-110 active:scale-95 transition-all text-zinc-600 hover:text-blue-600">-</button>
                </div>

                {/* Glass Detail Sidebar */}
                {activeShipment && (
                  <motion.div 
                    layout
                    className="absolute top-24 right-12 w-96 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-3xl p-10 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] border border-white/40 dark:border-zinc-800/50 pointer-events-auto max-h-[85vh] overflow-y-auto no-scrollbar"
                  >
                    <div className="space-y-10">
                      {activeShipment.imageUrl && (
                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-inner bg-zinc-100 dark:bg-zinc-800 mb-6">
                          <img 
                            src={activeShipment.imageUrl} 
                            alt="Package content" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-2xl tracking-tighter italic">Package Intel</h4>
                        <button className="text-zinc-400 p-2.5 hover:bg-white/50 dark:hover:bg-zinc-800 rounded-2xl transition-all"><MoreVertical className="w-6 h-6" /></button>
                      </div>
                      
                      <div className="space-y-8">
                        <DetailItem icon={MapPin} label="Destination Region" value={activeShipment.destination || "Burkina Faso, Ouaga (Samandin)"} color="blue" />
                        <DetailItem icon={User} label="Primary Contact" value={activeShipment.client?.fullName || "Non assigné"} />
                        <DetailItem icon={Package} label="Package Type" value={activeShipment.type === 'AERIEN' ? "Fret Aérien (MCO)" : "Fret Maritime"} />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <DetailItem 
                            icon={Maximize2} 
                            label="Weight" 
                            value={activeShipment.weight ? `${activeShipment.weight} KG` : "--"} 
                          />
                          <DetailItem 
                            icon={Grid} 
                            label="Volume" 
                            value={activeShipment.cbm ? `${activeShipment.cbm} CBM` : "--"} 
                          />
                        </div>

                        {activeShipment.invoiceUrl && (
                          <div className="flex items-center justify-between p-6 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/50 rounded-3xl group cursor-pointer hover:bg-green-100 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white">
                                <FileText className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Facture Maritime</p>
                                <p className="text-sm font-bold">Document.pdf</p>
                              </div>
                            </div>
                            <a 
                              href={activeShipment.invoiceUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"
                            >
                              <Download className="w-4 h-4 text-green-600" />
                            </a>
                          </div>
                        )}

                        <DetailItem icon={Navigation} label="Real-time Tracking" value={activeShipment.trackingNumber} color="orange" />

                        {activeShipment.invoices && activeShipment.invoices.length > 0 && (
                          <div className={cn(
                            "p-6 rounded-[2rem] border transition-all",
                            activeShipment.invoices[0].status === 'PAYE' 
                              ? "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800" 
                              : "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800"
                          )}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <CreditCard className={cn(
                                  "w-6 h-6",
                                  activeShipment.invoices[0].status === 'PAYE' ? "text-green-600" : "text-orange-600"
                                )} />
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Statut Financier</p>
                              </div>
                              <span className={cn(
                                "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter",
                                activeShipment.invoices[0].status === 'PAYE' ? "bg-green-600 text-white" : "bg-orange-600 text-white"
                              )}>
                                {activeShipment.invoices[0].status === 'PAYE' ? 'RÉGLÉ' : 'EN ATTENTE'}
                              </span>
                            </div>
                            <p className="text-xl font-black italic tracking-tighter">
                              {formatCFA(activeShipment.invoices[0].totalAmount)}
                            </p>
                            {activeShipment.invoices[0].status !== 'PAYE' && activeShipment.status === 'ARRIVE_OUAGA' && (
                              <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30">
                                <AlertTriangle className="w-4 h-4" />
                                <p className="text-[9px] font-bold uppercase leading-tight">Paiement requis avant livraison à Samandin.</p>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                          <div className="flex items-center gap-2 mb-1">
                            <Info className="w-3 h-3 text-blue-600" />
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Suivi Laafi Cargo</p>
                          </div>
                          <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                            {activeShipment.type === 'AERIEN' 
                              ? "Aérien : Mises à jour les mardis et vendredis. Délai standard 14j." 
                              : "Maritime : Mises à jour chaque samedi. Délai transit 2 mois après chargement."}
                          </p>
                        </div>

                        {/* Real-time Tracking Timeline */}
                        <div className="space-y-6 py-4">
                          <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Historique du trajet</h5>
                          <div className="space-y-4">
                            {getCheckpoints(activeShipment.status, activeShipment.createdAt).map((step, idx) => (
                              <div key={idx} className="flex gap-4 group/step relative">
                                {idx !== 4 && (
                                  <div className={cn(
                                    "absolute left-[11px] top-6 w-[2px] h-8",
                                    step.completed ? "bg-blue-600" : "bg-zinc-100 dark:bg-zinc-800"
                                  )} />
                                )}
                                <div className={cn(
                                  "w-6 h-6 rounded-full border-4 flex items-center justify-center shrink-0 transition-all",
                                  step.completed 
                                    ? "bg-blue-600 border-blue-100 dark:border-blue-900 shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800"
                                )}>
                                  {step.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-center mb-0.5">
                                    <p className={cn("text-xs font-black", step.completed ? "text-zinc-900 dark:text-white" : "text-zinc-400")}>
                                      {step.label}
                                    </p>
                                    <p className="text-[10px] font-bold text-zinc-400">{step.time}</p>
                                  </div>
                                  <p className="text-[10px] font-medium text-zinc-400">{step.location}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {canUpdateStatus && activeShipment.status !== 'LIVRE' && (
                          <div className="pt-4">
                            <button 
                              onClick={handleUpdateStatus}
                              disabled={isUpdating}
                              className="w-full h-14 bg-zinc-900 border-2 border-zinc-900 dark:bg-zinc-100 dark:border-zinc-100 text-white dark:text-zinc-900 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                            >
                              <Truck className="w-4 h-4" />
                              {isUpdating ? "Mise à jour..." : `Passer à : ${SHIPMENT_STEPS[SHIPMENT_STEPS.indexOf(activeShipment.status || "RECU_CHINE") + 1]?.replace('_', ' ')}`}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="pt-8 border-t border-zinc-900/5 dark:border-white/5 flex items-center justify-between">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                        <button className="text-xs font-black uppercase text-blue-600 tracking-widest hover:underline">View History</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <AddShipmentDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        clients={clients}
      />
    </div>
  )
}

function DetailItem({ icon: Icon, label, value, color = "zinc" }: { icon: any, label: string, value: string, color?: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-600 text-white shadow-lg shadow-blue-500/30",
    orange: "bg-orange-500 text-white shadow-lg shadow-orange-500/30",
    zinc: "bg-white dark:bg-zinc-800 text-zinc-400 border border-zinc-100 dark:border-zinc-700 shadow-sm"
  }

  return (
    <div className="flex gap-6 group">
      <div className={cn("w-14 h-14 rounded-3xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", colors[color])}>
        <Icon className="w-7 h-7" />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-1.5">{label}</p>
        <p className="text-[13px] font-black leading-snug text-zinc-900 dark:text-zinc-100">{value}</p>
      </div>
    </div>
  )
}

