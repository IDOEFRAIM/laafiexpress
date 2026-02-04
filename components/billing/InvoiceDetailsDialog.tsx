"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  FileText, 
  CreditCard, 
  Calendar, 
  User, 
  Package, 
  TrendingUp, 
  CheckCircle2, 
  Clock,
  Download,
  ExternalLink,
  MapPin
} from 'lucide-react'
import { cn, formatCFA } from '@/lib/utils'
import { generateInvoicePDF } from '@/lib/pdf/invoice-generator'

interface InvoiceDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  invoice: any
}

export function InvoiceDetailsDialog({ isOpen, onClose, invoice }: InvoiceDetailsDialogProps) {
  if (!isOpen || !invoice) return null

  const handleDownload = () => {
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

  const paidTotal = (invoice.payments || []).reduce((acc: number, p: any) => acc + (p.amount || 0), 0)
  const balance = invoice.totalAmount - paidTotal

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-[#F8FAFC] dark:bg-zinc-950 rounded-[3rem] shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Left Panel: Summary & Status */}
        <div className="w-full md:w-80 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 p-8 flex flex-col">
          <div className="mb-10 text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-500/20">
              <FileText className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black italic tracking-tighter uppercase">{invoice.invoiceNumber}</h3>
            <p className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest mt-1">Facture Transport</p>
          </div>

          <div className="space-y-6 flex-1">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">État actuel</p>
               <div className="flex items-center gap-2">
                 {invoice.status === 'PAYE' ? (
                   <CheckCircle2 className="w-4 h-4 text-green-500" />
                 ) : (
                   <Clock className="w-4 h-4 text-orange-500" />
                 )}
                 <span className="font-black text-xs uppercase italic">{invoice.status}</span>
               </div>
            </div>

            <div className="space-y-2">
               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pl-2">Dates Clés</p>
               <div className="flex items-center gap-3 text-sm font-bold p-3">
                 <Calendar className="w-4 h-4 text-zinc-400" />
                 <div>
                   <p className="text-zinc-500 text-[10px] uppercase">Émission</p>
                   <p>{new Date(invoice.createdAt).toLocaleDateString('fr-FR')}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3 text-sm font-bold p-3">
                 <Calendar className="w-4 h-4 text-red-400" />
                 <div>
                   <p className="text-zinc-500 text-[10px] uppercase">Date Limite</p>
                   <p>{new Date(invoice.dueDate).toLocaleDateString('fr-FR')}</p>
                 </div>
               </div>
            </div>
          </div>

          <button 
            onClick={handleDownload}
            className="mt-auto w-full h-14 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all"
          >
            Télécharger PDF
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Right Panel: Details Tabs */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12 no-scrollbar">
           <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors shadow-sm"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Client & Shipment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <User className="w-3 h-3" /> Client Destinataire
              </h4>
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-1">
                <p className="font-black text-lg italic">{invoice.client?.fullName}</p>
                <p className="text-sm font-bold text-zinc-500">{invoice.client?.email}</p>
                <div className="flex items-center gap-2 text-zinc-400 text-[10px] mt-2 font-bold uppercase">
                  <MapPin className="w-3 h-3" /> Ouagadougou, Burkina Faso
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Package className="w-3 h-3" /> Informations Colis
              </h4>
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-black text-sm text-blue-600 mb-1">{invoice.shipment?.trackingNumber}</p>
                  <p className="text-xs font-bold text-zinc-500">{invoice.shipment?.type} - {invoice.shipment?.contentDescription || 'Marchandises diverses'}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black italic">{invoice.shipment?.weight ? `${invoice.shipment?.weight} KG` : `${invoice.shipment?.cbm} M³`}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Finance & Payments */}
          <div className="space-y-6">
             <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <TrendingUp className="w-3 h-3" /> Détails Financiers & Paiements
              </h4>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-blue-600 text-white rounded-[2rem] shadow-lg shadow-blue-500/20">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Total Facturé</p>
                   <p className="text-xl font-black italic">{formatCFA(invoice.totalAmount)}</p>
                </div>
                <div className="p-6 bg-green-500 text-white rounded-[2rem] shadow-lg shadow-green-500/20">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-1">Déjà Encaissé</p>
                   <p className="text-xl font-black italic">{formatCFA(paidTotal)}</p>
                </div>
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-orange-100 dark:border-orange-900/30 text-orange-600 shadow-sm">
                   <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Reste à payer</p>
                   <p className="text-xl font-black italic">{formatCFA(balance)}</p>
                </div>
              </div>

              {/* Payments History Table */}
              <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                   <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                      <tr className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Méthode</th>
                        <th className="px-6 py-4">Référence</th>
                        <th className="px-6 py-4 text-right">Montant</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                      {invoice.payments?.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-10 text-center text-xs font-bold text-zinc-400 italic">
                             Aucun paiement enregistré pour le moment.
                          </td>
                        </tr>
                      ) : (
                        invoice.payments?.map((p: any) => (
                          <tr key={p.id} className="text-xs">
                            <td className="px-6 py-4 font-bold text-zinc-500">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-black uppercase text-[9px]">{p.method}</span></td>
                            <td className="px-6 py-4 font-mono text-zinc-400">{p.transactionId || '--'}</td>
                            <td className="px-6 py-4 text-right font-black text-green-600">+{formatCFA(p.amount)}</td>
                          </tr>
                        ))
                      )}
                   </tbody>
                </table>
              </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
