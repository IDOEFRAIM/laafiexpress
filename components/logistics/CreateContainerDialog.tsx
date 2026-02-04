"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Calendar, Ship, Plane, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createContainerAction } from '@/actions/logistics'

interface CreateContainerDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateContainerDialog({ isOpen, onClose }: CreateContainerDialogProps) {
  const [formData, setFormData] = useState({
    containerNumber: '',
    departureDate: '',
    type: 'SEA' as 'AIR' | 'SEA'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await createContainerAction({
        containerNumber: formData.containerNumber,
        departureDate: new Date(formData.departureDate)
      })

      if (res.success) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
          setSuccess(false)
          setFormData({ containerNumber: '', departureDate: '', type: 'SEA' })
        }, 2000)
      } else {
        setError(res.error || "Erreur lors de la création")
      }
    } catch (err) {
      setError("Une erreur est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Plus className="text-white w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black italic tracking-tighter">Nouveau Départ</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {success ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                    <CheckCircle2 className="text-white w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 italic">Créé avec succès !</h3>
                  <p className="text-zinc-500 font-medium tracking-tight">Le conteneur est maintenant ouvert pour le groupage.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl flex items-center gap-3 text-red-600">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-xs font-black uppercase tracking-widest">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 ml-2">Type de transport internationaux</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, type: 'SEA'})}
                        className={cn(
                          "h-16 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all font-black text-sm",
                          formData.type === 'SEA' 
                            ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20" 
                            : "border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-blue-100"
                        )}
                      >
                        <Ship className="w-5 h-5" />
                        MARITIME
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, type: 'AIR'})}
                        className={cn(
                          "h-16 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all font-black text-sm",
                          formData.type === 'AIR' 
                            ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20" 
                            : "border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-blue-100"
                        )}
                      >
                        <Plane className="w-5 h-5" />
                        AÉRIEN
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="containerNumber" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 ml-2">Numéro de Conteneur / Vol</label>
                    <input
                      id="containerNumber"
                      required
                      placeholder={formData.type === 'SEA' ? "Ex: MSKU 123456" : "Ex: TK 512 / AF 001"}
                      className="w-full h-16 px-6 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
                      value={formData.containerNumber}
                      onChange={(e) => setFormData({...formData, containerNumber: e.target.value})}
                    />
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="departureDate" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 ml-2">Date de départ prévue</label>
                    <div className="relative">
                      <input
                        id="departureDate"
                        type="date"
                        required
                        className="w-full h-16 px-6 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
                        value={formData.departureDate}
                        onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 bg-blue-600 text-white rounded-[2rem] shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? "Initialisation..." : "Confirmer l'ouverture du transport"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
