"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Package, Box, Truck, ShieldCheck, Upload, AlertCircle, CheckCircle2, ChevronRight, Info, Calculator } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createShipmentAction } from '@/actions/shipments'
import { createClient } from '@/lib/supabase/client'
import { pricingService } from '@/services/pricing'
import { formatCFA } from '@/lib/utils'

interface Client {
  id: string
  fullName: string | null
  email: string | null
}

interface AddShipmentDialogProps {
  isOpen: boolean
  onClose: () => void
  clients: Client[]
}

export function AddShipmentDialog({ isOpen, onClose, clients }: AddShipmentDialogProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [createdInfo, setCreatedInfo] = useState<{ shipmentId: string; invoiceNumber: string } | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null) // AJOUTÉ
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [invoicePreviewUrl, setInvoicePreviewUrl] = useState<string | null>(null) // AJOUTÉ

  // Form state
  const [formData, setFormData] = useState({
    trackingNumber: '',
    clientId: '',
    type: 'AERIEN' as 'AERIEN' | 'MARITIME',
    category: 'MCO' as 'MCO' | 'LTA' | 'EXPRESS' | 'CONTAINER',
    weight: '',
    cbm: '',
    contentDescription: '',
    destination: 'Ouagadougou (Samandin)',
    hasBattery: false,
    imageUrl: '', 
    invoiceUrl: '', 
  })

  const livePrice = pricingService.calculateShipmentPrice({
    type: formData.type,
    category: formData.category,
    weight: formData.weight ? parseFloat(formData.weight) : 0,
    cbm: formData.cbm ? parseFloat(formData.cbm) : 0,
  })

  const handleNext = () => setStep(s => s + 1)
  const handleBack = () => setStep(s => s - 1)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("Le fichier est trop volumineux (max 10MB)")
        return
      }
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("La facture est trop volumineuse (max 10MB)")
        return
      }
      setInvoiceFile(selectedFile)
      setInvoicePreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  const uploadToSupabase = async (selectedFile: File): Promise<string> => {
    const supabase = createClient()
    const fileExt = selectedFile.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `shipments/${fileName}`

    const { error: uploadError, data } = await supabase.storage
      .from('shipments')
      .upload(filePath, selectedFile)

    if (uploadError) {
      throw new Error(`Upload error: ${uploadError.message}`)
    }

    const { data: { publicUrl } } = supabase.storage
      .from('shipments')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async () => {
    if (!file) {
      setError("La photo du colis est obligatoire")
      return
    }

    if (formData.type === 'MARITIME' && !invoiceFile) {
      setError("La facture est obligatoire pour le transport maritime (Règle 3.6)")
      return
    }

    setIsSubmitting(true)
    setError(null)
    
    try {
      // 1. Upload Files
      setUploading(true)
      const imageUrl = await uploadToSupabase(file)
      let invoiceUrl = ''
      
      if (invoiceFile) {
        invoiceUrl = await uploadToSupabase(invoiceFile)
      }
      setUploading(false)

      // 2. Create Shipment
      const result = await createShipmentAction({
        ...formData,
        imageUrl,
        invoiceUrl: invoiceUrl || undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        cbm: formData.cbm ? parseFloat(formData.cbm) : undefined,
      } as any)

      if (result.success && result.data) {
        setCreatedInfo({ 
          shipmentId: result.data.shipment.id, 
          invoiceNumber: result.data.invoice.invoiceNumber 
        })
        setSuccess(true)
        // Supprimé le reset auto rapide pour laisser voir la facture
      } else {
        setError(result.error || "Une erreur est survenue")
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'enregistrement")
    } finally {
      setIsSubmitting(false)
      setUploading(false)
    }
  }

  const resetForm = () => {
    setSuccess(false)
    setCreatedInfo(null)
    setStep(1)
    setFile(null)
    setInvoiceFile(null)
    setPreviewUrl(null)
    setInvoicePreviewUrl(null)
    setFormData({
      trackingNumber: '',
      clientId: '',
      type: 'AERIEN',
      category: 'MCO',
      weight: '',
      cbm: '',
      contentDescription: '',
      destination: 'Ouagadougou (Samandin)',
      hasBattery: false,
      imageUrl: '',
      invoiceUrl: '',
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 italic">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-zinc-200 dark:border-zinc-800"
          >
            {/* Left Sidebar - Steps */}
            <div className="w-full md:w-64 bg-zinc-50 dark:bg-zinc-900/50 p-8 border-r border-zinc-100 dark:border-zinc-800 hidden md:block">
              <div className="mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mb-4">
                  <Box className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-zinc-900 dark:text-white leading-tight">Nouveau Colis</h2>
                <p className="text-sm text-zinc-500 mt-1">Enregistrement Chine</p>
              </div>

              <div className="space-y-6">
                {[
                  { n: 1, label: "Identification" },
                  { n: 2, label: "Détails & Poids" },
                  { n: 3, label: "Validation" }
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all",
                      step === s.n ? "bg-blue-600 text-white shadow-lg" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                    )}>
                      {s.n}
                    </div>
                    <span className={cn(
                      "text-sm font-bold transition-all",
                      step === s.n ? "text-zinc-900 dark:text-white" : "text-zinc-400"
                    )}>{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-20">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-wider">Rappel Douane</span>
                  </div>
                  <p className="text-[10px] text-orange-700/70 dark:text-orange-300/60 leading-relaxed font-medium">
                    Tout colis contenant des batteries doit être marqué comme <strong>HAS_BATTERY</strong> pour le transport aérien.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Form */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <div className="p-4 md:p-8 flex-1 overflow-y-auto max-h-[80vh]">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors z-10"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>

                {success ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">Colis Enregistré !</h3>
                    <p className="text-zinc-500 max-w-sm mb-6">Le numéro de tracking {formData.trackingNumber} a été ajouté avec succès.</p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl border border-blue-100 dark:border-blue-800 w-full max-w-xs space-y-3 mb-8">
                       <div className="flex justify-between items-center text-xs">
                        <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">Facture N°</span>
                        <span className="font-black text-zinc-900 dark:text-white">{createdInfo?.invoiceNumber}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest">Montant</span>
                        <span className="font-black text-zinc-900 dark:text-white">{formatCFA(livePrice)}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => {
                        onClose()
                        resetForm()
                      }}
                      className="w-full max-w-xs h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black shadow-lg shadow-blue-500/20"
                    >
                      Terminer
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    {step === 1 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div>
                          <h4 className="text-lg font-black mb-1">Identification du colis</h4>
                          <p className="text-sm text-zinc-400">Entrez les informations de base du client et du transport.</p>
                        </div>

                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label className="text-zinc-500 font-bold text-[11px] uppercase tracking-wider">Destination Final</Label>
                            <Select 
                              onValueChange={(val) => setFormData(prev => ({ ...prev, destination: val }))}
                              value={formData.destination}
                            >
                              <SelectTrigger className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-bold">
                                <SelectValue placeholder="Choisir la destination..." />
                              </SelectTrigger>
                              <SelectContent className="z-[200] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-2xl">
                                <SelectItem value="Ouagadougou (Samandin)" className="font-bold">Ouagadougou (Samandin)</SelectItem>
                                <SelectItem value="Bobo-Dioulasso" className="font-bold">Bobo-Dioulasso</SelectItem>
                                <SelectItem value="Koudougou" className="font-bold">Koudougou</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="client" className="text-zinc-500 font-bold text-[11px] uppercase tracking-wider">Client Destinataire</Label>
                            <Select 
                              onValueChange={(val) => setFormData(prev => ({ ...prev, clientId: val }))}
                              value={formData.clientId}
                            >
                              <SelectTrigger className="h-12 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-bold">
                                <SelectValue placeholder="Sélectionner un client..." />
                              </SelectTrigger>
                              <SelectContent 
                                position="popper" 
                                className="z-[200] w-[var(--radix-select-trigger-width)] max-h-[300px] overflow-y-auto bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl"
                                side="bottom"
                                sideOffset={5}
                              >
                                {clients.length === 0 ? (
                                  <div className="p-4 text-center text-[10px] font-black uppercase text-zinc-400">
                                    Aucun client enregistré
                                  </div>
                                ) : (
                                  clients.map(client => (
                                    <SelectItem key={client.id} value={client.id} className="font-bold py-3 px-4 focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-600 cursor-pointer">
                                      <div className="flex flex-col gap-0.5">
                                        <span className="text-sm tracking-tight">{client.fullName || "Utilisateur"}</span>
                                        <span className="text-[10px] font-medium text-zinc-400 italic">{client.email}</span>
                                      </div>
                                    </SelectItem>
                                   ))
                                )}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="tracking" className="text-zinc-500 font-bold text-[11px] uppercase tracking-wider">N° de Tracking (Chine)</Label>
                            <Input 
                              id="tracking"
                              placeholder="ZH-123456789"
                              className="h-12 rounded-xl"
                              value={formData.trackingNumber}
                              onChange={(e) => setFormData(p => ({ ...p, trackingNumber: e.target.value }))}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div 
                              onClick={() => setFormData(p => ({ ...p, type: 'AERIEN', category: 'MCO' }))}
                              className={cn(
                                "p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-2",
                                formData.type === 'AERIEN' 
                                  ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/10" 
                                  : "border-zinc-100 dark:border-zinc-800 hover:border-blue-200"
                              )}
                            >
                              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", formData.type === 'AERIEN' ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500")}>
                                <Package className="w-4 h-4" />
                              </div>
                              <span className="font-black text-sm">Transport Aérien</span>
                              <span className="text-[10px] text-zinc-400 font-medium">Delivré en 7-10 jrs</span>
                            </div>

                            <div 
                              onClick={() => setFormData(p => ({ ...p, type: 'MARITIME', category: 'LTA' }))}
                              className={cn(
                                "p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-2",
                                formData.type === 'MARITIME' 
                                  ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/10" 
                                  : "border-zinc-100 dark:border-zinc-800 hover:border-blue-200"
                              )}
                            >
                              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", formData.type === 'MARITIME' ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500")}>
                                <Truck className="w-4 h-4" />
                              </div>
                              <span className="font-black text-sm">Transport Maritime</span>
                              <span className="text-[10px] text-zinc-400 font-medium">Delivré en 30-45 jrs</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div>
                          <h4 className="text-lg font-black mb-1">Dimensions & Catégorie</h4>
                          <p className="text-sm text-zinc-400">Spécifiez le poids actuel pour la facturation préliminaire.</p>
                        </div>

                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label className="text-zinc-500 font-bold text-[11px] uppercase tracking-wider">Catégorie Qualifiée</Label>
                            <Select 
                              onValueChange={(val) => setFormData(prev => ({ ...prev, category: val as any }))}
                              value={formData.category}
                            >
                              <SelectTrigger className="h-12 rounded-xl font-bold bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                                <SelectValue placeholder="Choisir une catégorie..." />
                              </SelectTrigger>
                              <SelectContent className="z-[200] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                                {formData.type === 'AERIEN' ? (
                                  <>
                                    <SelectItem value="MCO" className="font-bold lowercase">MCO - Colis Simple (Uniquement)</SelectItem>
                                    <div className="px-2 py-1.5 text-[10px] text-red-500 font-bold bg-red-50 dark:bg-red-900/20 italic">
                                      * Pas de LTA, pas de batteries, pas de drones.
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <SelectItem value="LTA" className="font-bold">LTA - Groupage Maritime (Prix / CBM)</SelectItem>
                                    <SelectItem value="EXPRESS" className="font-bold">EXPRESSION by sea (Forfait 226.500 F)</SelectItem>
                                    <SelectItem value="CONTAINER" className="font-bold">CONTAINER Complet</SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label className="text-zinc-500 font-bold text-[11px] uppercase tracking-wider">Poids (kg)</Label>
                              <Input 
                                type="number"
                                placeholder="0.5"
                                className="h-12 rounded-xl"
                                value={formData.weight}
                                onChange={(e) => setFormData(p => ({ ...p, weight: e.target.value }))}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label className="text-zinc-500 font-bold text-[11px] uppercase tracking-wider">Volume (CBM)</Label>
                              <Input 
                                type="number"
                                placeholder="0.01"
                                className="h-12 rounded-xl"
                                value={formData.cbm}
                                onChange={(e) => setFormData(p => ({ ...p, cbm: e.target.value }))}
                              />
                            </div>
                          </div>

                          {/* Live Price Preview */}
                          {(parseFloat(formData.weight) > 0 || parseFloat(formData.cbm) > 0) && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 bg-blue-600 rounded-[1.5rem] text-white shadow-xl shadow-blue-500/20 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                  <Calculator className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Prix Total Estimaté</p>
                                  <p className="text-xl font-black">{formatCFA(livePrice)}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-bold opacity-70">{formData.type}</p>
                                <p className="text-[9px] font-medium opacity-50 italic">Taxes incluses</p>
                              </div>
                            </motion.div>
                          )}

                          <div className="grid gap-2">
                            <Label className="text-zinc-500 font-bold text-[11px] uppercase tracking-wider">Description du contenu</Label>
                            <Textarea 
                              placeholder="Ex: Chaussures de sport, Électronique..."
                              className="rounded-xl min-h-[100px]"
                              value={formData.contentDescription}
                              onChange={(e) => setFormData(p => ({ ...p, contentDescription: e.target.value }))}
                            />
                          </div>

                          <div className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border transition-all",
                            formData.type === 'AERIEN' && formData.hasBattery
                              ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/30"
                              : "bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800"
                          )}>
                           <input 
                              type="checkbox" 
                              id="battery"
                              className="w-5 h-5 rounded-md border-zinc-300 text-blue-600 focus:ring-blue-500"
                              checked={formData.hasBattery}
                              onChange={(e) => {
                                setFormData(p => ({ ...p, hasBattery: e.target.checked }))
                                if (e.target.checked && formData.type === 'AERIEN') {
                                  setError("ATTENTION : Les batteries sont FORMELLEMENT INTERDITES en transport aérien (MCO). Le colis sera refusé ou bloqué.")
                                } else {
                                  setError(null)
                                }
                              }}
                            />
                            <Label htmlFor="battery" className="font-bold cursor-pointer flex flex-col">
                              <span>Contient une batterie</span>
                              {formData.type === 'AERIEN' && (
                                <span className="text-[10px] text-red-500 font-medium">Interdit en Aérien</span>
                              )}
                            </Label>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                         <div>
                          <h4 className="text-lg font-black mb-1">Résumé & Photo</h4>
                          <p className="text-sm text-zinc-400">Vérifiez les données avant de générer la facture client.</p>
                        </div>

                        <div className="p-6 bg-blue-600 text-white rounded-3xl space-y-4 shadow-xl shadow-blue-500/30">
                          <div className="flex justify-between items-center pb-4 border-b border-white/20">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Client</span>
                            <span className="font-bold">{clients.find(c => c.id === formData.clientId)?.fullName || 'Non sélectionné'}</span>
                          </div>
                          <div className="flex justify-between items-center pb-4 border-b border-white/20">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Type</span>
                            <span className="font-bold">{formData.type}</span>
                          </div>
                           <div className="flex justify-between items-center pb-4 border-b border-white/20">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Poids</span>
                            <span className="font-bold">{formData.weight} kg</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Tracking</span>
                            <span className="font-mono text-sm tracking-wider">{formData.trackingNumber}</span>
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label className="text-zinc-500 font-bold text-[11px] uppercase tracking-wider">Photo du colis (Upload)</Label>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            id="shipment-photo"
                            onChange={handleFileChange}
                          />
                          <label 
                            htmlFor="shipment-photo"
                            className={cn(
                              "border-2 border-dashed rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 transition-all group cursor-pointer overflow-hidden relative min-h-[160px]",
                              previewUrl 
                                ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10" 
                                : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            )}
                          >
                            {previewUrl ? (
                              <>
                                <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                                <div className="relative z-10 flex flex-col items-center gap-2">
                                  <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-lg">
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                  </div>
                                  <span className="font-black text-sm text-blue-700 dark:text-blue-300">Photo sélectionnée</span>
                                  <span className="text-[10px] font-bold px-2 py-1 bg-white/80 dark:bg-black/40 rounded-full">Cliquer pour changer</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-100 dark:border-zinc-700 shadow-sm group-hover:scale-110 transition-transform">
                                  <Upload className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-center">
                                  <p className="font-black text-sm">Cliquez pour uploader</p>
                                  <p className="text-[10px] text-zinc-400 font-medium">PNG, JPG jusqu'à 10MB</p>
                                </div>
                              </>
                            )}
                          </label>
                        </div>

                        {formData.type === 'MARITIME' && (
                          <div className="grid gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                            <div className="flex items-center justify-between">
                              <Label className="text-zinc-500 font-bold text-[11px] uppercase tracking-wider">Facture pro-format / Justificatif (Upload)</Label>
                              <div className="flex items-center gap-1 text-[9px] text-blue-600 font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
                                <ShieldCheck className="w-3 h-3" />
                                RÈGLE 3.6
                              </div>
                            </div>
                            
                            <input 
                              type="file" 
                              accept="image/*,application/pdf" 
                              className="hidden" 
                              id="invoice-photo"
                              onChange={handleInvoiceChange}
                            />
                            <label 
                              htmlFor="invoice-photo"
                              className={cn(
                                "border-2 border-dashed rounded-[2rem] p-6 flex items-center gap-4 transition-all group cursor-pointer overflow-hidden relative",
                                invoicePreviewUrl 
                                  ? "border-green-500 bg-green-50/50 dark:bg-green-900/10" 
                                  : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                              )}
                            >
                              {invoicePreviewUrl ? (
                                <>
                                  <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-black text-xs text-green-700 dark:text-green-300">Document joint avec succès</span>
                                    <span className="text-[10px] font-bold text-zinc-400">Cliquez pour modifier le fichier</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-100 dark:border-zinc-700 shadow-sm group-hover:scale-110 transition-transform shrink-0">
                                    <Upload className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div className="text-left">
                                    <p className="font-black text-xs">Uploader la facture</p>
                                    <p className="text-[9px] text-zinc-400 font-medium tracking-tight">Image ou PDF obligatoire pour la douane</p>
                                  </div>
                                </>
                              )}
                            </label>
                          </div>
                        )}
                      </motion.div>
                    )}

                    <AnimatePresence>
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3 text-sm font-black border border-red-100 dark:border-red-500/20 shadow-lg shadow-red-500/5 transition-all"
                        >
                          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="uppercase text-[10px] opacity-70 mb-0.5 tracking-widest">Erreur de validation</p>
                            <p>{error}</p>
                          </div>
                          <button 
                            onClick={() => setError(null)}
                            className="p-1 hover:bg-black/5 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-4 pt-4">
                      {step > 1 && (
                        <Button 
                          variant="ghost" 
                          onClick={handleBack}
                          className="h-14 rounded-2xl px-8 flex-1 font-black text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          Retour
                        </Button>
                      )}
                      
                      {step < 3 ? (
                        <Button 
                          onClick={handleNext}
                          disabled={step === 1 && (!formData.clientId || !formData.trackingNumber)}
                          className="h-14 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl px-12 flex-[2] font-black group transition-all hover:scale-[1.02]"
                        >
                          Continuer
                          <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleSubmit}
                          disabled={isSubmitting || uploading}
                          className="h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-12 flex-[2] font-black shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02]"
                        >
                          {isSubmitting ? (uploading ? "Upload photo..." : "Création...") : "Enregistrer le colis"}
                        </Button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
