"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DollarSign, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  CreditCard,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Wallet
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCFA } from '@/lib/utils'
import { RegisterPaymentDialog } from '@/components/billing/RegisterPaymentDialog'
import { InvoiceDetailsDialog } from '@/components/billing/InvoiceDetailsDialog'
import { generateInvoicePDF } from '@/lib/pdf/invoice-generator'

interface BillingDashboardViewProps {
  invoices: any[]
  stats?: {
    totalRevenue: number
    totalPaid: number
    totalPending: number
  }
}

export function BillingDashboardView({ invoices, stats }: BillingDashboardViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('ALL') // ALL, PAID, PENDING, PARTIAL
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const handleDownload = (invoice: any) => {
    generateInvoicePDF({
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.createdAt,
      dueDate: invoice.dueDate,
      client: {
        name: invoice.client?.fullName || 'Client Laafi',
        email: invoice.client?.email || '',
      },
      shipment: {
        trackingNumber: invoice.shipment?.trackingNumber || 'N/A',
        description: invoice.shipment?.contentDescription || '',
        type: invoice.shipment?.type || 'MARITIME',
        weight: invoice.shipment?.weight,
        cbm: invoice.shipment?.cbm,
      },
      subTotal: invoice.subTotal,
      additionalFees: invoice.additionalFees,
      totalAmount: invoice.totalAmount,
      status: invoice.status,
      payments: (invoice.payments || []).map((p: any) => ({
        amount: p.amount,
        paymentDate: p.createdAt,
        method: p.method
      }))
    })
  }

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inv.client?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inv.shipment?.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      
      if (activeTab === 'ALL') return matchesSearch
      return matchesSearch && inv.status === activeTab
    })
  }, [invoices, searchTerm, activeTab])

  return (
    <div className="flex flex-col gap-8 h-full bg-[#F8FAFC] dark:bg-zinc-950 p-6 lg:p-10 rounded-[4rem]">
      {/* Finance Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Chiffre d'Affaires" 
          value={formatCFA(stats?.totalRevenue || 0)} 
          icon={TrendingUp} 
          trend="+12%" 
          color="blue" 
        />
        <StatCard 
          label="Total Encaissé" 
          value={formatCFA(stats?.totalPaid || 0)} 
          icon={CheckCircle2} 
          trend="85%" 
          color="green" 
        />
        <StatCard 
          label="En Attente" 
          value={formatCFA(stats?.totalPending || 0)} 
          icon={Clock} 
          trend="15%" 
          color="orange" 
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl flex-1 flex flex-col p-10 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50 p-1.5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            {['ALL', 'PAYE', 'PARTIEL', 'EN_ATTENTE'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-xs font-black transition-all tracking-widest",
                  activeTab === tab 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                )}
              >
                {tab === 'ALL' ? 'TOUTES' : tab === 'PAYE' ? 'PAYÉES' : tab === 'PARTIEL' ? 'PARTIELLES' : 'EN ATTENTE'}
              </button>
            ))}
          </div>

          <div className="relative group max-w-sm w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher une facture ou un client..."
              className="w-full h-14 pl-14 pr-6 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead className="sticky top-0 bg-white dark:bg-zinc-900 z-10">
              <tr className="text-zinc-400 uppercase text-[10px] font-black tracking-widest">
                <th className="px-6 py-4">Facture & Date</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Colis lié</th>
                <th className="px-6 py-4">Montant Total</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={inv.id}
                  className="group bg-zinc-50/50 dark:bg-zinc-950/20 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all rounded-[1.5rem]"
                >
                  <td className="px-6 py-6 rounded-l-[1.5rem]">
                    <p className="font-black text-sm text-zinc-900 dark:text-white mb-1 tracking-tighter">{inv.invoiceNumber}</p>
                    <p className="text-[10px] text-zinc-400 font-bold">{new Date(inv.createdAt).toLocaleDateString('fr-FR')}</p>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 font-black text-xs uppercase">
                        {inv.client?.fullName?.charAt(0)}
                      </div>
                      <p className="font-bold text-sm text-zinc-700 dark:text-zinc-300">{inv.client?.fullName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-black text-[10px] bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded-md tracking-widest uppercase">
                      {inv.shipment?.trackingNumber || '--'}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-black text-sm text-blue-600">{formatCFA(inv.totalAmount)}</p>
                  </td>
                  <td className="px-6 py-6">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-6 py-6 text-right rounded-r-[1.5rem]">
                    <div className="flex items-center justify-end gap-2">
                      {inv.status !== 'PAYE' && (
                        <button 
                          onClick={() => {
                            setSelectedInvoice(inv)
                            setIsPaymentDialogOpen(true)
                          }}
                          className="h-10 px-4 bg-green-600 text-white rounded-xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-green-500/20"
                        >
                          Payer
                          <DollarSign className="w-3.5 h-3.5" />
                        </button>
                      )}
                       <button 
                         onClick={() => handleDownload(inv)}
                         className="w-10 h-10 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                       >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedInvoice(inv)
                          setIsDetailsDialogOpen(true)
                        }}
                        className="h-10 px-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                      >
                        Détails
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredInvoices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-zinc-300" />
              </div>
              <p className="text-zinc-500 font-bold italic">Aucune facture trouvée.</p>
            </div>
          )}
        </div>
      </div>

      {selectedInvoice && (
        <RegisterPaymentDialog 
          isOpen={isPaymentDialogOpen}
          onClose={() => setIsPaymentDialogOpen(false)}
          invoice={selectedInvoice}
        />
      )}

      {selectedInvoice && (
        <InvoiceDetailsDialog 
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  )
}

function StatCard({ label, value, icon: Icon, trend, color }: any) {
  const colorMap: any = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    orange: "bg-orange-500",
  }

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl group hover:border-blue-500/50 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", colorMap[color])}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">{label}</p>
          <div className="flex items-center gap-1 justify-end text-green-500 font-black text-[10px] bg-green-500/10 px-2 py-1 rounded-full">
             <ArrowUpRight className="w-3 h-3" />
             {trend}
          </div>
        </div>
      </div>
      <p className="text-4xl font-black italic tracking-tighter text-zinc-900 dark:text-white">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    PAYE: { label: 'Payée', className: 'bg-green-100 dark:bg-green-900/30 text-green-600' },
    EN_ATTENTE: { label: 'En Attente', className: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
    PARTIEL: { label: 'Partielle', className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
    ANNULE: { label: 'Annulée', className: 'bg-red-100 dark:bg-red-900/30 text-red-600' },
  }

  const config = configs[status] || configs['EN_ATTENTE']

  return (
    <div className={cn("inline-flex items-center px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest leading-none", config.className)}>
      {config.label}
    </div>
  )
}
