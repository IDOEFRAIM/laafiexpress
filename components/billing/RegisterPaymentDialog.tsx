"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  DollarSign, 
  Loader2, 
  AlertCircle,
  Hash,
  ArrowRight
} from 'lucide-react'
import { registerPaymentAction } from '@/actions/billing'
import { useRouter } from 'next/navigation'
import { formatCFA } from '@/lib/utils'

interface RegisterPaymentDialogProps {
  isOpen: boolean
  onClose: () => void
  invoice: any
}

export function RegisterPaymentDialog({ isOpen, onClose, invoice }: RegisterPaymentDialogProps) {
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('ESPECE')
  const [reference, setReference] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  // Utiliser payments de l'objet invoice s'il existe
  const paidTotal = (invoice.payments || []).reduce((acc: number, p: any) => acc + (p.amount || 0), 0)
  const remaining = invoice.totalAmount - paidTotal

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const numAmount = parseFloat(amount)
      if (isNaN(numAmount) || numAmount <= 0) {
        throw new Error("Montant invalide")
      }

      const res = await registerPaymentAction({
        invoiceId: invoice.id,
        amount: numAmount,
        paymentMethod: paymentMethod as any,
        reference: reference || undefined
      })

      if (res.success) {
        onClose()
        router.refresh()
      } else {
        setError(res.error || "Une erreur est survenue")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

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
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
      >
        <div className="p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase">
                Encaisser Paiement
              </h2>
              <p className="text-zinc-400 font-bold text-xs mt-1 uppercase tracking-widest">
                Facture {invoice.invoiceNumber}
              </p>
            </div>
            <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Total Facture</p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white mb-4 italic">{formatCFA(invoice.totalAmount)}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div>
                  <p className="text-[8px] font-black text-zinc-400 uppercase mb-1">Déjà Payé</p>
                  <p className="text-sm font-black text-green-600">{formatCFA(paidTotal)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black text-zinc-400 uppercase mb-1">Reste à payer</p>
                  <p className="text-sm font-black text-orange-600 italic">{formatCFA(remaining)}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4 mb-2 block">
                  Montant à Encaisser (CFA)
                </label>
                <div className="relative group">
                  <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={remaining.toString()}
                    className="w-full h-16 pl-14 pr-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl focus:outline-none focus:border-blue-600 transition-all font-black text-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4 mb-2 block">
                  Mode de Paiement
                </label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-16 px-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl focus:outline-none border-zinc-200 font-bold uppercase text-xs tracking-widest"
                >
                  <option value="ESPECE">Espèces (Cash)</option>
                  <option value="ORANGE_MONEY">Orange Money</option>
                  <option value="MOOV_MONEY">Moov Money</option>
                  <option value="VIREMENT">Virement Bancaire</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4 mb-2 block">
                  Référence / ID Transaction
                </label>
                <div className="relative group">
                  <Hash className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="text" 
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="ex: OM-82349..."
                    className="w-full h-16 pl-14 pr-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl focus:outline-none border-zinc-200 transition-all font-bold text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl text-xs font-bold border border-red-100 dark:border-red-900/30">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading || !amount}
                className="w-full h-16 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 text-white rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 transition-all"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Confirmer le Paiement
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
