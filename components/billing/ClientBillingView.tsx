"use client"

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  CreditCard, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  TrendingDown,
  Building2
} from 'lucide-react'
import { cn, formatCFA } from '@/lib/utils'
import { generateInvoicePDF } from '@/lib/pdf/invoice-generator'

interface ClientBillingViewProps {
  invoices: any[]
}

export function ClientBillingView({ invoices }: ClientBillingViewProps) {
  const stats = useMemo(() => {
    const total = invoices.reduce((acc, inv) => acc + (inv.totalAmount || 0), 0)
    const paid = invoices.reduce((acc, inv) => {
      const paymentsTotal = inv.payments?.reduce((pAcc: number, p: any) => pAcc + p.amount, 0) || 0
      return acc + paymentsTotal
    }, 0)
    const pending = total - paid
    
    return { total, paid, pending, count: invoices.length }
  }, [invoices])

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
      payments: invoice.payments.map((p: any) => ({
        amount: p.amount,
        paymentDate: p.createdAt,
        method: p.paymentMethod
      }))
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter mb-2 underline bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Ma Facturation
          </h1>
          <p className="text-zinc-500 font-medium">Suivi de vos paiements et téléchargement de factures.</p>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
           <Building2 className="w-5 h-5 text-blue-600" />
           <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">ID Client: #LAAFI-{invoices[0]?.clientId?.split('-')[0].toUpperCase()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/20">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Total Facturé</p>
            <h3 className="text-3xl font-black italic tracking-tighter">{formatCFA(stats.total)}</h3>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-zinc-400">
              <ArrowUpRight className="w-3 h-3" />
              <span>Sur {stats.count} factures émises</span>
            </div>
         </div>

         <div className="p-8 bg-green-600 rounded-[2.5rem] text-white shadow-xl shadow-green-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Total Payé</p>
              <h3 className="text-3xl font-black italic tracking-tighter">{formatCFA(stats.paid)}</h3>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-bold opacity-80">
                <CheckCircle2 className="w-3 h-3" />
                <span>Règlements reçus</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <TrendingDown className="w-32 h-32 -mr-8 -mt-8 rotate-12" />
            </div>
         </div>

         <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-orange-100 dark:border-orange-900/30 shadow-xl shadow-orange-500/5 items-center">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Reste à payer</p>
            <h3 className="text-3xl font-black italic tracking-tighter text-orange-600">{formatCFA(stats.pending)}</h3>
            {stats.pending > 0 && (
              <div className="mt-4 flex items-center gap-2 py-1.5 px-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-full w-fit">
                <AlertCircle className="w-3 h-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">Paiement requis à l'arrivée</span>
              </div>
            )}
         </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-zinc-50 dark:border-zinc-800/50 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">Historique des factures</h4>
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-100 dark:border-zinc-700">
             <Filter className="w-3 h-3" /> 
             Filtre : Tout
          </div>
        </div>

        <div className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
          {invoices.length === 0 ? (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-zinc-200" />
              </div>
              <p className="text-zinc-400 font-bold">Aucune facture enregistrée.</p>
            </div>
          ) : (
            invoices.map((inv) => (
              <motion.div 
                key={inv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    inv.status === 'PAYE' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                  )}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm font-black tracking-tight">{inv.invoiceNumber}</span>
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                        inv.status === 'PAYE' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      )}>
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-bold">Colis: {inv.shipment?.trackingNumber || 'N/A'}</p>
                    <p className="text-[9px] text-zinc-300 italic">Émis le {new Date(inv.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                   <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Montant</p>
                      <p className="text-xl font-black italic tracking-tighter">{formatCFA(inv.totalAmount)}</p>
                   </div>
                   
                   <button 
                    onClick={() => handleDownload(inv)}
                    className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm group-hover:scale-110 active:scale-95"
                   >
                     <Download className="w-5 h-5" />
                   </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function Filter({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
  )
}
